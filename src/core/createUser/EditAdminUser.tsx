import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Grid, Typography, InputLabel } from '@mui/material';
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
import { useSnackbar } from 'context/SnackbarContext';

const EditAdminUser: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { showSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    const { id } = useParams<{ id: string }>();
    const { data } = useAdminUserDetails(id);
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        delete values.roles;
        console.log(values);
        const token = localStorage.getItem('token');

        try {
            // Use axios.put to send a PUT request with the updated values and ID in the URL
            const response = await axios.put(`${apiBaseUrl}/admins/${id}`, { ...values, belongs_hstti: values.belongs_hstti ? 1 : 0, role: "super-admin" }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showSnackbar(response.data.message, 'success');
            navigate("/admin-user-list");
            setLoading(false);
        } catch (error: any) {
            showSnackbar(error.response.data.message, 'error');
            setLoading(false);
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
                                            <InputLabel htmlFor="textField" style={{ marginBottom: '7px' }}>{t('fullUserName')}</InputLabel>
                                            <Field
                                                name="name"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="dropdown" style={{ marginBottom: '7px' }}>{t('designation')}</InputLabel>
                                            <Field
                                                name="type"
                                                as={TextField}
                                                select
                                                fullWidth
                                                size="small"
                                                //label="সিলেক্ট করুন"
                                                // label={t('SelectThis')}
                                            // Set an empty default value
                                            >

                                                <MenuItem value="superadmin">Super admin</MenuItem>
                                                <MenuItem value="reportadmin">Report admin</MenuItem>
                                                <MenuItem value="dsheadmin">DSHE admin</MenuItem>
                                                <MenuItem value="hsttiadmin">Hstti admin</MenuItem>
                                                <MenuItem value="contentadmin">Content admin</MenuItem>
                                                <MenuItem value="batchcoordinator">Batch Coordinator</MenuItem>

                                            </Field>
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="name" style={{ marginBottom: '7px' }}>{t('userName')}</InputLabel>
                                            <Field
                                                name="username"
                                                type="name"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="email" style={{ marginBottom: '7px' }}> {t('email')}</InputLabel>
                                            <Field
                                                name="email"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="number" style={{ marginBottom: '7px' }}>{t('mobileNo')}</InputLabel>
                                            <Field
                                                name="mobile_no"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="dropdown" style={{ marginBottom: '7px' }}>{t('status')}</InputLabel>
                                            <Field
                                                name="status"
                                                as={TextField}
                                                select
                                                fullWidth
                                                size="small"
                                                //label="সিলেক্ট করুন"
                                                // label={t('SelectThis')}
                                            // Set an empty default value
                                            >

                                                <MenuItem value="1">Active</MenuItem>
                                                <MenuItem value="0">Inactive</MenuItem>

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="dropdown" style={{ marginBottom: '7px' }}>{t('userRoleName')}</InputLabel>
                                            <Field
                                                name="role"
                                                as={TextField}
                                                select
                                                fullWidth
                                                size="small"
                                                //label="সিলেক্ট করুন"
                                                // label={t('SelectThis')}
                                                disabled={true}
                                            // Set an empty default value
                                            >

                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="trainer">Trainer</MenuItem>
                                                <MenuItem value="trainee">trainee</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="password" style={{ marginBottom: '7px' }}>{t('password')}</InputLabel>
                                            <Field
                                                name="password"
                                                type="password"
                                                as={TextField}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <InputLabel htmlFor="file" style={{ marginBottom: '7px' }}>{t('uploadImage')} - {t('profileImageLimit')}</InputLabel>
                                            <Field
                                                name="file"
                                                type="file"
                                                as={TextField} // Use TextField for consistent styling
                                                fullWidth
                                                size="small"
                                                InputLabelProps={{ shrink: true }} // Keep the label from floating to the top
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            style={{ textAlign: 'right' }}
                                            alignItems="center"
                                            justifyContent="right"
                                            display="flex"
                                        >
                                            {loading ? (
                                                // Show the loader if loading
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    aria-label="toggle-status"
                                                    size="small"
                                                    variant='contained'
                                                    style={{
                                                        backgroundColor: 'primary.main',
                                                        color: '#FAFAFA',
                                                        width: '249px',
                                                        height: '40px',
                                                        display: 'inline-flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        fontFamily: 'Roboto',
                                                        marginTop: '14px',
                                                    }}
                                                >
                                                    {t('submit')}
                                                </Button>
                                            )}
                                        </Grid>                                
                                    </Grid>

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