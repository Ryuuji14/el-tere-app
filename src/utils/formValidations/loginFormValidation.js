import { bool, object, string, array } from "yup";

export const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
}).required();

export const loginDefaultValues = {
  email: "",
  password: "",
};
