import { Suspense, ReactElement } from 'react';
import { styled, Theme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// Define the types for the component and its props
type ComponentType = (props: { someProp: string }) => ReactElement; // Adjust the props type according to your component's props

// loader style
const LoaderWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

// ==============================|| CustomLoader ||============================== //

const CustomLoader = (): JSX.Element => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
  (Component: ComponentType) =>
  (props: { someProp: string }): ReactElement => (
    <Suspense fallback={<CustomLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
