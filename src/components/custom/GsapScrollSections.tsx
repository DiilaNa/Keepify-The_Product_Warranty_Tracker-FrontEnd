import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./animation.scss";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollAnimation() {
  // <-- TYPE the ref
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return; // safety check

    gsap.fromTo(
      el.querySelectorAll<HTMLImageElement>(".hero-image"), // TYPE the elements
      { scale: 1.2, y: 80, autoAlpha: 0 },
      {
        scale: 1,
        y: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top center",
        },
      }
    );
  }, []);

  return (
    <div
      ref={heroRef}
      className="hero-section-wrapper relative w-full h-[70vh] overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1605629713998-167cdc70afa2"
        className="hero-image absolute inset-0 w-full h-full object-cover"
      />
      <div className="overlay absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="hero-title text-white text-4xl md:text-6xl font-bold">
          Scroll Animation Hero
        </h1>
      </div>
    </div>
  );
}
