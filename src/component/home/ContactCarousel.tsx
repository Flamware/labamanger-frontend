import React from 'react';
import image1 from '../../assets/uploads/2021/04/IMAGE-GENERIQUE-CIAD-MAIN-HOMME-ROBOT-1600-x-1600.jpg'; // Adjust the path as necessary
import CIADLogo from '../../assets/uploads/2021/08/LOGOS-CIAD-SEUL-FOND-NOIR-500-px.png'; // Adjust the path as necessary
const ContactCarousel: React.FC = () => {
    const slideHeight = '70vh'; // 80% of the viewport height

    return (
        <div className="carousel w-full" style={{ height: slideHeight }}>
            <div id="slide1" className="carousel-item relative w-full flex justify-center items-center">
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Opacity filter */}
                <img src={image1} alt="Slide 1 - Human and Robot Hands"
                     className="object-cover w-full h-full z-0"/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <img
                        src={CIADLogo}
                        alt="CIAD Logo"
                        className="flex h-auto mx-auto  animate-text-reveal"
                    />
                    <p className="text-6xl text-gray-300 animate-text-reveal ">Connaissance & Intelligence Artificielle Distribuées</p>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4"> {/* Arrows on image */}
                    <a href="#slide4"
                       className="btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white">❮</a>
                    <a href="#slide2"
                       className="btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full flex justify-center items-center">
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Opacity filter */}
                <img
                    src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                    alt="Slide 2"
                    className="object-contain rounded-t-box z-0 w-full h-full"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20"> {/* Centered text */}
                    <h3 className="text-xl font-semibold mb-2 text-white">Slide 2 Title</h3>
                    <p className="text-gray-300 text-lg">Content for slide 2.</p>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4"> {/* Arrows on image */}
                    <a href="#slide1" className="btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white">❮</a>
                    <a href="#slide3" className="btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full flex justify-center items-center">
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Opacity filter */}
                <img
                    src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                    alt="Slide 3"
                    className="object-contain rounded-t-box z-0 w-full h-full"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20"> {/* Centered text */}
                    <h3 className="text-xl font-semibold mb-2 text-white">Slide 3 Title</h3>
                    <p className="text-gray-300 text-lg">Content for slide 3.</p>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4"> {/* Arrows on image */}
                    <a href="#slide2" className="btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white">❮</a>
                    <a href="#slide4" className="btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full flex justify-center items-center">
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Opacity filter */}
                <img
                    src="https://img.daisyui.com/images/stock/photo-1586075022733-83f6e0ff11fa.webp"
                    alt="Slide 4"
                    className="object-contain rounded-t-box z-0 w-full h-full"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20"> {/* Centered text */}
                    <h3 className="text-xl font-semibold mb-2 text-white">Slide 4 Title</h3>
                    <p className="text-gray-300 text-lg">Content for slide 4.</p>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center z-20 px-4"> {/* Arrows on image */}
                    <a href="#slide3" className="btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white">❮</a>
                    <a href="#slide1" className="btn btn-sm btn-circle bg-lime-500 border-lime-500 hover:bg-lime-600 hover:border-lime-600 text-white">❯</a>
                </div>
            </div>
        </div>
    );
};

export default ContactCarousel;