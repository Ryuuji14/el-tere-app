import { object, string, ref } from "yup";

export const passwordSchema = object({
  email: string().required(),
}).required();

export const passwordDefaultValues = {
  email: "",
};
