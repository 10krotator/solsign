import React from 'react';

interface SquareTextBoxProps {
  text: string;
  size?: number;
  backgroundColor?: string;
}

const SquareTextBox: React.FC<SquareTextBoxProps> = ({
  text,
  size = 300,
  backgroundColor = 'bg-zinc-900',
}) => {
  return (
    <div 
      className={`flex items-center justify-center leading-tight tracking-tighter ${backgroundColor}`}
      style={{ width: size, height: size }}
    >
      <span className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
        {text}
      </span>
    </div>
  );
};

export default SquareTextBox;