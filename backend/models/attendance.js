const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    UAN: {
        type: String,
        required: [true, "Please Enter UAN Number"],
        trim: true,

        maxlength: [12, 'UAN Number cannot exceed 12 character']
    },
    fullName: {
        type: String,
        required: [true, "Please Enter Employee Name"],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 character']
    },
    mobileNo: {
        type: Number,

        required: [true, "Please Enter Mobile Number"],
        maxlength: [10, 'Mobile Number cannot exceed 10 Number'],
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    designation: {
        type: String,
        required: [true, "Please Select Employee Designation"],
        enum: {
            values: [
                'Skilled',
                'Semi-Skilled',
                'Un-Skilled',
                'Other'
            ],
            message: "Please select one field from Employee Designation"
        }
    },
    dailyWages: {
        type: Number,
        required: [true, "Please Enter Employee Daily"],
        default: 0.00
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employees'
    },
    employeeAttendance: [{
        date: {
            type: Number,
            default: 1,
        },
        attendance: {
            type: Boolean,
            default: false,
        }
    }],
    overTime: {
        type: Number,
        default: 0,
    },
    availLeave: {
        type: Number,
        default: 0,
    },
    attendanceMonth: {
        type: Number,
        require: true,
        default: 1,
    },
    attendanceYear: {
        type: Number,
        require: true,
        default: 1,

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
});

module.exports = mongoose.model("Attendance", attendanceSchema);
