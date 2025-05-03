// components/PaymentFailureModal.tsx
import React from 'react';
import Modal from './Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PaymentFailureModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2>❌ Payment Failed</h2>
    <p>There was a problem processing your payment. Please try again.</p>
  </Modal>
);

export default PaymentFailureModal;
