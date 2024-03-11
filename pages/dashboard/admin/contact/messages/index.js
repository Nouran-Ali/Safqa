import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import TableStyles from "../../../../../styles/Dashboard/Tables.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnShow, BtnTables, MagicLinkIcon } from "../../../../../comps/Buttons";
import SafqaTable from "../../../../../comps/common/SafqaTable";
import { deleteCountry, getCountries } from "../../../../../store/slices/countrySlice";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import AdminAddressNav from "../../../../../comps/admin/address/AdminAddressNav";
import { CheckCircleOutlined } from "@mui/icons-material";
import { CloseCircleOutlined } from "@ant-design/icons";
import NavAdminContacts from "../../../../../comps/Dashboard/Setting/NavAdminContacts";
import { deleteMessage, getMessages } from "../../../../../store/slices/messageSlice";
import { useEffect } from "react";

const AdminContactMessages = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch()

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { messages, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.message);

    const columns = [
        {
            title: t("dashboard.full_name"),
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: t("dashboard.email"),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t("dashboard.support_type"),
            dataIndex: ['support_type', 'name'],
            key: ['support_type', 'name'],
        },
        {
            title: t("dashboard.message"),
            dataIndex: "message",
            key: "message",
        },
        {
            title: language == 'en' ? 'Actions' : 'أجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, message) =>
                <Space>
                    <BtnShow href={`/dashboard/admin/contact/messages/${message.id}`} />
                    <BtnNewDelete
                        title={message.message}
                        item={message}
                        handleDelete={deleteMessage}
                        isLoading={deleteLoading}
                        success={success}
                        error={api_errors}
                    />
                </Space>
        },
    ]


    useEffect(() => {
        dispatch(getMessages())
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <NavAdminContacts />
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
                            <BtnTables
                                getItems={getMessages}
                                data={messages}
                                columns={columns}
                                filename="messages"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>
                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={messages}
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

export default AdminContactMessages;
