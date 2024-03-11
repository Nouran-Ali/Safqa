import { useState, useEffect } from 'react';
import SideNavbar from '../Dashboard/SideNavbar';
import DashboardNavbar from '../DashboardNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { getCookie, setCookie } from 'cookies-next';
import { getHomePage, getMyData } from '../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { getRole } from '../../store/slices/RolesSlice';
import { getCountries } from '../../store/slices/countrySlice';
import { useTheme } from 'next-themes';
import { getInvoices } from '../../store/slices/invoiceSlice';
import Echo from 'laravel-echo';
import {
  AddNewNotification,
  getAdminNotifications,
  getNotifications,
} from '../../store/slices/notificationSlice';
import { getProfilesBusiness } from '../../store/slices/profileBusinessSlice';
import { getBanks } from '../../store/slices/bankSlice';
import UserPusherConnection from '../../lib/user_pusher';
import AdminPusherConnection from '../../lib/admin_pusher';

const notification_permissions = [
  'notification_create_invoice',
  'notification_invoice_paid',
  'notification_new_order',
  'notification_create_batch_invoice',
  'notification_deposit',
  'notification_create_recurring_invoice',
  'notification_refund_transfered',
  'notification_notifications_serviceRequest',
  'notification_notifications_hourly_deposit_rejected',
  'notification_approve_vendor_account',
  'notification_create_shipping_invoice',
];

export default function DashboardLayout({ children }) {
  const [isActive, setIsActive] = useState();
  const [domLoaded, setDomLoaded] = useState(false);
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const {
    myData,
    statistics: { wallet_profile },
    token,
  } = useSelector((state) => state.auth);
  const nav_active = useSelector((state) => state.sideNav.isActive);
  let decoded = jwt_decode(token);
  const role = decoded?.role_type;

  useEffect(() => {
    if (myData?.profile_business?.id && role !== 'admin' && token) {
      // Create an instance of the PusherConnection class
      const pusherConnection = new UserPusherConnection(
        token,
        myData,
        dispatch
      );

      // Subscribe to notifications
      pusherConnection.subscribeToNotifications();
    }

    // Clean up the subscription when the component unmounts
    return () => {
      // Uncomment the following line if you have implemented the unsubscribeFromNotifications() method
      // pusherConnection.unsubscribeFromNotifications();
    };
  }, [dispatch, myData, role, token]);

  useEffect(() => {
    if (role == 'admin' && token) {
      // Create an instance of the PusherConnection class
      const pusherConnection = new AdminPusherConnection(token, dispatch);
      // Subscribe to notifications
      pusherConnection.subscribeToNotifications();
    }

    // Clean up the subscription when the component unmounts
    return () => {
      // Uncomment the following line if you have implemented the unsubscribeFromNotifications() method
      // pusherConnection.unsubscribeFromNotifications();
    };
  }, [dispatch, role, token]);

  useEffect(() => {
    dispatch(getMyData());
    dispatch(getRole());
    dispatch(getCountries());
    dispatch(getBanks());
  }, [dispatch]);

  useEffect(() => {
    if (role && role == 'admin') {
      dispatch(getAdminNotifications());
    } else if (role && role !== 'admin') {
      dispatch(getNotifications());
    }
  }, [dispatch, role]);

  useEffect(() => {
    setIsActive(nav_active);
  }, [nav_active]);

  useEffect(() => {
    if (getCookie('theme')) {
      setTheme(getCookie('theme') || 'light');
    } else {
      setCookie('theme', 'light');
      setTheme('light');
    }
  }, [setTheme, theme]);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <div
          id={`${theme}`}
          className={`${
            theme == 'dark' ? 'bg-dark min-vh-100' : 'bg-white min-vh-100'
          }`}
          dir={language == 'ar' ? 'rtl' : 'ltr'}
        >
          <SideNavbar />
          <DashboardNavbar />
          <div className={'container-xxl'}>
            <div className={`row`}>
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12"></div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
