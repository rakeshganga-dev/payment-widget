import React, { MouseEventHandler } from 'react'
import paypal from '../../assets/paypal.png'
import './PayPal.css'

interface PayPalProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const PayPal:React.FC<PayPalProps> = ({onClick}) => {
  return (
    <button className="paypal-button" onClick={onClick}>
 <img src={paypal}/>
</button>
  )
}

export default PayPal