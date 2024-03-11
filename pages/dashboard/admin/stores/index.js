import socialMediaStyles from "../../../../styles/Dashboard/SocialMedia.module.css";
import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { usePageSize } from "../../../../comps/Dashboard/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { Space, Switch } from "antd";
import { BtnEdit, BtnNewDelete, BtnTables, MagicLinkIcon } from "../../../../comps/Buttons";
import { deleteSocialMedia, getAllSocialMedia } from "../../../../store/slices/socialMediaSlice";
import TableStyles from "../../../../styles/Dashboard/Tables.module.css";
import AddIcon from "@mui/icons-material/Add";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import SafqaTable from "../../../../comps/common/SafqaTable";
import { useEffect } from "react";
import { getAllStores, updateAdminAboutStore } from "../../../../store/slices/productSlice";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


const AllAdminStores = () => {

    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const dispatch = useDispatch();

    const tableRef = useRef()

    const { SelectPageSize, pageSize } = usePageSize(5);

    const { all_stores, urlImage, isLoading, updateLoading, deleteLoading, success, api_errors } = useSelector(state => state.product);

    const changeActivity = (data) => {
        dispatch(updateAdminAboutStore(data))
    }
    const columns = [
        {
            title: t("dashboard.logo"),
            dataIndex: "logo",
            key: 'logo',
            render: (logo) => <img height={"50px"} src={`${urlImage}/${logo}`} />
        },
        {
            title: t("dashboard.title"),
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: t("dashboard.description"),
            dataIndex: 'description',
            key: 'description',
        },
        // {
        //     title: t("dashboard.is_active"),
        //     dataIndex: 'is_active',
        //     key: 'id',
        //     render: (_, store) => store.is_active ?
        //         <CheckCircleOutlined className="safqa-text-success fs-5" /> :
        //         <CloseCircleOutlined className="safqa-text-danger fs-5" />,
        //     filters: [
        //         {
        //             text: 'Active',
        //             value: 1,
        //         },
        //         {
        //             text: 'Inactive',
        //             value: 0,
        //         },
        //     ],
        //     onFilter: (value, store) => store.is_active === value,
        // },
        {
            title: t("dashboard.is_active"),
            dataIndex: 'is_active',
            key: 'is_active',
            filters: [
                {
                    text: 'Active',
                    value: 1,
                },
                {
                    text: 'Inactive',
                    value: 0,
                },
            ],
            onFilter: (value, store) => store.is_active === value,
            render: (_, store) =>
                <Space>
                    <Switch
                        loading={updateLoading}
                        checked={store.is_active}
                        onChange={() => changeActivity({ id: store.id, is_active: !store.is_active })}
                    />
                </Space>
        },
    ]

    useEffect(() => {
        dispatch(getAllStores());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
                    <div className={`rounded-2 ${language == "en" && "me-4"} ${TableStyles.info}`}>
                        {/* <MagicLinkIcon
                            url="/dashboard/admin/socialMedia/create"
                            style={TableStyles.bgBlue}
                            icon={<AddIcon />}
                            name={t("dashboard.create_new")}
                        /> */}
                        {/* <MagicLinkIcon
                            url="/dashboard"
                            style={TableStyles.bgBlue}
                            icon={<VerticalAlignBottomIcon />}
                            name={t("dashboard.import")}
                        /> */}

                        {/* <br /> */}
                        <div className={`safqa-scroll-x d-flex ${language == "ar" && "me-2"}`}>
                            <BtnTables
                                getItems={getAllStores}
                                data={all_stores}
                                columns={columns}
                                filename="all_stores"
                                tableRef={tableRef}
                            />
                            <SelectPageSize />
                        </div>

                        <div className="w-100 mt-2" ref={tableRef}>
                            <SafqaTable
                                dataSource={all_stores}
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

export default AllAdminStores;
