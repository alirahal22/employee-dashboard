import { accountNameSpace } from "&features/account/account.i18n";

import { landingNameSpace } from "&features/landing/landing.i18n";
import { loginNameSpace } from "&features/login/login.i18n";
import { departmentsNameSpace } from "&features/departments/departments.i18n";

/**
 * Arabic translation resources.
 * Each object correspond to a namespace related to a feature.
 */
let ar = {
  login: loginNameSpace.ar,
  landing: landingNameSpace.ar,
  departments: departmentsNameSpace.ar,
  account: accountNameSpace.ar,

  common: {
    // Commands
    AUTHENTICATE: "مصادقة",
    REGISTER: "تسجيل",
    LOG_IN: "تسجيل الدخول",
    LOG_OUT: "تسجيل الخروج",
    RESET: "إعادة تعيين",
    EDIT: "تحرير",
    BACK: "رجوع",
    RESEND: "إعادة الإرسال",
    VERIFY: "تحقق",
    DOWNLOAD: "تحميل",

    // Sections
    MAIN: "رئيسي",
    OVERVIEW: "نظرة عامة",
    BUSINESS_FACTS: "حقائق العمل",
    GENERAL: "عام",
    GEOGRAPHICAL: "جغرافية",
    STORES: "المتاجر",
    AUTHORIZATION: "إذن",
    STATEMENT: "البيان",
    BILLING: "Billing",
    CLIENTS: "Clients",
    INVOICES: "Invoices",
    PRODUCTS: "Products",
    RECURRENT_INVOICES: "Recurring Invoices",
    PAYMNET_LINKS: "Payment Links",
    DOCUMENTATION: "Documentation",
    HELP: "مساعدة",
    REQUEST_ROLLS: "قوائم الطلبات",
    SETTINGS: "الإعدادات",
    SUPPORT: "دعم",

    // Labels
    EMAIL_LABEL: "Email address",
    MOBILE_LABEL: "Mobile number",
    PASSWORD_LABEL: "Password",
    ORGANIZATION_LABEL: "Organization",

    // Placeholders
    EMAIL_PLACEHOLDER: "someone@example.com",
    MOBILE_PLACEHOLDER: "03112233",
    PASSWORD_PLACEHOLDER: "********",
    SEARCH_PLACEHOLDER: "ابحث ...",

    // ERRORS
    REQUIRED_ERROR_MESSAGE: "الرجاء إدخال {{fieldName}}!",
    INVALID_ERROR_MESSAGE: "الرجاء التحقق من صحة {{fieldName}}!",

    // Messages
    _404: "Sorry, the page you requested does not exist.",
  },
};

export default ar;
