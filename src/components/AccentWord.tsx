import React from 'react';

interface AccentWordProps {
  children: React.ReactNode;
  className?: string;
}

export default function AccentWord({ children, className = "" }: AccentWordProps) {
  return (
    <span className={`sticker-accent ${className}`}>
      <span>{children}</span>
    </span>
  );
}
