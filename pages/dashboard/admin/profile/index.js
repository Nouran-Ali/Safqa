import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnShow, BtnTables, MagicLinkIcon } from "../../../../comps/Buttons";
import TableStyles from "../../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import SafqaTable from "../../../../comps/common/SafqaTable";
import { deleteLanguage, getLanguages } from "../../../../store/slices/languageSlice";
import { getProfiles } from "../../../../store/slices/profileSlice";
import useSafqaTableSearch from "../../../../hooks/SafqaTableSearch";
import { useEffect } from "react";


const AdminProfiles = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch()

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);
    const { getColumnSearchProps } = useSafqaTableSearch()

    const { profiles, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.profile);

    const columns = [
        {
            title: t("dashboard.company_name"),
            dataIndex: 'company_name',
            key: 'company_name',
            ...getColumnSearchProps('company_name')
        },
        {
            title: t("dashboard.work_email"),
            dataIndex: 'work_email',
            key: 'work_email',
            ...getColumnSearchProps('work_email')
        },
        {
            title: t("dashboard.mobile"),
            dataIndex: "phone_number",
            key: 'phone_number',
            ...getColumnSearchProps('phone_number'),
            render: (_, profile) => <>{profile?.country?.code} {profile?.phone_number}</>,
        },
        {
            title: language == 'en' ? 'Actions' : 'إجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, profile) =>
                <Space>
                    <BtnShow href={`/dashboard/admin/profile/${profile.id}`} />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch])


    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
                            <BtnTables
                                getItems={getProfiles}
                                data={profiles}
                                columns={columns}
                                filename="profiles"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={profiles}
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

export default AdminProfiles;
