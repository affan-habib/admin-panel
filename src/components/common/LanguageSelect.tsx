import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';
import ensvg from 'assets/en.svg'
import bnsvg from 'assets/bn.svg'
const LanguageSwitch: React.FC = () => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem('language') || 'bn',
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  const handleChange = () => {
    const selectedLanguage = language === 'en' ? 'bn' : 'en';
    setLanguage(selectedLanguage);
  };

  return (
    <div style={{ width: 70 }}>

      {language == 'en' && <img src={ensvg} style={{ cursor: 'pointer' }} onClick={handleChange} />}
      {language == 'bn' && <img src={bnsvg} style={{ cursor: 'pointer' }} onClick={handleChange} />}
    </div>
  );
};

export default LanguageSwitch;
