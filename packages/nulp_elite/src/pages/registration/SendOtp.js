import React, { useEffect, useState } from "react";
import {
  HStack,
  Button,
  Box,
  FormControl,
  Input,
  VStack,
  Alert,
  IconButton,
  CloseIcon,
  Center,
  Avatar,
  Divider,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  useWindowSize,
  BodyMedium,
  Heading,
  Subtitle,
  overrideColorTheme,
  Layout,
} from "@shiksha/common-lib";
const colors = overrideColorTheme();

export default function sendOtp({ swPath }) {
  const [credentials, setCredentials] = useState();
  const [errors, setErrors] = React.useState({});
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const [isLoading, setIsLoading] = React.useState({});
  const navigate = useNavigate();
  const [userData, setuserData] = useState({});
  const [checked, setChecked] = useState(false);
  const [goToOtp, setGoToOtp] = useState(false);

  const fieldsName = [
    { label: "OTP One", attribute: "otp_one" },
    { label: "OTP Two", attribute: "otp_two" },
    { label: "OTP Three", attribute: "otp_three" },
    { label: "OTP Four", attribute: "otp_four" },
    { label: "OTP Five", attribute: "otp_five" },
    { label: "OTP Six", attribute: "otp_six" },
  ];

  // const validate = () => {
  //   let arr = {};
  //   if (
  //     typeof credentials?.mobileNumber === "undefined" ||
  //     credentials?.mobileNumber === ""
  //   ) {
  //     arr = { ...arr, mobileNumber: t("MOBILE_NUMBER_IS_REQUIRED") };
  //   }

  //   setErrors(arr);

  //   if (arr.mobileNumber) {
  //     return false;
  //   }
  //   return true;
  // };
  //
  // const handleCheckboxChange = () => {
  //   setChecked(!checked);
  // };

  useEffect(() => {
    const storedUserData = localStorage.getItem("registeringUser");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log("userData", userData);

      setuserData(userData);
    }
  }, []);
  const handleLogin = () => {
    verifyUser();
  };

  const verifyUser = async () => {
    setIsLoading(true);
    setError(null);
    let allKeys = Object.keys(credentials);
    allKeys.sort();
    let temp_obj = {};
    for (let i = 0; i < allKeys.length; i++) {
      temp_obj[allKeys[i]] = credentials[allKeys[i]];
    }
    let eotp = Object.values(temp_obj).join("");
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
      // getReqData = data.reqData
      console.log("signupUserresponse reqData:", data.reqData);
      console.log("verifyUserresponse:", data.result);
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

    const url = "http:localhost:3000/learner/user/v2/signup";
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
    console.log("signupUser", reqData);
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

      console.log("signupUserresponse:", data.result);
      navigate("/domainList");
      // setGoToOtp(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (goToOtp) {
    return <Navigate to="/login" />;
  }
  const acceptTermsAndConditions = async () => {
    setIsLoading(true);
    setError(null);

    const url = `/user/v2/accept/tnc`;
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

  // const resendOtp = () => {
  //   generateOtp();
  // };

  return (
    <Layout
      _appBar={{
        isBackButtonShow: false,
        isHideMenuButton: true,
        // imageUrl: "../../src/assets/SubjectBg.png",

        LeftIcon: (
          <HStack width={"65px"}>
            <Divider
              width={"1.62px"}
              height={"35.75px"}
              bg={"#41C88E"}
              order={"0"}
              ml={"5px"}
            />
            <Avatar
              bg=""
              size="37"
              rounded="md"
              borderRadius={"0px"}
              //   source={require("../../src/assets/Ellipse.png")}
            />
          </HStack>
        ),

        rightIcon: (
          <HStack paddingBottom={"25px"}>
            {/* <IconByName name="CloseCircleFillIcon" /> */}
          </HStack>
        ),
      }}
    >
      <Box>
        <Center width={width}>
          <VStack space="" w="300px">
            <Box>
              <Heading>{t("Ragister")}</Heading>

              <BodyMedium textTransform="inherit">
                {t(
                  "Please enter the verification code received on your registered e-mail ID."
                )}
              </BodyMedium>
            </Box>
            {/* 
            <Checkbox
              isChecked={checked}
              onChange={handleCheckboxChange}
              colorScheme="blue" // Change color scheme as per your requirement
            />
            <Text ml={2}>
              As a parent/guardian I understand &{" "}
              <Link href="#">accept the NULP Terms of Use</Link> agree my child
              to register on NULP with the given information.
            </Text> */}

            <VStack space={2} pt={"25px"} pb={"25px"}>
              {"alert" in errors ? (
                <Alert w="100%" status={"error"}>
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      justifyContent="space-between"
                    >
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Subtitle color={colors?.gray}>{errors.alert}</Subtitle>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        icon={<CloseIcon size="3" color={colors?.gray} />}
                        onPress={(e) => setErrors({})}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              ) : (
                <></>
              )}
              <HStack space="30px" p={"20px"}>
                {fieldsName?.map((item, index) => (
                  <FormControl
                    isRequired
                    isInvalid={item?.attribute in errors}
                    key={index}
                    name={item?.attribute}
                    width={"15%"}
                  >
                    <Input
                      key={item?.attribute}
                      name={item?.attribute}
                      bg="white"
                      variant="rounded"
                      borderColor={
                        credentials?.[item?.attribute]
                          ? "orange.500"
                          : "#C1C1C1"
                      }
                      pr={"10px"}
                      pl={"15px"}
                      pt={"10px"}
                      pb={"10px"}
                      width={"40px"}
                      placeholder={"0"}
                      onChange={(e) => setCredentialForText(e, index)}
                    />
                    {item?.attribute in errors ? (
                      <FormControl.ErrorMessage
                        key={index}
                        _text={{
                          fontSize: "xs",
                          color: colors?.error,
                          fontWeight: 500,
                        }}
                      >
                        {errors[item?.attribute]}
                      </FormControl.ErrorMessage>
                    ) : (
                      <></>
                    )}
                  </FormControl>
                ))}
              </HStack>
            </VStack>
            <Button className="disabled-opacity" p="3" onPress={handleLogin}>
              {t("Submit")}
            </Button>
            {/* <p className="sign-up">
              <a href="/otp" onClick={resendOtp}>
                Resend OTP
              </a>
            </p> */}
            {/* <p className="sign-up">
              Don't have an account? <a href="/registration">Register Here</a>
            </p> */}
          </VStack>
        </Center>
      </Box>
    </Layout>
  );
}
