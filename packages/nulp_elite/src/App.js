import React from "react";
import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import SampleTest from "pages/SampleTest";

function App() {
  const routes = [
    {
      moduleName: "nulp_elite",
      path: "/",
      component: SampleTest,
    },
  ];
  // const LoginComponent = React.lazy(() => import("core/Login"));

  return <SampleTest />;

  // <AppShell routes={routes} AuthComponent={LoginComponent} />;
}

export default App;
