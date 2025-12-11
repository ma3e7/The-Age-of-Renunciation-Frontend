import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/HeroDetailsPage.css";

const HeroDetailPage = () => {
    const { id } = useParams();
    const [hero, setHero] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/codex/heroes/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched hero:", data);
                setHero(data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (!hero) return <div className="banner">Loading...</div>;

    const heroName = hero.hero_name.split(":")[0].trim();

    const abilityImages = [1, 2, 3, 4, 5].map(
        (i) => `/img/${heroName}-A${i}.png`
    );

    const modelImage = `/img/${heroName}-Character-Background-Removed.png`;


    return (
        <div className="banner">
            <div className="slider" style={{ "--quantity": "5" }}>
                {abilityImages.map((src, index) => (
                    <div className="item" key={index} style={{ "--position": (index + 1).toString() }}>
                        <img src={src} alt={`${heroName} ability ${index + 1}`} />
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
    );
};

export default HeroDetailPage;
