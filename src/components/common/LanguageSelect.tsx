import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

const LanguageSelect: React.FC = () => {
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'bn');
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language, i18n]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  return (
    <div style={{ width: 110 }}>
      <Select
        value={language}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Select Language' }}
        style={{ borderBottom: 'none', width: '100%' }}
      >
        <MenuItem value="" disabled>
          Select Language
        </MenuItem>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="bn">Bangla</MenuItem>
      </Select>
    </div>
  );
};

export default LanguageSelect;
