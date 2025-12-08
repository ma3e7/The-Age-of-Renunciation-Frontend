import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.set(".animated-word", {
                opacity: 0,
                transform: "translateY(20px)"
            });

            gsap.to(".animated-word", {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                stagger: 0.04,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "top 40%",
                    toggleActions: "play none none reverse",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`animated-title ${containerClass}`}>
            {title.split("<br />").map((line, index) => (
                <div
                    key={index}
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                >
                    {line.split(" ").map((word, i) => (
                        <span
                            key={i}
                            className="animated-word inline-block"
                            dangerouslySetInnerHTML={{ __html: word }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;
