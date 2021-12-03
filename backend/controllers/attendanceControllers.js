const EmployeeAttendance = require("../models/attendance");
const ErrorHandler = require("../utilis/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utilis/APIFeatures");

// Create New EmployeeAttendance or updateAttendance => api/v1/employee/attendance
exports.newEmployeesAttendance = catchAsyncErrors(async (req, res, next) => {
  const {
    UAN,
    fullName,
    mobileNo,
    joiningDate,
    designation,
    dailyWages,
    employeeAttendance,
    attendanceMonth,
    attendanceYear,
  } = req.body;

  let employeeExist = await EmployeeAttendance.findOne({
    employee: req.body.employee,
    attendanceMonth: attendanceMonth,
    attendanceYear: attendanceYear,
    user: req.user.id,
  });
  console.log(req.body.employee, attendanceMonth, attendanceYear);

  if (employeeExist) {
    let index = -1;
    for (let m = 0; m < employeeExist.employeeAttendance.length; m++) {
      if (employeeExist.employeeAttendance[m].date == employeeAttendance.date) {
        index = m;
        break;
      }
    }
    if (index != -1) {
      employeeExist.employeeAttendance[index].attendance =
        employeeAttendance.attendance;
    }

    if (employeeAttendance != undefined && index == -1) {
      employeeExist.employeeAttendance.push(employeeAttendance);
    }

    employeeExist = await employeeExist.save();
    res.status(201).json({
      success: true,
      message: "Employee Attendance Added Successfully",
      employeeExist,
    });
  } else {
    const employeeAttendances = await EmployeeAttendance.create({
      UAN: UAN,
      fullName: fullName,
      mobileNo: mobileNo,
      joiningDate: joiningDate,
      designation: designation,
      dailyWages: dailyWages,
      employee: req.body.employee,

      employeeAttendance: [employeeAttendance],

      attendanceMonth,
      attendanceYear,
      createdAt: Date.now(),
      employee: req.body.employee,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Employee Attendance Added Successfully",
      employeeAttendances,
    });
  }
});

// Get logged in user Employee attendance  =>   /api/v1/employees/attendance/mylist

exports.myEmployeesAttendance = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;
  const employeeCount = await EmployeeAttendance.countDocuments(); //Passing the data into frontend
  const apiFeatures = new APIFeatures(
    EmployeeAttendance.find({
      user: req.user.id,
      attendanceMonth: req.params.month,
      attendanceYear: req.params.year,
    }),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);
  const attend = await EmployeeAttendance.find({
    user: req.user.id,
    attendanceMonth: req.params.month,
    attendanceYear: req.params.year,
  });
  const length = attend.length;
  const employeesAttendance = await apiFeatures.query;
  console.log(length);
  res.status(200).json({
    success: true,
    count: employeesAttendance.length,
    employeeCount,
    employeesAttendance,
    length: length,
  });
});

// Get logged in user single Employee attendance  =>   /api/v1/employees/attendance/list/:id

exports.myEmployeeAttendance = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;
  const employeeCount = await EmployeeAttendance.countDocuments(); //Passing the data into frontend
  const apiFeatures = new APIFeatures(
    EmployeeAttendance.find({
      user: req.user.id,
      attendanceMonth: req.params.month,
      attendanceYear: req.params.year,
      employee: req.params.employee,
    }),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);
  const employeesAttendance = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: employeesAttendance.length,
    employeeCount,
    employeesAttendance,
  });
});

// Get All Employees | Admin =>/api/v1/admin/employee/attendance/allEmployees

exports.allEmployeesAttendance = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;
  const employeeCount = await EmployeeAttendance.countDocuments(); //Passing the data into frontend
  const apiFeatures = new APIFeatures(EmployeeAttendance.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const employeesAttendance = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: employeesAttendance.length,
    employeeCount,
    employeesAttendance,
  });
});

//Update Employee Overtime => api/v1/employee/attendance/overtime

exports.updateEmployeeOvertime = catchAsyncErrors(async (req, res, next) => {
  const { attendanceMonth, attendanceYear, overTime } = req.body;
  console.log(attendanceMonth, attendanceYear, overTime);
  let employeeExist = await EmployeeAttendance.findOne({
    employee: req.body.employee,
    attendanceMonth: attendanceMonth,
    attendanceYear: attendanceYear,
  });

  if (!employeeExist) {
    return next(new ErrorHandler("Employee Attendance Not Found", 400));
  }

  employeeExist.overTime = overTime;
  employeeExist = await employeeExist.save();

  res.status(200).json({
    success: true,
    message: "Update overtime Details Successfully",
    employeeExist,
  });
});

//Update Employee => api/v1/employee/attendance/availLeave

exports.updateEmployeeAvailLeave = catchAsyncErrors(async (req, res, next) => {
  const { attendanceMonth, attendanceYear, availLeave, user } = req.body;

  let employeeExist = await EmployeeAttendance.findOne({
    employee: req.body.employee,
    attendanceYear: attendanceYear,
    user: user,
  });

  if (!employeeExist) {
    return next(new ErrorHandler("Employee Attendance Not Found", 400));
  }

  employeeExist.availLeave = availLeave;
  employeeExist = await employeeExist.save();

  res.status(200).json({
    success: true,
    message: "Update Avail Leave Details Successfully",
    employeeExist,
  });
});
