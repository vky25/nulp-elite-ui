import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useFormik } from "formik";
import { signUpSchema } from "../schemes";
import { Radio, RadioGroup, Stack, Input, Box } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { contentService } from "@shiksha/common-lib";

const initialValues = {
  name: "",
  contactType: "email",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};

const Registration = () => {
  const [contactType, setContactType] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const currentYear = new Date().getFullYear();
  const startYear = 1925;
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const yearOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(year);
  }

  const handleRadioChange = (value) => {
    setContactType(value);
  };

  const handleInputChange = (event) => {
    if (contactType === "email") {
      setEmail(event.target.value);
    } else {
      setPhone(event.target.value);
    }
  };
  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const confirmPasswordVisibility = () => {
    setConfirmPassword(!confirmPassword);
  };

  const handleSelectChange = (event) => {
    setBirthYear(event.target.value);
  };

  useEffect(() => {
    const getCaptcha = async () => {
      setIsLoading(true);
      setError(null);

      let data = JSON.stringify({
        request: {
          key: "snehal2020@yopmail.com",
          templateId: "wardLoginOTP",
          type: "email",
        },
      });

      // Headers
      const headers = {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
      };

      const url = `https://www.google.com/recaptcha/api2/reload?k=6LeTKjcpAAAAANWJtGOk-GIQdybiXjHEbKSkyxob`;
      try {
        const response = await contentService.getCaptchaResponse(
          url,
          data,
          headers
        );
        console.log(response.data.result);
        setData(response.data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getCaptcha();
  }, []);

  const handleSubmit = () => {
    useEffect();
  };

  // Function to get cookie value by name
  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return "";
  };

  return (
    <>
      <Wrapper>
        <Box className="container">
          <Box className="modal">
            <Box className="modal-container">
              <Box className="modal-left">
                <h1 className="modal-title">Register</h1>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name" className="input-label">
                    Name
                    <span className="required">*</span>
                  </label>
                  <Box className="input-block">
                    <input
                      type="name"
                      autoComplete="off"
                      name="name"
                      id="name"
                      placeholder="Name Surname"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                  {errors.name && touched.name ? (
                    <p className="form-error">{errors.name}</p>
                  ) : null}
                  <Box>
                    <label htmlFor="dob" className="input-label">
                      Year of Birth <span className="required">*</span>
                    </label>
                    <select
                      className="input-block"
                      id="birthYear"
                      name="birthYear"
                      value={birthYear}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select Birth Year</option>
                      {yearOptions.map((birthYear) => (
                        <option key={birthYear} value={birthYear}>
                          {birthYear}
                        </option>
                      ))}
                    </select>
                  </Box>
                  {errors.birthYear && touched.birthYear ? (
                    <p className="form-error">{errors.birthYear}</p>
                  ) : null}
                  <Box>
                    <label className="input-label">
                      Enter your Email ID or Mobile Number
                      <span className="required">*</span>
                    </label>
                  </Box>
                  <Box>
                    <Box className="radio-parent">
                      <RadioGroup
                        className="input-label"
                        value={contactType}
                        onChange={handleRadioChange}
                      >
                        <Stack direction="row">
                          <Radio
                            value="email"
                            isChecked={contactType === "email"}
                            className={`radio-style ${
                              contactType === "email" ? "radio-clicked" : ""
                            }`}
                          >
                            Email
                            <span className="required">*</span>
                          </Radio>
                          <Radio
                            value="phone"
                            className={`radio-style ${
                              contactType === "phone" ? "radio-clicked" : ""
                            }`}
                          >
                            Phone <span className="required">*</span>
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </Box>
                    <Box className="input-block">
                      <Input
                        type={contactType === "email" ? "email" : "tel"}
                        autoComplete="off"
                        name="contact"
                        id="contact"
                        placeholder={
                          contactType === "email" ? "Email" : "Phone"
                        }
                        value={contactType === "email" ? email : phone}
                        onChange={handleInputChange}
                      />
                    </Box>
                    {contactType === "email" &&
                    errors.email &&
                    touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : contactType === "phone" &&
                      errors.phone &&
                      touched.phone ? (
                      <p className="form-error">{errors.phone}</p>
                    ) : null}
                  </Box>
                  <label htmlFor="password" className="input-label">
                    New Password
                    <span className="required">*</span>
                  </label>
                  {showPassword && (
                    <Box
                      className="input-block"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="text"
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ cursor: "pointer" }}
                      />
                      <ViewOffIcon
                        w={20}
                        as={ViewOffIcon}
                        h="full"
                        position="absolute"
                        right="0.75rem"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={togglePasswordVisibility}
                      />
                    </Box>
                  )}
                  {!showPassword && (
                    <Box
                      className="input-block"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="password"
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder="Confirm Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ cursor: "pointer" }}
                      />
                      <ViewIcon
                        w={20}
                        as={ViewIcon}
                        h="full"
                        position="absolute"
                        right="0.75rem"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={togglePasswordVisibility}
                      />
                    </Box>
                  )}
                  {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                  ) : null}

                  <label htmlFor="confirmPassword" className="input-label">
                    Confirm New Password
                    <span className="required">*</span>
                  </label>
                  {confirmPassword && (
                    <Box
                      className="input-block"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="text"
                        autoComplete="off"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm New Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ cursor: "pointer" }}
                      />
                      <ViewOffIcon
                        w={20}
                        as={ViewOffIcon}
                        h="full"
                        position="absolute"
                        right="0.75rem"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={confirmPasswordVisibility}
                      />
                    </Box>
                  )}
                  {!confirmPassword && (
                    <Box
                      className="input-block"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="password"
                        autoComplete="off"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm New Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ cursor: "pointer" }}
                      />
                      <ViewIcon
                        w={20}
                        as={ViewIcon}
                        h="full"
                        position="absolute"
                        right="0.75rem"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={confirmPasswordVisibility}
                      />
                    </Box>
                  )}
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="form-error">{errors.confirmPassword}</p>
                  ) : null}

                  <Box className="modal-buttons">
                    <button className="input-button" type="submit">
                      Continue
                    </button>
                  </Box>

                  {isLoading && <p>Loading...</p>}
                  {error && <p>Error: {error}</p>}
                  {Object.keys(data).map((key) => (
                    <div key={key}>
                      <p>
                        {key}: {JSON.stringify(data[key])}
                      </p>
                    </div>
                  ))}
                </form>
                <p className="sign-up">
                  Already have an account? <a href="#">Login</a>
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width: 100%;
    /* height: 60px; */
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }
  .modal-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;

    transition-duration: 0.3s;
    background: #fff;
  }
  .modal-title {
    margin: 0;
    font-weight: 400;
    color: ##1e1e1d;
    text-align: center;
  }
  .form-error {
    font-size: 0.7rem;
    color: #b22b27;
  }
  .required {
  color: red;
  margin-left: 2px;
}

  .modal-desc {
    margin: 6px 0 30px 0;
  }
  .modal-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    opacity: 1;
  }

  .modal-right {
    flex: 2;
    font-size: 0;
    transition: 0.3s;
    overflow: hidden;
  }
  .modal-right img {
    width: 100%;
    height: 100%;
    transform: scale(1);
    -o-object-fit: cover;
    object-fit: cover;
    transition-duration: 1.2s;
  }

  .modal.is-open .modal-left {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 0.1s;
  }
  .modal-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }
  .modal-buttons a {
    color: rgba(51, 51, 51, 0.6);
    font-size: 14px;s
  }

  .sign-up {
    margin: 30px 0 0;
    font-size: 14px;
    text-align: center;
  }
  .sign-up a {
    color: #8692ed;
  }

  .input-button {
    padding: 1.2rem 6.2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 12px;
    background: #8692ed;
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;
  }
  .input-button:hover {
    background: #55311c;
  }

  .input-label {
    font-size: 13px;
    text-transform: capitalise;
    font-weight: 600;
    letter-spacing: 0.7px;
    color: #1e1e1d;
    transition: 0.3s;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px;
    border: 1.9px solid #8692ed;
    border-radius: 12px;
    // margin-bottom: 20px;
    transition: 0.3s;
    width: 100%;
  }

  .radio-style{
    border: 1.9px solid #8692ed;
    width: 20px;
    height:20px;
    border-radius:50%;
  }

  .radio-clicked::after{
    content: "";
    height: 10px;
    width:10px;
    background : #8692ed;
    border-radius:50%
  }
  .input-block input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
  }

  .input-block input::-moz-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input:-ms-input-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input::placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block:focus-within {
    border-color: #8c7569;
  }
  .input-block:focus-within .input-label {
    color: rgba(140, 117, 105, 0.8);
  }

  .radio-parent{
    margin : 15px 0px;
  }

  @media (max-width: 750px) {
    .modal-container {
      max-width: 90vw;
    }

    .modal-right {
      display: none;
    }
  }

`;

export default Registration;
