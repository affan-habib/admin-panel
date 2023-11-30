// CreateChapter.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog, Box } from '@mui/material';
import ChapterForm from './ChapterForm';
import VideoForm from './VideoForm';
import AccordionItem from './AccordionItem';

interface Video {
  videoName: string;
  videoUrl: string;
}

interface Chapter {
  chapterName: string;
  chapterCode: string;
  video?: Video;
}

const validationSchemaChapter = Yup.object().shape({
  chapterName: Yup.string().required('Chapter name is required'),
  chapterCode: Yup.string().required('Chapter code is required'),
});

const CreateChapter: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);

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
    <Box maxWidth={900}>
      {formik.values.chapters.map((chapter, chapterIndex) => (
        <AccordionItem
          key={chapterIndex}
          chapter={chapter}
          onRemoveChapter={() => handleRemoveChapter(chapterIndex)}
          onAddVideo={() => handleAddVideo(chapterIndex)}
          onEditVideo={() => handleEditVideo(chapterIndex)}
          onRemoveVideo={() => handleRemoveVideo(chapterIndex)}
        />
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
          <VideoForm
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
          />
        )}
      </Dialog>
    </Box>
  );
};

export default CreateChapter;
