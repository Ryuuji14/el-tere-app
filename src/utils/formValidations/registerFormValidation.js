import { bool, object, string, array } from "yup";

export const registerSchema = object({
  first_name: string().required(),
  last_name: string().required(),
  email: string().email().required(),
  password: string().required(),
  password_confirmation: string().required(),
  cellphone: string().required(),
  birthday: string().required(),
  gender: string().required(),
  interests: array().min(1).required(),
  acceptTermsAndConditions: bool().oneOf([true], "").required(),
}).required();

export const registerDefaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  cellphone: "",
  birthday: new Date(),
  gender: "F",
  interests: [],
  acceptTermsAndConditions: false,
};
