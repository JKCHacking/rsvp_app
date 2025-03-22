import React, { useState, useRef } from "react";

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const isDragging = useRef(false);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging.current) return;
        touchEndX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartX.current || !touchEndX.current) return;

        touchEndX.current = e.changedTouches[0].clientX;

        if (touchStartX.current && touchEndX.current) {
            const difference = touchStartX.current - touchEndX.current;

            if (difference > 50) {
                nextSlide();
            } else if (difference < -50){
                prevSlide();
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            className="relative w-full max-w-2xl mx-auto overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
        >
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Slide ${index}`} className="w-full h-64 object-cover rounded-lg" draggable={false}/>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider;
