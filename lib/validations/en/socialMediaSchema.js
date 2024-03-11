import * as yup from "yup";

export const createSocialMediaProfileSchema = (social_media_list) => yup.object().shape({
    url: yup
        .string()
        .url('Invalid URL format')
        .test('valid-specific-url', `Not a valid link`, function (value) {
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
        .required('URL is required'),
    social_id: yup
        .string()
        .max(255, 'Social ID must be at most 255 characters')
        .required('Social ID is required'),
});

export const createSocialMediaSchema = yup.object().shape({
    name_en: yup
        .string()
        .required('English name is required'),
    name_ar: yup
        .string()
        .required('Arabic name is required'),
    icon: yup
        .mixed()
        .test('is-required', 'Icon is required.', (value) => {
            return value instanceof FileList
        })
        .test('is-image', 'Invalid file format. Only images are allowed.', (value) => {
            if (!value) return true;
            const file = value[0];
            return file && file.type.startsWith('image/');
        })
});

export const updateSocialMediaSchema = yup.object().shape({
    name_en: yup
        .string()
        .required('English name is required'),
    name_ar: yup
        .string()
        .required('Arabic name is required'),
    icon: yup
        .mixed()
        .test('is-string', 'Invalid icon value', function (value) {
            if (!(value instanceof FileList)) {
                this.parent.icon = null; // Convert any type except file to null
            }
            return true;
        })
        .test('is-image', 'Invalid file format. Only images are allowed.', (value) => {
            if (value instanceof FileList) {
                const file = value[0];
                return file && file.type.startsWith('image/');
            }
            return true
        })
});
