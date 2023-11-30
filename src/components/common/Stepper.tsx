// components/Stepper.tsx
import React, { ReactNode, useState } from 'react';
import { Box, Button, Paper, Tab, Tabs } from '@mui/material';

interface StepProps {
  children: ReactNode;
  title: string;
}

export const Step: React.FC<StepProps> = ({ children }) => <>{children}</>;

interface StepperProps {
  children: ReactNode;
  submitDisabled?: boolean;
}

const Stepper: React.FC<StepperProps> = ({ children, submitDisabled }) => {
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[];
  const [currentStep, setCurrentStep] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentStep(newValue);
  };

  return (
    <Paper sx={{ minHeight: 500, display: 'flex', flexDirection: 'column', background: "#F5F5F7", border: 1, borderColor: "#D0D0D0", borderRadius: '10px' }}>

      <Tabs
        value={currentStep}
        onChange={handleTabChange}
        textColor="primary"
        variant="fullWidth"
      >
        {steps.map((step, index) => (
          <Tab
            disableRipple
            key={index}
            label={step.props.title}
            style={{
              backgroundColor: currentStep === index ? '#006A4E' : 'white',
              color: currentStep === index ? 'white' : 'black',
              flex: 1,
              minWidth: 0,
              borderTopLeftRadius: index === 0 ? 10 : 0,
              borderTopRightRadius: index === steps.length - 1 ? 10 : 0,
              borderColor: '#D0D0D0',
              borderWidth: 1, // You can adjust the border width as needed
              borderStyle: 'solid', // Set the border style to solid
            }}
          />
        ))}
      </Tabs>



      <Box m={4} mx='auto'>{steps[currentStep]}


        <Box mt={5}>
          {currentStep > 0 && (
            <Button
              variant="contained"
              type="button"
              sx={{ mr: 2 }}
              onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
            >
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button
              variant="contained"
              color='secondary'
              type="button"
              onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
            >
              Next
            </Button>
          )}
          {currentStep == steps.length - 1 && (
            <Button
              variant="contained"
              color='secondary'
              type='submit'
              disabled={submitDisabled}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default Stepper;
