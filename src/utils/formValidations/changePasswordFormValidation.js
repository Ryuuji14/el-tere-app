import { object, string, ref } from "yup";

export const passwordSchema = object({
  current_password: string().required("La contraseña anterior es requerida"),
  password: string().required("La nueva contraseña es requerida"),
  password_confirmation: string()
    .oneOf([ref("password")], "Las contraseñas no coinciden")
    .required("La confirmación de contraseña es requerida")
}).required();

export const passwordDefaultValues = {
  current_password: "",
  password: "",
  password_confirmation: "",
};
