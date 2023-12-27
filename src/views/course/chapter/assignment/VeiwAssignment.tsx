import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Grid,
    InputLabel,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { Form, Formik } from 'formik';
import InputField from 'components/form/InputField';
import axios from 'axios';
import InputFile from 'components/form/InputFile';
import { apiBaseUrl } from 'config';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'context/SnackbarContext';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
interface ViewAssignmentProps {
    open: boolean;
    initialData: any;
    onClose: () => void;
    name: any;

}

const VeiwAssignment: React.FC<ViewAssignmentProps> = ({
    open,
    initialData,
    onClose,
    name
}) => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    console.log(initialData);
    const handleSubmit = async (values: any) => {
        // Remove the "url" key if the value is a string
        if (typeof values.supporting_doc === 'string') {
            delete values.supporting_doc;
        }

        const formPayload = { ...values, _method: 'PUT', type: 'video' };

        try {
            const formData = new FormData();

            Object.keys(formPayload).forEach((key) => {
                formData.append(key, formPayload[key]);
            });

            const response = await axios.post(
                `${apiBaseUrl}/course/assignment/update/${values.id}`,
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
        } catch (error: any) {
            showSnackbar(error.response.data.message, 'error');
            console.error('Error submitting form:', error);
        }
    };

    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle

            >
                <Grid sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography color="primary" variant="h6">
                        {t('assignmentView')} ({name})
                    </Typography>
                    <IconButton aria-label="close" onClick={onClose} color="error">
                        <HighlightOffIcon />
                    </IconButton>
                </Grid>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    {t('time')} <FiberManualRecordIcon sx={{ fontSize: '10px', margin: '8px', color: 'rgba(100, 100, 100, 1)' }} /> {initialData.total_time} {t('minute')}
                </Typography>

            </DialogTitle>
            <DialogContent sx={{ width: 600 }}>
                <Formik
                    initialValues={initialData}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <fieldset disabled={true} style={{ border: 'none', padding: 0, margin: 0 }}>
                            <Form>
                                <Grid>
                                    <Typography sx={{ fontSize: '20px', fontWeight: '600', marginTop: '10px' }}>
                                        {initialData.title_en}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <InputField
                                        name="supporting_doc"
                                        label={t('instruction')}
                                        value={
                                            typeof values.supporting_doc === 'string'
                                                ? (() => {
                                                    console.log('Original value:', values.supporting_doc);
                                                    const splitArray = values.supporting_doc.split('-');
                                                    console.log('Split array:', splitArray);
                                                    return splitArray.pop();
                                                })()
                                                : values.supporting_doc
                                        }
                                    />
                                </Grid>
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{ display: 'flex', marginTop: '3px' }}
                                >

                                    <Grid item xs={6}>
                                        <InputField
                                            name="mark"
                                            label={t('totalMarks')}
                                            placeholder={t('assignMarkPlace')}
                                            type="number"
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputField
                                            name="pass_mark"
                                            label={t('passmark')}
                                            placeholder={t('assignmentpassMarkPlace')}
                                            type="number"
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputField
                                            name="total_time"
                                            label={t('totaltime')}
                                            placeholder={t('assignDutrationPlace')}
                                            type="number"
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Grid item sx={{ marginBottom: '20px' }}>
                                        <InputLabel
                                            sx={{
                                                minWidth: 200,
                                                color: 'black',
                                                my: 1,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {t('assignSubmissionType')}
                                        </InputLabel>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={values.submission_type === 'written'}
                                                    onChange={() =>
                                                        setFieldValue('submission_type', 'written')
                                                    }
                                                    name="writtenSubmission"
                                                />
                                            }
                                            label={t('assignCheckboxOne')}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={values.submission_type === 'upload'}
                                                    onChange={() =>
                                                        setFieldValue('submission_type', 'upload')
                                                    }
                                                    name="uploadFile"
                                                />
                                            }
                                            label={t('assignCheckboxTwo')}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                        </fieldset>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default VeiwAssignment;
