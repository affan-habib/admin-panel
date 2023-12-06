import React from 'react';
import { Box, Modal, Typography, IconButton, Avatar, Stack } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
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
    height: 600,
    width: 650,
    bgcolor: 'rgba(246, 253, 252, 1)',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
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

    // console.log(userData);
    return (
        <Modal
            open={open}
            onClose={handleClose}
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

                <Stack direction="column" alignItems="center" justifyContent="center" mb={2}>
                    <Avatar sx={{ mb: 3, width: 60, height: 60 }}> 
                        <PersonIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Box borderBottom="1px solid rgba(179, 224, 221, 1)" width="80%" />
                </Stack>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AccountCircleOutlinedIcon sx={{ color: 'primary.main',marginLeft: '10px' }} />
                    <strong style={{ minWidth: '300px', display: 'inline-block', margin: '0 8px' }}>ব্যবহারকারীর সম্পূর্ন নাম:</strong> {fullName}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BadgeOutlinedIcon sx={{ mr: 1, color: 'primary.main',marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>পদবি:</strong> {designation}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FormatColorTextOutlinedIcon sx={{ mr: 1, color: 'primary.main',marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>ইউজার নেম:</strong> {userName}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MailOutlineOutlinedIcon sx={{ mr: 1, color: 'primary.main',marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}> ইমেল এড্রেস:</strong> {emailAddress}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CallOutlinedIcon sx={{ mr: 1, color: 'primary.main',marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>মোবাইল নাম্বার:</strong> {mobileNumber}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ToggleOnOutlinedIcon sx={{ mr: 1, color: 'primary.main',marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>স্ট্যাটাস:</strong> {status}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AdminPanelSettingsOutlinedIcon sx={{ mr: 1, color: 'primary.main',marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>রোল নেম:</strong> {roleName}
                </Typography>

                <Stack direction="column" alignItems="center" justifyContent="center">
                    <Box borderBottom="1px solid rgba(179, 224, 221, 1)" width="40%" sx={{ my: 3 }} />
                </Stack>
            </Box>
        </Modal>
    );
};

export default ModalComponent;

