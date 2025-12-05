import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";

const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
];

const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % videos.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);




    return (
        <div className="relative h-dvh w-screen overflow-hidden bg-storm-black">
            <video
                key={index}
                src={videos[index]}
                autoPlay
                muted
                playsInline
                className="absolute top-0 left-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />

            <div className="absolute left-10 bottom-10 text-white z-20">
                <div className="absolute left-4 sm:left-10 bottom-10 text-white z-20 max-w-[90vw]">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-skranji-bold uppercase tracking-wider wrap-break-word
                    z-40">
                        The Age of Renunciation
                    </h1>
                    <p className="mt-2 sm:mt-4 text-lg sm:text-xl opacity-90 wrap-break-word z-40">
                        Enter the Crystal Forest.
                    </p>
                </div>

            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-skranji-bold uppercase tracking-wider wrap-break-word text-red-400 z-41">
                The Age of Renunciation
            </h1>
            <p className="mt-2 sm:mt-4 text-lg sm:text-xl opacity-90 wrap-break-word z-40 text-amber-200">
                Enter the Crystal Forest.
            </p>
        </div>
    );
};

export default Hero;
