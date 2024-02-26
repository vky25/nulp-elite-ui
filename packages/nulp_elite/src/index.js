// const moduleConfig = require("./modules.json");
fetch(`${process.env.PUBLIC_URL}/modules.json`).then(async (res) => {
  const moduleConfig = await res.json();
  window.appModules = moduleConfig;
  import("./bootstrap");
});

// import React, { useEffect, useState, useRef } from "react";
// import ReactDOM from "react-dom";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useFormik } from "formik";
// import { signUpSchema } from "../schemes";
// import styled from "styled-components";
// import { Box } from "@chakra-ui/react";

// const SITE_KEY = "6Ldk3O8UAAAAAC2tm0qkPGbJC7YJVpVzMeIuhumb";
// const DELAY = 1500;

// const initialValues = {
//   name: "",
//   // Other initial values
// };

// const Registration = () => {
//   const [load, setLoad] = useState(false);
//   const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
//   const reCaptchaRef = useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoad(true);
//     }, DELAY);
//   }, []);

//   const handleChangeCaptcha = (newValue) => {
//     // Your handleChangeCaptcha implementation
//   };

//   const asyncScriptOnLoad = () => {
//     setRecaptchaLoaded(true);
//   };

//   const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
//     useFormik({
//       initialValues,
//       validationSchema: signUpSchema,
//       onSubmit: (values, action) => {
//         console.log(values);
//         // Action to handle form submission
//         action.resetForm();
//       },
//     });

//   return (
//     <Wrapper>
//       <h1>
//         <a
//           href="https://github.com/dozoisch/react-google-recaptcha"
//           target="_blank"
//         ></a>
//       </h1>

//       {load && (
//         <ReCAPTCHA
//           style={{ display: "inline-block" }}
//           theme="dark"
//           size="invisible"
//           ref={reCaptchaRef}
//           sitekey={SITE_KEY}
//           onChange={handleChangeCaptcha}
//           asyncScriptOnLoad={asyncScriptOnLoad}
//         />
//       )}

//       <Box className="container">{/* Your registration form JSX */}</Box>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.section`
//   /* Your styled component CSS */
// `;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Registration />, rootElement);

// export default Registration;
