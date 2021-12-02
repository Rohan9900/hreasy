import * as React from 'react';
// material ui import
import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttendanceTopbar from 'ui-component/attendence-topbar';
import { StyledContainer, StyledMainCard, StyledTable, StyledTableRow, StyledTableCell } from 'ui-component/tables/tablestyle';
import Pagination from '@mui/material/Pagination';

function createData(srno, uanno, name, designation, dailywages, totalleave, availleave, carryleave) {
    return { srno, uanno, name, designation, dailywages, totalleave, availleave, carryleave };
}

const rows = [
    createData(1, 1234, 'virat', 'Engineer', 500, 5, 1, 3),
    createData(2, 1234, 'virat', 'Engineer', 500, 5, 1, 3),
    createData(3, 1234, 'virat', 'Engineer', 500, 5, 1, 3),
    createData(4, 1234, 'virat', 'Engineer', 500, 5, 1, 3),
    createData(5, 1234, 'virat', 'Engineer', 500, 5, 1, 3),
    createData(6, 1234, 'virat', 'Engineer', 500, 5, 1, 3)
];

// ==============================|| VIEW ATTENDENCE PAGE ||============================== //

const LeaveManage = () => (
    <StyledMainCard>
        <AttendanceTopbar name="Manage Leave" csv="true" filter="true" />
        <Typography variant="body2">
            <StyledContainer component={Paper}>
                <StyledTable sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Sr No.</StyledTableCell>
                            <StyledTableCell align="center">UAN No.</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Designation</StyledTableCell>
                            <StyledTableCell align="center">Daily wages</StyledTableCell>
                            <StyledTableCell align="center">Total Leave</StyledTableCell>
                            <StyledTableCell align="center">Avail Leave</StyledTableCell>
                            <StyledTableCell align="center">Carry Forward</StyledTableCell>
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
                                <TableCell align="center">{row.designation}</TableCell>
                                <TableCell align="center">{row.dailywages}</TableCell>
                                <TableCell align="center">{row.totalleave}</TableCell>
                                <TableCell align="center">{row.availleave}</TableCell>
                                <TableCell align="center">{row.carryleave}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
                <Pagination count={10} color="primary" style={{ float: 'right' }} />
            </StyledContainer>
        </Typography>
    </StyledMainCard>
);

export default LeaveManage;
