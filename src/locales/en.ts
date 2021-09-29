import { accountNameSpace } from "&features/account/account.i18n";

import { landingNameSpace } from "&features/landing/landing.i18n";
import { loginNameSpace } from "&features/login/login.i18n";
import { departmentsNameSpace } from "&features/departments/departments.i18n";

/**
 * English translation resources.
 * Each object correspond to a namespace related to a feature.
 */
let en = {
  login: loginNameSpace.en,
  landing: landingNameSpace.en,
  account: accountNameSpace.en,
  departments: departmentsNameSpace.en,

  common: {
    // Commands
    COPYRIGHT: "© All rights reserved.",
    AUTHENTICATE: "Authenticate",
    REGISTER: "Register",
    LOG_IN: "Log In",
    LOG_OUT: "Log Out",
    RESET: "Reset",
    EDIT: "Edit",
    DELETE: "Delete",
    BULK: "Bulk",
    NEW: "New",
    CREATE: "Create",
    CANCEL: "Cancel",
    BACK: "Back",
    RESEND: "Resend",
    VERIFY: "Verify",
    DOWNLOAD: "Download",
    VIEW: "View",
    USERNAME: "Username",
    departments: "departments",
    TRANSACTIONS: "Transactions",

    // Sections
    MAIN: "MAIN",
    OVERVIEW: "Overview",
    BUSINESS_FACTS: "Business Facts",
    GENERAL: "General",
    GEOGRAPHICAL: "Geograhical",
    STORES: "Stores",
    AUTHORIZATION: "Authorization",
    STATEMENT: "Statement",
    BILLING: "Billing",
    CLIENTS: "Clients",
    INVOICES: "Invoices",
    PRODUCTS: "Products",
    RECURRENT_INVOICES: "Recurring Invoices",
    PAYMENT_LINKS: "Payment Links",
    DOCUMENTATION: "Documentation",
    HELP: "HELP",
    REQUEST_ROLLS: "Request Rolls",
    DEPARTMENTS: "Departments",
    SETTINGS: "Settings",
    SUPPORT: "Support",

    // Labels
    EMAIL_LABEL: "Email address",
    MOBILE_LABEL: "Mobile number",
    PASSWORD_LABEL: "Password",
    ORGANIZATION_LABEL: "Organization",

    // Placeholders
    EMAIL_PLACEHOLDER: "someone@example.com",
    MOBILE_PLACEHOLDER: "03112233",
    PASSWORD_PLACEHOLDER: "********",
    SEARCH_PLACEHOLDER: "Search ...",

    // ERRORS
    REQUIRED_ERROR_MESSAGE: "Please provide {{fieldName}}!",
    INVALID_ERROR_MESSAGE: "Please make sure {{fieldName}} is valid!",

    // Messages
    _404: "Sorry, the page you requested does not exist.",
  },
};

export default en;
