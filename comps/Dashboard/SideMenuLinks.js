import ReceiptIcon from '@mui/icons-material/Receipt';
import Link from 'next/link';
import hideStyles from '../../styles/Dashboard/MenuLinks.module.css';
import showStyles from '../../styles/Dashboard/DrawerMenuLinks.module.css';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PaymentIcon from '@mui/icons-material/Payment';
import TimelineIcon from '@mui/icons-material/Timeline';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import LockIcon from '@mui/icons-material/Lock';
import FlagIcon from '@mui/icons-material/Flag';
import InfoIcon from '@mui/icons-material/Info';
import SourceIcon from '@mui/icons-material/Source';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MessageOutlined } from '@ant-design/icons';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LanguageIcon from '@mui/icons-material/Language';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import TranslateIcon from '@mui/icons-material/Translate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import CallIcon from '@mui/icons-material/Call';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import WalletIcon from '@mui/icons-material/Wallet';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useTheme } from 'next-themes';
import jwt_decode from 'jwt-decode';

const SideMenuLinks = ({ isActive, show = false }) => {
  const { theme } = useTheme();
  const { myData, token } = useSelector((state) => state.auth);
  const styles = show ? showStyles : hideStyles;

  const roles = {
    batch_invoices: myData.batch_invoices,
    deposits: myData.deposits,
    payment_links: myData.payment_links,
    profile: myData.profile,
    users: myData.users,
    refund: myData.refund,
    show_all_invoices: myData.show_all_invoices,
    customers: myData.customers,
    invoices: myData.invoices,
    products: myData.products,
    commissions: myData.commissions,
    account_statements: myData.account_statements,
    orders: myData.orders,
    suppliers: myData.suppliers,
  };

  const router = useRouter();
  const { pathname } = router;
  const idx = pathname.lastIndexOf('/');
  const path = pathname.substring(0, idx);

  let decoded = jwt_decode(token);
  const role = decoded?.role_type;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const navLinks = [
    // user nav
    {
      href: '/dashboard',
      label: 'Dashboard',
      label_AR: 'لوحة القيادة',
      icon: <GridViewRoundedIcon className="ms-4" />,
      role: '',
      admin: false,
    },
    {
      href: '/dashboard/wallet',
      label: 'Wallet',
      label_AR: 'المحفظة',
      icon: <AccountBalanceWalletIcon className="ms-4" />,
      role: '',
      admin: false,
    },
    {
      href: '/dashboard/invoices',
      label: 'Invoices',
      label_AR: 'الفواتير',
      icon: <DescriptionIcon className="ms-4" />,
      role: 'invoices',
      admin: false,
    },
    {
      href: '/dashboard/products',
      label: 'Products',
      label_AR: 'المنتجات',
      icon: <ShoppingBagIcon className="ms-4" />,
      role: 'products',
      admin: false,
    },
    {
      href: '/dashboard/myStore',
      label: 'My Store',
      label_AR: 'متجري',
      icon: <LocalGroceryStoreIcon className="ms-4" />,
      role: 'products',
      admin: false,
    },
    {
      href: '/dashboard/customers',
      label: 'Customers',
      label_AR: 'عملاء',
      icon: <GroupIcon className="ms-4" />,
      role: 'customers',
      admin: false,
    },
    // {
    //   href: "/dashboard/commissions",
    //   label: "Commissions",
    //   label_AR: "المدفوعات",
    //   icon: <PaymentIcon className="ms-4" />,
    //   role: "commissions",
    //   admin: false,
    // },
    {
      href: '/dashboard/accountStatement',
      label: 'Account statement',
      label_AR: 'كشف حساب',
      icon: <TimelineIcon className="ms-4" />,
      role: 'account_statements',
      admin: false,
    },
    // {
    //   href: "/dashboard/deposits",
    //   label: "Deposits",
    //   label_AR: "الودائع",
    //   icon: <ArrowCircleDownRoundedIcon className="ms-4" />,
    //   role: "deposits",
    //   admin: false,
    // },
    {
      href: '/dashboard/refunds',
      label: 'Refunds',
      label_AR: 'المبالغ المستردة',
      icon: <RefreshIcon className="ms-4" />,
      role: 'refund',
      admin: false,
    },
    {
      href: '/dashboard/multiFactorAuthentication',
      label: 'Multi-factor authentication',
      label_AR: 'مصادقة متعددة العوامل',
      icon: <LockIcon className="ms-4" />,
      role: '',
      admin: false,
    },
    {
      href: '/dashboard/contact',
      label: 'Contact',
      label_AR: 'الاتصال',
      icon: <MessageOutlined className="ms-4 fs-5" />,
      role: '',
      admin: false,
    },
    {
      href: '/dashboard/setting',
      label: 'Setting',
      label_AR: 'ضبط',
      icon: <SettingsSuggestIcon className="ms-4" />,
      role: '',
      admin: false,
    },

    // admin nav
    {
      href: '/dashboard',
      label: 'Dashboard',
      label_AR: 'لوحة القيادة',
      icon: <GridViewRoundedIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/wallet',
      label: 'Wallet',
      label_AR: 'المحفظة',
      icon: <AccountBalanceWalletIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admins',
      label: 'Admins',
      label_AR: 'المديرين',
      icon: <AdminPanelSettingsIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/profile',
      label: 'Profiles',
      label_AR: 'الصفحات الشخصية',
      icon: <PeopleIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/invoice',
      label: 'Invoice',
      label_AR: 'الفاتورة',
      icon: <ReceiptIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/refunds',
      label: 'Refunds',
      label_AR: 'المبالغ المستردة',
      icon: <RefreshIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/accountStatement',
      label: 'Account statements',
      label_AR: 'كشف الحسابات',
      icon: <TimelineIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/stores',
      label: 'All stores',
      label_AR: 'كل المتاجر',
      icon: <LocalGroceryStoreIcon className="ms-4" />,
      role: '',
      admin: true,
    },

    // {
    //   href: "/dashboard/admin/deposits",
    //   label: "Deposits",
    //   label_AR: "الودائع",
    //   icon: <ArrowCircleDownRoundedIcon className="ms-4" />,
    //   role: "",
    //   admin: true,
    // },
    {
      href: '/dashboard/admin/address',
      label: 'Addresses',
      label_AR: 'العناوين',
      icon: <PinDropIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/language',
      label: 'Languages',
      label_AR: 'اللغات',
      icon: <TranslateIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/bank',
      label: 'Banks',
      label_AR: 'البنوك',
      icon: <AccountBalanceIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/businessCategory',
      label: 'Business Categories',
      label_AR: 'فئات الأعمال',
      icon: <BusinessIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/businessType',
      label: 'Business Types',
      label_AR: 'أنواع الأعمال',
      icon: <MapsHomeWorkIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/paymentMethod',
      label: 'Payment Methods',
      label_AR: 'طرق الدفع',
      icon: <PaymentIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/paymentInfo',
      label: 'Payment Information',
      label_AR: 'معلومات الدفع',
      icon: <SourceIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/commissions',
      label: 'Commissions',
      label_AR: 'المدفوعات',
      icon: <PaymentIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    // {
    //   href: "/dashboard/admin/recurringInterval",
    //   label: "Invoice Recurring Interval",
    //   label_AR: "الفاصل الزمني المتكرر للفاتورة",
    //   icon: <RepeatOneIcon className="ms-4" />,
    //   role: "",
    //   admin: true,
    // },
    {
      href: '/dashboard/admin/socialMedia',
      label: 'Social Media',
      label_AR: 'مواقع التواصل الإجتماعي',
      icon: <LanguageIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/about',
      label: 'About',
      label_AR: 'عن صفقة',
      icon: <InfoIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    {
      href: '/dashboard/admin/contact',
      label: 'Contact',
      label_AR: 'تواصل معنا',
      icon: <CallIcon className="ms-4" />,
      role: '',
      admin: true,
    },
    // {
    //   href: "/dashboard/multiFactorAuthentication",
    //   label: "Multi-factor authentication",
    //   label_AR: "مصادقة متعددة العوامل",
    //   icon: <LockIcon className="ms-4" />,
    //   role: "",
    //   admin: true,
    // },
  ];

  const handleActiveLink = (href) => {
    if (
      (pathname === '/dashboard' && href === '/dashboard') ||
      (href !== '/dashboard' && pathname.includes(href))
    ) {
      if (language == 'en') {
        return theme == 'dark' ? styles.active_dark : styles.active;
      } else {
        return theme == 'dark' ? styles.activeAR_dark : styles.activeAR;
      }
    }
  };

  return (
    <>
      {navLinks.map((item) => {
        if (
          (role !== 'admin' && item.admin) ||
          (role === 'admin' && !item.admin)
        ) {
          return;
        }

        for (let key in roles) {
          if (item.role === key && !roles[key]) {
            return;
          }
        }

        return (
          <div key={item.href} dir={language == 'ar' ? 'rtl' : 'ltr'}>
            <div
              className={`
          ${!isActive && styles.dn} 
          ${language == 'en' ? styles.link : styles.linkAR}
          ${handleActiveLink(
            item.href
          )} position-absolute start-0 end-0 align-items-center`}
            >
              <Link
                href={`${item.href}`}
                className={`safqa-text-secondary-dashboard ${
                  theme == 'dark' ? 'dark' : ''
                }`}
              >
                {item.icon}
                <span className={`ms-2`}>
                  {/* {item.label} */}
                  {i18n.language == 'ar' ? item.label_AR : item.label}
                </span>
              </Link>
            </div>
            <br />
            <br />
          </div>
        );
      })}
    </>
  );
};

export default SideMenuLinks;
