import { Drawer } from "antd";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import SideNavbar from "./SideNavbar";

const SideDrawer = ({ visible, setVisible }) => {
  const [t, i18n] = useTranslation();
  const { language, changeLanguage } = i18n;
  const { theme } = useTheme();
  return (
    <Drawer
      placement={language === "ar" ? "right" : "left"}
      // headerStyle={{ display: "none" }}
      drawerStyle={{
        direction: language === "ar" ? "rtl" : "ltr",
        background: theme == "dark" ? "#162d39" : "white",
      }}
      open={visible}
      onClose={() => {
        setVisible(false);
      }}
      width={400}
    >
      <SideNavbar show={true} onClick={() => setVisible(false)} />
    </Drawer>
  );
};

export default SideDrawer;
