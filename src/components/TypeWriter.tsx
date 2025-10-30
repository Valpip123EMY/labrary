import { useEffect, useState } from 'react';

interface TypeWriterProps {
  words: string[];
  delay: number;
  className?: string;
}

export const TypeWriter = ({ words, delay, className = '' }: TypeWriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const handleTyping = () => {
      if (isDeleting) {
        // Delete text
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        setTypingSpeed(30);
      } else {
        // Add text
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        setTypingSpeed(50);
      }

      // Check if we've finished typing or deleting
      if (!isDeleting && currentText === currentWord) {
        // Pause at the end of a word
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && currentText === '') {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed]);

  return (
    <span className={`inline-block ${className}`}>
      <span className="italic font-serif">{currentText}</span>
      <span className="animate-pulse"> |</span>
    </span>
  );
};

export default TypeWriter;
