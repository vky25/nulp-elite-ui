import React, { useEffect, useState, useRef } from "react";

import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, Navigate } from "react-router-dom";
import image from "../../assets/bg.png";
import { useStore } from "configs/zustandStore";
const axios = require("axios");
const Otp = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State to store OTP values
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState();
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState({});
  const navigate = useNavigate();
  const [userData, setuserData] = useState({});
  const [checked, setChecked] = useState(false);
  const [goToOtp, setGoToOtp] = useState(false);
  const dataStore = useStore((state) => state.data);
  const captchaResponse = dataStore.captchaResponse;

  // Handle OTP form changes
  const inputRefs = Array.from({ length: 6 }).map(() => useRef(null));
  const handleOtpChange = (index, value) => {
    // Handle backspace
    if (value === "" && index > 0) {
      // Move focus to the previous input field
      inputRefs[index - 1].current.focus();
    }

    // Update the otp array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  useEffect(() => {
    const storedUserData = dataStore.userData;
    if (storedUserData) {
      const userData = storedUserData;
      setuserData(userData);
    }
  }, []);
  const handleLogin = () => {
    const enteredOtp = otp.join(""); // Combine OTP array into a single string
    verifyUser();
  };

  const verifyUser = async () => {
    setIsLoading(true);
    setError(null);
    let eotp = otp.join("");
    const url = `https://nulp.niua.org/learner/otp/v1/verify`;
    const requestBody = {
      request: {
        key: userData && userData.email,
        type: "email",
        otp: eotp,
      },
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP");
      }

      const data = await response.json();
      signupUser(data.reqData);
      acceptTermsAndConditions();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signupUser = async (reqData) => {
    setIsLoading(true);
    setError(null);

    const url = "http://localhost:3000/learner/user/v2/signup";
    const requestBody = {
      params: {
        source: "portal",
        signupType: "self",
      },
      request: {
        firstName: userData.name,
        password: userData.password,
        birthYear: userData.birthYear,
        email: userData.email,
        emailVerified: true,
        reqData: reqData,
      },
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      const data = await response.json();
      setGoToOtp(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (goToOtp) {
    return <Navigate to="/all" />;
  }
  const acceptTermsAndConditions = async () => {
    setIsLoading(true);
    setError(null);

    const url = `http://localhost:3000/user/v2/accept/tnc`;
    const requestBody = {
      request: {
        version: "v12",
        identifier: userData.email,
      },
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to verify terms&condition");
      }

      const data = await response.json();
      console.log("acceptTermsAndConditionsresponse:", data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setCredentialForText = (e, item) => {
    const data = {
      ...credentials,
      [item]: e.target.value,
    };
    setCredentials(data);
  };
  const generateOtp = async (email) => {
    const url = `http://localhost:3000/learner/anonymous/otp/v1/generate?captchaResponse=${captchaResponse}`;
    const requestBody = {
      request: {
        key: email,
        type: "email",
        templateId: "wardLoginOTP",
      },
    };
    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to resend OTP");
      }

      const data = response.data;
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };
  const resendOtp = () => {
    generateOtp(userData.email);
  };
  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          textAlign: "center",
          backgroundPosition: "2px 426px",
          height: "100vh",
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <Box my={4}>
          <img src={require("../../assets/logo.png")} alt="Logo" />
        </Box>
        <Typography
          style={{ fontWeight: "600", fontSize: "16px", marginBottom: "40px" }}
        >
          {t("REGISTER")}
        </Typography>

        <Alert severity="info" style={{ textAlign: "left" }}>
          {t("PLEASE_ENTER_THE_VERFICATION_CODE_RECEIVED")}
        </Alert>
        <Typography
          style={{
            fontWeight: "400",
            fontSize: "12px",
            textAlign: "left",
            margin: "35px 0 10px 0",
          }}
        >
          {t("VERIFICATION_CODE")}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {[...Array(6)].map((_, index) => (
            <div className="base-Input-root" key={index}>
              <input
                ref={inputRefs[index]}
                className="base-Input-input"
                maxLength={1}
                style={{ textAlign: "center" }}
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            </div>
          ))}
        </Box>
        <Link
          onClick={resendOtp}
          style={{
            textAlign: "right",
            fontSize: "10px",
            display: "block",
            marginTop: "10px",
          }}
        >
          {t("RESEND_CODE")}
        </Link>
        <Box pt={4}>
          <Button
            onClick={handleLogin}
            style={{
              background: "#004367",
              borderRadius: "10px",
              color: "#fff",
              padding: "10px 71px",
              fontWeight: "600",
              fontSize: "14px",
              margin: "20px 0 20px 0",
            }}
          >
            {t("SUBMIT")}
          </Button>
        </Box>
        <Box py={1}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "400",
              fontSize: "12px",
            }}
          >
            {t("DONT_HAVE_AN_ACCOUNT")}{" "}
            <Link
              href={`http://localhost:3000/signup${window.location.search}`}
            >
              {t("REGISTER_HERE")}
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Otp;
