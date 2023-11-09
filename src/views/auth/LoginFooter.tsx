import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LoginFooter: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box style={{ padding: '20px' }}>
      <Typography align="center" variant="body1">
        {t('howCanIHelpYou')}{' '}
        <span style={{ color: '#1D8839' }}>{t('fastStartGuide')}</span>
        {t('forMoreHelp')}{' '}
        <span style={{ color: '#1D8839' }}> {t('phone')}</span>
        {t('call')}
      </Typography>
      <Typography align="center" variant="body1">
        {t('knowledgeShare')}{' '}
        <span style={{ color: '#1D8839' }}>{t('hsep')}</span> -{' '}
        {t('yourPathForLearningSuccess')}
      </Typography>
      <Typography align="center" variant="body1">
        {t('copyright')} <span style={{ color: '#1D8839' }}>{t('clms')}</span> |
        {t('allRightResereved')}{' '}
        <span style={{ color: '#1D8839' }}>{t('privacyConditions')}</span>{' '}
      </Typography>
    </Box>
  );
};
export default LoginFooter;
