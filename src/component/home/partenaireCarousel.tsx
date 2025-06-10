import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const backgroundImages = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9,
  image10, image11, image12, image13, image14, image15, image16, image17,
  image18, image19, image20, image21, image22,
];

const linkImage1 = "https://www.alstom.com/fr";
const linkImage2 = "http://b27.fr/";
const linkImage3 = "https://www.chu-dijon.fr/";
const linkImage4 = "https://www.dijon-metropole.fr/";
const linkImage5 = "https://www.edf.fr/";
const linkImage6 = "https://www.faar-industry.com/";
const linkImage7 = "https://www.genario.co/";
const linkImage8 = "https://www.gevernova.com/regions/europe";
const linkImage9 = "https://www.iqair.com/fr/";
const linkImage10 = "https://www.keolis.com/";
const linkImage11 = "https://www.avocotes.com/kovers/?provenance=KVSTE&utm_source=kovers&utm_medium=banner&utm_campaign=redirection";
const linkImage12 = "https://www.la-forge.ai/";
const linkImage13 = "https://www.lohr.fr/fr/accueil/";
const linkImage14 = "https://www.nobatek.com/";
const linkImage15 = "https://www.noes.fr/";
const linkImage16 = "https://www.oncodesign.com/fr/";
const linkImage17 = "https://photonlines-recherche.fr/";
const linkImage18 = "https://spores.eu/";
const linkImage19 = "https://www.trinseo.com/";
const linkImage20 = "https://www.tso.fr/";
const linkImage21 = "https://wittym.com/";
const linkImage22 = "https://www.xydrogen.fr/";

// Tableau des liens associés aux images (ordre identique)
const projectLinks = [
  linkImage1, linkImage2, linkImage3, linkImage4, linkImage5, linkImage6,
  linkImage7, linkImage8, linkImage9, linkImage10, linkImage11, linkImage12,
  linkImage13, linkImage14, linkImage15, linkImage16, linkImage17, linkImage18,
  linkImage19, linkImage20, linkImage21, linkImage22
];

const Arrow = ({ style, onClick, direction }: any) => (
  <button
    onClick={onClick}
    className={`z-30 absolute top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 bg-black/50 hover:bg-black transition ${
      direction === "left" ? "left-4" : "right-4"
    }`}
    style={{ ...style }}
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
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full py-12 bg-black relative">
      <h2 className="text-4xl text-lime-400 text-center mb-8 animate-fade-down">
        Nos projets
      </h2>

      <Slider {...settings}>
        {backgroundImages.map((imgSrc, index) => (
          <div key={index} className="px-4">
            <a href={projectLinks[index]} target="_blank" rel="noopener noreferrer" className="block relative h-96 rounded-xl overflow-hidden shadow-lg">
              <div
                style={{
                  backgroundImage: `url(${imgSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <img
                src={imgSrc}
                alt={`Projet ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectCarousel;
