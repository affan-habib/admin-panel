import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';

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
    <div style={{ width: 110 }}>
      <FormControlLabel
        control={
          <Switch
            checked={language === 'bn'}
            onChange={handleChange}
            color="primary"
          />
        }
        label={language === 'en' ? 'English' : 'Bangla'}
        labelPlacement="start"
      />
    </div>
  );
};

export default LanguageSwitch;
