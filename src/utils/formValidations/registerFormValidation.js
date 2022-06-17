import { bool, object, string, array, ref } from "yup";

export const registerSchema = object({
  first_name: string().required("El nombre es requerido"),
  last_name: string().required("El apellido es requerido"),
  email: string().email("correo inválido").required("requerido"),
  password: string().required("La contraseña es requerida")
  .min(8, "mínimo 8 caracteres en la contraseña"),
  password_confirmation: string()
    .oneOf([ref("password")], "Las contraseñas no coinciden")
    .required("requerido"),
  cellphone: string()
  .required("El telefono es requerido")
  .min(10, "El número debe tener 11 dígitos")
  .max(11, "El número debe tener 11 dígitos"),
  birthday: string().required("requerido"),
  gender: string().required("requerido"),
  userInterests: array().min(1).required("requerido"),
  acceptTermsAndConditions: bool().oneOf([true], "").required(),
  address: string().required("La direccion es requerida"),
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
  userInterests: [],
  acceptTermsAndConditions: false,
  address: "",
};
