import React from "react";
import { Button, Container} from "@mui/material";
import Section from "views/dashboard/Section";
import MainCard from "components/cards/MainCard";

const Dashboard: React.FC = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <MainCard title="Users" modalButton={<Button variant="contained">Add User</Button>}>
        <Section/>
      </MainCard>
    </Container>
  );
};

export default Dashboard;
