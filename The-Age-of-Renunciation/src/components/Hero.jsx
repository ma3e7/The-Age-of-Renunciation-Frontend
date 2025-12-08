import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const videos = [
    "/videos/world-cinematic2.mp4",
    "/videos/world-cinematic3.mp4",
    "/videos/world-cinematic4.mp4",
    "/videos/world-cinematic1.mp4",
];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [loadedVideos, setLoadedVideos] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % videos.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (loadedVideos >= 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    useGSAP(() => {
        gsap.fromTo(
            "#clip-layer",
            {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",

            },
            {
                clipPath: "polygon(20% 5%, 75% 0, 100% 100%, 15% 86%)",
                borderRadius: "0% 0 20% 10%",
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: "#clip-layer",
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                },
            }
        );
    });

    const textPos = "absolute left-4 sm:left-10 bottom-10 max-w-[90vw]";
    const title = "text-5xl sm:text-6xl lg:text-7xl font-skr font-bold uppercase";
    const sub = "mt-3 text-xl opacity-90";

    return (
        <div className="relative w-screen h-dvh overflow-hidden">
            {isLoading && (
                <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-fog-grey">
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
            )}
            <div
                id="clip-layer"
                className="absolute inset-0 z-20 overflow-hidden">
                <video
                    key={index}
                    src={videos[index]}
                    onLoadedData={() => setLoadedVideos(prev => prev + 1)}
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover" />

                <div className={`${textPos} text-white`}>
                    <h1 className={title}>Age of Renunciation</h1>
                    <p className={sub}>Enter the Crystal Forest.</p>
                </div>
            </div>

            <div className="absolute inset-0 z-10">
                <div className={`${textPos} text-black`}>
                    <h1 className={title}>Age of Renunciation</h1>
                    <p className={sub}>Enter the Crystal Forest.</p>
                </div>
            </div>

        </div>
    );
};

export default Hero;
