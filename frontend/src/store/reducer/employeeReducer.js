import {
    MY_EMPLOYEE_FAIL,
    MY_EMPLOYEE_REQUEST,
    MY_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAIL,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    CLEAR_ERRORS
} from 'store/constant/employeeconstant';

export const addEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            };

        case ADD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employee: action.payload
            };

        case ADD_EMPLOYEE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
export const myEmployeeReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_EMPLOYEE_REQUEST:
            return {
                loading: true
            };
        case MY_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case MY_EMPLOYEE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};
