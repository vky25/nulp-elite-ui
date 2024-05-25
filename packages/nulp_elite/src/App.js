import React, { useEffect, useState } from "react";

import "./App.css";
import "./styles/style.css";
import {
  NativeBaseProvider,
  Box,
  Stack,
  VStack,
  Text,
  HStack,
  Button,
  extendTheme,
  Actionsheet,
  ScrollView,
} from "native-base";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DEFAULT_THEME, H2, initializeI18n } from "@shiksha/common-lib";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";

import * as util from "services/utilService";
import { ChakraProvider } from "@chakra-ui/react";
import Profile from "pages/profile/Profile";
import Certificate from "pages/profile/certificate";
import FAQPage from "pages/FAQPage";
import AddConnections from "pages/connections/AddConnections";
import DomainList from "pages/search/DomainList";
import Registration from "pages/registration/Registration";
import Registrationold from "pages/registration/Registrationold";
import ContentList from "pages/search/ContentList";
import AllContent from "pages/content/AllContent";
import CategoryPage from "pages/content/CategoryPage";
import LearningHistory from "pages/profile/learningHistory";
import continueLearning from "pages/profile/continueLearning";
import JoinCourse from "pages/content/joinCourse";
import Player from "pages/content/Player";
import Otp from "pages/registration/Otp";
import SendOtp from "pages/registration/SendOtp";
import PDFContent from "pages/content/pdf";
import NoResult from "pages/content/noResultFound";
import Message from "pages/connections/message";
import Terms from "pages/terms";
import SelectPreference from "pages/SelectPreference";

function App() {
  // const [t] = useTranslation();
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const colors = "";
  const [sortArray, setSortArray] = React.useState([]);
  const [checkPref, setCheckPref] = React.useState(false);
  const _userId = util.userId();
  const routes = [
    {
      moduleName: "nulp_elite",
      path: "/all",
      component: AllContent,
    },
    {
      moduleName: "nulp_elite",
      path: "/profile",
      component: Profile,
    },
    {
      moduleName: "nulp_elite",
      path: "/certificate",
      component: Certificate,
    },
    {
      moduleName: "nulp_elite",
      path: "/learningHistory",
      component: LearningHistory,
    },
    {
      moduleName: "nulp_elite",
      path: "/continueLearning",
      component: continueLearning,
    },
    {
      moduleName: "nulp_elite",
      path: "/help",
      component: FAQPage,
    },
    {
      moduleName: "nulp_elite",
      path: "/addConnections",
      component: AddConnections,
    },
    {
      moduleName: "nulp_elite",
      path: "/domainList",
      component: DomainList,
    },
    {
      moduleName: "nulp_elite",
      path: "/contentList/:pageNumber",
      component: ContentList,
    },
    {
      moduleName: "nulp_elite",
      path: "/joinCourse",
      component: JoinCourse,
    },

    {
      moduleName: "nulp_elite",
      path: "/player",
      component: Player,
    },
    {
      moduleName: "nulp_elite",
      path: "/pdf",
      component: PDFContent,
    },
    {
      moduleName: "nulp_elite",
      path: "/noresult",
      component: NoResult,
    },
    {
      moduleName: "nulp_elite",
      path: "/certificateOld",
      component: Certificate,
    },
    {
      moduleName: "nulp_elite",
      path: "/signup",
      component: Registration,
    },
    {
      moduleName: "nulp_elite",
      path: "/otp-old",
      component: SendOtp,
    },
    {
      moduleName: "nulp_elite",
      path: "/terms",
      component: Terms,
    },
    {
      moduleName: "nulp_elite",
      path: "/otp",
      component: Otp,
    },
    {
      moduleName: "nulp_elite",
      path: "/registrationold",
      component: Registrationold,
    },
    {
      moduleName: "nulp_elite",
      path: "/view-all/:category",
      component: CategoryPage,
    },
    {
      moduleName: "nulp_elite",
      path: "/message",
      component: Message,
    },
    {
      moduleName: "nulp_elite",
      path: "/SelectPreference",
      component: SelectPreference,
    },
  ];

  initializeI18n(
    ["translation"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/learner/user/v5/read/${_userId}`;
        const header = "application/json";
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data.result.response.framework.board);
        if (data.result.response.framework.board) {
          setCheckPref(true);
        } else {
          setCheckPref(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      {/* <ChakraProvider> */}
      {/* <React.Suspense> */}
      {/* <I18nextProvider i18n={i18n}> */}
      {/* <ChakraProvider> */}
      <React.Suspense>
        {/* {!checkPref && <UserPrefPopup />} */}

        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Router>
      </React.Suspense>
      {/* </ChakraProvider> */}
      {/* </ChakraProvider> */}
      {/* </I18nextProvider> */}
    </NativeBaseProvider>
  );
}

export default App;
