import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimatedTitle from './AnimatedTitle'
import gsap from 'gsap'
import RoundedCorners from './RoundedCorners'
import StoryHeroCard from './StoryHeroCard'

const Story = () => {
    const navigate = useNavigate()
    const frameRef = useRef(null)
    const [heroes, setHeroes] = useState([])

    const heroImages = {
        5: "/img/Veridia-Character.png",
        6: "/img/Tarik-Character.png",
        7: "/img/Volkan-Character.png",
        8: "/img/Kaelus-Character.png",
    }


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/codex/heroes/")
            .then(res => res.json())
            .then(data => setHeroes(data))
            .catch(err => console.error(err))
    }, [])

    const handleMouseLeave = () => {
        const element = frameRef.current
        if (!element) return
        gsap.to(element, { duration: 0.3, rotateX: 0, rotateY: 0, ease: 'power1.inOut' })
    }

    const handleMouseMove = (e) => {
        const element = frameRef.current
        if (!element) return
        const { clientX, clientY } = e;
        const rect = element.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10
        gsap.to(element, { duration: 0.3, rotateX, rotateY, transformPerspective: 700, ease: 'power1.inOut' })
    }

    return (
        <section id="story" className='min-h-dvh w-screen bg-storm-black text-fog-grey'>
            <div className='flex size-full flex-col items-center pb-24'>
                <p className='font-skranji text-sm uppercase md:text-[10px]'>
                    Some intro for the title for the gameplay
                </p>
                <div className='relative size-full'>
                    <AnimatedTitle
                        title="Some title for the gameplay"
                        sectionId="#story"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />
                    <div className='story-img-container'>
                        <div className='story-img-mask'>
                            <div className='story-img-content'>
                                <video
                                    ref={frameRef}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseUp={handleMouseLeave}
                                    onMouseEnter={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                    className="object-contain"
                                    src="/videos/video1.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            </div>
                        </div>
                        <RoundedCorners />
                    </div>
                </div>

                <div className=' w-full flex justify-center gap-6 flex-wrap'>
                    {heroes.map((hero) => (
                        <StoryHeroCard
                            key={hero.id}
                            img={heroImages[hero.id]} 
                            name={hero.hero_name}
                            onClick={() => navigate(`/hero/${hero.id}`)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Story
