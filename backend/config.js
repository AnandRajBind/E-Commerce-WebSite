import dotenv from 'dotenv'
dotenv.config();
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

const STRIPE_SECRET_KEY = 'sk_test_51RkdDp4Fe5gArWInZooGo3zuEZY67jDeoDAcHg2ejMevUE20jz50VunoYSsF5obzxwJV38eRxd2XRErYGbEpgIwZ00TAt8nPtj'
export default {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    STRIPE_SECRET_KEY
}