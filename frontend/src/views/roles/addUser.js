import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Container, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const ColorButton = styled(Button)(({ theme }) => ({
    marginTop: '20px',
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '22px',
    width: '100%',
    backgroundColor: '#009FBE'
}));

export default function AddUser() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phoneNo: '',
        companyName: ''
    });

    const { name, email, password, phoneNo, companyName } = user;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/roles/add-user');
        }

        if (error) {
            console.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate]);

    const [role, setRole] = useState('');
    const handleChange = (event) => {
        setRole(event.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('phoneNo', phoneNo);
        formData.set('companyName', companyName);
        dispatch(register(formData));
    };

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Container component={Box} p={4}>
                <Typography variant="h1" gutterBottom>
                    Add User
                </Typography>
                <form encType="multipart/form-data" onSubmit={submitHandler}>
                    <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ marginTop: '35px' }}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Full name"
                                placeholder="Enter Full Name"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                                value={name}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                id="phoneNo"
                                name="phoneNo"
                                label="Mobile Number"
                                placeholder="Enter Mobile Number"
                                fullWidth
                                autoComplete="mobile-number"
                                variant="outlined"
                                value={phoneNo}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                id="email"
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="Enter Email Address"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="outlined"
                                value={email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                type="password"
                                label="Set Password"
                                placeholder="Set User Password"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="outlined"
                                value={password}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                id="companyName"
                                name="companyName"
                                label="Company Name"
                                fullWidth
                                autoComplete="Company Name"
                                variant="outlined"
                                value={companyName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <ColorButton variant="contained" type="submit">
                                Add User
                            </ColorButton>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </>
    );
}
