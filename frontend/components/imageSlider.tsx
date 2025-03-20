import next from "next";
import React, { useState, useRef } from "react";

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
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
        >
            <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Slide ${index}`} className="w-full h-64 object-cover rounded-lg"/>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider;
// export default function ImageSlider({ slides }: ImageSliderProps) {
//     const [current, setCurrent] = useState(0);
//     const touchStartX = useRef<number | null>(null);
//     const touchEndX = useRef<number | null>(null);
//     const visibleSlides = 3; // Adjust this to change the number of visible slides

//     const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//         touchStartX.current = e.touches[0].clientX;
//     };

//     const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//         touchEndX.current = e.touches[0].clientX;
//     };

//     const handleTouchEnd = () => {
//         if (touchStartX.current !== null && touchEndX.current !== null) {
//             const diff = touchStartX.current - touchEndX.current;
//             if (diff > 50) nextSlide(); // Swipe left
//             else if (diff < -50) previousSlide(); // Swipe right
//         }
//         touchStartX.current = null;
//         touchEndX.current = null;
//     };

//     const previousSlide = () => {
//         setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//     };

//     const nextSlide = () => {
//         setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     };

//     return (
//         <div
//             className="overflow-hidden relative"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//         >
//             <div
//                 className="flex transition-transform ease-out duration-300"
//                 style={{
//                     transform: `translateX(-${(current * 100) / visibleSlides}%)`,
//                     width: `${(slides.length * 100) / visibleSlides}%`,
//                 }}
//             >
//                 {slides.map((s, i) => (
//                     <img
//                         key={i}
//                         src={s}
//                         className="w-1/3 px-2 object-cover"
//                         alt={`Slide ${i}`}
//                     />
//                 ))}
//             </div>

//             {/* <div className="absolute bottom-4 flex justify-center gap-2 w-full"> */}
//             {/*     {slides.map((_, i) => ( */}
//             {/*         <div */}
//             {/*             key={i} */}
//             {/*             onClick={() => setCurrent(i)} */}
//             {/*             className={`rounded-full w-4 h-4 cursor-pointer transition-all duration-300 ${i === current ? "bg-gray scale-110" : "bg-gray-500" */}
//             {/*                 }`} */}
//             {/*         ></div> */}
//             {/*     ))} */}
//             {/* </div> */}
//         </div>
//     );
// }
