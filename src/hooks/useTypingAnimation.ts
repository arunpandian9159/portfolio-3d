'use client';

import { useEffect, useState } from 'react';
import { UseTypingAnimationReturn } from '@/types';

interface UseTypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export function useTypingAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
}: UseTypingAnimationProps): UseTypingAnimationReturn {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (charIndex < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Finished typing, wait then start deleting
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenWords);
      }
    } else {
      if (charIndex > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next text
        setIsTyping(true);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [texts, currentIndex, isTyping, charIndex, typingSpeed, deletingSpeed, delayBetweenWords]);

  return {
    displayText,
    isTyping,
    currentIndex,
  };
}
