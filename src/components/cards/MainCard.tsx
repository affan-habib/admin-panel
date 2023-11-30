import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Button, // Import Button from MUI
} from "@mui/material";

interface MainCardProps {
  title: string;
  children: React.ReactNode;
  modalButton?: React.ReactNode; // Add modalButton prop
}

const MainCard: React.FC<MainCardProps> = ({
  title,
  children,
  modalButton,
}) => {
  return (
    <Container maxWidth="xl">
      <Card sx={{ width: "100%" }}>
        <CardHeader
          title={title}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          action={modalButton}
        />
        <CardContent>{children}</CardContent>
      </Card>
    </Container>
  );
};

export default MainCard;
