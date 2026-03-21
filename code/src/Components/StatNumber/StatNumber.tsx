import './StatNumber.css';

interface StatNumberProps {
  value: number | string;
  label?: string;
  unit?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger'; // color accents
  size?: 'sm' | 'md' | 'lg';
}

export default function StatNumber({
  value,
  label,
  unit,
  variant = 'primary',
  size = 'md',
}: StatNumberProps) {
  return (
    <div className={`stat-number ${variant} ${size}`}>
      <div className="stat-value">
        {value}
        {unit && <span className="stat-unit">{unit}</span>}
      </div>
      {label && <div className="stat-label">{label}</div>}
    </div>
  );
}