const express = require('express')
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')

const {newEmployees,getSingleEmployee,updateEmployee, deleteEmployee,myEmployees,allEmployees} = require('../controllers/employeeControllers')

router.route('/employees/new').post(isAuthenticatedUser,newEmployees);
router.route('/employee/:id').get(isAuthenticatedUser,getSingleEmployee);
router.route('/employees/mylist').get(isAuthenticatedUser,myEmployees);
router.route('/admin/employee/allEmployees').get(isAuthenticatedUser, authorizeRoles('admin'),allEmployees)
router.route('/employee/:id').put(isAuthenticatedUser, authorizeRoles('admin'),updateEmployee).delete(isAuthenticatedUser, authorizeRoles('admin'),deleteEmployee);

module.exports = router;
