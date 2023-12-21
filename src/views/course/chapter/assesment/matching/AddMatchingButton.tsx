import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Modal,
    TextField,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    Stack,
    FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Formik, Form } from 'formik';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MarkInput from 'components/form/MarkInput';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTranslation } from 'react-i18next';
interface Item {
    id: number;
    placeholder: string;
    showInput?: boolean;
}
const AddMatchingButton: React.FC<any> = ({ assessmentId }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [editorHtml, setEditorHtml] = useState('');
    const [items, setItems] = useState<Item[]>([
        {
            id: 1,
            placeholder: 'Email 1',
        },
        {
            id: 2,
            placeholder: 'Email 2',
        },
        {
            id: 3,
            placeholder: 'Email 3',
        },
        {
            id: 4,
            placeholder: 'Email 4',
        },
    ]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (values: any) => {
        console.log('Form Values:', values);
        handleClose();
    };

    const handleChange = (event: any) => {
        setEditorHtml(event.target.value);
    };

    const handleAddMore = () => {
        const newItem = {
            id: items.length + 1,
            placeholder: `Email ${items.length + 1}`,
        };
        setItems((prevItems) => [...prevItems, newItem]);
    };
    const handleAddInput = (itemId: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, showInput: true } : item
            )
        );
    };
    const handleDelete = (itemId: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, showInput: false } : item
            )
        );
    };
    const handleQuillChange = (html: string) => {
        setEditorHtml(html);
      };
    return (
        <>
            <Button
                sx={{ marginLeft: '7px', color: 'black' }}
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                ম্যাচিং
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '70vw', // Adjust the width as needed
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        boxShadow: 24,
                        maxHeight: '100vh',
                        overflowY: 'auto',
                    }}
                >
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '2px solid rgba(208, 208, 208, 1)',
                        }}
                    >
                        <Typography color="primary" variant="h6" p={2}>
                            ম্যাচিং কোয়েশ্চেন যোগ করুন (অধ্যায়ের নাম)
                        </Typography>
                        <IconButton aria-label="close" onClick={handleClose} color="error">
                            <HighlightOffIcon />
                        </IconButton>
                    </Grid>
                    <Formik initialValues={{ option: 'option1' }} onSubmit={handleSubmit}>
                        <Form>
                            <Box display="flex" justifyContent="" gap={8} px={2}>
                                <RadioGroup row aria-label="submissionType" name="submission_type">
                                    <FormControlLabel value="written" control={<Radio />} label={t('manualInput')} />
                                    <FormControlLabel value="upload" control={<Radio />} label={t('bulkUpload')} />
                                </RadioGroup>
                            </Box>
                            <Grid px={2}>
                                <Grid
                                    mt={1}
                                    mb={1}
                                    border="1px dashed rgba(70, 83, 96, 1)"
                                    sx={{ borderRadius: '8px' }}
                                    p={2}
                                >
                                    <Grid
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom sx={{ fontSize: '16px' }}>
                                            {t('instruction')}
                                        </Typography>
                                            <MarkInput name='mark' />
                                      
                                    </Grid>
                                    <Box mb={2} mt={2}>
                                        <ReactQuill
                                            id="editor"
                                            value={editorHtml}
                                            onChange={handleQuillChange}
                                            style={{ height: '100px' }}
                                        />
                                    </Box>

                                    <div style={{ marginTop: '80px', marginBottom: '20px' }}>
                                        <Grid container spacing={2} xs={12} justifyContent="start">
                                            {items.map((item) => (
                                                <Grid item xs={12} md={9} lg={9} key={item.id}>
                                                    <Grid
                                                        container

                                                        sx={{
                                                            border: '1px solid #ccc',
                                                            padding: 2,
                                                            marginBottom: '10px', // Add margin between each form
                                                            width: '100%', // Make it full width
                                                            color: 'rgba(100, 100, 100, 1)',
                                                            borderRadius:'4px'
                                                        }}

                                                        justifyContent="space-between"
                                                    >
                                                        <Grid item xs={12} md={3} lg={3} >
                                                            <FormControl
                                                                fullWidth
                                                                size='small'>
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    bgcolor="gray"
                                                                    justifyContent="space-between"

                                                                >
                                                                    <Typography align="center" sx={{ color: 'white', px: 2, }}>
                                                                        {item.id}
                                                                    </Typography>
                                                                    <input
                                                                        style={{ padding: '10px' }}
                                                                        placeholder={`${t('alternativematch')} : ${item.id}`}
                                                                    />
                                                                </Stack>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} md={4} lg={4} display='flex' alignItems='center' >
                                                            <CheckBoxIcon />
                                                            <FormControl
                                                                fullWidth
                                                                size='small'>
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    bgcolor="gray"
                                                                    justifyContent="space-between"

                                                                >
                                                                    <Typography align="center" sx={{ color: 'white', px: 2, }}>
                                                                        {item.id}
                                                                    </Typography>
                                                                    <input
                                                                        style={{ padding: '10px' }}
                                                                        placeholder={`${t('answer')} : ${item.id}`}
                                                                    />
                                                                </Stack>
                                                            </FormControl>
                                                        </Grid>
                                                        {item.showInput ? (
                                                            <Grid item xs={12} md={3} lg={3} display='flex'>
                                                                <FormControl

                                                                >
                                                                <Stack
                                                                    direction="row"
                                                                    alignItems="center"
                                                                    bgcolor="gray"
                                                                    justifyContent="space-between"
                                                                    

                                                                >
                                                                    <Typography align="center" sx={{ color: 'white', px: 2, }}>
                                                                        {item.id}
                                                                    </Typography>
                                                                    <input
                                                                        style={{ padding: '10px', width:'120px' }}
                                                                        placeholder={t('wronganswertwo')}
                                                                    />
                                                                </Stack>
                                                            </FormControl>
                                                                <IconButton
                                                                    onClick={() => handleDelete(item.id)}
                                                                    
                                                                    aria-label="delete"
                                                                >
                                                                    <DeleteOutlineIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        ) : (
                                                            <Grid item xs={12} md={3} lg={3}>
                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{
                                                                        fontWeight: '400', color: 'rgba(100, 100, 100, 1)',
                                                                        borderColor: 'rgba(100, 100, 100, 1)', // Specify your custom color here
                                                                        '&:hover': {
                                                                            borderColor: 'rgba(100, 100, 100, 1)', // Specify your custom hover color here
                                                                        },
                                                                    }}
                                                                    fullWidth
                                                                    onClick={() => handleAddInput(item.id)}
                                                                >
                                                                    <AddCircleOutlinedIcon sx={{ fontWeight: '400' }} />
                                                                    <span style={{ marginLeft: '3px', fontSize:'12px' }}>{t('wronganswer')}</span>
                                                                </Button>
                                                            </Grid>
                                                        )}

                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                    <Grid
                                        container
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                        spacing={2}
                                        mt={1}
                                    >
                                        <Grid item>
                                            <Button variant="contained" onClick={handleAddMore}>
                                                <AddCircleOutlineOutlinedIcon />
                                                <span style={{ marginLeft: '3px' }}>{t('addMore')}</span>
                                            </Button>
                                        </Grid>
                                        <Grid item sx={{ display: 'flex', gap: 2 }}>
                                            <Button variant="contained">{t('submit')}</Button>

                                            <Button variant="outlined">{t('saveAdd')}</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    );
};

export default AddMatchingButton;
