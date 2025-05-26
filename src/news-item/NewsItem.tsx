import { FaTimes } from "react-icons/fa";
import { tv } from "tailwind-variants";

interface NewsItemProps {
  color: "red" | "green" | "blue" | "yellow";
  title: string;
  user: string;
  date: string;
  content: string;
  onDelete?: () => void;
  onClickItemLink?: () => void;
  onClickBookingLink?: () => void;
}


const colorStyles = tv({
  base: "text-white p-2 font-semibold",
  variants: {
    color: {
      red: "bg-red-600",
      green: "bg-green-600",
      blue: "bg-blue-600",
      yellow: "bg-yellow-500",
    },
  },
});

export function NewsItem({
  color,
  title,
  user,
  date,
  content,
  onDelete,
  onClickItemLink,
  onClickBookingLink,
}: NewsItemProps) {
  return (
    <div className="flex border shadow w-full relative">
      {/* Vänsterdel */}
      <div className="w-[30%] flex flex-col">
        <div className={colorStyles({ color })}>{title}</div>
        <div className="p-2 text-sm text-gray-700 bg-gray-200">
          <p>{user}</p>
          <p>{date}</p>
        </div>
      </div>

      {/* Högerdel */}
      <div className="w-[66%] p-4 flex flex-col gap-2 relative">

        {onDelete && (
          <button
            onClick={onDelete}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 cursor-pointer"
          >
            <FaTimes />
          </button>
        )}

        <div className="text-gray-800 ml-10">{content}</div>

        <div className="flex justify-end mr-6 gap-6 mt-auto">
          {onClickItemLink && (
            <button
              onClick={onClickItemLink}
              className="text-blue-600 underline hover:text-blue-800 text-sm cursor-pointer"
            >
              Gå till kontrakt
            </button>
          )}
          {onClickBookingLink && (
            <button
              onClick={onClickBookingLink}
              className="text-blue-600 underline hover:text-blue-800 text-sm cursor-pointer"
            >
              Gå till inköpsobjekt
            </button>
          )}
        </div>

      </div>
    </div>
  );
}


export default NewsItem;
