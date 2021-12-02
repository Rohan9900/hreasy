import * as React from 'react';
// material ui import
import { Button, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BasicSwitch from 'ui-component/switch';
import AttendanceTopbar from 'ui-component/attendence-topbar';
import { StyledContainer, StyledMainCard, StyledTable, StyledTableRow, StyledTableCell } from 'ui-component/tables/tablestyle';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';

import { myEmployee } from 'store/actions/employeeAction';
import formatDate from 'utils/date-format';
import { clearErrors } from 'store/actions/userActions';

// ==============================|| WITH STYLE FOR TABLE STYLE ||======================== //

// ==============================|| ADD ATTENDENCE PAGE ||============================== //

const AddAttendance = () => {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [disabled, setdisabled] = React.useState(true);
    const { error, orders } = useSelector((state) => state.myEmployee);
    const [date, setdate] = React.useState(null);
    const [largestpage, setlargestpage] = React.useState(0);
    console.log(orders);

    React.useEffect(() => {
        dispatch(myEmployee(page));
        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }
    }, [dispatch, page]);

    const handleChange = (event, value) => {
        if (value > largestpage) {
            setlargestpage(value);
        }
        setPage(value);
    };
    const handleSwitch = (date) => {
        setdisabled(false);
        setdate(date);
    };
    return (
        <StyledMainCard>
            <AttendanceTopbar name="Daily Attendance" date="true" filter="true" isshow={1} parentCallback2={handleSwitch} />
            <Typography variant="body2">
                <StyledContainer>
                    <StyledTable sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Sr No.</StyledTableCell>
                                <StyledTableCell align="center">UAN No.</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Joining Date</StyledTableCell>
                                <StyledTableCell align="center">Phone No</StyledTableCell>
                                <StyledTableCell align="center">Designation</StyledTableCell>
                                <StyledTableCell align="center">Daily wages</StyledTableCell>
                                <StyledTableCell align="center">Attendance</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.employees?.map((item, index) => (
                                <StyledTableRow
                                    key={(page - 1) * 10 + index + 1}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {(page - 1) * 10 + index + 1}
                                    </TableCell>
                                    <TableCell align="center">{item?.companyDetails?.UAN}</TableCell>
                                    <TableCell align="center">{item?.personalDetails?.fullName}</TableCell>
                                    <TableCell align="center">{formatDate(item?.companyDetails?.joiningDate)}</TableCell>
                                    <TableCell align="center">{item?.personalDetails?.mobileNo}</TableCell>
                                    <TableCell align="center">{item?.companyDetails?.designation}</TableCell>
                                    <TableCell align="center">{item?.companyDetails?.dailyWages}</TableCell>
                                    <TableCell align="center">
                                        <BasicSwitch disabled={disabled} data={item} largest={largestpage} page={page} date={date} />
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                    <Pagination
                        count={Math.floor(orders?.employeeCount / 10) + 1}
                        color="primary"
                        style={{ float: 'right' }}
                        page={page}
                        onChange={handleChange}
                    />
                </StyledContainer>
            </Typography>
        </StyledMainCard>
    );
};
export default AddAttendance;
