const Button = ({ title, id, rightIcon, leftIcon, containerClass, onClick }) => {
    return (
        <button
            id={id}
            onClick={onClick}
            className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full 
            bg-void-purple text-white transition-colors duration-300 
            hover:bg-arcane-cyan hover:text-void-purple ${containerClass}`}>
            {leftIcon}
            <span className="relative inline-flex overflow-hidden font-skranji text-xs uppercase">
                {title}
            </span>

            {rightIcon}
        </button>
    )
}


export default Button;
