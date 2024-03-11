import { Alert } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const [t, i18n] = useTranslation();
  const router = useRouter()
  return (
    <div className="mt-5">
      {/* <Alert
        message={t('errors.title')}
        description={t('errors.404')}
        type="error"
      /> */}
      <div className="alert alert-danger fs-5" role="alert" >
        {t('errors.404')}
        <u className="mx-2" role="button" onClick={() => router.back()}>{t('errors.go_back')}</u>
      </div>
    </div>
  );
}
