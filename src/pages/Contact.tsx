import React from 'react';
import Footer from '../component/Footer'; // Assurez-vous que le chemin d'importation est correct

/**
 * La page de contact.
 * Affiche un message indiquant que la fonctionnalité est en cours de développement.
 */
const ContactPage: React.FC = () => {
    return (
        <div className="text-white flex flex-col bg-gray-900 min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl font-bold mb-6 text-lime-400">Nous Contacter</h1>
                <div className="max-w-2xl">
                    <p className="text-xl text-gray-300 mb-4">
                        Nous travaillons actuellement sur cette page.
                    </p>
                    <p className="text-lg text-gray-400">
                        Le formulaire de contact n'est pas encore opérationnel, mais il le sera bientôt. Merci de votre patience !
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
