import React from 'react'
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onClick: () => void;
}


const ConfirmDeletionButton :React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button type="button"
          style={{
              display: "flex", alignItems: "center",
              padding: "5px", border: "2px solid red",
            color: "red", cursor: "pointer",
              borderRadius:"10px"
          }}
      onClick={onClick}>
        Confirm & Delete{<Trash2 size={18} />}
    </button>
  )
}

export default ConfirmDeletionButton