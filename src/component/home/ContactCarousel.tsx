import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../../assets/uploads/2021/04/IMAGE-GENERIQUE-CIAD-MAIN-HOMME-ROBOT-1600-x-1600.jpg";
import image2 from "../../assets/uploads/2021/04/FOND-1600-x-1200_5.jpg";
import image3 from "../../assets/uploads/2021/04/FOND-1600-x-1200_7.jpg";
import image4 from "../../assets/uploads/2021/04/FOND-1600-x-1200_10.jpg";
import image5 from "../../assets/uploads/2021/04/FOND-1600-x-1200_8.jpg";
import image6 from "../../assets/uploads/2021/04/FOND-1600-x-1200_9.jpg";
import CIADLogo from "../../assets/uploads/2021/08/LOGOS-CIAD-SEUL-FOND-NOIR-500-px.png";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

// Custom Arrow Components
const Arrow = ({ style, onClick, direction }: any) => (
  <button
    onClick={onClick}
    className={`z-30 absolute top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-black/50 hover:bg-black transition ${
      direction === "left" ? "left-4" : "right-4"
    }`}
    style={{ ...style }}
  >
    {direction === "left" ? "❮" : "❯"}
  </button>
);

const contactButton = (
  <button className="bg-black text-lime-400 py-2 m-4 px-6 rounded-full font-semibold hover:bg-lime-400 hover:text-black transition duration-300 animate-text-reveal">
    Contactez-nous
  </button>
);

const slides = [
  {
    image: image1,
    content: (
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
    ),
  },
  {
    image: image2,
    content: (
      <p className="text-6xl text-gray-300 animate-text-reveal">
        L'intelligence Artificielle est partout autour de nous !
      </p>
    ),
  },
  {
    image: image3,
    content: (
      <>
        <p className="text-6xl text-gray-300 animate-text-reveal">
          Vous souhaitez inclure dans vos produits des aspects innovants ?
        </p>
        {contactButton}
      </>
    ),
  },
  {
    image: image4,
    content: (
      <>
        <p className="text-6xl text-gray-300 animate-text-reveal">
          Vous souhaitez développer de nouvelles opportunités de croissance
          dans des systèmes intelligents ?
        </p>
        {contactButton}
      </>
    ),
  },
  {
    image: image5,
    content: (
      <>
        <p className="text-6xl text-gray-300 animate-text-reveal">
          Systèmes intelligents<br />
          Villes intelligentes<br />
          Transport intelligents
        </p>
        {contactButton}
      </>
    ),
  },
  {
    image: image6,
    content: (
      <>
        <p className="text-7xl text-gray-300 animate-text-reveal">
          Internet of Things<br />
          Food Tech, Industrie 4.0<br />
          eHealth et Services
        </p>
        {contactButton}
      </>
    ),
  },
];

const FullScreenCarousel = () => {
  const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  dots: true,
  prevArrow: <Arrow direction="left" />,
  nextArrow: <Arrow direction="right" />,
  appendDots: (dots: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 30,  // high enough to be above everything
      }}
    >
      <ul style={{ margin: 0, padding: 0, display: "flex", gap: "8px" }}> {dots} </ul>
    </div>
  ),
};


  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-screen h-screen">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-10" />
            {/* Background Image */}
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover z-0"
            />
            {/* Content */}
            <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
              {slide.content}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FullScreenCarousel;
