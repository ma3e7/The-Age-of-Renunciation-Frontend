import { useRef } from "react";

export const BentoTilt = ({ children, className = "" }) => {
    const ref = useRef(null);

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (-y / rect.height) * 12;
        const rotateY = (x / rect.width) * 12;

        el.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)`;
    };

    const resetTilt = () => {
        const el = ref.current;
        if (!el) return;

        el.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
    };

    return (
        <div
            ref={ref}
            className={`transition-transform duration-300 ease-out ${className}`}
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
        >
            {children}
        </div>
    );
};
