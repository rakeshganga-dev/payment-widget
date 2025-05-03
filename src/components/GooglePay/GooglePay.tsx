import React, { MouseEventHandler } from 'react'
import './GooglePay.css'
import googlePayIcon from '../../assets/google-pay.png'

interface GooglePayProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const GooglePay:React.FC<GooglePayProps> = ({onClick}) => {
  return (
    <button className="google-pay-button" onClick={onClick}>
  <img src={googlePayIcon} alt="Google Pay" className="icon"/>
</button>
  )
}

export default GooglePay