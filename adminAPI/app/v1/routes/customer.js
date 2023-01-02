const express = require('express');
const customer = require('../models/customer');

const router = express.Router();
const routeName = '/customer';

router.get(`${routeName}/`, customer.getAllCustomers);
router.get(`${routeName}/:username`, customer.getCustomerByUsername);
router.put(`${routeName}/:username`, customer.updateACustomer);
router.put(`${routeName}/delete/:username`, customer.deleteUser);

module.exports = router;
