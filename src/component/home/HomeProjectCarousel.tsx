import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image2 from "../../assets/uploads/2021/04/FOND-1600-x-1200_2.jpg";
import image3 from "../../assets/uploads/2021/04/FOND-1600-x-1200_5.jpg";
import image4 from "../../assets/uploads/2021/04/FOND-1600-x-1200_7.jpg";
import image5 from "../../assets/uploads/2021/04/FOND-1600-x-1200_8.jpg";
import image6 from "../../assets/uploads/2021/04/FOND-1600-x-1200_9.jpg";
import image7 from "../../assets/uploads/2021/04/FOND-1600-x-1200_10.jpg";

const API_BASE_URL = "https://localhost:8080/LabManager/api/v4/";

const backgroundImages = [image2, image3, image4, image5, image6, image7];

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
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_BASE_URL + "projects/withLogo")
      .then((response) => {
        if (!response.ok) throw new Error("Aucun projet trouvé");
        return response.json();
      })
      .then((data) => {
        console.log("Projets récupérés:", data);
        setProjects(data);
      })
      .catch((error) => setError(error.message));
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true, // activation des points
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center space-x-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-white opacity-50 hover:opacity-100 transition" />
    ),
  };

  return (
    <>
      <style>
        {`
          .slick-dots li button:before {
            color: white !important;
            opacity: 0.5;
          }
          .slick-dots li.slick-active button:before {
            color: white !important;
            opacity: 1;
          }
        `}
      </style>

      <div className="w-full py-12  relative">
        <h2 className="text-4xl text-lime-400 text-center mb-8 animate-fade-down">
          Nos projets
        </h2>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <Slider {...settings}>
            {projects.map((project: any, index: number) => {
              const bgImage = backgroundImages[index % backgroundImages.length];
              const logoUrl = project.id
                ? `${API_BASE_URL}projects/${project.id}/logo`
                : null;

              const projectUrl = `/project/${encodeURIComponent(project.title)}`;

              return (
                <a
                  key={project.id || index}
                  href={projectUrl}
                  className="px-4 group block cursor-pointer"
                  aria-label={`Voir la page du projet ${project.title}`}
                >
                  <div
                    className="relative h-96 rounded-xl overflow-hidden shadow-lg"
                    style={{
                      backgroundImage: `url(${bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`Logo projet ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <img
                        src="/default-logo.png"
                        alt="Logo par défaut"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    )}

                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-60 text-white text-center text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backdropFilter: "blur(4px)" }}
                    >
                      {project.title || "Nom du projet"}
                    </div>
                  </div>
                </a>
              );
            })}
          </Slider>
        )}
      </div>
    </>
  );
};

export default ProjectCarousel;
