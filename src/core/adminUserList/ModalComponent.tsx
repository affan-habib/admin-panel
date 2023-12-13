import React from 'react';
import { Box, Modal, Typography, IconButton, Avatar, Stack } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
    userData: any;
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
        name,
        type,
        username,
        email,
        mobile_no,
        status,
        // roleName,
    } = userData;
    // console.log(userData);
    const { t } = useTranslation();
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
                    <HighlightOffIcon color="warning" />
                </IconButton>

                <Stack direction="column" alignItems="center" justifyContent="center" mb={2}>
                    <Avatar sx={{ mb: 3, width: 60, height: 60 }}>
                        <PersonIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Box borderBottom="1px solid rgba(179, 224, 221, 1)" width="80%" />
                </Stack>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AccountCircleOutlinedIcon sx={{ color: 'primary.main', marginLeft: '10px' }} />
                    <strong style={{ minWidth: '300px', display: 'inline-block', margin: '0 3px' }}>{t('fullName')}</strong> {name}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BadgeOutlinedIcon sx={{ mr: 1, color: 'primary.main', marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>{t('designation')}</strong> {type}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FormatColorTextOutlinedIcon sx={{ mr: 1, color: 'primary.main', marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>{t('username')}</strong> {username}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MailOutlineOutlinedIcon sx={{ mr: 1, color: 'primary.main', marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}> {t('emailAddress')}</strong> {email}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CallOutlinedIcon sx={{ mr: 1, color: 'primary.main', marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>{t('mobileNumber')}</strong> {mobile_no}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ToggleOnOutlinedIcon sx={{ mr: 1, color: 'primary.main', marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>{t('status')}</strong> {status == 1 ? t('active') : t('disabled')}
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AdminPanelSettingsOutlinedIcon sx={{ mr: 1, color: 'primary.main', marginLeft: '10px' }} /> <strong style={{ minWidth: '300px', display: 'inline-block' }}>{t('roleName')}</strong> {username}
                </Typography>

                <Stack direction="column" alignItems="center" justifyContent="center">
                    <Box borderBottom="1px solid rgba(179, 224, 221, 1)" width="40%" sx={{ my: 3 }} />
                </Stack>
            </Box>
        </Modal>
    );
};

export default ModalComponent;

