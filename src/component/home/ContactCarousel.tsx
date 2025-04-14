import React from 'react';
import image1 from '../../assets/uploads/2021/04/IMAGE-GENERIQUE-CIAD-MAIN-HOMME-ROBOT-1600-x-1600.jpg';
import image2 from '../../assets/uploads/2021/04/FOND-1600-x-1200_5.jpg';
import image3 from '../../assets/uploads/2021/04/FOND-1600-x-1200_7.jpg';
import image4 from '../../assets/uploads/2021/04/FOND-1600-x-1200_10.jpg';
import image5 from '../../assets/uploads/2021/04/FOND-1600-x-1200_8.jpg';
import image6 from '../../assets/uploads/2021/04/FOND-1600-x-1200_9.jpg';
import CIADLogo from '../../assets/uploads/2021/08/LOGOS-CIAD-SEUL-FOND-NOIR-500-px.png'; // Adjust the path as necessary

const ContactCarousel: React.FC = () => {
    const slideHeight = '70vh'; // 80% of the viewport height
    const transitionDuration = 500; // milliseconds for transition
    const transitionTimingFunction = 'ease-in-out'; // smoother transition

    return (
        <div className="carousel w-full" style={{ height: slideHeight }}>
            <div
                id="slide1"
                className={`carousel-item relative w-full flex justify-center items-center transition-transform duration-${transitionDuration} ease-${transitionTimingFunction}`}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Opacity filter */}
                <img
                    src={image1}
                    alt="Slide 1 - Human and Robot Hands"
                    className="object-cover w-full h-full z-0"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <img
                        src={CIADLogo}
                        alt="CIAD Logo"
                        className="flex h-auto mx-auto animate-text-reveal"
                    />
                    <p className="text-6xl text-gray-300 animate-text-reveal">
                        Connaissance & Intelligence Artificielle Distribuées
                    </p>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4">
                    <a
                        href="#slide6"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❮
                    </a>
                    <a
                        href="#slide2"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❯
                    </a>
                </div>
            </div>
            <div
                id="slide2"
                className={`carousel-item relative w-full flex justify-center items-center transition-transform duration-${transitionDuration} ease-${transitionTimingFunction}`}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Opacity filter */}
                <img
                    src={image2}
                    alt="Slide 2"
                    className="object-cover w-full h-full z-0"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <p className="text-6xl text-gray-300 animate-text-reveal">
                        L'intelligence Artificielle est partout autour de nous !
                    </p>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4">
                    <a
                        href="#slide1"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❮
                    </a>
                    <a
                        href="#slide3"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❯
                    </a>
                </div>
            </div>
            <div
                id="slide3"
                className={`carousel-item relative w-full flex justify-center items-center transition-transform duration-${transitionDuration} ease-${transitionTimingFunction}`}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                {/* Opacity filter */}
                <img
                    src={image3}
                    alt="Slide 3"
                    className="object-cover w-full h-full z-0"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <p className="text-6xl text-gray-300 animate-text-reveal">
                        Vous souhaitez inclure dans vos produits des aspects innovants ?
                    </p>
                    <button
                        className={`bg-black text-lime-400 py-2 m-4 px-6 rounded-full font-semibold hover:bg-lime-400 hover:text-black transition duration-300 animate-text-reveal transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        Contactez-nous
                    </button>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4">
                    <a
                        href="#slide2"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❮
                    </a>
                    <a
                        href="#slide4"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❯
                    </a>
                </div>
            </div>
            <div
                id="slide4"
                className={`carousel-item relative w-full flex justify-center items-center transition-transform duration-${transitionDuration} ease-${transitionTimingFunction}`}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                {/* Opacity filter */}
                <img
                    src={image4}
                    alt="Slide 4"
                    className="object-cover w-full h-full z-0"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <p className="text-6xl text-gray-300 animate-text-reveal">
                        Vous souhaitez développer des nouvelles opportunités de croissance
                        dans des systèmes intelligents ?
                    </p>
                    <button
                        className={`bg-black text-lime-400 py-2 m-4 px-6 rounded-full font-semibold hover:bg-lime-400 hover:text-black transition duration-300 animate-text-reveal transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        Contactez-nous
                    </button>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4">
                    <a
                        href="#slide3"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❮
                    </a>
                    <a
                        href="#slide5"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❯
                    </a>
                </div>
            </div>
            <div
                id="slide5"
                className={`carousel-item relative w-full flex justify-center items-center transition-transform duration-${transitionDuration} ease-${transitionTimingFunction}`}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                {/* Opacity filter */}
                <img
                    src={image5}
                    alt="Slide 5"
                    className="object-cover w-full h-full z-0"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <p className="text-6xl text-gray-300 animate-text-reveal">
                        Systemes intélligents
                        Villes intelligentes
                        Transport intelligents
                    </p>
                    <button
                        className={`bg-black text-lime-400 py-2 m-4 px-6 rounded-full font-semibold hover:bg-lime-400 hover:text-black transition duration-300 animate-text-reveal transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        Contactez-nous
                    </button>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4">
                    <a
                        href="#slide4"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❮
                    </a>
                    <a
                        href="#slide6"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❯
                    </a>
                </div>
            </div>
            <div
                id="slide6"
                className={`carousel-item relative w-full flex justify-center items-center transition-transform duration-${transitionDuration} ease-${transitionTimingFunction}`}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                {/* Opacity filter */}
                <img
                    src={image6}
                    alt="Slide 6"
                    className="object-cover w-full h-full z-0"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <p className="text-7xl text-gray-300 animate-text-reveal">
                        Internet of Things
                        Food Tech, Industrie 4.0
                        eHealth et Services
                    </p>
                    <button
                        className={`bg-black text-lime-400 py-2 m-4 px-6 rounded-full font-semibold hover:bg-lime-400 hover:text-black transition duration-300 animate-text-reveal transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        Contactez-nous
                    </button>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4">
                    <a
                        href="#slide5"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❮
                    </a>
                    <a
                        href="#slide1"
                        className={`btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white transition-colors duration-${transitionDuration} ease-${transitionTimingFunction}`}
                    >
                        ❯
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactCarousel;