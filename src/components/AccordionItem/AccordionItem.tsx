import React, { useRef } from "react";
import './AccordionItem.css'
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  selectedDropDown: string;
  setIsOpen: (a: string) => void;
  type: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, selectedDropDown, setIsOpen, type }) => {
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
        {title}
      </button>
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
