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

function createData(srno, uanno, name, dailywages, paiddays, accountno, netsalary, viewsalary) {
    return { srno, uanno, name, dailywages, paiddays, accountno, netsalary, viewsalary };
}

const rows = [
    createData(1, 1234, 'virat', 500, 30, 1234567890, 5),
    createData(2, 1234, 'virat', 500, 30, 1234567890, 5),
    createData(3, 1234, 'virat', 500, 30, 1234567890, 5),
    createData(4, 1234, 'virat', 500, 30, 1234567890, 5),
    createData(5, 1234, 'virat', 500, 30, 1234567890, 5),
    createData(6, 1234, 'virat', 500, 30, 1234567890, 5)
];
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });
// ==============================|| VIEW ATTENDENCE PAGE ||============================== //

const ViewSalary = () => {
    const [open, setOpen] = React.useState('inactivesidebar');

    const handleClickOpen = () => {
        setOpen('activesidebar');
    };

    const handleClose = () => {
        setOpen('inactivesidebar');
    };
    return (
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
                            {rows.map((row) => (
                                <StyledTableRow key={row.srno} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.srno}
                                    </TableCell>
                                    <TableCell align="center">{row.uanno}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.dailywages}</TableCell>
                                    <TableCell align="center">{row.paiddays}</TableCell>
                                    <TableCell align="center">{row.accountno}</TableCell>
                                    <TableCell align="center">{row.netsalary}</TableCell>
                                    <TableCell align="center">
                                        <TableViewOutlinedIcon onClick={handleClickOpen} style={{ cursor: 'pointer' }} />
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                    <Pagination count={10} color="primary" style={{ float: 'right' }} />
                </StyledContainer>
            </Typography>
            <div className={`view-salary-sidebar ${open}`}>
                <Typography variant="body2">
                    <PaymentSidepanel parentCallback={handleClose} />
                </Typography>
            </div>
            <div id="capture" style={{ display: 'none' }}>
                <table style={{ textAlign: 'center' }} width="100%">
                    <thead>
                        <tr>
                            <td colSpan="5">Total HR</td>
                        </tr>
                        <tr>
                            <td colSpan="5">Bank Statement Salary Disbursement Sep-21</td>
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
                        <tr>
                            <td>1</td>
                            <td>araj</td>
                            <td>1234567890</td>
                            <td>Punb124</td>
                            <td>25000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </StyledMainCardSalary>
    );
};

export default ViewSalary;
