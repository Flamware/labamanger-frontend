import pictoSmartCity from "../../assets/uploads/2021/04/PICTO-BATIMENTS-INTELLIGENTS-VERT-150x150.png"
import pictoESante from "../../assets/uploads/2021/04/PICTO-SERVICES-PUBLICS-INTELLIGENTS-VERT-150x150.png"
import pictoIndustrie from "../../assets/uploads/2021/04/PICTO-INFRASTRUCTURES-INTELLIGENTES-VERT-150x150.png"

const champApplication = () => {
    return(
        <section >
            <p className="mb-8"></p>
            <h2 className="text-4xl text-lime-400 text-center mb-8 animate-fade-down">
                Nos champs d'applications
            </h2>
            {/* Example Project Cards (Replace with your actual data/components) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  items-start">
                <div className="bg-gradient-to-b from-black to-transparent rounded-lg shadow-md p-6 animate-slide-up delay-100 flex flex-col items-center text-center">
                    <img src={pictoESante} alt="E-santé" className="w-24 h-24 mb-4" />
                    <h3 className="font-semibold text-lg text-lime-400 mb-2">E-santé</h3>
                    <ul className="list-disc list-inside text-white text-sm text-left space-y-2 w-full max-w-md">
                        <li>Développement de <strong>méthodes de perception active basées sur plusieurs capteurs pour le suivi humain</strong> et la reconnaissance d'objets, et la saisie d'objets inconnus destinés aux personnes handicapées et aux personnes âgées.</li>
                        <li>Développement d'applications pour faciliter le diagnostic ophtalmologique.</li>
                        <li>Analyse de sources de données de santé.</li>
                    </ul>
                </div>
                <div className="bg-gradient-to-b from-black to-transparent rounded-lg shadow-md p-6 animate-slide-up delay-100 flex flex-col items-center text-center">
                    <img src={pictoSmartCity} alt="Smart city" className="w-24 h-24 mb-4" />
                    <h3 className="font-semibold text-lg text-lime-400 mb-2">Smart City</h3>
                    <ul className="list-disc list-inside text-white text-sm text-left space-y-2">
                        <li>
                            Amélioration de la <strong>sécurité des passages à niveau</strong> par l'intégration de systèmes permettant la gestion et la conception proactive de ses infrastructures.
                        </li>
                        <li>
                            Construction d'un <strong>simulateur de train</strong> sur une plate-forme de simulation cyber-physique intégrant les composants réels des trains.
                        </li>
                        <li>
                            <strong>Amélioration de la robustesse d'un système de perception d'objets pour la détection et le suivi dynamique dans des conditions défavorables</strong> (mauvais temps, trafic dense) <strong>pour des véhicules autonomes.</strong>
                        </li>
                        <li>
                            Développement d'un <strong>outil logiciel pour l'assistance au diagnostic de pannes pour les locomotives.</strong>
                        </li>
                        <li>
                            Construire un système de recommandation pour <strong>l'apprentissage en situation de mobilité.</strong>
                        </li>
                        <li>
                            Développement d'un système de recommandation associant sémantique et métaheuristique pour résoudre des problèmes d'optimisation combinatoire liés à la combinaison pertinente d'offres touristiques selon un savoir-faire métier.
                        </li>
                    </ul>
                </div>
                <div className="bg-gradient-to-b from-black to-transparent rounded-lg shadow-md p-6 animate-slide-up delay-100 flex flex-col items-center text-center">
                    <img src={pictoIndustrie} alt="Industrie 4.0" className="w-24 h-24 mb-4" />
                    <h3 className="font-semibold text-lg text-lime-400 mb-2">Industrie 4.0</h3>
                    <ul className="list-disc list-inside text-white text-sm text-left space-y-2">
                        <li>
                            Amélioration de la vision informatique classique et des systèmes d'apprentissage en profondeur en <strong>prenant en compte les informations contextuelles de l'environnement et en effectuant un raisonnement en temps réel.</strong>
                        </li>
                        <li>
                            Profilage dynamique du <strong>comportement des internautes dans un environnement e-marketing de BigData.</strong>
                        </li>
                        <li>
                            Élaboration d'un <strong>profilage dynamique d'internaute sur le web et recommandation publicitaire en temps réel.</strong>
                        </li>
                        <li>
                            Développement d'une plateforme collaborative de partage de savoir-faire.
                        </li>
                    </ul>
            
                </div>
            </div>
        </section>
    );
};

export default champApplication;