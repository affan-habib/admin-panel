import React from 'react';
import { Box, Modal, Typography, IconButton, Avatar, Stack } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';

interface UserInfo {
    fullName: string;
    designation: string;
    userName: string;
    emailAddress: string;
    mobileNumber: string;
    status: string;
    roleName: string;
}

interface ModalComponentProps {
    open: boolean;
    handleClose: () => void;
    userData: UserInfo;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalComponent: React.FC<ModalComponentProps> = ({ open, handleClose, userData }) => {
    const {
        fullName,
        designation,
        userName,
        emailAddress,
        mobileNumber,
        status,
        roleName,
    } = userData;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
            // sx={{

            //     width: 600,

            // }}
        >
            <Box sx={style}>
                <IconButton
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        borderRadius: '10px',
                    }}
                >
                    <GridCloseIcon />
                </IconButton>

                <Stack direction="row" alignItems="center" justifyContent="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                        <PersonIcon />
                    </Avatar>
                    <Typography variant="h6" component="h2">
                        User Information
                    </Typography>
                </Stack>
                <Typography variant="subtitle1" sx={{ my: 1 }}>
                    <strong>Full Name:</strong> {fullName}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 1 }}>
                    <strong>Designation:</strong> {designation}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 1 }}>
                    <strong>Username:</strong> {userName}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 1 }}>
                    <strong>Email:</strong> {emailAddress}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 1 }}>
                    <strong>Mobile Number:</strong> {mobileNumber}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 1 }}>
                    <strong>Status:</strong> {status}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 1 }}>
                    <strong>Role Name:</strong> {roleName}
                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalComponent;
