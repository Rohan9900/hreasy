import { AiFillPlusCircle } from 'react-icons/ai';
import TextField from '@mui/material/TextField';

export default function OvertimeInput() {
    return (
        <>
            <TextField id="outlined-basic" variant="outlined" />
            <AiFillPlusCircle style={{ width: '40px', height: '40px', color: '#009FBE', margin: '5px' }} />
        </>
    );
}
