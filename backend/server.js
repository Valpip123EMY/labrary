const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let messages = []; // In-memory storage for demo

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', service: 'GreenScale Enterprise Backend', time: new Date() });
});

app.get('/api/services', (req, res) => {
  const services = [
    { id: 1, name: 'Cloud Solutions', description: 'Scalable cloud infrastructure and migration services.' },
    { id: 2, name: 'AI & Machine Learning', description: 'Intelligent automation and predictive analytics.' },
    { id: 3, name: 'Cybersecurity', description: 'Enterprise-grade security and compliance solutions.' },
    { id: 4, name: 'DevOps', description: 'Continuous integration and deployment pipelines.' },
    { id: 5, name: 'Data Analytics', description: 'Big data processing and business intelligence.' },
    { id: 6, name: 'Custom Development', description: 'Tailored software solutions for your business needs.' }
  ];
  res.json(services);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  messages.push({ id: messages.length + 1, name, email, message, timestamp: new Date() });
  res.json({ success: true, message: 'Message received' });
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
