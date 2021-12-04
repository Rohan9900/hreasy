import * as React from 'react';
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
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { useDispatch, useSelector } from 'react-redux';

import { myEmployee } from 'store/actions/employeeAction';
import formatDate from 'utils/date-format';
import { clearErrors } from 'store/actions/userActions';

function printDocument() {
    const pdfTable = document.getElementById('capture');
    // html to pdf format
    const html = htmlToPdfmake(pdfTable.innerHTML);
    console.log(html);
    const documentDefinition = {
        content: html,
        table: '<as specified in doc definition>',
        styles: {
            table: {
                textAlign: 'center',
                borderCollapse: 'collapse',
                width: '100%'
            },
            th: {
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: '10px 20px'
            },
            td: {
                border: '1px solid black',
                borderCollapse: 'collapse',
                padding: '10px 20px'
            }
        }
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).download();
}

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });
// ==============================|| VIEW ATTENDENCE PAGE ||============================== //

const ViewSalary = () => {
    const [open, setOpen] = React.useState('inactivesidebar');
    const [page, setPage] = React.useState(1);
    const [date, setdate] = React.useState(new Date());
    const [data, setdata] = React.useState({});
    const handleClickOpen = (item) => {
        setOpen('activesidebar');
        setdata(item);
    };
    const { error, orders } = useSelector((state) => state.myEmployee);
    const handleClose = () => {
        setOpen('inactivesidebar');
    };
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(myEmployee(page));
        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }
    }, [dispatch, page]);

    const handleChange = (event, value) => {
        setPage(value);
    };
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return (
        <>
            <StyledMainCardSalary>
                <AttendanceTopbar name="Employee Salary List" salary="true" parentCallback={printDocument} />
                <Typography variant="body2">
                    <StyledContainer component={Paper}>
                        <StyledTable sx={{ minWidth: 650 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Sr No.</StyledTableCell>
                                    <StyledTableCell align="center">UAN No.</StyledTableCell>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Daily wages</StyledTableCell>
                                    <StyledTableCell align="center">Paid Days</StyledTableCell>
                                    <StyledTableCell align="center">Account No</StyledTableCell>
                                    <StyledTableCell align="center">Net Salary</StyledTableCell>
                                    <StyledTableCell align="center">View Salary</StyledTableCell>
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
                                        <TableCell align="center">{item?.companyDetails?.dailyWages}</TableCell>
                                        <TableCell align="center">{30}</TableCell>
                                        <TableCell align="center">{item?.bankDetails?.accountNo}</TableCell>
                                        <TableCell align="center">{30 * item?.companyDetails?.dailyWages}</TableCell>
                                        <TableCell align="center">
                                            <TableViewOutlinedIcon
                                                onClick={() => {
                                                    handleClickOpen(item);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            />
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
                <div className={`view-salary-sidebar ${open}`}>
                    <Typography variant="body2">
                        <PaymentSidepanel data={data} parentCallback={handleClose} />
                    </Typography>
                </div>
            </StyledMainCardSalary>
            <div id="capture" style={{ display: 'none' }}>
                <table style={{ textAlign: 'center', width: '100%' }} width="100%">
                    <thead>
                        <tr>
                            <td colSpan="5">Total HR</td>
                        </tr>
                        <tr>
                            <td colSpan="5">
                                Bank Statement Salary Disbursement {month[date.getMonth()]}-{date.getDate()}
                            </td>
                        </tr>
                        <tr>
                            <th>Sr No</th>
                            <th>Name</th>
                            <th>Bank Account Number</th>
                            <th>Bank IFSC Code</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.employees?.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.personalDetails.fullName}</td>
                                <td>{item.bankDetails.accountNo}</td>
                                <td>{item.bankDetails.ifscCode}</td>
                                <td />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ViewSalary;
