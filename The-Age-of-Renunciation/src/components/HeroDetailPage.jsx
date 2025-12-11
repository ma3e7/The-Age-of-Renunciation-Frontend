import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/HeroDetailsPage.css";
import HeroAbilities from "./HeroAbilities";

const HeroDetailPage = () => {
    const { id } = useParams();
    const [hero, setHero] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/codex/heroes/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                setHero(data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        if (!hero) return;

        const heroName = hero.hero_name.split(":")[0].trim();
        const abilityImages = [1, 2, 3, 4, 5].map(
            (i) => `/img/${heroName}-A${i}.png`
        );
        const modelImage = `/img/${heroName}-Character-Background-Removed.png`;

        const allImages = [
            ...abilityImages,
            ...abilityImages,
            modelImage,
        ];

        let loadedCount = 0;

        allImages.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount += 1;
                setImagesLoaded(loadedCount);
            };
            img.onerror = () => {
                loadedCount += 1;
                setImagesLoaded(loadedCount);
            };
        });

        const timer = setTimeout(() => {
            if (loadedCount === allImages.length) {
                setIsLoading(false);
            } else {
                const interval = setInterval(() => {
                    if (loadedCount === allImages.length) {
                        setIsLoading(false);
                        clearInterval(interval);
                    }
                }, 100);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [hero]);

    if (!hero || isLoading) {
        return (
            <div className="banner flex-center">
                <div className="three-body">
                    <div className="three-body__dot" />
                    <div className="three-body__dot" />
                    <div className="three-body__dot" />
                </div>
            </div>
        );
    }

    const heroName = hero.hero_name.split(":")[0].trim();
    const abilityImages = [1, 2, 3, 4, 5].map(
        (i) => `/img/${heroName}-A${i}.png`
    );
    const modelImage = `/img/${heroName}-Character-Background-Removed.png`;

    return (
        <>
            <div className="banner">
                {/* <div
                className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/img/background-hero-showoff.png')" }}
            /> */}
                <div className="slider" style={{ "--quantity": "5" }}>
                    {abilityImages.map((src, index) => (
                        <div className="item" key={index} style={{ "--position": (index + 1).toString() }}>
                            <div className="card-face front">
                                <img src={src} alt={`${heroName} ability ${index + 1}`} />
                            </div>
                            <div className="card-face back">
                                <img src={src} alt={`${heroName} ability ${index + 1} back`} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="content">
                    <h1 className="text-storm-black" data-content={heroName}>{heroName}</h1>

                    <div className="model-image">
                        <img src={modelImage} alt={`${heroName} model`} />
                    </div>
                </div>
            </div>

            <HeroAbilities hero={hero} />
        </>
    );
};

export default HeroDetailPage;
