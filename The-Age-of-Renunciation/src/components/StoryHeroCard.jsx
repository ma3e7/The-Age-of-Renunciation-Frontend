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
Visual Style: Sophisticated, highly detailed cel-shading inspired by Arcane, emphasizing texture, atmosphere, and scale.

Scene 1 – Majestic Coastal Cliffs:

Towering cliffs rise from a shimmering ocean. Calm, misty waves lap at the base, while gentle fog creates a sense of mystical depth.

Camera: slow sweeping crane shot gliding along the cliffs, highlighting the vastness and majesty of the coastline.

Lighting: soft dusk tones with cool grays and blues, punctuated by warm golden sunlight filtering through clouds.

Scene 2 – Enchanted Citadel Gardens:

A sprawling citadel surrounded by lush, magical gardens filled with glowing flora and intricate architecture adorned with arcane runes.

Camera: gentle dolly along winding paths and staircases, slowly pushing toward grand portals, emphasizing beauty and history.

Atmosphere: drifting magical particles and subtle light reflections create a serene, immersive environment.

Scene 3 – Elemental Valley:

A mystical valley where natural and magical forces meet: sparkling blue rivers, glowing green mossy fields, and floating crystal formations emitting soft light.

Camera: slow orbital movement around the valley, capturing ecological diversity and magical interactions.

Vibe: majestic, awe-inspiring, serene; the world feels alive with wonder and mystery.

Vibe & Technical Details:

Focus: showcase world scale, environmental diversity, and magical ecosystems.

Camera: slow, fluid, elegant movements—push-ins, dolly shots, and gentle orbits; no rapid cuts.

Lighting: atmospheric depth with rich contrasts, evoking wonder and adventure.

Goal: cinematic display of landscapes, architecture, magic, and ecological variety, balancing grandeur with intimate details.