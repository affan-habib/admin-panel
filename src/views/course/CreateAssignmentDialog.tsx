import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Button,
    Grid,
    FormControlLabel,
    Checkbox,
    Box,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import InputFile from 'components/form/InputFile';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import RichTextInput from 'components/form/RichTextInput';
import { useSnackbar } from 'context/SnackbarContext';
import VideoUploadBox from 'components/form/VideoUploadBox';
import { useTranslation } from 'react-i18next';
interface CreateAssignmentDialogProps {
    open: boolean;
    moduleId: any;
    onClose: () => void;
}

const CreateAssignmentDialog: React.FC<CreateAssignmentDialogProps> = ({
    open,
    onClose,
    moduleId,
}) => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();

    const handleSubmit = async (values: any) => {
        // Remove the "url" key if the value is a string
        if (typeof values.url === 'string') {
            delete values.url;
        }

        const formPayload = { ...values, _method: 'PUT', type: 'video' };

        try {
            const formData = new FormData();

            Object.keys(formPayload).forEach((key) => {
                formData.append(key, formPayload[key]);
            });

            const response = await axios.post(
                `${apiBaseUrl}/course/material/update/${values.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            showSnackbar(response.data.message, 'success');

            queryClient.invalidateQueries('courseDetails');
            onClose();
            console.log('API Response:', response.data);
        } catch (error: any) {
            showSnackbar(error.response.data.message, 'error');
            console.error('Error submitting form:', error);
        }
    };
    const { t } = useTranslation();
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography color="primary" variant="h6">
                    {t('addAssignment')} (কারবালা প্রান্তর)
                </Typography>
                <IconButton aria-label="close" onClick={onClose} color="error">
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ width: 600 }}>
                <Formik
                    initialValues={moduleId}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    <Form>
                        <Grid>
                        <InputField
                            name="title"
                            label={t('addAssignment')}
                            placeholder={t('assignmentname')}
                            
                        />
                        </Grid>
                       
                        <Grid sx={{marginTop:'20px'}}>
                        <InputField
                            name="title"
                            label="অ্যাসাইনমেন্টের নির্দেশাবলী"
                            placeholder="নির্দেশাবলী লিখুন"

                        />
                        </Grid>
                        
                        <Grid container spacing={2} sx={{ display: 'flex', marginTop:'3px' }}>
                            <Grid item xs={6}>
                                <InputField
                                    name="title"
                                    label="নির্দেশাবলী লিখুন"
                                    placeholder="অ্যাসাইনমেন্টের মার্ক লিখুন..."
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputField
                                    name="title"
                                    label="সময় ইনপুট দিন"
                                    placeholder="২০ মিনিট"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" sx={{ borderBottom: '1px solid grey', marginTop: 1 }}>
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="রিটেন সাবমিশন"
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="আপলোড ফাইল"
                                />
                            </Grid>

                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                {t('submit')}
                            </Button>
                        </Box>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAssignmentDialog;
