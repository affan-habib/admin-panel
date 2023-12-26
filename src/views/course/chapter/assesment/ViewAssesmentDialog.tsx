import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
interface ViewAssesmentDialogProps {
  open: boolean;
  initialData: any;
  onClose: () => void;
}

const ViewAssesmentDialog: React.FC<ViewAssesmentDialogProps> = ({
  open,
  initialData,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography color="primary" variant="h6">
          এসেসমেন্ট : কারবালা প্রান্তরের উপর সম্মিলিত প্রশ্নপত্র
        </Typography>
        <IconButton aria-label="close" onClick={onClose} color="error">
          <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6" mb={2}>
                <strong>Question: 1</strong> Select your preferences:
              </Typography>

              <FormControlLabel
                control={<Checkbox />}
                label={<Typography>Option 1</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked />}
                label={<Typography>Option 2</Typography>}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography>Option 3</Typography>}
              />
            </div>
            <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
              1 point
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6" my={2}>
                <strong>Question: 1</strong> Select your preferences:
              </Typography>

              <FormControlLabel
                control={<Checkbox />}
                label={<Typography>True</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked />}
                label={<Typography>False</Typography>}
              />
              <Typography
                variant="body1"
                bgcolor="#FAFAFA"
                p={2}
                border="2px solid #D0D0D0"
                borderRadius={2}
                maxWidth={500}
              >
                'বনলতা সেন ' কাব্যগ্রন্থের রচয়িতা জীবনানন্দ দাশ| জীবননান্দ দাশ
                প্রধানত প্রকৃতির কবি| তার রচিত কাব্যগ্রন্থের নাম 'ধূসর
                পাণ্ডুলিপি', 'সাতটি তারার তিমির', 'বেলা অবেলা কালবেলা' এবং
                'রুপসী বাংলা' প্রভৃতি|
              </Typography>
            </div>
            <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
              1 point
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6" my={2}>
                <strong>Question: 1</strong> Select your
                preferences_______________
              </Typography>

              <FormControlLabel
                control={<Checkbox />}
                label={<Typography>Option 1</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked />}
                label={<Typography>Option 2</Typography>}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Typography>Option 3</Typography>}
              />
            </div>
            <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
              1 point
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6" my={2}>
                <strong>Question: 2</strong> Select options with images:
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={2}>
                <Stack>
                  <img
                    src="https://picsum.photos/200/200"
                    style={{ height: '200px', width: '200px' }}
                  />
                  <FormControlLabel
                    control={<Checkbox checked />}
                    label={<Typography>Option 1</Typography>}
                  />
                </Stack>
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Typography>Option 2</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Typography>Option 3</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Typography>Option 4</Typography>}
                />
              </Stack>
            </div>
            <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
              1 point
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6" my={2}>
                <strong>Question: 2</strong> Select options with images:
              </Typography>

              <FormControlLabel
                control={<Checkbox />}
                label={
                  <div>
                    <img
                      src="https://picsum.photos/200/200"
                      style={{ marginBottom: '8px' }}
                    />
                  </div>
                }
              />
              <FormControlLabel
                control={<Checkbox checked />}
                label={
                  <div>
                    <img
                      src="https://picsum.photos/200/200"
                      style={{ marginBottom: '8px' }}
                    />
                  </div>
                }
              />
              <FormControlLabel
                control={<Checkbox checked />}
                label={
                  <div>
                    <img
                      src="https://picsum.photos/200/200"
                      style={{ marginBottom: '8px' }}
                    />
                  </div>
                }
              />
              <FormControlLabel
                control={<Checkbox checked />}
                label={
                  <div>
                    <img
                      src="https://picsum.photos/200/200"
                      style={{ marginBottom: '8px' }}
                    />
                  </div>
                }
              />
            </div>
            <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
              1 point
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6" mb={2}>
                <strong>Question: 1</strong> Select your preferences?
              </Typography>
              <Typography
                variant="body1"
                bgcolor="#FAFAFA"
                p={2}
                border="2px solid #D0D0D0"
                borderRadius={2}
                maxWidth={500}
              >
                পারিবারিক প্রেক্ষাপট রবীন্দ্রনাথ ঠাকুরের জন্ম জোড়াসাঁকোর ৬ নং
                দ্বারকানাথ ঠাকুর লেনের পারিবারিক বাসভবনে। জোড়াসাঁকো ছিল সেযুগে
                “ব্ল্যাক টাউন” (বাঙালি অধ্যুষিত নগরাঞ্চল; ইউরোপীয়দের আবাসস্থল
                দক্ষিণ কলকাতা ছিল “হোয়াইট টাউন”) নামে পরিচিত উত্তর কলকাতার
                চিৎপুর রোডের (বর্তমান নাম রবীন্দ্র সরণি) নিকটে।
              </Typography>
            </div>
            <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
              1 point
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6" my={2}>
                <strong>Question: 1</strong> Select your{' '}
                <span
                  style={{
                    border: '1px dashed green',
                    width: '100px',
                    display: 'inline-block',
                    backgroundColor: '#F9FEFD',
                  }}
                >
                  {' '}
                  &nbsp;{' '}
                </span>{' '}
                preferences?
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography
                  variant="body1"
                  bgcolor="#DEEEC6"
                  px={2}
                  py={1}
                  border="2px dashed #006A4E"
                  borderRadius={2}
                >
                  বিকল্প ২
                </Typography>
                <Typography
                  variant="body1"
                  bgcolor="#DEEEC6"
                  px={2}
                  py={1}
                  border="2px dashed #006A4E"
                  borderRadius={2}
                >
                  বিকল্প ২
                </Typography>
              </Stack>
            </div>
            <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
              1 point
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6" my={2}>
                <strong>Question: 1</strong> Select your preferences?
              </Typography>
              <Stack direction="row" spacing={2}>
                <Stack spacing={1}>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                  <Typography
                    align="center"
                    fontSize={12}
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    সঠিক উত্তরটি ড্র্যাগ করে নিয়ে আসুন
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                  <Typography
                    align="center"
                    fontSize={12}
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    সঠিক উত্তরটি ড্র্যাগ করে নিয়ে আসুন
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                  <Typography
                    align="center"
                    fontSize={12}
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    সঠিক উত্তরটি ড্র্যাগ করে নিয়ে আসুন
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                    bgcolor="#FAFAFA"
                    p={2}
                    border="2px solid #D0D0D0"
                    borderRadius={2}
                    width={250}
                    mb={1}
                    minHeight={50}
                  >
                    বাংলাদেশ
                  </Typography>
                </Stack>
              </Stack>
            </div>
            <Button variant="contained" sx={{ bgcolor: '#1D1D1F' }}>
              1 point
            </Button>
          </Stack>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAssesmentDialog;
