import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' }
];

function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const current = i18n.language || 'en';

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel sx={{ color: 'white' }}>{t('language.label')}</InputLabel>
      <Select
        value={current}
        label={t('language.label')}
        onChange={handleChange}
        sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
      >
        {languages.map((l) => (
          <MenuItem key={l.code} value={l.code}>
            {l.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageSelector;

