import * as yup from "yup";

export const createSocialMediaProfileSchemaAr = (social_media_list) => yup.object().shape({
    url: yup
        .string()
        .url('تنسيق عنوان URL غير صالح')
        .test('valid-specific-url', `رابط غير صالح`, function (value) {
            if (!this.parent.social_id) {
                return true;
            }
            const currentSocialMedia = social_media_list.find(item => item.id == this.parent.social_id);
            if (!currentSocialMedia) {
                return true;
            }
            const pattern = new RegExp(`^(https?:\\/\\/)?(www\\.)?${currentSocialMedia.name_en}\\.com\\/.+`, "i");
            return pattern.test(value);
        })
        .required('الرابط مطلوب'),
    social_id: yup
        .string()
        .max(255, 'يجب ألا يتجاوز معرّف الشبكة الاجتماعية 255 حرفًا')
        .required('معرّف الشبكة الاجتماعية مطلوب'),
});


export const createSocialMediaSchemaAr = yup.object().shape({
    name_en: yup
        .string()
        .required('الاسم باللغة الإنجليزية مطلوب'),
    name_ar: yup
        .string()
        .required('الاسم باللغة العربية مطلوب'),
    icon: yup
        .mixed()
        .test('is-required', 'الرمز مطلوب.', (value) => {
            return value instanceof FileList
        })
        .test('is-image', 'تنسيق غير صحيح للملف. يُسمح فقط بصور الشعارات.', (value) => {
            if (!value) return true;
            const file = value[0];
            return file && file.type.startsWith('image/');
        })
});



export const updateSocialMediaSchemaAr = yup.object().shape({
    name_en: yup
        .string()
        .required('الاسم باللغة الإنجليزية مطلوب'),
    name_ar: yup
        .string()
        .required('الاسم باللغة العربية مطلوب'),
    icon: yup
        .mixed()
        .test('is-string', 'قيمة الرمز غير صحيحة', function (value) {
            if (!(value instanceof FileList)) {
                this.parent.icon = null; // تحويل أي نوع ما عدا الملف إلى قيمة null
            }
            return true;
        })
        .test('is-image', 'تنسيق غير صحيح للملف. يُسمح فقط بصور الشعارات.', (value) => {
            if (value instanceof FileList) {
                const file = value[0];
                return file && file.type.startsWith('image/');
            }
            return true
        })
});