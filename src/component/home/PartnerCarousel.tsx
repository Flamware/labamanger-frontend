import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your static images
import image1 from "../../assets/uploads/2021/04/ALSTOM-CFN-1.png";
import image2 from "../../assets/uploads/2021/04/ARCHIMEN-CFN-2.png";
import image3 from "../../assets/uploads/2021/04/CHU-DIJON-CFN.png";
import image4 from "../../assets/uploads/2021/04/DIJON-METROPOLE-CFN.png";
import image5 from "../../assets/uploads/2021/04/EDF-CFN.png";
import image6 from "../../assets/uploads/2021/04/FAAR-INDUSTRY-CFN.png";
import image7 from "../../assets/uploads/2021/04/GENARIO-CFN.png";
import image8 from "../../assets/uploads/2021/04/GENERAL-ELECTRIC-CFN-1.png";
import image9 from "../../assets/uploads/2021/04/IQAIR-CFN.png";
import image10 from "../../assets/uploads/2021/04/KEOLIS-CFN.png";
import image11 from "../../assets/uploads/2021/04/KOVERS-CFN-1.png";
import image12 from "../../assets/uploads/2021/04/LA-FORGE-CFN.png";
import image13 from "../../assets/uploads/2021/04/LOHR-CFN-1.png";
import image14 from "../../assets/uploads/2021/04/NOBATEK-CFN-1.png";
import image15 from "../../assets/uploads/2021/04/NOES-CFN.png";
import image16 from "../../assets/uploads/2021/04/ONCO-DESIGN-CFN.png";
import image17 from "../../assets/uploads/2021/04/PHOTON-LINES-CFN-2.png";
import image18 from "../../assets/uploads/2021/04/SPORES-CFN-1.png";
import image19 from "../../assets/uploads/2021/04/TRINSEO-CFN-1.png";
import image20 from "../../assets/uploads/2021/04/TSO-CFN-1.png";
import image21 from "../../assets/uploads/2021/04/WITTYM-CFN-1.png";
import image22 from "../../assets/uploads/2021/04/XYDROGEN-CFN-1.png";

// Array of imported image paths
const backgroundImages = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9,
  image10, image11, image12, image13, image14, image15, image16, image17,
  image18, image19, image20, image21, image22,
];

// Define your links
const projectLinks = [
  "https://www.alstom.com/fr",
  "http://b27.fr/",
  "https://www.chu-dijon.fr/",
  "https://www.dijon-metropole.fr/",
  "https://www.edf.fr/",
  "https://www.faar-industry.com/",
  "https://www.genario.co/",
  "https://www.gevernova.com/regions/europe",
  "https://www.iqair.com/fr/",
  "https://www.keolis.com/",
  "https://www.avocotes.com/kovers/?provenance=KVSTE&utm_source=kovers&utm_medium=banner&utm_campaign=redirection",
  "https://www.la-forge.ai/",
  "https://www.lohr.fr/fr/accueil/",
  "https://www.nobatek.com/",
  "https://www.noes.fr/",
  "https://www.oncodesign.com/fr/",
  "https://photonlines-recherche.fr/",
  "https://spores.eu/",
  "https://www.trinseo.com/",
  "https://www.tso.fr/",
  "https://wittym.com/",
  "https://www.xydrogen.fr/",
];

// Custom Arrow component for react-slick
// react-slick passes style and onClick props to custom arrows
const Arrow = ({ style, onClick, direction }: { style?: React.CSSProperties; onClick?: () => void; direction: "left" | "right" }) => (
    <button
        onClick={onClick}
        className={`
      z-30 absolute top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 rounded-full
      bg-black/50 hover:bg-black/70 transition-all duration-300
      ${direction === "left" ? "left-4" : "right-4"}
    `}
        style={{ ...style, display: "block" }} // Ensure display block for default styling
        aria-label={direction === "left" ? "Précédent" : "Suivant"}
    >
      {direction === "left" ? "❮" : "❯"}
    </button>
);

const ProjectCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
    centerMode: false, // Often useful for showing partial next/prev slides
    // responsive settings for different screen sizes
    responsive: [
      {
        breakpoint: 1024, // Screen size up to 1023px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false // You might want dots on smaller screens
        }
      },
      {
        breakpoint: 640, // Screen size up to 639px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: true, // Show dots for single slide view
          arrows: false // Hide arrows on very small screens if desired
        }
      },
    ],
  };

  return (
      <div className="w-full py-12  relative overflow-hidden">
        <h2 className="text-4xl text-lime-400 text-center mb-8 animate-fade-down">
          Nos partenaires
        </h2>

        {/* Slider component wrapper */}
        <div className="mx-auto max-w-7xl px-4"> {/* Added max-width and horizontal padding for better layout */}
          <Slider {...settings}>
            {backgroundImages.map((imgSrc, index) => (
                <div key={index} className="px-2 sm:px-4"> {/* Added horizontal padding to create space between slides */}
                  <a
                      href={projectLinks[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg group transition-all duration-300 transform hover:scale-105"
                  >
                    {/* This div handles the background image for a subtle effect */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${imgSrc})` }}
                    ></div>
                    {/* Dark overlay for better logo visibility and hover effect */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-colors duration-300 flex items-center justify-center">
                      {/* Actual image for proper scaling and alt text, centered within the container */}
                      <img
                          src={imgSrc}
                          alt={`Partenaire ${index + 1}`}
                          className="max-w-[80%] max-h-[80%] object-contain" // Use object-contain to ensure logo fits, adjust max-w/h as needed
                      />
                    </div>
                  </a>
                </div>
            ))}
          </Slider>
        </div>
      </div>
  );
};

export default ProjectCarousel;