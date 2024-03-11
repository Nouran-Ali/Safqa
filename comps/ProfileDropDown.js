import styles from "../styles/Dashboard/NavbarDashboard.module.css";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, logoutThunk } from "../store/slices/authSlice";
import jwt_decode from "jwt-decode";
import { Dropdown, Menu } from "antd";


const ProfileDropDown = () => {
    const { theme, setTheme } = useTheme()
    const [t, i18n] = useTranslation();
    const { language, changeLanguage } = i18n;
    const dispatch = useDispatch();
    const { profile_business } = useSelector(state => state.profileBusiness);
    const { token } = useSelector(state => state.auth)
    let decoded = jwt_decode(token);
    const role = decoded?.role_type

    const handleLogOut = () => {
        dispatch(logoutThunk());
    };

    const menu = (
        <Menu
        // className={`dropdown-menu profile-dropdown-menu py-3 z-index-10
        //     ${styles.dropdown} 
        //     ${language == "ar" && styles.dropdownAR}`}
        >
            {role !== 'admin' &&
                <Menu.Item key={'edit'}>
                    <Link
                        href="/dashboard/editProfile/businessDetails"
                        className="dropdown-item safqa-text-secondary2-dashboard d-flex align-items-center">

                        <PermIdentityOutlinedIcon sx={{ width: "20px" }} />
                        <span className="ms-2 me-2 mt-1">{t("dashboard.edit_profile")}</span>

                    </Link>
                </Menu.Item>
            }
            <Menu.Item key={'password'}>
                <Link
                    href="/dashboard/changePassword"
                    className="dropdown-item safqa-text-secondary2-dashboard d-flex align-items-center">

                    <LockOutlinedIcon sx={{ width: "20px" }} />
                    <span className="ms-2 me-2 mt-1"> {t("dashboard.change_password")}</span>

                </Link>
            </Menu.Item>
            <Menu.Item key={'logout'}>
                <button
                    onClick={handleLogOut}
                    className={`${styles.link} align-items-center dropdown-item ms-1 safqa-text-logout d-flex align-items-center`}
                >
                    <LogoutIcon sx={{ width: "20px" }} />
                    <span className={`ms-2 me-2 mt-1`}>{t("dashboard.logout")}</span>
                </button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div
            // className={`${language == "ar" && styles.dropdownAR}`}
                
            dir={language == "ar" ? "rtl" : "ltr"}
        >

            <Dropdown
                overlay={menu}
                placement={language == "ar" ? "bottomLeft" : "bottomRight"}
            >
                <Link href="#" className={`nav-link ${styles.nav_link}`}>
                    <img
                        src={role == 'admin' ||
                            !profile_business?.logo ?
                            theme == 'dark' ?
                                "/dark-logo.png" :
                                "/logo.png" :
                            profile_business.logo}
                        width={theme == 'dark' ? "50" : "50px"} />
                </Link>
            </Dropdown>

        </div>
    )
}

export default ProfileDropDown