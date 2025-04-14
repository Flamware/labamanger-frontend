import React, { useRef, useCallback } from 'react';
import image1 from '../../assets/uploads/2021/04/IMAGE-GENERIQUE-CIAD-MAIN-HOMME-ROBOT-1600-x-1600.jpg';
import image2 from '../../assets/uploads/2021/04/FOND-1600-x-1200_5.jpg';
import image3 from '../../assets/uploads/2021/04/FOND-1600-x-1200_7.jpg';
import image4 from '../../assets/uploads/2021/04/FOND-1600-x-1200_10.jpg';
import image5 from '../../assets/uploads/2021/04/FOND-1600-x-1200_8.jpg';
import image6 from '../../assets/uploads/2021/04/FOND-1600-x-1200_9.jpg';
import CIADLogo from '../../assets/uploads/2021/08/LOGOS-CIAD-SEUL-FOND-NOIR-500-px.png'; // Adjust the path as necessary

const ContactCarousel: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const slideHeight = '70vh';
    const transitionDuration = 500;
    const transitionTimingFunction = 'ease-in-out';
    const numSlides = 6;

    const goToSlide = useCallback((slideIndex: number) => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth * slideIndex;
            carouselRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    }, []);

    const nextSlide = useCallback(() => {
        if (carouselRef.current) {
            const currentScroll = carouselRef.current.scrollLeft;
            const slideWidth = carouselRef.current.offsetWidth;
            const nextScroll = currentScroll + slideWidth;
            const nextIndex = Math.round(nextScroll / slideWidth) % numSlides;
            goToSlide(nextIndex);
        }
    }, [goToSlide, numSlides]);

    const prevSlide = useCallback(() => {
        if (carouselRef.current) {
            const currentScroll = carouselRef.current.scrollLeft;
            const slideWidth = carouselRef.current.offsetWidth;
            const prevScroll = currentScroll - slideWidth;
            const prevIndex = (Math.round(prevScroll / slideWidth) + numSlides) % numSlides;
            goToSlide(prevIndex);
        }
    }, [goToSlide, numSlides]);

    return (
        <div
            ref={carouselRef}
            className="carousel w-full overflow-x-scroll snap-x snap-mandatory rounded-lg"
            style={{ height: slideHeight }}
        >
            {[image1, image2, image3, image4, image5, image6].map((image, index) => (
                <div
                    key={`slide-${index + 1}`}
                    id={`slide-${index + 1}`}
                    className={`carousel-item relative w-full snap-start flex justify-center items-center transition-transform duration-${transitionDuration} ease-${transitionTimingFunction}`}
                >
                    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="object-cover w-full h-full z-0"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                        {index === 0 && (
                            <>
                                <img
                                    src={CIADLogo}
                                    alt="CIAD Logo"
                                    className="flex h-auto mx-auto animate-text-reveal"
                                />
                                <p className="text-6xl text-gray-300 animate-text-reveal">
                                    Connaissance & Intelligence Artificielle Distribuées
                                </p>
                            </>
                        )}
                        {index >= 2 && (
                            <button
                                className={`bg-black text-lime-400 py-2 m-4 px-6 rounded-full font-semibold hover:bg-lime-400 hover:text-black transition duration-300 animate-text-reveal transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                            >
                                Contactez-nous
                            </button>
                        )}
                        {index === 1 && (
                            <p className="text-6xl text-gray-300 animate-text-reveal">
                                L'intelligence Artificielle est partout autour de nous !
                            </p>
                        )}
                        {index === 4 && (
                            <p className="text-6xl text-gray-300 animate-text-reveal">
                                Systemes intélligents
                                Villes intelligentes
                                Transport intelligents
                            </p>
                        )}
                        {index === 5 && (
                            <p className="text-7xl text-gray-300 animate-text-reveal">
                                Internet of Things
                                Food Tech, Industrie 4.0
                                eHealth et Services
                            </p>
                        )}
                        {index === 2 && (
                            <p className="text-6xl text-gray-300 animate-text-reveal">
                                Vous souhaitez inclure dans vos produits des aspects innovants ?
                            </p>
                        )}
                        {index === 3 && (
                            <p className="text-6xl text-gray-300 animate-text-reveal">
                                Vous souhaitez développer des nouvelles opportunités de croissance
                                dans des systèmes intelligents ?
                            </p>
                        )}
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4">
                        <button
                            onClick={prevSlide}
                            className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                        >
                            ❮
                        </button>
                        <button
                            onClick={nextSlide}
                            className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                        >
                            ❯
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactCarousel;