import React, { ChangeEventHandler } from "react";
import "./UPICard.css";
import Input from "../Input/Input";

interface UPICardProps {
  title: string;
  icon: string;
  type: string;
  onClick: (e: string) => void;
  selectedPaymentMethod: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  upiID?: string;
  error?: string;
}
const UPICard: React.FC<UPICardProps> = ({
  icon,
  title,
  type,
  onClick,
  selectedPaymentMethod,
  onChange = () => {},
  upiID,
  error,
}) => {
  return (
    <div onClick={() => onClick(type)} style={{ cursor: "pointer" }}>
      <div className="upi-card-container">
        <input type="radio" checked={selectedPaymentMethod === type} />
        <img src={icon} alt={title} className="icon" />
        <p className="upi-card-title">{title}</p>
      </div>
      {type === "upiID" && selectedPaymentMethod === type && (
        <div className="upi-id-container">
          <Input
            type="text"
            onChange={onChange}
            placeholder="abc@ybl"
            className=""
            value={upiID}
            name="upiID"
          />
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default UPICard;
