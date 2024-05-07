import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";

const LeaveCourse = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />

      <Container maxWidth="md" role="main" className="container-pb"></Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default LeaveCourse;
