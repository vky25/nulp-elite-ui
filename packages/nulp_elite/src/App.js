import React from "react";
import "./App.css";
import "./styles/style.css";
import Sample from "pages/Sample";
import Home from "pages/Home";
import Courses from "pages/Courses";
import Coursetest from "pages/CourseTest";
import Search from "pages/Search";

import Contents from "pages/Contents";
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
import Framework from "pages/Frmework";
import User from "pages/User";

import UserPrefData from "pages/UserPrefData";
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
import JoinCourse from "pages/content/joinCourse";
import Player from "pages/content/Player";
import Otp from "pages/registration/Otp";

function App() {
  // const [t] = useTranslation();
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const colors = "";
  const [sortArray, setSortArray] = React.useState([]);

  const routes = [
    {
      moduleName: "nulp_elite",
      path: "/home",
      component: Home,
    },
    {
      moduleName: "nulp_elite",
      path: "/contents",
      component: Contents,
    },
    {
      moduleName: "nulp_elite",
      path: "/all",
      component: AllContent,
    },
    {
      moduleName: "nulp_elite",
      path: "/sample",
      component: Sample,
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
      path: "/help",
      component: FAQPage,
    },
    {
      moduleName: "nulp_elite",
      path: "/framework",
      component: Framework,
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
    // {
    //   moduleName: "nulp_elite",
    //   path: "contentList",
    //   component: ContentList,
    // },
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
      path: "/userPrefData",
      component: UserPrefData,
    },
    {
      moduleName: "nulp_elite",
      path: "/user",
      component: User,
    },
    {
      moduleName: "nulp_elite",
      path: "/coursetest",
      component: Coursetest,
    },
    {
      moduleName: "nulp_elite",
      path: "/search",
      component: Search,
    },
    {
      moduleName: "nulp_elite",
      path: "/certificateOld",
      component: Certificate,
    },
    {
      moduleName: "nulp_elite",
      path: "/registration",
      component: Registration,
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
  ];
  // public_url="http://localhost:5000"
  //  public_url="https://alt.uniteframework.io"
  // initializeI18n(
  //   ["translation"],
  //   // `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  //   // `http://localhost:3300/locales/{{lng}}/{{ns}}.json`
  // );
  initializeI18n(
    ["translation"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );

  return (
    <NativeBaseProvider>
      {/* <ChakraProvider> */}
      {/* <React.Suspense> */}
      {/* <I18nextProvider i18n={i18n}> */}
      {/* <ChakraProvider> */}
      <React.Suspense>
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
