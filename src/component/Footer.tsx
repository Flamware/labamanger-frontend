import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

interface FooterProps {
  isBlack?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isBlack }) => {
  return (
    <div className={isBlack
      ? "bg-black text-white py-8"
      : "bg-gradient-to-b from-gray-900 to-black text-white py-8"
    }>
      <div className="flex flex-col md:flex-row justify-around items-center mb-6">
        <img
          src="https://www.ciad-lab.fr/wp-content/uploads/2021/04/LOGO-UNIVERSITE-MONTBELIARD-FOND-NOIR-500-x-500-px-300x300.png"
          alt="UTBM Logo"
        />
        <img
          src="https://www.ciad-lab.fr/wp-content/uploads/2025/01/ube_avec_fond.png"
          alt="UBE Logo"
          className="object-contain h-64 w-64"
        />
        <img
          src="https://www.ciad-lab.fr/wp-content/uploads/2021/04/LOGO-INSTITUT-CARNOT-FOND-NOIR-500-x-500-px-300x300.png"
          alt="Institut Carnot ARTS Logo"
        />
      </div>

      <div className="flex justify-center items-center mb-4">
        <p className="text-gray-300 mr-4">SUIVEZ-NOUS SUR NOS RÉSEAUX SOCIAUX :</p>
        <motion.a
          href="https://www.linkedin.com/company/ciad-lab/mycompany/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-blue-500 hover:text-blue-400 transition-colors"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </motion.a>
        <motion.a
          href="https://www.youtube.com/user/MultiagentGroup/featured"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-red-500 hover:text-red-400 transition-colors ml-4"
          aria-label="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </motion.a>
      </div>

      <div className="text-center pt-4 border-t border-gray-700">
        <p className="text-gray-300 font-medium">CIAD-LAB</p>
        <p className="text-gray-400 text-sm mb-2">
          Centre d'Innovation et d'Application des Données
        </p>
        <p className="text-gray-400 text-xs mb-1">
          &copy; {new Date().getFullYear()} CIAD-LAB. Tous droits réservés.
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Belfort, Bourgogne-Franche-Comté, France
        </p>
      </div>
    </div>
  );
};

export default Footer;
