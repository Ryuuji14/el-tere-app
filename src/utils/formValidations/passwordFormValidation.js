import { object, string, ref } from "yup";

export const newpasswordSchema = object({
  password: string().required("requerido"),
  password_confirmation: string()
    .oneOf([ref("password")], "Las contraseñas no coinciden")
    .required("requerido"),
}).required();

export const newpasswordDefaultValues = {
  password: "",
  password_confirmation: "",
};
