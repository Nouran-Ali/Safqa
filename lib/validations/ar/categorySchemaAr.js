import * as yup from "yup";

export const createCategorySchemaAr = yup.object().shape({
  name_en: yup
    .string()
    .max(255, "اسم الفئة الانحليزي يلزم ان يكون اقل من او يساوي 255 حرف")
    .required("يلزم ادخال اسم الفئة الانحليزي "),
  
  name_ar: yup
    .string()
    .max(255, "اسم الفئة العربي يلزم ان يكون اقل من او يساوي 255 حرف")
    .required("يلزم ادخال اسم الفئة العربي "),
  
  is_active: yup
    .string()
    .nullable()
    .required("يلزم اختيار الفئة نشطة أم لا"),
});


export const searchCategorySchemaAr = yup.object().shape({
  name_en: yup
    .string()
    .max(255, "اسم الفئة الانحليزي يلزم ان يكون اقل من او يساوي 255 حرف"),
  name_ar: yup
    .string()
    .max(255, "اسم الفئة العربي يلزم ان يكون اقل من او يساوي 255 حرف"),
  is_active: yup
    .string()
    .nullable()
    .required("يلزم اختيار الفئة نشطة أم لا"),
});
