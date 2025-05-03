
import React, { useEffect, useState } from 'react';
import Modal from '../Model/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onExpire?: () => void;
};

const UPIPaymentModal: React.FC<Props> = ({ isOpen, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(600); 

  useEffect(() => {
    if (!isOpen) return;

    setTimeLeft(600); 

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire?.(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onExpire]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <Modal isOpen={isOpen}>
      <h2>🕒 UPI Payment</h2>
      <p>Please open the UPI application and complete the payment in given time.</p>
      <div style={{ marginTop: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
        Time Left: {formatTime(timeLeft)}
      </div>
    </Modal>
  );
};

export default UPIPaymentModal;
