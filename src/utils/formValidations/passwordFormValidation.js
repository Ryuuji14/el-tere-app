import { bool, object, string, array } from "yup";

export const passwordSchema = object({
  password: string().required(),
}).required();

export const passwordDefaultValues = {
  password: "",
};
