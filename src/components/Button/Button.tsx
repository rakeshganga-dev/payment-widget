import React, { MouseEventHandler } from "react";
import "./Button.css";

interface BottonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  title: string;
  disabled?: boolean
}
const Button: React.FC<BottonProps> = ({ title, onClick, className = "", disabled=false }) => {
  return (
    <button onClick={onClick} className={`${className} buttonClass ${disabled ? 'buttonDisabled': 'buttonActive'}`} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
