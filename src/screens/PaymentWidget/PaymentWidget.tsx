import React, { ChangeEvent, useEffect, useState } from "react";
import AccordionItem from "../../components/AccordionItem/AccordionItem";
import "./PaymentWidget.css";
import Button from "../../components/Button/Button";
import PayPal from "../../components/PayPal/PayPal";
import ShopPay from "../../components/ShopPay/ShopPay";
import GooglePay from "../../components/GooglePay/GooglePay";
import UPICard from "../../components/UpiCard/UPICard";
import CardsPaymentForm from "../../components/CardsPaymentForm/CardsPaymentForm";
import googlePayIcon from "../../assets/google-pay.png";
import phonePayIcon from "../../assets/PhonePe-Logo.wine.png";
import UPIIcon from "../../assets/upi-icon.png";
import hdfcBank from "../../assets/HDB_BIG.png";
import iciciBank from "../../assets/IBN_BIG.png";
import axisBank from "../../assets/AXISBANK.BO_BIG.png";
import federalBank from "../../assets/FEDERALBNK.NS_BIG.png";
import NetBankingCard from "../../components/NetBankingCard/NetBankingCard";
import OverlayLoader from "../../components/OverlayLoader/OverlayLoader";
import PaymentSuccessModal from "../../components/Model/Success";
import PaymentFailureModal from "../../components/Model/Failure";
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

type ExpressCheckoutMethod = "googlepay" | "paypal" | "shoppay";

interface PaymentWidgetProps {
  expressCheckoutMethods?: ExpressCheckoutMethod[];
  theme: "Primary" | "Secondary";
}
type FormData = {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type FormErrors = {
  name?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
};

interface Session {
  sessionId: string;
  status: keyof statusType;
}

type statusType = {
  payment_initiated: string,
  processing: string,
  success: string,
  failure: string
}

const STATUS:statusType = {
  payment_initiated: "Payment Initiated",
  processing: "Processing",
  success: "Success",
  failure: "Failure"
}

const socket: Socket = io('https://payment-widget-api.onrender.com');
const PaymentWidget: React.FC<PaymentWidgetProps> = ({
  expressCheckoutMethods = [],
  theme = "Primary"
}) => {
  const [selectedDropDown, setSelectedDropDown] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMenthod] = useState("");
  const [upiID, setUpiID] = useState("");
  const [upiIDError, setUpiIDError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const createSession = async () => {
    try {
      const response = await axios.post<{ sessionId: string; status: keyof statusType }>('https://payment-widget-api.onrender.com/session');
      const newSessionId = response.data.sessionId;
      const status: keyof statusType = response.data.status;
      setSessionId(newSessionId);
      setStatus(STATUS[status]);
      console.log(`Created session: ${newSessionId}`);
    } catch (error) {
      console.error('Error creating session:', error);
      setIsLoading(false)
      setShowFailure(true)
    }
  };

  useEffect(()=>{
    if(theme === "Primary"){
      document.documentElement.style.setProperty('--color', '#44c767');
      document.documentElement.style.setProperty('--border-color', '#18ab29');
      document.documentElement.style.setProperty('--active-color', '#39cd61');
      document.documentElement.style.setProperty('--hover-color', '#39cd61');
      document.documentElement.style.setProperty('--disabled-color', '#44c7676b');
    }else if(theme === "Secondary"){
      document.documentElement.style.setProperty('--color', '#3A59D1');
      document.documentElement.style.setProperty('--border-color', '#60B5FF');
      document.documentElement.style.setProperty('--active-color', '#3D90D7');
      document.documentElement.style.setProperty('--hover-color', '#3D90D7');
      document.documentElement.style.setProperty('--disabled-color', '#AFDDFF');
    }
  },[theme])
  useEffect(() => {
    socket.on('sessionCreated', ({ sessionId: id, status }: Session) => {
        console.log(`Socket: Status created - ${id} (${status})`);
    });

    socket.on('statusUpdated', ({ sessionId: id, status }: Session) => {
      if (id === sessionId) {
        setStatus(STATUS[status]);
        if(status === 'success'){
          setShowSuccess(true);
          setIsLoading(false);
        }else if(status === 'failure'){
          setShowFailure(true);
          setIsLoading(false);
        }
        console.log(`Socket: Status updated - ${id} (${status})`);
      }
    });

    return () => {
      socket.off('sessionCreated');
      socket.off('statusUpdated');
    };
  }, [sessionId]);

  const setDropDown = (key: string) => {
    if (key === "upi") {
      setSelectedPaymentMenthod("googlePay");
    } else if (key === "card") {
      setSelectedPaymentMenthod("card");
    } else {
      setSelectedPaymentMenthod("hdfc");
    }
    if(key === selectedDropDown){
      setSelectedDropDown('');
      setSelectedPaymentMenthod('')
    }else{
      setSelectedDropDown(key)
    }
  };
  const setPaymentMethod = (type: string) => {
    setSelectedPaymentMenthod(type);
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidUPI = (upiId: string) => {
    const upiRegex = /^[a-zA-Z0-9._]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(upiId);
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format";
    }

    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if(!isValidUPI(upiID) && selectedPaymentMethod === 'upiID'){
      setUpiIDError('Invalid upi id')
      return
    }else if (selectedPaymentMethod === 'card' && !validate()) {
      return
    }else{
      setIsLoading(true)
      createSession();
    }
  };

  return (
    <div className="payment-widget-container">
      {isLoading && <OverlayLoader isLoading={true} message={`${status}`} />}
      <PaymentSuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      <PaymentFailureModal isOpen={showFailure} onClose={() => setShowFailure(false)} />
      {(expressCheckoutMethods && expressCheckoutMethods.length > 0 )&& (
        <>
          <div className="express-checkout">
            {expressCheckoutMethods.includes("shoppay") && (
              <ShopPay onClick={handleSubmit} />
            )}
            {expressCheckoutMethods.includes("paypal") && (
              <PayPal onClick={handleSubmit} />
            )}
            {expressCheckoutMethods.includes("googlepay") && (
              <GooglePay onClick={handleSubmit} />
            )}
          </div>
          <div className="line-with-or">
            <span>or</span>
          </div>
        </>
      )}
      <AccordionItem
        title="UPI (Pay via any App)"
        selectedDropDown={selectedDropDown}
        setIsOpen={setDropDown}
        type="upi"
      >
        <UPICard
          title="Google Pay"
          selectedPaymentMethod={selectedPaymentMethod}
          icon={googlePayIcon}
          type="googlePay"
          onClick={setPaymentMethod}
        />
        <UPICard
          title="Phone Pay"
          selectedPaymentMethod={selectedPaymentMethod}
          icon={phonePayIcon}
          type="phonePay"
          onClick={setPaymentMethod}
        />
        <UPICard
          title="Enter UPI ID"
          selectedPaymentMethod={selectedPaymentMethod}
          icon={UPIIcon}
          type="upiID"
          onClick={setPaymentMethod}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUpiID(e.target.value)
          }
          upiID={upiID}
          error={upiIDError}
        />
      </AccordionItem>
      <AccordionItem
        title="Credit/Debit Card"
        selectedDropDown={selectedDropDown}
        setIsOpen={setDropDown}
        type="card"
      >
        <CardsPaymentForm
          errors={errors}
          formData={formData}
          handleChange={handleChange}
        />
      </AccordionItem>
      <AccordionItem
        title="Net Banking"
        selectedDropDown={selectedDropDown}
        setIsOpen={setDropDown}
        type="netBanking"
      >
        <NetBankingCard
          title="HDFC Bank"
          selectedPaymentMethod={selectedPaymentMethod}
          icon={hdfcBank}
          type="hdfc"
          onClick={setPaymentMethod}
        />
        <NetBankingCard
          title="ICICI Bank"
          selectedPaymentMethod={selectedPaymentMethod}
          icon={iciciBank}
          type="icici"
          onClick={setPaymentMethod}
        />
        <NetBankingCard
          title="Axis Bank"
          selectedPaymentMethod={selectedPaymentMethod}
          icon={axisBank}
          type="axis"
          onClick={setPaymentMethod}
        />
        <NetBankingCard
          title="Federal Bank"
          selectedPaymentMethod={selectedPaymentMethod}
          icon={federalBank}
          type="federal"
          onClick={setPaymentMethod}
        />
      </AccordionItem>
      <div>
        <Button
          title="Pay $5,500"
          onClick={() => {
            handleSubmit();
          }}
          disabled={selectedPaymentMethod === '' && selectedDropDown === ''}
        />
        <p className="note-session">
          All trasactions are secure and encrypted By clicking pay now
          your are agreeing to <span className="link">Terms & Conditions</span> and{" "}
          <span className="link">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentWidget;
