import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myEmployee, clearErrors } from '../../store/actions/employeeAction';

// material ui import
import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttendanceTopbar from 'ui-component/attendence-topbar';
import { StyledContainer, StyledTable, StyledTableRow, StyledTableCell, StyledMainCardSalary } from 'ui-component/tables/tablestyle';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import Pagination from '@mui/material/Pagination';
import PaymentSidepanel from 'ui-component/payment/paymentsidepanel';
import formatDate from 'utils/date-format';

function createData(srno, uanno, name, joiningDate, contactNumber, dob, designation, dailyWages) {
    return { srno, uanno, name, joiningDate, contactNumber, dob, designation, dailyWages };
}

const rows = [
    createData(1, 123456789123, 'Santosh Padhi', '01/03/2006', '9898989898', '01/01/1998', 'Skilled', 800),
    createData(2, 123456789123, 'Santosh Padhi', '01/03/2006', '9898989898', '01/01/1998', 'Skilled', 800)
];

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });
// ==============================|| VIEW ATTENDENCE PAGE ||============================== //

const ViewEmployee = () => {
    const dispatch = useDispatch();

    const { error, orders } = useSelector((state) => state.myEmployee);
    console.log(orders);

    useEffect(() => {
        dispatch(myEmployee());
        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);
    const [open, setOpen] = useState('inactivesidebar');

    const handleClickOpen = () => {
        setOpen('activesidebar');
    };

    const handleClose = () => {
        setOpen('inactivesidebar');
    };
    return (
        <StyledMainCardSalary>
            <AttendanceTopbar name="Employee List" salary="true" />
            <Typography variant="body2">
                <StyledContainer component={Paper}>
                    <StyledTable sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Sr No.</StyledTableCell>
                                <StyledTableCell align="center">UAN No.</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Joining Date</StyledTableCell>
                                <StyledTableCell align="center">Contact Number</StyledTableCell>
                                <StyledTableCell align="center">Date of Birth</StyledTableCell>
                                <StyledTableCell align="center">Designation</StyledTableCell>
                                <StyledTableCell align="center">Daily Wages</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.employees?.map((row, index) => (
                                <StyledTableRow key={index + 1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center" component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{row?.companyDetails?.UAN}</TableCell>
                                    <TableCell align="center">{row?.personalDetails?.fullName}</TableCell>
                                    <TableCell align="center">{formatDate(row?.companyDetails?.joiningDate)}</TableCell>
                                    <TableCell align="center">{row?.personalDetails?.mobileNo}</TableCell>
                                    <TableCell align="center">{formatDate(row?.personalDetails?.dob)}</TableCell>
                                    <TableCell align="center">{row?.companyDetails?.designation}</TableCell>
                                    <TableCell align="center">{row?.companyDetails?.dailyWages}</TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                    <Pagination count={10} color="primary" style={{ float: 'right' }} />
                </StyledContainer>
            </Typography>
        </StyledMainCardSalary>
    );
};

export default ViewEmployee;
