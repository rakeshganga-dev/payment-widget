import React, { ChangeEventHandler } from "react";
import "./CardsPaymentForm.css"; // Make sure to create this CSS file
import Input from "../Input/Input";
type FormData = {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};
type FormErrors = {
  [key in keyof FormData]?: string;
};
interface CardsPaymentFormProps{
  formData: FormData;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: FormErrors;
}
const CardsPaymentForm: React.FC<CardsPaymentFormProps> = ({formData, handleChange, errors}) => {

  return (
    <>
      <div className="form-group">
        <label>Name on Card</label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label>Card Number</label>
        <div className="custom_input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg_icon bi-credit-card"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"></path>
            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"></path>
          </svg>
          <Input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength={16}
          />
        </div>
        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
      </div>
      <div className="form-row">
        <div className="form-group expiry">
          <label>Expiry (MM/YY)</label>
          <Input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
          />
          {errors.expiry && <p className="error">{errors.expiry}</p>}
        </div>
        <div className="form-group">
          <label>CVV</label>
          <Input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            maxLength={4}
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
        </div>
      </div>
    </>
  );
};

export default CardsPaymentForm;
