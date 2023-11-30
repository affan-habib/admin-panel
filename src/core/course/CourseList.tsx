// MyForm.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Button,
  Dialog,
  TextField,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete, Edit, VideoFile } from '@mui/icons-material';
import ChapterForm from './ChapterForm';

interface Video {
  videoName: string;
  videoUrl: string;
}

interface Chapter {
  chapterName: string;
  chapterCode: string;
  video?: any;
}

const validationSchemaChapter = Yup.object().shape({
  chapterName: Yup.string().required('Chapter name is required'),
  chapterCode: Yup.string().required('Chapter code is required'),
});

const MyForm: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(
    null
  );
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );

  const formik = useFormik({
    initialValues: {
      chapters: [{


        chapterCode: "dddd",
        chapterName: "sfaefae"
      }] as Chapter[],
    },
    validationSchema: validationSchemaChapter,
    onSubmit: (values) => {
      setModalOpen(false);
      console.log('Form Values:', values);
    },
  });

  const handleAddChapter = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedChapterIndex(null);
  };

  const handleRemoveChapter = (index: number) => {
    const updatedChapters = [...formik.values.chapters];
    updatedChapters.splice(index, 1);
    formik.setValues({
      ...formik.values,
      chapters: updatedChapters,
    });
  };

  const handleAddVideo = (index: number) => {
    setSelectedChapterIndex(index);
    setVideoModalOpen(true);
  };

  const handleEditVideo = (chapterIndex: number) => {
    setSelectedChapterIndex(chapterIndex);
    setVideoModalOpen(true);
  };

  const handleVideoModalClose = () => {
    setVideoModalOpen(false);
    setSelectedChapterIndex(null);
    setSelectedVideoIndex(null);
  };

  const handleRemoveVideo = (chapterIndex: number) => {
    const updatedChapters = [...formik.values.chapters];
    updatedChapters[chapterIndex].video = undefined;
    formik.setValues({
      ...formik.values,
      chapters: updatedChapters,
    });
  };

  return (
    <Box maxWidth={500}>
      {formik.values.chapters.map((chapter, chapterIndex) => (
        <Accordion key={chapterIndex} disableGutters defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: 50 }} >
            <Typography variant='h5' alignSelf='center'>{chapter.chapterName}</Typography>
            <IconButton
              onClick={() => handleRemoveChapter(chapterIndex)}
              style={{ marginLeft: 'auto' }}
            >
              <Delete />
            </IconButton>
          </AccordionSummary>
          <Box p={2} border={1} borderColor='lightgrey'>
            <Button
              size='small'
              variant="outlined"
              color="primary"
              onClick={() => handleAddVideo(chapterIndex)}
            >
              {chapter.video ? 'Edit Video' : 'Add Video'}
            </Button>
            {chapter.video && (
              <div style={{ marginTop: '10px' }}>
                <Typography>
                  <VideoFile />: {chapter.video.videoName}
                  <IconButton
                    onClick={() => handleRemoveVideo(chapterIndex)}
                    style={{ marginLeft: '10px' }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEditVideo(chapterIndex)}
                    style={{ marginLeft: '10px' }}
                  >
                    <Edit />
                  </IconButton>
                </Typography>
              </div>
            )}
          </Box>
        </Accordion>
      ))}

      <Button
        size='small'
        type="button"
        variant="contained"
        color="primary"
        sx={{ m: 2 }}
        onClick={handleAddChapter}
      >
        Add New Chapter
      </Button>

      <Dialog open={isModalOpen || isVideoModalOpen} onClose={handleModalClose}>
        {isModalOpen && (
          <ChapterForm
            onSubmit={(values) => {
              formik.setValues({
                ...formik.values,
                chapters: [
                  ...formik.values.chapters,
                  { ...values, video: undefined },
                ],
              });
            }}
            onClose={handleModalClose}
          />
        )}

        {isVideoModalOpen && (
          <ChapterForm
            onSubmit={(values) => {
              if (selectedChapterIndex !== null) {
                formik.values.chapters[selectedChapterIndex].video = values;
                formik.setValues({
                  ...formik.values,
                  chapters: formik.values.chapters,
                });
              }
              handleVideoModalClose();
            }}
            initialValues={
              selectedChapterIndex !== null
                ? formik.values.chapters[selectedChapterIndex].video
                : undefined
            }
            onClose={handleVideoModalClose}
            isVideoForm
          />
        )}
      </Dialog>
    </Box>
  );
};

export default MyForm;
