// MultiSelectForMachines.tsx (you can name it whatever)
import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';
//import './MultiSelect.css'; // reuse or copy your existing CSS

interface Props {
  value: string;                     // current concatenated string "135"
  onChange: (newString: string) => void;
  options: { id: number; name: string }[]; // your Machines.data
  placeholder?: string;
}

export default function MultiSelectForMachines({
  value = "",
  onChange,
  options,
  placeholder = "Select machines...",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert current string "135" → array [1,3,5]
  const selectedIds = value.split('').map(Number).filter(n => !isNaN(n));

  const toggleId = (id: number) => {
    const idStr = id.toString();

    let newSelected: number[];
    if (selectedIds.includes(id)) {
      // remove
      newSelected = selectedIds.filter(n => n !== id);
    } else {
      // add (we'll sort to keep order consistent, optional)
      newSelected = [...selectedIds, id].sort((a, b) => a - b);
    }

    // Convert back to concatenated string "135"
    const newString = newSelected.join('');
    onChange(newString);
  };

  return (
    <div className="multi-select-wrapper">
      <div 
        className="multi-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value === "" ? (
          <span className="placeholder">{placeholder}</span>
        ) : (
          <div className="selected-chips">
            {selectedIds.map(id => (
              <span key={id} className="chip">
                {id}
                <button
                  className="chip-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleId(id);
                  }}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </div>

      {isOpen && (
        <div className="multi-select-content">
          {options.map(opt => {
            const id = opt.id;
            const isSelected = selectedIds.includes(id);
            return (
              <div
                key={id}
                className={`multi-select-item ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleId(id)}
              >
                {opt.name} (ID: {id})
                {isSelected && <Check className="w-4 h-4" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}