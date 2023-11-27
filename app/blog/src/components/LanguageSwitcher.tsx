import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface LanguageSwitcherProps {
  languages: { id: string; title: string }[];
  currentLanguage: string;
  onChangeLanguage: (newLanguage: string) => void; // Aggiungi questa prop
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  languages,
  currentLanguage,
  onChangeLanguage,
}) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>(router.asPath);

  useEffect(() => {
    setCurrentPath(router.asPath); // Aggiorna il percorso corrente quando l'URL cambia
  }, [router.asPath]);

  const handleLanguageChange = (newLanguage: string) => {
    // Rimuovi eventuali lingue presenti nell'URL
    const currentPathWithoutLanguage = currentPath.replace(/^\/(en|it)/, '');

    // Genera il nuovo URL con la lingua selezionata
    const newUrl = `/${newLanguage}${currentPathWithoutLanguage}`;

    // Esegui il reindirizzamento utilizzando il router di Next.js
    router.push(newUrl);

    // Chiamiamo la funzione onChangeLanguage per aggiornare la lingua corrente
    onChangeLanguage(newLanguage);
  };

  return (
    <div className="py-4">
      <p className="text-gray-600 mb-2">Current Language: {currentLanguage}</p>
      <ul className="space-y-2">
        {languages.map((language) => (
          <li key={language.id}>
            <button
              onClick={() => onChangeLanguage(language.id)}
              className={`${
                currentLanguage === language.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-blue-200 text-gray-700 hover:text-white'
              } px-4 py-2 rounded-md transition duration-300 ease-in-out`}
            >
              {language.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
