import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { tv } from "tailwind-variants";

const statusIconLabelStyles = tv({
  base: "inline-flex items-center gap-1 px-2 py-1 rounded text-white cursor-pointer select-none",
  variants: {
    color: {
      orange: "bg-orange-500 hover:bg-orange-600",
      yellow: "bg-yellow-400 hover:bg-yellow-500",
      green: "bg-green-600 hover:bg-green-700",
      red: "bg-red-600 hover:bg-red-700",
    },
  },
  defaultVariants: {
    color: "green",
  },

});

interface StatusIconLabelProps {
  label: string;
  color?: "orange" | "yellow" | "green" | "red";
  isCompleted: boolean;
  date?: string;
  onClick?: () => void;

}

export function StatusIconLabel({
  label,
  color = "green",
  isCompleted,
  date,
  onClick,
}: StatusIconLabelProps) {
  const Icon = isCompleted ? FaCheckCircle : FaRegCircle;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span>{label} {date}</span>
    </div>
  );
}
