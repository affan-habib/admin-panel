import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CurriculumTopics = () => {
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [selectedContent, setSelectedContent] = React.useState<{ [key: string]: string[] }>({
        panel1: [],
        panel2: [],
    });

    const handleChange = (panel: string) => (
        event: React.SyntheticEvent,
        isExpanded: boolean
    ) => {
        setExpanded((prevExpanded) =>
            isExpanded
                ? [...prevExpanded, panel]
                : prevExpanded.filter((expandedPanel) => expandedPanel !== panel)
        );
    };

    //   const handleCheckboxChange = (panel: string, content: string) => {
    //     const newSelected = selectedContent[panel].includes(content)
    //       ? selectedContent[panel].filter((item) => item !== content)
    //       : [...selectedContent[panel], content];

    //     setSelectedContent({
    //       ...selectedContent,
    //       [panel]: newSelected,
    //     });
    //   };

    const handleCheckboxChange = (panel: string, content: string) => {
        const currentPanelContent = selectedContent[panel] || [];

        const newSelected = currentPanelContent.includes(content)
            ? currentPanelContent.filter((item) => item !== content)
            : [...currentPanelContent, content];

        setSelectedContent({
            ...selectedContent,
            [panel]: newSelected,
        });
    };

    const accordionData = [
        {
            id: 1,
            heading: 'সপ্তাহ ১ : শিক্ষা নীতি ও শিক্ষায় ব্যাবস্থাপনা',
            contents: [
                'সংক্ষিপ্ত পরিচিতি',
                'শিক্ষার ঐতিহ্যগত ধারণা - অনলাইন সেশন',
                'মূল্যায়ন - কি পরিবর্তন হয়েছে তার প্রতিফলন',
                'আলোচনা ক্ষেত্র'
            ],
        },
        {
            id: 2,
            heading: 'সপ্তাহ ২ : একাধিক প্রশ্নে প্রতিষ্ঠানের মান ও মানুষ',
            contents: [
                'মূল্যনির্ধারণের বৈশিষ্ট্য',
                'সামগ্রিক মূল্যায়ন',
                'পুনরায় নির্ধারিত করা',
                'আপেক্ষিকতা বিশ্লেষণ ও উৎপাদন'
            ],
        },
        {
            id: 3,
            heading: 'সপ্তাহ ৩ : সমাধানাধিকার ও স্বাধীনতার বৈশিষ্ট্য',
            contents: [
                'সমাধানাধিকার বিশ্লেষণ',
                'স্বাধীনতার বৈশিষ্ট্য',
                'সমাধানাধিকারের পুনঃপ্রতিষ্ঠাপন',
                'মূল্যায়নের প্রক্রিয়া ও পরিণতি'
            ],
        },
        {
            id: 4,
            heading: 'সপ্তাহ ৪ : নীতি এবং পরিকল্পনার প্রতিফলন',
            contents: [
                'নীতি পরিকল্পনার বৈশিষ্ট্য',
                'নীতি পরিকল্পনার পরিকল্পনা',
                'প্রতিষ্ঠানের সাধারণ সুচি এবং পরিপ্রেক্ষিত নীতি',
                'প্রশাসনিক বাধা এবং পরিকল্পনার সমাধান'
            ],
        },
        {
            id: 5,
            heading: 'সপ্তাহ ৫ : সংস্থানিক পরিকল্পনা ও নীতি',
            contents: [
                'সংস্থানিক পরিকল্পনার প্রধান প্রক্রিয়া',
                'পরিকল্পনার বিশ্লেষণ',
                'পরিকল্পনার প্রশাসনিক ব্যবস্থা',
                'পরিকল্পনার সংগঠনা এবং নির্বাচন'
            ],
        },
        {
            id: 6,
            heading: 'সপ্তাহ ৬ : প্রশিক্ষণ এবং সরকারী নীতি',
            contents: [
                'শিক্ষা ব্যাবস্থা এবং সরকারী নীতি',
                'প্রশিক্ষণের বিশ্লেষণ',
                'শিক্ষার্থীদের মূল্যায়ন',
                'শিক্ষার্থীদের পরিষেবা এবং বিকাশ'
            ],
        },
        {
            id: 7,
            heading: 'সপ্তাহ ৭ : পর্যবেক্ষণ, মূল্যায়ন এবং প্রতিবেদন',
            contents: [
                'পর্যবেক্ষণ প্রক্রিয়া',
                'মূল্যায়নের প্রক্রিয়া',
                'প্রতিবেদনের নমুনা এবং প্রশ্ন পত্র',
                'বিশ্লেষণ এবং প্রতিক্রিয়া'
            ],
        },
    ];

    return (
        <div>
            {accordionData.map((item) => (
                <Accordion
                    key={item.id}
                    expanded={expanded.includes(`panel${item.id}`)}
                    onChange={handleChange(`panel${item.id}`)}
                >
                    <AccordionSummary
                        expandIcon={
                            expanded.includes(`panel${item.id}`) ? <RemoveIcon /> : <AddIcon />
                        }
                        aria-controls={`panel${item.id}a-content`}
                        id={`panel${item.id}a-header`}
                    >
                        <Typography>{item.heading}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'block' }}>
                        <div>
                            {item.contents.map((content, index) => (
                                <FormControlLabel
                                    key={`${item.id}-content-${index}`}
                                    control={
                                        // <Checkbox
                                        //   checked={selectedContent[`panel${item.id}`].includes(content)}
                                        //   onChange={() => handleCheckboxChange(`panel${item.id}`, content)}
                                        // />
                                        <Checkbox
                                            checked={(selectedContent[`panel${item.id}`] || []).includes(content)}
                                            onChange={() => handleCheckboxChange(`panel${item.id}`, content)}
                                        />

                                    }
                                    label={content}
                                    style={{ display: 'block' }}
                                />
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default CurriculumTopics;
