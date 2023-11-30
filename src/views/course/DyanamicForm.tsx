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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Delete, Edit, VideoFile } from '@mui/icons-material';

import ChapterForm from './ChapterForm';
import VideoForm from './VideoForm';

const validationSchemaChapter = Yup.object().shape({
  chapterName: Yup.string().required('Chapter name is required'),
  chapterCode: Yup.string().required('Chapter code is required'),
});

const MyForm: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<
    number | null
  >(null);
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  );
  const handleSubmit = () => {
    console.log('Form Values:', formik.values);
  };
  const formik = useFormik({
    initialValues: {
      chapters: [],
    },
    validationSchema: validationSchemaChapter,
    onSubmit: (values) => {
      setModalOpen(false);
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

  const handleEditVideo = (chapterIndex: number, videoIndex: number) => {
    setSelectedChapterIndex(chapterIndex);
    setSelectedVideoIndex(videoIndex);
    setVideoModalOpen(true);
  };

  const handleVideoModalClose = () => {
    setVideoModalOpen(false);
    setSelectedChapterIndex(null);
    setSelectedVideoIndex(null);
  };

  const handleRemoveVideo = (chapterIndex: number, videoIndex: number) => {
    const updatedChapters = [...formik.values.chapters];
    updatedChapters[chapterIndex].videos.splice(videoIndex, 1);
    formik.setValues({
      ...formik.values,
      chapters: updatedChapters,
    });
  };

  return (
    <>
      {formik.values.chapters.map((chapter, chapterIndex) => (
        <Accordion key={chapterIndex}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{chapter.chapterName}</Typography>
            <IconButton
              onClick={() => handleRemoveChapter(chapterIndex)}
              style={{ marginLeft: 'auto' }}
            >
              <Delete />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: '10px' }}
            >
              Add Assessment
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleAddVideo(chapterIndex)}
            >
              Add Video
            </Button>
            {chapter.videos &&
              chapter.videos.map((video, videoIndex) => (
                <div key={videoIndex} style={{ marginTop: '10px' }}>
                  <Typography>
                    <VideoFile />: {video.videoTitle}
                    <IconButton
                      onClick={() =>
                        handleRemoveVideo(chapterIndex, videoIndex)
                      }
                      style={{ marginLeft: '10px' }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditVideo(chapterIndex, videoIndex)}
                      style={{ marginLeft: '10px' }}
                    >
                      <Edit />
                    </IconButton>
                  </Typography>
                </div>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Button
        type="button"
        variant="outlined"
        color="primary"
        onClick={handleAddChapter}
      >
        Add Chapter
      </Button>

      <Dialog open={isModalOpen || isVideoModalOpen} onClose={handleModalClose}>
        {isModalOpen && (
          <ChapterForm
            onSubmit={(values) => {
              formik.setValues({
                ...formik.values,
                chapters: [
                  ...formik.values.chapters,
                  { ...values, videos: [] },
                ],
              });
            }}
            onClose={handleModalClose}
          />
        )}

        {isVideoModalOpen && (
          <VideoForm
            onClose={handleVideoModalClose}
            onSubmit={(values) => {
              if (
                selectedChapterIndex !== null &&
                selectedVideoIndex !== null
              ) {
                formik.values.chapters[selectedChapterIndex].videos[
                  selectedVideoIndex
                ] = values;
                formik.setValues({
                  ...formik.values,
                  chapters: formik.values.chapters,
                });
              } else if (selectedChapterIndex !== null) {
                formik.values.chapters[selectedChapterIndex].videos = formik
                  .values.chapters[selectedChapterIndex].videos
                  ? [
                      ...formik.values.chapters[selectedChapterIndex].videos,
                      { ...values },
                    ]
                  : [{ ...values }];
                formik.setValues({
                  ...formik.values,
                  chapters: formik.values.chapters,
                });
              }
              handleVideoModalClose();
            }}
            initialValues={
              selectedChapterIndex !== null && selectedVideoIndex !== null
                ? formik.values.chapters[selectedChapterIndex].videos[
                    selectedVideoIndex
                  ]
                : undefined
            }
          />
        )}
      </Dialog>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>
    </>
  );
};

export default MyForm;
