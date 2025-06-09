import { useState } from "react";

const CustomAccordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Title section (outside border) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-semibold text-lime-400 text-xl py-3 px-4 rounded-t-2xl bg-transparent border border-lime-400 hover:bg-lime-900/10 transition flex justify-between items-center"
      >
        {title}
        <span className="text-white">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Only show body + border when open */}
      {isOpen && (
        <div className="border border-t-0 border-lime-400 rounded-b-2xl px-4 py-4 bg-transparent text-gray-300 text-sm">
          {children}
        </div>
      )}
    </div>
  );
};

const IA = () => {
    const youtubeVideoUrl = "https://youtube.com/embed/AVJoTcCX9qw"; // Replace with your actual YouTube embed URL

  return (
    <section className="py-16 text-white">
      <div className="w-full md:w-2/3 mx-auto">
        <h2 className="text-4xl font-bold text-lime-400 text-center mb-8 animate-fade-down">
          qu'est-ce qu'une Intelligence Artificielle ?
        </h2>
        <div className="leading-relaxed text-lg text-gray-300 animate-fade-up mb-8">
          <p className="mb-4">
            L'intelligence artificielle, c'est l'ensemble de théories et de techniques mises en œuvre en vue de réaliser des machines capables de simuler l'intelligence  humaine.
          </p>
          <p className="mb-4">
            C'est l'un des rêves le plus ambitieux de l'Homme, construire des machines avec un esprit semblable au sien.
          </p>
          <p className="mb-4">
            L'intelligence artificielle ne s'incarne pas uniquement dans des robots intelligents, elle est partout autour de nous. Elle donne la parole à nos smartphones, équipe nos bâtiments et nos véhicules, révolutionne la médecine…
          </p>
          <p className="mb-4">
            Il est difficile d'expliquer le concept de l'intelligence. Mais l'idée réside dans la capacité à permettre à une machine de comprendre la réalité de la même manière qu'un être humain.
          </p>
          <p className="mb-4">
            De plus, elle doit être en capacité de simuler les mêmes comportements de manipulation de l'intelligence comme apprendre, expliquer et peut être même douter.
          </p>
          <p className="mb-4">
            <span className="font-semibold text-lime-400">Pour expliquer facilement l'IA, on peut avoir recours à de nombreuses métaphores.</span>
          </p>
          <p className="mb-4">
            <span className="font-semibold text-lime-400">Notre préférée est celle de la recette de cuisine en 3 étapes : Les ingrédients, la préparation et la recette !</span>
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {/* Accordion grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CustomAccordion title="Les Ingrédients">
            <p className="mb-4">
              On peut considérer le frigo comme un vaste environnement de stockage de données. Chaque ingrédient présent dans notre frigo représente une ou plusieurs données.
            </p>
            <p className="mb-4">
              Lorsque l'on ouvre le frigo, il faut choisir le bon ingrédient et donc l'identifier au premier regard.
            </p>
            <p className="mb-4">
              À force d'apprentissage, on peut reconnaître les ingrédients au premier coup d'œil peut importe leur forme ou leur position dans le frigo.
            </p>
            <p className="mb-4">
              C'est ce que beaucoup de chercheurs développent avec des algorithmes de deep learning pour la vision artificielle par exemple. Avec un peu d'entraînement, les algorithmes d'une machine peuvent analyser, traiter et comprendre des images d'un seul coup.
            </p>
          </CustomAccordion>

          <CustomAccordion title="La Préparation">
            <p className="mb-4">
              Si on sélectionne un poulet, il faut parfois le découper, juste pour récupérer les blancs en vue de les cuisiner.
            </p>
            <p className="mb-4">
              Pour séparer le blanc de la carcasse, on utilise un processus de raisonnement qui va nous permettre de classifier les morceaux du poulet. En IA, cette classification peut être réalisée par des algorithmes de machine learning, c'est-à-dire que la machine va apprendre seule, sans connaissance préalable, grâce à l'apprentissage de ses expériences passées.
            </p>
            <p className="mb-4">
              Bien entendu, le choix du bon algorithme, pas forcément de machine learning, est primordial pour obtenir le résultat souhaité, car on ne découpe par un poulet avec un rouleau à pâtisserie !
            </p>
            <p className="mb-4">
              En résumé, une partie des algorithmes d'IA peuvent être vue comme des ustensiles de cuisine et les données comme des ingrédients. Pour cuisiner les ingrédients de notre frigo (les données), il nous faut des ustensiles de cuisine (les algorithmes). Nous devons donc fabriquer des ustensiles adaptés pour cuisiner nos ingrédients, c'est-à dire créer les algorithmes capables de traiter des données dans le but d'en extraire de la connaissance.
            </p>
          </CustomAccordion>

          <CustomAccordion title="La Recette">
            <p className="mb-4">
              Quand on cuisine, on coordonne souvent un ensemble d'actions pour réaliser un plat particulier, par exemple un poulet aux olives. En IA, cela revient à combiner les bons algorithmes entre eux pour construire une chaîne complète de raisonnement. C'est comme pour une recette, il nous faut plusieurs produits, plusieurs ustensiles et plusieurs actions, le tout coordonné pour réaliser le plat.
            </p>
            <p className="mb-4">
              Pour cela, il est possible de faire appel à une autre partie de l'intelligence artificielle, l'ingénierie de la connaissance, qui va modéliser le savoir-faire de l'expert (dans notre cas, le chef cuisinier). Cette partie va se charger des connaissances et raisonner sur les relations de causalité. Par exemple en cuisine, si on souhaite une certaine cuisson, on va choisir le four plutôt que la casserole en fonction du type et du temps de cuisson que l'on souhaite.
            </p>
            <p className="mb-4">
              On peut aussi modéliser cette orchestration de raisonnement sous une forme distribuée. Dans ce cas, on parle d'agents qui raisonnent et qui coopèrent dans l'objectif d'atteindre un but commun.
            </p>
            <p className="mb-4">
              Ces approches d'IA se classent dans le domaine des systèmes multi-agent.
            </p>
            <p className="mb-4">
              L'intelligence artificielle est un vaste champ d'étude qui permet de créer des machines capables de raisonner, tout comme nous le faisons quand nous cuisinons !
            </p>
          </CustomAccordion>
          <p className="mb-4"></p>
        </div>
      </div>
      {/* Placeholder for YouTube Video */}
        <div className="w-full rounded-3xl overflow-hidden shadow-md">
            <iframe
                className="w-full aspect-video"
                src={youtubeVideoUrl}
                title="CIAD Presentation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    </section>
  );
};

export default IA;
