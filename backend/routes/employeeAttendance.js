const express = require('express')
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')

const {newEmployeesAttendance, myEmployeesAttendance, allEmployeesAttendance, updateEmployeeOvertime, updateEmployeeAvailLeave, myEmployeeAttendance} = require('../controllers/attendanceControllers');

router.route('/employee/attendance').post(isAuthenticatedUser,newEmployeesAttendance);
router.route('/employee/attendance/mylist/:month/:year').get(isAuthenticatedUser,myEmployeesAttendance);
router.route('/employee/attendance/mylist/:month/:year/:employee').get(isAuthenticatedUser,myEmployeeAttendance);
router.route('/admin/employee/attendance/allEmployees').get(isAuthenticatedUser, authorizeRoles('admin'),allEmployeesAttendance)
router.route('/employee/attendance/overtime').post(isAuthenticatedUser, updateEmployeeOvertime);
router.route('/employee/attendance/availleave').post(isAuthenticatedUser,updateEmployeeAvailLeave);
module.exports = router;
