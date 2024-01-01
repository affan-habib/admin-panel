import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LoginFooter: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box py={5} style={{ textAlign: 'start' }}>
      <Typography  variant="body1" fontSize={16}>
        {t('howCanIHelpYou')}{' '}
        <span style={{ color: '#1D8839' }}> {t('fastStartGuide')} </span>
        {t('forMoreHelp')}{' '}
        <span style={{ color: '#1D8839' }}> {t('phone')}</span>
        {t('call')}
      </Typography>
      <Typography align="center" variant="body1" fontSize={16}>
        {t('knowledgeShare')}{' '}
        <span style={{ color: '#1D8839' }}>{t('hsep')}</span> -{' '}
        {t('yourPathForLearningSuccess')} |
        <span style={{ color: '#1D8839' }}> {t('privacyConditions')} </span>{' '}
      </Typography>
      <Typography align="center" variant="body1" fontSize={16}>
        {t('copyright')} <span style={{ color: '#1D8839' }}> {t('clms')} </span> | 
      </Typography>
    </Box>
  );
};
export default LoginFooter;
