import React, { ChangeEventHandler } from 'react'
import './Input.css'

interface InputProps {
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  value?: string;
  name: string;
  maxLength?: number;
}
const Input:React.FC<InputProps> =({type='text', onChange, placeholder='', className='', value, name, maxLength}) => {
  return (
    <input type={type} onChange={onChange} placeholder={placeholder} className={`${className} input`} value={value} name={name} maxLength={maxLength}/>
  )
}

export default Input
