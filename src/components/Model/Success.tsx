import React from 'react';
import Modal from './Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PaymentSuccessModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2>✅ Payment Successful!</h2>
    <p>Your payment has been processed successfully.</p>
  </Modal>
);

export default PaymentSuccessModal;
