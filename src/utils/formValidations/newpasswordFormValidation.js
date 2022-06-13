import { object, string, ref } from "yup";

export const passwordSchema = object({
  password: string().required("requerido"),
  password_confirmation: string()
    .oneOf([ref("password")], "Las contraseñas no coinciden")
    .required("requerido"),
}).required();

export const passwordDefaultValues = {
  password: "",
  password_confirmation: "",
};
