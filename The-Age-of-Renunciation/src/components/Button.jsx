const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
    return (
        <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-void-purple text-white ${containerClass}`}>
            {leftIcon}

            <span className="relative incline-flex overflow-hidden font-skranji text-xs uppercase">
                <div>
                    {title}
                </div>
            </span>
            {rightIcon}
        </button>
    )
}

export default Button
