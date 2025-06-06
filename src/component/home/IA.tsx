import React from 'react';

const IA: React.FC = () => {

    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-lime-400 text-center mb-8 animate-fade-down">
                    qu'est-ce qu'une Intelligence Artificielle ?
                </h2>
                <div className="leading-relaxed text-lg text-gray-300 animate-fade-up mb-8"> {/* Added mb-8 for space below text */}
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
                    <p>
                        <span className="font-semibold text-lime-400">Pour expliquer facilement l'IA, on peut avoir recours à de nombreuses métaphores.</span>
                    </p>
                    <p>
                        <span className="font-semibold text-lime-400">Notre préférée est celle de la recette de cuisine en 3 étapes :
Les ingrédients, la préparation et la recette !</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default IA;