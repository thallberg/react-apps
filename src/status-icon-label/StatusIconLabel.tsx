import { FaTimes } from "react-icons/fa";
import { tv } from "tailwind-variants";

interface NewsItemProps {
  color: "green" | "red" | "purple" | "blue" | "darkpurple";
  title: string;
  user: string;
  date: string;
  content: string;
  linkContract?: string;
  linkPurchase?: string;
  onDelete?: () => void;
  onClick?: () => void;
}

const colorStyles = tv({
  base: "text-white px-2 py-1 rounded-t font-semibold",
  variants: {
    color: {
      green: "bg-green-600",
      red: "bg-red-600",
      blue: "bg-blue-600",
      purple: "bg-[#B06CCA]",
      darkpurple: "bg-[#5A34B4]",
    },
  },
});

export function NewsItem({
  color,
  title,
  user,
  date,
  content,
  linkContract,
  linkPurchase,
  onDelete,
  onClick,
}: NewsItemProps) {
  return (
    <div className="flex border rounded shadow overflow-hidden w-full">
      {/* Vänster sektion */}
      <div className="w-[30%] flex flex-col border-r border-gray-200">
        <div className={colorStyles({ color })}>{title}</div>
        <div className="p-3 text-sm text-gray-700">
          <p>{user}</p>
          <p>{date}</p>
        </div>
      </div>

      {/* Höger sektion */}
      <div
        className="w-[66%] relative p-4 flex flex-col gap-4 cursor-pointer"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick?.();
        }}
      >
        {/* Stäng-ikon */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            aria-label="Stäng"
          >
            <FaTimes />
          </button>
        )}

        {/* Nyhetstext */}
        <div className="text-gray-800 text-base">{content}</div>

        {/* Länkar */}
        <div className="flex gap-4">
          {linkContract && (
            <a
              href={linkContract}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-600 underline hover:text-blue-800 text-sm"
            >
              Gå till kontrakt
            </a>
          )}
          {linkPurchase && (
            <a
              href={linkPurchase}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-600 underline hover:text-blue-800 text-sm"
            >
              Gå till inköpsobjekt
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
