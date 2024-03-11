import socialMediaStyles from "../../../../styles/Dashboard/SocialMedia.module.css";
import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnTables, MagicLinkIcon } from "../../../../comps/Buttons";
import TableStyles from "../../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import SafqaTable from "../../../../comps/common/SafqaTable";
import { deleteBusinessType, getBusinessTypes } from "../../../../store/slices/businessTypeSlice";
import { useEffect } from "react";


const BusinessTypePage = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch();

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { business_types, imageUrl, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.businessType);

    const columns = [
        {
            title: t("dashboard.business_logo"),
            dataIndex: 'business_logo',
            key: 'business_logo',
            render: (business_logo) => <img height={"50px"} src={`${imageUrl}/${business_logo}`} />
        },
        {
            title: t("dashboard.name_En"),
            dataIndex: 'name_en',
            key: 'name_en',
        },
        {
            title: t("dashboard.name_Ar"),
            dataIndex: 'name_ar',
            key: 'name_ar',
        },
        {
            title: language == 'en' ? 'Actions' : 'إجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, businessType) =>
                <Space>
                    <BtnEdit href={`/dashboard/admin/businessType/update/${businessType.id}`} />
                    <BtnNewDelete
                        title={businessType[language == 'en' ? "name_en" : "name_ar"]}
                        item={businessType}
                        handleDelete={deleteBusinessType}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getBusinessTypes())
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <MagicLinkIcon
                            url="/dashboard/admin/businessType/create"
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
                                getItems={getBusinessTypes}
                                data={business_types}
                                columns={columns}
                                filename="business_types"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={business_types}
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

export default BusinessTypePage;
