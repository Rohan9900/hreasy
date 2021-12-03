import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/core/SwitchUnstyled';
import { useDispatch, useSelector } from 'react-redux';
import { addAttendence, myAttendence, myEmployeeAttendence } from '../store/actions/attendenceAction';
import './switch.css';

export default function BasicSwitch(props) {
    const { getInputProps, checked, focusVisible } = useSwitch(props);
    const { data, date, page, disabled, largest, index } = props;
    const [state, setState] = React.useState(true);
    const { error, attend, isyes } = useSelector((state) => state.getSingleEmployeeAttendence);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (disabled === false && page > largest && isyes === false) {
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
    }, [disabled, page]);

    React.useEffect(() => {
        /* eslint no-underscore-dangle: 0 */
        dispatch(myEmployeeAttendence(data?._id, date?.getMonth(), date?.getFullYear()));
        if (attend !== undefined && isyes === true && isyes !== null) {
            for (let i = 0; i < attend.employeeAttendance.length; i += 1) {
                if (attend.employeeAttendance[i].date === date?.getDate() && attend.employeeAttendance[i].attendance === true) {
                    setState(true);
                    console.log('y');
                } else if (attend.employeeAttendance[i].date === date?.getDate() && attend.employeeAttendance[i].attendance === false) {
                    setState(false);
                    console.log('n');
                }
            }
        }
    }, [date, page]);

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
