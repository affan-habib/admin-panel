import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, InputLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../config';
import { useParams } from 'react-router-dom';
import useAdminUserDetails from 'hooks/useAdminUserDetails';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

const EditAdminUser: React.FC = () => {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const { t } = useTranslation();
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    const { id } = useParams<{ id: string }>();
    const { data } = useAdminUserDetails(id);
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        console.log(values);
        const token = localStorage.getItem('token');

        try {
            // Use axios.put to send a PUT request with the updated values and ID in the URL
            const response = await axios.put(`${apiBaseUrl}/admins/${id}`, { ...values, belongs_hstti: values.belongs_hstti ? 1 : 0 }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            navigate("/admin-user-list");
        } catch (error: any) {
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message || 'An error occurred');
            setSnackbarOpen(true);
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div>
            <Container maxWidth="xl" style={{ marginTop: '20px' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'rgba(0, 106, 78, 1)' }}>
                            {t('editUser')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ border: '1px solid rgba(180, 180, 180, 1)', borderRadius: '8px', p: 2 }}>
                        {data && (
                            <Formik
                                enableReinitialize
                                initialValues={data?.data}
                                onSubmit={handleSubmit}
                            >
                                <Form
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="textField">{t('fullUserName')}</InputLabel>
                                            <Field
                                                name="name"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="dropdown">{t('designation')}</InputLabel>
                                            <Field
                                                name="type"
                                                as={TextField}
                                                select
                                                fullWidth
                                                size="small"
                                                label="সিলেক্ট করুন"
                                            // Set an empty default value
                                            >

                                                <MenuItem value="hsttiadmin">Hstti admin</MenuItem>
                                                <MenuItem value="trainer">Trainer</MenuItem>

                                            </Field>
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="name">{t('userName')}</InputLabel>
                                            <Field
                                                name="username"
                                                type="name"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="email">{t('email')}</InputLabel>
                                            <Field
                                                name="email"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="number">{t('mobileNo')}</InputLabel>
                                            <Field
                                                name="mobile_no"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="dropdown">{t('status')}</InputLabel>
                                            <Field
                                                name="status"
                                                as={TextField}
                                                select
                                                fullWidth
                                                size="small"
                                                label="সিলেক্ট করুন"
                                            // Set an empty default value
                                            >

                                                <MenuItem value="1">Active</MenuItem>
                                                <MenuItem value="0">Inactive</MenuItem>

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="dropdown">{t('userRoleName')}</InputLabel>
                                            <Field
                                                name="role"
                                                as={TextField}
                                                select
                                                fullWidth
                                                size="small"
                                                label="সিলেক্ট করুন"
                                                disabled={true}
                                            // Set an empty default value
                                            >

                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="trainer">Trainer</MenuItem>
                                                <MenuItem value="trainee">trainee</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="password">{t('password')}</InputLabel>
                                            <Field
                                                name="password"
                                                type="password"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="file">{t('uploadImage')}</InputLabel>
                                            <Field
                                                name="file"
                                                type="file"
                                                as={TextField} // Use TextField for consistent styling
                                                fullWidth
                                                size="small"
                                                InputLabelProps={{ shrink: true }} // Keep the label from floating to the top
                                            />
                                        </Grid>
                                    </Grid>

                                    <Button
                                        type="submit"
                                        aria-label="toggle-status"
                                        size="small"
                                        variant='contained'
                                        style={{
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            width: '250px',
                                            height: '40px',
                                            display: 'inline-flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {t('submit')}
                                    </Button>

                                </Form>
                            </Formik>
                        )}
                    </Grid>
                </Grid>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </div>



    );

};

export default EditAdminUser;