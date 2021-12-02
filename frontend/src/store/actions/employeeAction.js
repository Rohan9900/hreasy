import axios from 'axios';
import {
    MY_EMPLOYEE_FAIL,
    MY_EMPLOYEE_REQUEST,
    MY_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAIL,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    CLEAR_ERRORS
} from 'store/constant/employeeconstant';

// Add Employee
export const addEmployee = (userData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_EMPLOYEE_REQUEST });
        axios.defaults.withCredentials = true;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                withCredentials: true
            }
        };

        const { data } = await axios.post('http://localhost:4000/api/v1/employees/new', userData, config);

        dispatch({
            type: ADD_EMPLOYEE_SUCCESS,
            payload: data.user
        });
        dispatch({ type: ADD_EMPLOYEE_REQUEST });
    } catch (error) {
        dispatch({
            type: ADD_EMPLOYEE_FAIL,
            payload: error
        });
    }
};

// Get currently logged in user employee list
export const myEmployee = (page) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    try {
        dispatch({ type: MY_EMPLOYEE_REQUEST });

        const { data } = await axios.get(`http://localhost:4000/api/v1/employees/mylist?page=${page}`, { withCredentials: true });
        dispatch({
            type: MY_EMPLOYEE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MY_EMPLOYEE_FAIL,
            payload: error.response
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
