import { bool, object, string, array, ref } from "yup";

export const editPerfilSchema = object({
  first_name: string().required("requerido"),
  last_name: string().required("requerido"),
  email: string().email("correo inválido").required("requerido"),
  cellphone: string().required("requerido"),
  birthday: string().required("requerido"),
  gender: string().required("requerido"),
  // interests: array().min(1).required("requerido"),
  // acceptTermsAndConditions: bool().oneOf([true], "").required(),
}).required();

export const editPerfilDefaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  cellphone: "",
  birthday: new Date(),
  gender: "F",
  // interests: [],
  // acceptTermsAndConditions: false,
  // address: "",
};
