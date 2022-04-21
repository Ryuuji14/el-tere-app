import { bool, object, string, array, ref } from "yup";

export const registerSchema = object({
  first_name: string().required("requerido"),
  last_name: string().required("requerido"),
  email: string().email("correo inválido").required("requerido"),
  password: string().required("requerido"),
  password_confirmation: string()
    .oneOf([ref("password")], "Las contraseñas no coinciden")
    .required("requerido"),
  cellphone: string().required("requerido"),
  birthday: string().required("requerido"),
  gender: string().required("requerido"),
  interests: array().min(1).required("requerido"),
  acceptTermsAndConditions: bool().oneOf([true], "").required(),
  address: string().required("requerido"),
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
  address: "",
};
