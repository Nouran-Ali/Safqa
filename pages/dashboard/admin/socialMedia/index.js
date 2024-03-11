import socialMediaStyles from "../../../../styles/Dashboard/SocialMedia.module.css";
import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnTables, MagicLinkIcon } from "../../../../comps/Buttons";
import { deleteSocialMedia, getAllSocialMedia } from "../../../../store/slices/socialMediaSlice";
import TableStyles from "../../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import SafqaTable from "../../../../comps/common/SafqaTable";
import { useEffect } from "react";


const SocialMedia = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const dispatch = useDispatch();

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { social_media_list, imageUrl, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.socialMedia);

    const columns = [
        {
            title: t("dashboard.icon"),
            dataIndex: "icon",
            key: 'icon',
            render: (icon) => <img height={"50px"} src={`${imageUrl}/${icon}`} />
        },
        {
            title: t("dashboard.name_En"),
            dataIndex: 'name_en',
            key: 'name_en',
        },
        {
            title: t("dashboard.name_Ar"),
            dataIndex:'name_ar',
            key: 'name_ar',
        },
        {
            title: language == 'en' ? 'Actions' : 'إجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, social_media) =>
                <Space>
                    <BtnEdit href={`/dashboard/admin/socialMedia/update/${social_media.id}`} />
                    <BtnNewDelete
                        title={social_media[language == 'en' ? "name_en" : "name_ar"]}
                        item={social_media}
                        handleDelete={deleteSocialMedia}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]


    useEffect(() => {
        dispatch(getAllSocialMedia());
    }, [dispatch])


    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <MagicLinkIcon
                            url="/dashboard/admin/socialMedia/create"
                            style={TableStyles.bgBlue}
                            icon={<AddIcon />}
                            name={t("dashboard.create_new")}
                        />
                        {/* <MagicLinkIcon
                            url="/dashboard"
                            style={TableStyles.bgBlue}
                            icon={<VerticalAlignBottomIcon />}
                            name={t("dashboard.import")}
                        /> */}

                        <br />
                        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
                            <BtnTables
                                getItems={getAllSocialMedia}
                                data={social_media_list}
                                columns={columns}
                                filename="social_media_list"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={social_media_list}
                                columns={columns}
                                loading={isLoading}
                                pageSize={pageSize}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialMedia;
