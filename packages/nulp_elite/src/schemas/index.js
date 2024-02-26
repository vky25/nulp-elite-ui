import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email format")
    .when("contactMethod", {
      is: (val) => val === "email",
      then: Yup.string().required("Please enter your email"),
      otherwise: Yup.string().notRequired(),
    }),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .when("contactMethod", {
      is: (val) => val === "phone",
      then: Yup.string().required("Please enter your phone"),
      otherwise: Yup.string().notRequired(),
    }),

  birthYear: Yup.number()
    .min(1925)
    .max(4)
    .required("Please select your year of birth"),
  password: Yup.string()
    .min(8)
    .required(
      "Your password must contain a minimum of 8 characters. It must include numerals, lower and upper case alphabets and special characters, without any spaces."
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf(
      [Yup.ref("password"), null],
      "Password must be match with new password"
    ),
});
