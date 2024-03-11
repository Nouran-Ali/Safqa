import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

// import AuthReducer from "./slices/authSlice";
import JoinReducer from "./slices/join";
import globalReducer from "./slices/global";
import sideNavReducer from "./slices/sidenav";

// import changePasswordReducer from "./slices/changePassword";

// invoice
import invoiceReducer from "./slices/invoiceSlice";

// admin
import adminReducer from "./slices/adminSlice";

// pay invoice
import payInvoiceReducer from "./slices/payInvoiceSlice";

// pay Link
import payLinkReducer from "./slices/payLinkSlice";

// quick invoice
import paymentLinkReducer from "./slices/paymentLinkSlice";

// category
import categoryReducer from "./slices/categorySlice"

// product
import productReducer from "./slices/productSlice";

// product Links
import productLinkReducer from "./slices/productLinkSlice";

// documents
import documentReducer from "./slices/documentSlice";

// orders
import orderReducer from "./slices/orderSlice";

// customer
import customerReducer from "./slices/customerSlice";

// social media
import socialMediaReducer from "./slices/socialMediaSlice";

// recurring Interval 
import recurringIntervalReducer from "./slices/recurringIntervalSlice";


// expiry types
import expiryTypeReducer from "./slices/expiryTypeSlice";

// manageUsers
import manageUsersReducer from "./slices/manageUserSlice"

// roles
import roleReducer from "./slices/RolesSlice"

// country
import countryReducer from "./slices/countrySlice";

// addresses
import addressReducer from "./slices/addressSlice";

// address type
import addressTypeReducer from "./slices/addressTypeSlice";

// cities
import cityReducer from "./slices/citySlice";

// areas
import areaReducer from "./slices/areaSlice";

// refunds
import refundReducer from "./slices/refundSlice";

// contacts
import contactReducer from "./slices/contactSlice";

// support types
import supportTypeReducer from './slices/supportTypeSlice'

// languages
import languageReducer from './slices/languageSlice'

// banks
import bankReducer from './slices/bankSlice'

// business categories
import businessCategoryReducer from './slices/businessCategorySlice'

// about
import aboutReducer from './slices/aboutSlice'

// business Type
import businessTypeReducer from './slices/businessTypeSlice'

// contact Phone
import contactPhoneReducer from './slices/contactPhoneSlice'

// payment Method
import paymentMethodReducer from './slices/paymentMethodSlice'

// message
import messageReducer from './slices/messageSlice'

// profile
import profileReducer from './slices/profileSlice'

// profileBusiness
import profileBusinessReducer from './slices/profileBusinessSlice'

// profileBusiness
import depositReducer from './slices/depositSlice'

// commission
import commissionReducer from './slices/commissionSlice'

// CART
import cartReducer from './slices/cartSlice'

// pay Product
import payProductReducer from './slices/payProductSlice'

// account statement
import accountStatementReducer from './slices/accountStatmentSlice'

// integration
import integrationReducer from './slices/integrationSlice'

// notifications
import notificationReducer from './slices/notificationSlice'

// ccavenue
import ccavenueReducer from './slices/ccAvenueSlice';

// adminCommission
import adminCommissionReducer from './slices/adminCommissionSlice';


// paymentInformation
import paymentInformationReducer from './slices/paymentInfoSlice';

export const store = configureStore({
  reducer: {
    // auth: AuthReducer,
    join: JoinReducer,
    global: globalReducer,
    sideNav: sideNavReducer,

    // social media
    socialMedia: socialMediaReducer,

    // recurring_interval
    recurringInterval: recurringIntervalReducer,

    // expiry_types
    expiryType: expiryTypeReducer,

    // admin
    admin: adminReducer,

    // invoice
    invoice: invoiceReducer,

    // pay invoice
    payInvoice: payInvoiceReducer,

    // paymeny Link
    paymentLink: paymentLinkReducer,

    // pay invoice
    payLink: payLinkReducer,

    // customer
    customer: customerReducer,

    // category
    category: categoryReducer,

    // product
    product: productReducer,

    // product links
    productLink: productLinkReducer,

    // documents
    document: documentReducer,

    // order
    order: orderReducer,

    // profile
    profile: profileReducer,

    // profile business
    profileBusiness: profileBusinessReducer,

    // manageUsers
    manageUser: manageUsersReducer,

    // roles
    role: roleReducer,

    // addresses
    country: countryReducer,

    // addresses
    address: addressReducer,

    // address type
    addressType: addressTypeReducer,

    // cities
    city: cityReducer,

    // cities
    area: areaReducer,

    // refunds
    refund: refundReducer,

    // supportTypes
    supportType: supportTypeReducer,

    // languages
    language: languageReducer,

    // banks
    bank: bankReducer,

    // business categories
    businessCategory: businessCategoryReducer,

    // about
    about: aboutReducer,

    // business types
    businessType: businessTypeReducer,

    // contacts
    contact: contactReducer,

    // message
    message: messageReducer,

    // contact Phone
    contactPhone: contactPhoneReducer,

    // payment Method
    paymentMethod: paymentMethodReducer,

    // deposit
    deposit: depositReducer,

    // commission
    commission: commissionReducer,

    // cart
    cart: cartReducer,

    // pay product
    payProduct: payProductReducer,

    // account statement
    accountStatement: accountStatementReducer,

    // notification
    notification: notificationReducer,

    // integration
    integration: integrationReducer,

    // ccavenueReducer
    ccavenue: ccavenueReducer,

    // adminCommission
    adminCommission: adminCommissionReducer,

    // paymentInfo
    paymentInfo: paymentInformationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: ['createProduct/setProductImage'],
      //   ignoredPaths: ['createProduct.productInfo.product_image']
      // }
    }),
  // .concat(categoryApi.middleware),
});

// setupListeners(store.dispatch)