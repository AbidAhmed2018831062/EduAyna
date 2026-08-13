import * as Yup from "yup";

export const addStudentSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name cannot be more than 100 characters long")
    .required("Name is required"),

  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Email is required"),

  phone: Yup.string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .required("Phone is required"),

  class: Yup.string()
    .max(50, "Class cannot be more than 50 characters long")
    .required("Class is required"),

  status: Yup.string()
    .oneOf(
      ["active", "inactive"],
      "Status must be active or inactive"
    )
    .required("Status is required"),
});