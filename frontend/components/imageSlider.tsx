import { useState, useRef } from "react";

interface ImageSliderProps {
    slides: string[];
}

export default function ImageSlider({ slides }: ImageSliderProps) {
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const visibleSlides = 3; // Adjust this to change the number of visible slides

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const diff = touchStartX.current - touchEndX.current;
            if (diff > 50) nextSlide(); // Swipe left
            else if (diff < -50) previousSlide(); // Swipe right
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    const previousSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div
            className="overflow-hidden relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="flex transition-transform ease-out duration-300"
                style={{
                    transform: `translateX(-${(current * 100) / visibleSlides}%)`,
                    width: `${(slides.length * 100) / visibleSlides}%`,
                }}
            >
                {slides.map((s, i) => (
                    <img
                        key={i}
                        src={s}
                        className="w-1/3 px-2 object-cover"
                        alt={`Slide ${i}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-4 flex justify-center gap-2 w-full">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full w-4 h-4 cursor-pointer transition-all duration-300 ${i === current ? "bg-gray scale-110" : "bg-gray-500"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
