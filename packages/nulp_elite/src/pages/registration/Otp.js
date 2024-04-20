import React, { useEffect, useState } from "react";
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

const Otp = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(""); // State to store OTP value
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true); // State to manage resend button disabled state
  const [remainingTime, setRemainingTime] = useState(60); // State to hold the remaining time
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [goToOtp, setGoToOtp] = useState(false);
  const dataStore = useStore((state) => state.data);
  const captchaResponse = dataStore.captchaResponse;

  useEffect(() => {
    const storedUserData = dataStore.userData;
    if (storedUserData) {
      setUserData(storedUserData);
    }
  });

  useEffect(() => {
    let timer;
    if (!resendDisabled) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            setResendDisabled(true); // Disable resend button when timer expires
            clearInterval(timer); // Clear the timer
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [resendDisabled]);

  useEffect(() => {
    setResendDisabled(false); // Enable resend button
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setResendDisabled(true);
      setRemainingTime(60);
    }
  }, [remainingTime]);

  const handleLogin = () => {
    if (otp.length === 6) {
      verifyUser();
    }
  };

  const handleOtpChange = (value) => {
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const verifyUser = async () => {
    setIsLoading(true);
    setError(null);

    const url = `https://nulp.niua.org/learner/otp/v1/verify`;
    const requestBody = {
      request: {
        key: userData && userData.email,
        type: "email",
        otp: otp,
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
      // acceptTermsAndConditions();
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

    try {
      const response = await axios.post(
        "http://localhost:3000/user/v2/accept/tnc",
        {
          request: {
            version: "v12",
            identifier: userData.email,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify terms&condition");
      }

      const data = response.data;
      console.log("acceptTermsAndConditionsresponse:", data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
    setResendDisabled(false); // Enable resend button
  };

  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          textAlign: "center",
          backgroundPosition: "2px 426px",
          height: "100vh",
          // backgroundImage: `url(${image})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "contain",
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

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="otp"
          label="OTP"
          name="otp"
          value={otp}
          onChange={(e) => handleOtpChange(e.target.value)}
          autoFocus
          inputProps={{ maxLength: 6 }}
        />

        <Button
          onClick={resendOtp}
          disabled={!resendDisabled}
          style={{
            textAlign: "right",
            fontSize: "10px",
            display: "block",
            marginTop: "10px",
          }}
        >
          {resendDisabled
            ? t("RESEND_CODE")
            : `Resend OTP in ${remainingTime}s`}
        </Button>
        <Box pt={4}>
          <Button
            onClick={handleLogin}
            disabled={otp.length !== 6}
            style={{
              background:
                otp.length !== 6 ? "rgba(0, 67, 103, 0.5)" : "#004367",
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
        <Box style={{display:'flex', alignItems:'center'}}>

<FormGroup style={{flexDirection:'row', alignItems:'center'}}>
    <FormControlLabel  control={<Checkbox />} /> <Link href="../terms.html" target="_blank"> <span className="required">*</span>{t('TERMS_CONDITIONS')}</Link>
  </FormGroup>
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
