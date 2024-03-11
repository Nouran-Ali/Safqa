import styles from "../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { BtnEdit, BtnNewDelete, BtnShow, BtnTables, MagicLinkIcon } from "../../../comps/Buttons";
import TableStyles from "../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import SafqaTable from "../../../comps/common/SafqaTable";
import { deleteBank, getBanks } from "../../../store/slices/bankSlice";
import { CheckCircleOutlined } from "@mui/icons-material";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { deleteAdmin, getAdmins } from "../../../store/slices/adminSlice";

const AdminUsers = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    const dispatch = useDispatch()

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { admins, isLoading, deleteLoading, success, api_errors } = useSelector(state => state.admin);
    const { myData } = useSelector(state => state.auth);

    const columns = [
        {
            title: t("dashboard.name"),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t("dashboard.email"),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t("dashboard.phone"),
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: language == 'en' ? 'Actions' : 'إجراءات',
            dataIndex: '',
            key: 'x',
            render: (_, user) =>
                <Space>
                    <BtnShow href={`/dashboard/admins/${user.id}`} />
                    {
                        (myData?.is_super_admin || user.email == myData.email) ?
                            <BtnEdit href={`/dashboard/admins/update/${user.id}`} />
                            : null
                    }

                    {
                        (myData?.is_super_admin) ?
                            <BtnNewDelete
                                title={user.name}
                                item={user}
                                handleDelete={deleteAdmin}
                                isLoading={deleteLoading}
                            /> : null
                    }


                    {/* {
                        !user.is_super_admin ?
                            <BtnEdit href={`/dashboard/admins/update/${user.id}`} />
                            : null
                    } */}

                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getAdmins());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        {
                            myData?.is_super_admin ?
                                <MagicLinkIcon
                                    url="/dashboard/admins/create"
                                    style={TableStyles.bgBlue}
                                    icon={<AddIcon />}
                                    name={t("dashboard.create_new")}
                                />
                                : null
                        }

                        {/* <MagicLinkIcon
                            url="/dashboard"
                            style={TableStyles.bgBlue}
                            icon={<VerticalAlignBottomIcon />}
                            name={t("dashboard.import")}
                        /> */}

                        <br />
                        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
                            <BtnTables
                                getItems={getAdmins}
                                data={admins}
                                columns={columns}
                                filename="admins"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={admins}
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

export default AdminUsers;
