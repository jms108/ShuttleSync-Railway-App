const SSLCommerzPayment = require('sslcommerz-lts');
require('dotenv').config();

const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWD;
const is_live = false; //true for live, false for sandbox

const sslCommerz = new SSLCommerzPayment(store_id, store_passwd, is_live);

const init = async (paymentData) => {
    try {
        const response = await sslCommerz.init(paymentData);
        return response;
    } catch (err) {
        throw err;
    }
};

const validate = async (val_id) => {
    try {
        const response = await sslCommerz.validate({ val_id });
        return response;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    init,
    validate
};