export const createTypography = () => {
  const defaultFontFamily =
  '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';
const bengaliFontFamily = "'Noto Sans Bengali', sans-serif";

// Get the language from local storage or use a default
const language = localStorage.getItem('language') || 'en';

// Set the appropriate font family based on the language
const fontFamily = language === 'bn' ? bengaliFontFamily : defaultFontFamily;

return {
  fontFamily,
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    h1: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.2,
    },
  };
};
