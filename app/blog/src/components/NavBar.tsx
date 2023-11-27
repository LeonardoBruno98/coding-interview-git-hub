import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  currentLanguage: string;
  languages: { id: string; title: string }[];
  onChangeLanguage: (newLanguage: string) => void;
  websiteTitle: string; // Prop per il titolo del sito web
  websiteLogoUrl: string; // Prop per l'URL del logo del sito web
}

const Navbar: React.FC<NavbarProps> = ({
    currentLanguage,
  languages,
  onChangeLanguage,
  websiteTitle,
  websiteLogoUrl
}) => {
  return (
<nav className="bg-blue-500 p-4 mb-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold flex items-center">
          <img src={websiteLogoUrl} alt="Logo" className="w-8 h-8 mr-2" />
          <span className="font-semibold text-lg">{websiteTitle}</span>
        </a>

        <div className="py-4 space-x-4">
          <div className="flex space-x-2">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => onChangeLanguage(language.id)}
                className={`${
                  currentLanguage === language.id
                    ? 'bg-white text-blue-500'
                    : 'bg-blue-200 hover:bg-white text-blue-700 hover:text-blue-500'
                } px-4 py-2 rounded-md transition duration-300 ease-in-out`}
              >
                {language.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
