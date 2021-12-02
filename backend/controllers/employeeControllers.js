const Employee = require("../models/employees");

const ErrorHandler = require("../utilis/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utilis/APIFeatures");

// Create New Employee => api/v1/employees/new
exports.newEmployees = catchAsyncErrors(async (req, res, next) => {
  const { personalDetails, companyDetails, salaryDetails, bankDetails } =
    req.body;

  const employee = await Employee.create({
    personalDetails,
    companyDetails,
    salaryDetails,
    bankDetails,
    createdAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    message: "Employee Added Successfully",
    employee,
  });
});

// Get single Employee   =>   /api/v1/employee/:id
exports.getSingleEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).populate("user");

  if (!employee) {
    return next(new ErrorHandler("No Employee found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    employee,
  });
});

// Get logged in user Employee   =>   /api/v1/employees/mylist

exports.myEmployees = catchAsyncErrors(async (req, res, next) => {
  try {
    const resPerPage = 10;
    const employeeCount = await Employee.countDocuments(); //Passing the data into frontend
    const apiFeatures = new APIFeatures(
      Employee.find({ user: req.user.id }),
      req.query
    )
      .search()
      .filter()
      .pagination(resPerPage);
    const employees = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: employees.length,
      employeeCount,
      employees,
    });
  } catch (err) {
    console.log(err);
  }
});

// Get All Employees | Admin

exports.allEmployees = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 10;
  const employeeCount = await Employee.countDocuments(); //Passing the data into frontend
  const apiFeatures = new APIFeatures(Employee.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const employees = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: employees.length,
    employeeCount,
    employees,
  });
});

// // Get All Employees => api/v1/employees/
// exports.getEmployees = catchAsyncErrors (async (req, res, next) => {
//
//     const resPerPage = 10
//     const employeeCount = await Employee.countDocuments(); //Passing the data into frontend
//
//     const apiFeatures = new APIFeatures(Employee.find(),req.query).search().filter().pagination(resPerPage)
//     const employees = await apiFeatures.query
//
//     res.status(200).json({
//         success: 'true',
//         count: employees.length,
//         employeeCount,
//         employees
//     })
//
// })
//
// //Get Specific Employees => api/v1/employee:id
//
// exports.getSingleEmployee = catchAsyncErrors (async (req, res, next) => {
//
//     const employee = await Employee.findById(req.params.id);
//
//     if (!employee) {
//         return next(new ErrorHandler('Employee Not Found',400))
//     }
//
//     res.status(200).json({
//         success: true,
//         employee
//     })
// })
//

//Update Employee => api/v1/admin/employee/:id

exports.updateEmployee = catchAsyncErrors(async (req, res, next) => {
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorHandler("Employee Not Found", 400));
  }

  // await employee.save({validateBeforeSave:false})

  employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Update Details Successfully",
    employee,
  });
});

//Delete Employee => api/v1/admin/product/:id

exports.deleteEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorHandler("Employee Not Found", 400));
  }

  await employee.remove();

  res.status(200).json({
    success: true,
    message: "Employee Deleted Successfully",
  });
});
