import React, { StyleHTMLAttributes, useRef } from "react";
import './AccordionItem.css'
import visa from '../../assets/visa.png'
import master from '../../assets/card.png'
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  selectedDropDown: string;
  setIsOpen: (a: string) => void;
  type: string;
  icon?: string;
  iconStyles?: StyleHTMLAttributes<HTMLImageElement>;
  showCardIcons?: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, selectedDropDown, setIsOpen, type, icon, iconStyles, showCardIcons=false }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(type);
  };
  return (
    <div style={{ border: "1px solid #ccc" }}>
      <button
        onClick={toggleAccordion}
        className="accordion-button"
      >
        {icon && <img src={icon} alt={title} style={{...iconStyles}}/>}{title}
        {showCardIcons && <div className="accordion-card-icons">
          <img src={visa} alt="visa" style={{...iconStyles}}/>
          <img src={master} alt="master" style={{...iconStyles}}/>
        </div>}
      </button>
      <div>
        
      </div>
      <div
        ref={contentRef}
        className="accordion-content-container"
        style={{
          maxHeight: selectedDropDown === type ? `${contentRef.current?.scrollHeight}px` : "0px",
          padding: selectedDropDown === type ? "1rem" : "0 1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
