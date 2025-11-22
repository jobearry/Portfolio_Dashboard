interface PillProps {
  label: string,
  color: string,
  onClick?: () => void
}

export const Pill: React.FC<PillProps> = ({label, color, onClick}) => {
  return (
    <span className={`
      inline-block ${color} rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2`}
      onClick={onClick}>
        {label} 
    </span>
  )
}