
interface ButtonProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'danger';

}

const Button = ({ title, variant = 'primary'}: ButtonProps ) => {
    const base = 'px-8 py-2 text-white rounded-lg'
    const variants = {
        primary: 'bg-blue-500',
        secondary: 'bg-green-500',
        danger: 'bg-red-500'
    }
  return (
    <button 
    className={`${base} ${variants[variant]}`}
    >{title}</button>
  )
}

export default Button