const API_BASE_URL_DEVELOPMENT = "https://localhost:7150";

const RAW_ENDPOINTS = {
    GET_ALL_RAW_TRANSACTIONS : "get-all-rawtransactions",
    GET_ALL_RAW_TRANSACTIONS_BY_ID : "get-rawtransaction-by-id",
    GET_ALL_RAW_TRANSACTIONS_BY_ACCOUNTNUMBER : "get-rawtransaction-by-accountNumber",
    CREATE_RAW_TRANSACTION : "create-rawtransaction",
    UPDATE_RAW_TRANSACTION : "update-rawtransaction",
    DELETE_RAW_TRANSACTION : "delete-rawtransaction-by-id"
 };

const BANK_ENDPOINTS = {
    GET_ALL_BANK_TRANSACTIONS : "get-all-banktransactions",
    GET_ALL_BANK_TRANSACTIONS_BY_ID : "get-banktransaction-by-id",
    GET_ALL_BANK_TRANSACTIONS_BY_ACCOUNTNUMBER : "get-banktransaction-by-accountNumber",
    GET_ACCOUNT_BALANCE : "get-bank-account-balance",
    CREATE_BANK_TRANSACTION : "create-banktransaction",
    UPDATE_BANK_TRANSACTION : "update-banktransaction",
    DELETE_BANK_TRANSACTION : "delete-banktransaction-by-id"
 };

const DEVELOPMENT = {
    API_URL_GET_ALL_RAW_TRANSACTIONS : `${API_BASE_URL_DEVELOPMENT}/${RAW_ENDPOINTS.GET_ALL_RAW_TRANSACTIONS}`,
    API_URL_GET_ALL_RAW_TRANSACTIONS_BY_ID : `${API_BASE_URL_DEVELOPMENT}/${RAW_ENDPOINTS.GET_ALL_RAW_TRANSACTIONS_BY_ID}`,
    API_URL_GET_ALL_RAW_TRANSACTIONS_BY_ACCOUNTNUMBER : `${API_BASE_URL_DEVELOPMENT}/${RAW_ENDPOINTS.GET_ALL_RAW_TRANSACTIONS_BY_ACCOUNTNUMBER}`,
    API_URL_CREATE_RAW_TRANSACTION : `${API_BASE_URL_DEVELOPMENT}/${RAW_ENDPOINTS.CREATE_RAW_TRANSACTION}`,
    API_URL_UPDATE_RAW_TRANSACTION : `${API_BASE_URL_DEVELOPMENT}/${RAW_ENDPOINTS.UPDATE_RAW_TRANSACTION}`,
    API_URL_DELETE_RAW_TRANSACTION : `${API_BASE_URL_DEVELOPMENT}/${RAW_ENDPOINTS.DELETE_RAW_TRANSACTION}`,

    
    API_URL_GET_ALL_BANK_TRANSACTIONS : `${API_BASE_URL_DEVELOPMENT}/${BANK_ENDPOINTS.GET_ALL_BANK_TRANSACTIONS}`,
    API_URL_GET_ALL_BANK_TRANSACTIONS_BY_ID : `${API_BASE_URL_DEVELOPMENT}/${BANK_ENDPOINTS.GET_ALL_BANK_TRANSACTIONS_BY_ID}`,
    API_URL_GET_ALL_BANK_TRANSACTIONS_BY_ACCOUNTNUMBER : `${API_BASE_URL_DEVELOPMENT}/${BANK_ENDPOINTS.GET_ALL_BANK_TRANSACTIONS_BY_ACCOUNTNUMBER}`,
    API_URL_GET_ACCOUNT_BALANCE : `${API_BASE_URL_DEVELOPMENT}/${BANK_ENDPOINTS.GET_ACCOUNT_BALANCE}`, 
    API_URL_CREATE_BANK_TRANSACTION : `${API_BASE_URL_DEVELOPMENT}/${BANK_ENDPOINTS.CREATE_BANK_TRANSACTION}`,
    API_URL_UPDATE_BANK_TRANSACTION : `${API_BASE_URL_DEVELOPMENT}/${BANK_ENDPOINTS.UPDATE_BANK_TRANSACTION}`,
    API_URL_DELETE_BANK_TRANSACTION : `${API_BASE_URL_DEVELOPMENT}/${BANK_ENDPOINTS.DELETE_BANK_TRANSACTION}`
};

const PRODUCTION = {}



const Constants = process.env.NODE_ENV === 'development' ? DEVELOPMENT : PRODUCTION

export default Constants;