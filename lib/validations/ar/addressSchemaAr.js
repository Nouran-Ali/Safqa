import * as yup from "yup";

export const createAddressSchemaAr = yup.object().shape({
  addressType_id: yup
    .string("نوع العنوان حقل مطلوب")
    .required(),
  city_id: yup
    .string("المدينة حقل مطلوب")
    .required(),
  area_id: yup
    .string("المنطقة حقل مطلوب")
    .required(),
  block: yup
    .string("الحقل  حقل مطلوب")
    .required(),
  avenue: yup
    .string("شارع  حقل مطلوب")
    .required(),
  street: yup
    .string("شارع حقل مطلوب")
    .required(),
  bldgNo: yup
    .string()
    .nullable(),
  appartment: yup
    .string()
    .nullable(),
  floor: yup
    .string()
    .nullable(),
  instructions: yup
    .string()
    .nullable(),
});
