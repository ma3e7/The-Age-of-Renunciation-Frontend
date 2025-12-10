import gsap from 'gsap';

import { useGSAP } from "@gsap/react"

import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';
gsap.registerPlugin(ScrollTrigger);

const WorldPage = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      }
    })

    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0
    })
  })

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-semibold text-sm uppercase md:text-[20px]">World of </h2>

        <AnimatedTitle title="OVDJE NEKI ZANIMLJIVI TEKST" containerClass="mt-5 !text-black text-center" />

        <div className="about-subtext">
          <p>NEKI TEKST ZA KAO KRAJ STRANICE</p>
          <p>NEKI TEKST DA PRIVUCE KORISNIKA</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/world-background.png"
            alt="Background" className="absolute left-0 top-0 size-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export default WorldPage
