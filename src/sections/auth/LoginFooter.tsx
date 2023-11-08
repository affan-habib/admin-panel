
import { Paper, Typography} from '@mui/material';

const LoginFooter: React.FC = () => {
  return (
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4">Some Text at the Bottom</Typography>
            <Typography>
              This is the text you want to display in the bottom section.
            </Typography>
          </Paper>   
  );
};
export default LoginFooter;
