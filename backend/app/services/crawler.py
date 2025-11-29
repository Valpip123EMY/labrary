import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.job import Job
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import re
import logging

logger = logging.getLogger(__name__)

class SmartCrawler:
    def __init__(self, model_path: str = "./deberta-research-classifier"):
        self.model_path = model_path
        self.tokenizer = None
        self.model = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

    def load_model(self):
        if not self.model:
            logger.info(f"Loading model from {self.model_path}...")
            try:
                self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
                self.model = AutoModelForSequenceClassification.from_pretrained(self.model_path)
                self.model.to(self.device)
                self.model.eval()
                logger.info("Model loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load model: {e}")
                # Fallback or re-raise depending on requirements

    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        text = text.replace('\n', ' ').replace('\t', ' ')
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def classify(self, text: str) -> float:
        """Returns probability of being a job (label 1)"""
        if not self.model:
            self.load_model()
        
        cleaned = self.clean_text(text)
        inputs = self.tokenizer(cleaned, return_tensors="pt", truncation=True, max_length=512).to(self.device)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
            return probs[0][1].item() # Probability of class 1 (Job)

    async def crawl_page(self, url: str, db: AsyncSession):
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(url, timeout=10.0)
                response.raise_for_status()
            except Exception as e:
                logger.error(f"Failed to fetch {url}: {e}")
                return

        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 1. Extract Links (Simple logic: find all links, filter internal/relevant)
        links = set()
        for a in soup.find_all('a', href=True):
            href = a['href']
            full_url = urljoin(url, href)
            links.add(full_url)

        # 2. Process Links
        for link in links:
            # Check if already exists
            result = await db.execute(select(Job).filter(Job.url == link))
            if result.scalars().first():
                continue

            # Fetch content of the link
            try:
                # Delay/Rate limit should be here
                sub_response = await client.get(link, timeout=10.0)
                sub_soup = BeautifulSoup(sub_response.text, 'html.parser')
                text = sub_soup.get_text()
                
                # Classify
                score = self.classify(text)
                
                if score > 0.8: # High confidence it's a job
                    title = sub_soup.title.string if sub_soup.title else "Unknown Title"
                    logger.info(f"Found Job! {title} ({link}) Score: {score}")
                    
                    new_job = Job(
                        title=title.strip(),
                        url=link,
                        source_domain=urlparse(link).netloc,
                        description=text[:500], # Store snippet
                        is_active=True
                    )
                    db.add(new_job)
                    await db.commit()
                    
            except Exception as e:
                logger.error(f"Error processing link {link}: {e}")
                continue

crawler_service = SmartCrawler()
