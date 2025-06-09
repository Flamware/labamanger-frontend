const verrous = () => {
    return(
        <section >
            <h2 className="text-4xl font-bold text-lime-400 text-center mb-8 animate-fade-down">
                Nos verrous scientifiques
            </h2>
            {/* Example Project Cards (Replace with your actual data/components) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  items-start">
                <div className="bg-gradient-to-b from-black to-transparent rounded-lg shadow-md p-6 animate-slide-up delay-100">
                    <h3 className="font-semibold text-lg text-lime-400 mb-2">Vérité et valeur</h3>
                    <p className="text-white text-sm text-left">
                        Notre premier défi scientifique est de certifier le bien fondé des données. En s'appuyant sur le fruit de nos recherches, nous évaluons le bien fondé des données à notre disposition pour garantir que nos systèmes raisonnent avec justesse. La véracité des données reste néanmoins subordonnée au contexte dans laquelle elles sont utilisées.
                    </p>
                    <p className="mb-4"></p>
                    <p className="text-white text-sm text-left">
                        Dans un monde où nous disposons d'une multitude de données, notre objectif réside également dans le fait de créer de la valeur. Notre défi est donc de dire quelles sont les données utiles et pertinentes pour le contexte de raisonnement, pour travailler sur les données qui comptent vraiment.
                    </p>
                </div>
                <div className="bg-gradient-to-b from-black to-transparent rounded-lg shadow-md p-6 animate-slide-up delay-200">
                    <h3 className="font-semibold text-lg text-lime-400 mb-2">Interopérabilité du raisonnement</h3>
                    <p className="text-white text-sm text-left">
                        Notre second défi est de créer des systèmes de raisonnement capables d'interopérabilité, c'est à dire des systèmes ayant une manière de raisonner différente mais qui se complète pour travailler ensemble et atteindre un objectif commun.                    </p>
                    <p className="mb-4"></p>
                    <p className="text-white text-sm text-left">
                        Nous nous appuyons notamment sur les principes théoriques des systèmes multi-agents et sur les systèmes formels de raisonnement.                    
                    </p>                
                </div>
                <div className="bg-gradient-to-b from-black to-transparent rounded-lg shadow-md p-6 animate-slide-up delay-300">
                    <h3 className="font-semibold text-lg text-lime-400 mb-2">Système prescriptif</h3>
                    <p className="text-white text-sm text-left">
                        Notre troisième défi est de développer des systèmes prédictifs capables d'aider à la prise de décision et de prescrire des actions à mener dans le but d'améliorer la performance.                    
                    </p>              
                </div>
            </div>
        </section>
    );
};

export default verrous;