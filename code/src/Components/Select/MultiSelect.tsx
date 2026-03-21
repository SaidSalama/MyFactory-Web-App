import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import './MultiSelect.css'; // we'll use the same style + small additions

interface MultiSelectProps {
  value: string;                     // current concatenated string, e.g. "135"
  onChange: (newString: string) => void;
  options: { machine_id: number; name: string }[]; // your Machines.data
  placeholder: string;
}

export default function MultiSelect({
  value = "",
  onChange,
  options,
  placeholder ="",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert current string "135" → array [1,3,5] for easy checking
  const selectedIds = value.split('').map(Number).filter(n => !isNaN(n));

  const toggleId = (id: number) => {
    const idStr = id.toString();

    let newSelected: number[];
    if (selectedIds.includes(id)) {
      // remove
      newSelected = selectedIds.filter(n => n !== id);
    } else {
      // add (append to end)
      newSelected = [...selectedIds, id];
    }

    // Convert back to concatenated string "135"
    const newString = newSelected.join('');
    onChange(newString);
  };

  return (
    <div className="select-wrapper">
      {/* Trigger - same style as your single Select */}
      <button
        className="select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value === "" ? (
          <span className="select-placeholder">{placeholder}</span>
        ) : (
          <div className="selected-chips">
            {selectedIds.map(id => (
              <span key={id} className="chip">
                {id}
               
              </span>
            ))}
          </div>
        )}

        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Dropdown - same style as your single Select */}
      {isOpen && (
        <div className="select-content">
          {options.map(opt => {
            const isSelected = selectedIds.includes(opt.machine_id);
            return (
              <div
                key={opt.machine_id}
                className={`select-item ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleId(opt.machine_id)}
              >
                {opt.name} (ID: {opt.machine_id})
                {isSelected && <Check className="w-4 h-4" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}