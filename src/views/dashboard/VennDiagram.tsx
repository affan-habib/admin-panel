// import React from 'react';
// import Box from '@mui/material/Box';
// import Group26 from '../../assets/Group26.svg';
// import { Typography } from '@mui/material';

// const VennDiagram = () => {
//   return (
//     <Box
//       height={315}
//       width={490}
//       sx={{
//         backgroundColor: 'rgba(237, 244, 242, 1)',
//         borderRadius: '10px',
//         mt: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Box sx={{ mb: 2 }}>
//         <Typography style={{color:'rgba(21, 83, 19, 1)'}}>উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের ভেন</Typography>
//       </Box>
//       <Box
//       width={400}
//       height={200}
//         sx={{
//           backgroundColor: 'rgba(254, 254, 254, 1)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <img src={Group26} alt=""
//         //  style={{padding:'40px'}}
//           />
//       </Box>
//     </Box>
//   );
// };

// export default VennDiagram;



import React from 'react';
import Box from '@mui/material/Box';
import Group26 from '../../assets/Group26.svg';
import { Typography, useTheme } from '@mui/material';

const VennDiagram = () => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');

  return (
    <Box
      height={315}
      width={isMobile ? '100%' : 490}
      sx={{
        backgroundColor: 'rgba(237, 244, 242, 1)',
        borderRadius: '10px',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography style={{ color: 'rgba(21, 83, 19, 1)' }}>উচ্চ মাধ্যমিক শিক্ষক প্রশিক্ষণ ইনস্টিটিউটের ভেন</Typography>
      </Box>
      <Box
        width={isMobile ? '80%' : 400}
        height={200}
        sx={{
          backgroundColor: 'rgba(254, 254, 254, 1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={Group26} alt=""  />
      </Box>
    </Box>
  );
};

export default VennDiagram;



