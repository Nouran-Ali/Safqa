import styles from "../../../../styles/Dashboard/SocialMedia.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { MagicSelectInput, MagicInput, SafqaLabel, SafqaLink, usePageSize } from "../../Inputs";
import { BtnNewDelete, BtnTables, MagicBtnIcon } from "../../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../LoadingSpinner";
import { deleteSocialMediaProfile, getSocialMediaProfile, ResetSuccess } from "../../../../store/slices/socialMediaSlice";
import { useTranslation } from "react-i18next";
import { Space } from "antd";
import SafqaTable from "../../../common/SafqaTable";
import { useRef } from "react";

const SocialMediaItemsProfile = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const tableRef = useRef()

  const { SelectPageSize, pageSize } = usePageSize(5);

  const { social_media_profile_list, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.socialMedia);

  const columns = [
    {
      title: t("dashboard.social_media"),
      dataIndex: language == 'en' ? ['social_media', 'name_en'] : ['social_media', 'name_ar'],
      key: 'social_media',
    },
    {
      title: t("dashboard.social_media_url"),
      dataIndex: "url",
      key: 'url',
      render: (url) => <SafqaLink url={url} />
    },
    {
      title: language == 'en' ? 'Delete' : 'حذف',
      dataIndex: '',
      key: 'x',
      render: (_, social_media) =>
        <Space>
          <BtnNewDelete
            title={social_media.url}
            item={social_media}
            handleDelete={deleteSocialMediaProfile}
            isLoading={deleteLoading}
            success={success}
            error={api_errors}
            resetSuccess={ResetSuccess}
            getItems={getSocialMediaProfile}
          />
        </Space>
    },
  ]

  return (
    <>
      <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
        <BtnTables
          getItems={getSocialMediaProfile}
          data={social_media_profile_list}
          columns={columns}
          filename="social_media_profile_list"
          tableRef={tableRef}
        />
        <SelectPageSize />
      </div>

      <div className="w-100 mt-2" ref={tableRef}>
        <SafqaTable
          dataSource={social_media_profile_list}
          columns={columns}
          loading={isLoading}
          pageSize={pageSize}
        />
      </div>
    </>
  );
};

export default SocialMediaItemsProfile;
