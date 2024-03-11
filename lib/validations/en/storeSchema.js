import * as yup from "yup";

export const updateStoreSchema = yup.object().shape({
  title: yup
  .string()
    .required("Title is required "),
  description: yup
  .string()
  .max(1000,"Description must be less than or equal to 1000 letters")
  .required("Description is required"),
  logo: yup
    .mixed()
    // .test('is-required', 'logo is required', (value) => {
    //   return value instanceof FileList
    // })
    // .test('is-image', 'Incorrect file format. Only images of logos are allowed.', (value) => {
    //   if (!value) return true;
    //   const file = value[0];
    //   return file && file.type.startsWith('image/');
    // })
});
