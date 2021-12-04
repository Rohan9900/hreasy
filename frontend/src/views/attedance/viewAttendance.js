import * as React from 'react';
// material ui import
import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttendanceTopbar from 'ui-component/attendence-topbar';
import { StyledContainer, StyledMainCard, StyledTable, StyledTableCell, StyledTableRow } from 'ui-component/tables/tablestyle';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from 'store/actions/userActions';
import { myAttendence } from 'store/actions/attendenceAction';
import formatDate from 'utils/date-format';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// ==============================|| VIEW ATTENDENCE PAGE ||============================== //

const ViewAttendance = () => {
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const { error, attend } = useSelector((state) => state.getAttendence);
    const [date, setdate] = React.useState(new Date());

    React.useEffect(() => {
        dispatch(myAttendence(page, date.getMonth(), date.getFullYear()));
        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }
    }, [dispatch, page, date]);
    const handleChange = (event, value) => {
        setPage(value);
    };
    const handleDate = (date) => {
        setdate(date);
    };

    console.log(attend);
    return (
        <StyledMainCard>
            <AttendanceTopbar name="View Attendance" date="true" filter="true" parentCallback2={handleDate} />
            <Typography variant="body2">
                <StyledContainer component={Paper}>
                    <StyledTable sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Sr No.</StyledTableCell>
                                <StyledTableCell align="center">UAN No.</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Joining Date</StyledTableCell>
                                <StyledTableCell align="center">Designation</StyledTableCell>
                                <StyledTableCell align="center">Daily wages</StyledTableCell>
                                <StyledTableCell align="center">Working Days</StyledTableCell>
                                <StyledTableCell align="center">Over Time (hr)</StyledTableCell>
                                <StyledTableCell align="center">Employee Attendance</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attend?.employeesAttendance?.map((row, index) => {
                                let count = 0;
                                for (let x = 0; x < row?.employeeAttendance?.length; x += 1) {
                                    if (row?.employeeAttendance[x]?.attendance === true) {
                                        count += 1;
                                        console.log('y');
                                    }
                                }
                                return (
                                    <StyledTableRow
                                        key={(page - 1) * 10 + index + 1}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {(page - 1) * 10 + index + 1}
                                        </TableCell>
                                        <TableCell align="center">{row?.UAN}</TableCell>
                                        <TableCell align="center">{row?.fullName}</TableCell>
                                        <TableCell align="center">{formatDate(row?.joiningDate)}</TableCell>
                                        <TableCell align="center">{row?.designation}</TableCell>
                                        <TableCell align="center">{row?.dailyWages}</TableCell>
                                        <TableCell align="center">{count}</TableCell>
                                        <TableCell align="center">{row?.overTime}</TableCell>

                                        <TableCell align="center">
                                            <Link to={`/attendance/event/${row.employee}`} target="_blank">
                                                <RemoveRedEyeIcon />
                                            </Link>
                                        </TableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </StyledTable>
                    <Pagination
                        count={Math.floor(attend?.length / 10) + 1}
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
export default ViewAttendance;
