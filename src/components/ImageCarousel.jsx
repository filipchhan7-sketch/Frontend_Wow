import { useEffect, useState } from 'react';

const SLIDES = [
  { src: '/images/A1.png', alt: 'WOW POTATO franchise image A1' },
  { src: '/images/A2.png', alt: 'WOW POTATO franchise image A2' },
  { src: '/images/A3%20Light.png', alt: 'WOW POTATO franchise image A3' },
];

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % SLIDES.length);
    }, 3500);
    return () => window.clearInterval(intervalId);
  }, [paused]);

  return (
    <div
      className="w-full"
      aria-label="WOW POTATO franchise images"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-y-4 border-brand-orange/80 bg-brand-soft/60 shadow-xl sm:aspect-[16/7] sm:border-y-8">
        {SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            aria-hidden={index !== activeIndex}
          />
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-2.5" role="group" aria-label="Choose an image">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show image ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange ${index === activeIndex ? 'bg-brand-orange' : 'bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}
