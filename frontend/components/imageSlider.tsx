import React, { useState, useRef } from "react";

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // const touchStartX = useRef<number | null>(null);
    // const touchEndX = useRef<number | null>(null);
    const [positionX, setPositionX] = useState(50);
    // const [startX, setStartX] = useState(0);
    // const [endX, setEndX] = useState(0);

    const startX = useRef(0);
    const endX = useRef(0);
    const [displacement, setDisplacement] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    // };

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    // };

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        console.log("Touch Start");
        startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        console.log("Is Dragging");
        if (!isDragging) return;
        // setPositionX("touches" in e ? e.touches[0].clientX : e.clientX);
        endX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
        if (startX.current && endX.current){
            const difference = endX.current - startX.current;
            console.log(difference);
            setDisplacement(difference);
        }
    };

    const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
        console.log("Touch End");
        setIsDragging(false);

        // endX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
        // if (startX.current && endX.current){
        //     const difference = endX.current - startX.current;
        //     console.log(difference);
        //     setDisplacement(difference);
        // }
        // setEndX("touches" in e ? e.touches[0].clientX : e.clientX);
        // const difference = endX - startX;
        // console.log(difference);
        // setDisplacement(difference);
        // setDisplacement(0);
        // startX.current = 0;
        // endX.current = 0;
        // setStartX(0);
        // setEndX(0);
        // if (!touchStartX.current || !touchEndX.current) return;

        // touchEndX.current = "touches" in e ? e.changedTouches[0].clientX : e.clientX;

        // if (touchStartX.current && touchEndX.current) {
        //     const difference = touchStartX.current - touchEndX.current;

        //     if (difference > 50) {
        //         nextSlide();
        //     } else if (difference < -50){
        //         prevSlide();
        //     }
        // }
    };

    return (
        <div
            className="relative w-full max-w-2xl mx-auto overflow-hidden"
            // onTouchStart={handleTouchStart}
            // onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            // onMouseLeave={handleTouchEnd}
        >
            <div
                className="flex transition-transform duration-500 ease-in-out"
                // style={{ transform: `translateX(calc(${(displacement && displacement / Math.abs(displacement)) * 20}px))` }}
                style={{ transform: `translateX(${displacement}px)` }}
                // style={{ left: positionX, position: "absolute" }}
            >
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Slide ${index}`} className="w-full h-64 object-cover rounded-lg" draggable={false}/>
                ))}
            </div>
        </div>
    )
}

export default ImageSlider;
