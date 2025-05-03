import React from 'react'
import './NetBankingCard.css'
interface NetBankingCardProps {
    selectedPaymentMethod: string;
    icon: string
    title: string
    onClick: (e: string)=> void;
    type: string
}
const NetBankingCard:React.FC<NetBankingCardProps> = ({selectedPaymentMethod, icon, title, onClick, type}) => {
  return (
    <div className='netbanking-card-container' onClick={()=>onClick(type)}>
      <input type="radio" checked={selectedPaymentMethod===type} /><img src={icon} alt={title} className="icon"/><p className='netbanking-card-title'>{title}</p>
    </div>
  )
}

export default NetBankingCard
