import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";

import Lenis from "lenis";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(useGSAP);

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const stickySectionRef = useRef<HTMLDivElement | null>(null);
  const introColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (introColRef.current) {
      const introParagraphs = introColRef.current.querySelectorAll("p");

      introParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent || "";

        paragraph.innerHTML = text
          .split(/\s+/)
          .map((part) => {
            if (part.trim() === "") return part;
            return part
              .split("")
              .map(
                (char) =>
                  `<span style="opacity: 0; display: inline-block;">${char}</span>`
              )
              .join("");
          })
          .join(" ");
      });
    }
  }, []);


  useGSAP(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  function flickerAnimation(targets, toOpacity){
    
  }

  return (
    <div className='container'>
      <section className='hero'>
        <h1>JINX</h1>
        <p>
          Power doesn't come to those who were born strongest, fastest or
          smartest. It comes to those who will do anything to achieve it.
        </p>
      </section>
      <section className='about'>
        <div className='about-img'>
          <img src={img3} alt='' />
        </div>
        <div className='about-copy'>
          <h1>League of Legends - Arcane</h1>
        </div>
      </section>
      <section className='sticky' ref={stickySectionRef}>
        <div className='intro'>
          <div className='intro-col'>
            <p>Don't cry</p>
            <p>You're perfect</p>
          </div>
          <div className='intro-col' ref={introColRef}>
            <p>Fear haunts us all , child.</p>
          </div>
        </div>
        <div className='img-1'>
          <img src={img1} alt='' />
        </div>
        <div className='img-2'>
          <img src={img2} alt='' />
        </div>
        <div className='img-3'>
          <img src={img3} alt='' />
        </div>
        <div className='copy'>
          <h1>
            Imprisonment. What a curious principle , we confine the physical
            body yet the mind is still free
          </h1>
        </div>
      </section>
      <section className='footer'>
        <p>Loneliness is a byproduct of a gifted mind.</p>
      </section>
    </div>
  );
};

export default App;
