import React, { MouseEventHandler } from 'react'
import shopPayIcon from '../../assets/shoppay.png'
import './ShopPay.css'

interface ShopPayProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const ShopPay: React.FC<ShopPayProps> = ({onClick}) => {
  return (
    <button className="shop-pay-button" onClick={onClick}>
 <img src={shopPayIcon}/>
</button>
  )
}

export default ShopPay