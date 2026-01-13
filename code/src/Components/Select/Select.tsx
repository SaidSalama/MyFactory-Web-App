// src/components/Select.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import './Select.css';

export default function Select({ value, onValueChange, children, placeholder = "Select..." }) {
  const [isOpen1, setIsOpen1] = useState(false);

  return (
    <div className="select-wrapper">
      <button className="select-trigger" onClick={() => setIsOpen1(!isOpen1)}>
        <span className={value ? '' : 'select-placeholder'}>
          {value ? children.find(c => c.props.value === value)?.props.children : placeholder}
        </span>
        {isOpen1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen1 && (
        <div className="select-content">
          {children.map((child) => (
            <div
              key={child.props.value}
              className={`select-item ${value === child.props.value ? 'selected' : ''}`}
              onClick={() => {
                onValueChange(child.props.value);
                setIsOpen1(false);
              }}
            >
              {child.props.children}
              {value === child.props.value && <Check className="w-4 h-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SelectItem({ value, children }) {
  return <>{children}</>;
}