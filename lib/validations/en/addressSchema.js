import * as yup from "yup";

export const createAddressSchema = yup.object().shape({
  addressType_id: yup
    .string("Address type is required")
    .required(),
  city_id: yup
    .string("City is required")
    .required(),
  area_id: yup
    .string("Area is required")
    .required(),
  block: yup
    .string("Block is required")
    .required(),
  avenue: yup
    .string("Avenue is required")
    .required(),
  street: yup
    .string("Street is required")
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
