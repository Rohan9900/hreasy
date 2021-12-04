import axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAttendence, myAttendence, myEmployeeAttendence } from '../store/actions/attendenceAction';
import './switch.css';

export default function BasicSwitch(props) {
    const { data, date, page, disabled, largest, index, selecttoday } = props;
    const [state, setState] = React.useState(true);

    const dispatch = useDispatch();

    React.useEffect(() => {
        /* eslint no-underscore-dangle: 0 */
        axios
            .get(`http://localhost:4000/api/v1/employee/attendance/mylist/${date?.getMonth() + 1}/${date?.getFullYear()}/${data?._id}`, {
                withCredentials: true
            })
            .then((res) => {
                if (disabled === false && res.data.employeesAttendance !== undefined) {
                    for (let i = 0; i < res.data.employeesAttendance[0].employeeAttendance.length; i += 1) {
                        if (
                            res.data.employeesAttendance[0].employeeAttendance[i].date === date?.getDate() &&
                            res.data.employeesAttendance[0].employeeAttendance[i].attendance === true
                        ) {
                            setState(true);
                            console.log('y');
                        } else if (
                            res.data.employeesAttendance[0].employeeAttendance[i].date === date?.getDate() &&
                            res.data.employeesAttendance[0].employeeAttendance[i].attendance === false
                        ) {
                            setState(false);
                            console.log('n');
                        } else {
                            dispatch(
                                addAttendence({
                                    UAN: data?.companyDetails?.UAN,
                                    fullName: data?.personalDetails?.fullName,
                                    mobileNo: data?.personalDetails?.mobileNo,
                                    joiningDate: data?.companyDetails?.joiningDate,
                                    designation: data?.companyDetails?.designation,
                                    dailyWages: data?.companyDetails?.dailyWages,
                                    employeeAttendance: { date: date?.getDate(), attendance: true },
                                    attendanceMonth: date?.getMonth() + 1,
                                    attendanceYear: date?.getFullYear(),
                                    /* eslint no-underscore-dangle: 0 */
                                    employee: data?._id
                                })
                            );
                        }
                    }
                } else if (disabled === false) {
                    dispatch(
                        addAttendence({
                            UAN: data?.companyDetails?.UAN,
                            fullName: data?.personalDetails?.fullName,
                            mobileNo: data?.personalDetails?.mobileNo,
                            joiningDate: data?.companyDetails?.joiningDate,
                            designation: data?.companyDetails?.designation,
                            dailyWages: data?.companyDetails?.dailyWages,
                            employeeAttendance: { date: date?.getDate(), attendance: true },
                            attendanceMonth: date?.getMonth() + 1,
                            attendanceYear: date?.getFullYear(),
                            /* eslint no-underscore-dangle: 0 */
                            employee: data?._id
                        })
                    );
                }
            });
    }, [date, page, disabled, selecttoday]);

    const x = true;
    const handleSwitchChange = (e) => {
        dispatch(
            addAttendence({
                UAN: data?.companyDetails?.UAN,
                fullName: data?.personalDetails?.fullName,
                mobileNo: data?.personalDetails?.mobileNo,
                joiningDate: data?.companyDetails?.joiningDate,
                designation: data?.companyDetails?.designation,
                dailyWages: data?.companyDetails?.dailyWages,
                employeeAttendance: { date: date?.getDate(), attendance: e.target.checked },
                attendanceMonth: date?.getMonth() + 1,
                attendanceYear: date?.getFullYear(),
                /* eslint no-underscore-dangle: 0 */
                employee: data?._id
            })
        );
        setState(e.target.checked);
    };

    return (
        <span>
            <label className="switch" htmlFor={`x${index}`}>
                <input type="checkbox" checked={state} onChange={handleSwitchChange} disabled={disabled} id={`x${index}`} />
                <span className="slider round" />
            </label>
        </span>
    );
}
