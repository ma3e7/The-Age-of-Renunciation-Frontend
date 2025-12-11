import { useState, useRef } from "react";
import { BentoTilt } from "./BentoTilt";

const StoryHeroCard = ({ img, name, onClick }) => {
    
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverRef = useRef(null);

    const handleMove = (e) => {
        if (!hoverRef.current) return;
        const rect = hoverRef.current.getBoundingClientRect();
        setCursorPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <BentoTilt className="relative h-84 w-68 overflow-hidden rounded-xl cursor-pointer">
            <div
                className="relative size-full"
                onClick={onClick}
                onMouseMove={handleMove}
                onMouseEnter={() => setHoverOpacity(1)}
                onMouseLeave={() => setHoverOpacity(0)}
                ref={hoverRef}
            >
                <img
                    src={img}
                    alt={name}
                    className="absolute inset-0 size-full object-cover object-center"
                />
                <div
                    className="absolute inset-0 opacity-0 transition duration-300 pointer-events-none"
                    style={{
                        opacity: hoverOpacity,
                        background: `radial-gradient(120px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,255,255,0.25), rgba(0,0,0,0.1))`,
                    }}
                />

                <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-sm text-center py-2 text-fog-grey uppercase font-skranji text-xs">
                    {name}
                </div>
            </div>
        </BentoTilt>
    );
};

export default StoryHeroCard;
