const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    personalDetails:{

        fullName: {
            type: String,
            required: [true, "Please Enter Employee Name"],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 character']
        },

        fatherName: {
            type: String,
            required: [true, "Please Enter Father Name"],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 character']
        },
        mobileNo: {
            type: Number,
            unique: true,
            required: [true, "Please Enter Mobile Number"],
            maxlength: [10, 'Mobile Number cannot exceed 10 Number'],
        },
        gender: {
            type: String,
            required: [true, "Please Select Gender"],
            enum: {
                values: [
                    'Male',
                    'Female'
                ],
                message: "Please select Male or Female"
            }
        },
        dob: {
            type: Date,
            required: [true, "Please Enter Date of Birth"],
            trim:true
        },
        currentAddress: {
            type: String,
            required: [true, "Please Enter Current Address"],
        },
        permanentAddress: {
            type: String,
            required: [true, "Please Enter Permanent Address"],
        }
    },
    companyDetails:{
        UAN: {
            type: String,
            required: [true, "Please Enter UAN Number"],
            trim: true,
            unique: true,
            maxlength: [12, 'UAN Number cannot exceed 12 character']
        },
        aadhaarNo: {
            type: Number,
            required: [true, "Please Enter Aadhaar Number"],
            unique: true,
            maxlength: [12, 'Aadhaar Number cannot be exceed 12 Number'],
        },
        panNo: {
            type: String,
            required: [true, "Please Enter UAN Number"],
            trim: true,
            unique: true,
            maxlength: [10, 'PAN Number cannot exceed 12 character']
        },
        drivingLicense: {
            type: String,
            required: [true, "Please Enter Driving Licenses Number"],
            trim: true,
            unique: true,
            maxlength: [14, 'Driving Licenses Number cannot exceed 12 character']
        },
        designation: {
            type: String,
            required: [true, "Please Select Employee Designation"],
            enum: {
                values: [
                    '' +
                    '',
                    'Semi-Skilled',
                    'Un-Skilled',
                    'Other'
                ],
                message: "Please select one field from Employee Designation"
            }
        },
        joiningDate: {
            type: Date,
            default: Date.now
        },
        dailyWages: {
            type: Number,
            required: [true, "Please Enter Daily Wages"],
            maxlength: [7, 'Price cannot exceed 5 character'],
            default: 0.00
        }
    },
    salaryDetails:{
        basicSalary: {
            type: Number,
            required: [true, "Please Enter Basic Salary"],
            default: 0.00
        },
        hra: {
            type: Number,
            required: [true, "Please Enter HRA"],
            default: 0.00
        },
        con: {
            type: Number,
            required: [true, "Please Enter Con"],
            default: 0.00
        },
        medical: {
            type: Number,
            required: [true, "Please Enter Medical Expenses"],
            default: 0.00
        },
        education: {
            type: Number,
            required: [true, "Please Enter Education Expenses"],
            default: 0.00
        },
        canteen: {
            type: Number,
            required: [true, "Please Enter Canteen Expenses"],
            default: 0.00
        },
        incomeTax: {
            type: Number,
            required: [true, "Please Enter Income Tax"],
            default: 0.00
        },
    },
    bankDetails:{
        bankName: {
            type: String,
            required: [true, "Please Enter Bank Name"],
            trim: true,
        },
        ifscCode: {
            type: String,
            required: [true, "Please Enter IFSC"],
            trim: true,
            maxlength: [11, 'IFSC Code cannot exceed 11 Digit']
        },

        accountNo: {
            type: Number,
            required: [true, "Please Enter Account Number"],
            trim: true,
            unique: true,
            maxlength: [18, 'Account Number cannot exceed 18 digit']
        },
        PFNominee: {
            type: String,
            required: [true, "Please Enter PF Nominee Name"],
            trim: true
        },
        gratuityNominee: {
            type: String,
            required: [true, "Please Enter Gratuity Nominee Name"],
            trim: true
        },
        leaveNominee: {
            type: String,
            required: [true, "Please Enter Leave Nominee Name"],
            trim: true
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Employees', employeeSchema);
