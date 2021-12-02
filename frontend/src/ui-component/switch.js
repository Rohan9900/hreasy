import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/core/SwitchUnstyled';
import { useDispatch, useSelector } from 'react-redux';
import { addAttendence } from '../store/actions/attendenceAction';
import './switch.css';

export default function BasicSwitch(props) {
    const { getInputProps, checked, focusVisible } = useSwitch(props);
    const { data, date, page, disabled, largest } = props;
    const [state, setState] = React.useState(true);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (disabled === false && page > largest) {
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
                attendanceMonth: date?.getMonth(),
                attendanceYear: date?.getFullYear(),
                /* eslint no-underscore-dangle: 0 */
                employee: data?._id
            })
        );
        setState(e.target.checked);
    };

    console.log(state);

    return (
        <span>
            <label className="switch" htmlFor="x">
                <input type="checkbox" checked={state} onChange={handleSwitchChange} disabled={disabled} id="x" />
                <span className="slider round" />
            </label>
        </span>
    );
}
