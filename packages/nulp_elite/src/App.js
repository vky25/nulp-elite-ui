import React from "react";
import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import Sample from "pages/Sample";
import Home from "pages/Home";
import Courses from "pages/Courses";
import Contents from "pages/Contents";
import { extendTheme, NativeBaseProvider } from "native-base";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DEFAULT_THEME, initializeI18n } from "@shiksha/common-lib";


function App() {
  // const theme = extendTheme(DEFAULT_THEME);

  const routes = [
    {
      moduleName: "nulp_elite",
      path: "/",
      component: Home,
    },{
      moduleName: "nulp_elite",
      path: "/Contents",
      component: Contents,
    },{
      moduleName: "nulp_elite",
      path: "/Courses",
      component: Courses,
    },
  ];
  // const LoginComponent = React.lazy(() => import("core/Login"));

  return(
  
    <NativeBaseProvider >
    <Router>
    <Sample />
    </Router>
</NativeBaseProvider>
  ); 
  // <NativeBaseProvider > <Sample /></NativeBaseProvider>;

  // <AppShell routes={routes} AuthComponent={LoginComponent} />;
}

export default App;
