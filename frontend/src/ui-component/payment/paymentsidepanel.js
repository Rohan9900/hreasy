import React from 'react';
import './paymentsidepanel.css';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PhoneIcon from '@mui/icons-material/Phone';
import CancelIcon from '@mui/icons-material/Cancel';

const PaymentSidepanel = (props) => {
    const { parentCallback } = props;
    return (
        <div className="salary-sidepanel-container">
            <div className="salary-sidepanel-box1">
                <span className="close-sidebar" role="button" onKeyDown={parentCallback} tabIndex={-27} onClick={parentCallback}>
                    <CancelIcon style={{ cursor: 'pointer' }} />
                </span>
                <div className="salary-sidepanel-box-img">
                    <img
                        className="salary-sidepanel-img"
                        alt="user"
                        src="https://ik.imagekit.io/6vy1oi4m4uh/profile-pic_DBEIl1ZKUGo.png?updatedAt=1637958057447"
                    />
                </div>
                <div className="salary-sidepanel-box-head">
                    <h2>Santosh Padhi</h2>
                    <div className="sidepanel-icon">
                        <span>
                            <BusinessCenterIcon />
                            <span>Engineer</span>
                        </span>
                        <span>
                            <PhoneIcon />
                            <span>9723935293</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="salary-sidepanel-box2">
                <div>
                    <p>UAN No</p>
                    <b>101607276922</b>
                </div>
                <div>
                    <span style={{ marginLeft: '13px' }}>
                        <p>Paid Days</p>
                        <b>30</b>
                    </span>
                    <span>
                        <p>OT</p>
                        <b>0</b>
                    </span>
                </div>
                <div>
                    <p>Daily Wages</p>
                    <b>890.00</b>
                </div>
            </div>
            <div className="salary-sidepanel-box3">
                <div className="salary-sidepanel-box-head3">Total Earning</div>
                <div className="salary-sidepanel-box-cont">
                    <div>
                        <p>Basic Salary</p>
                        <b>10,856.00</b>
                    </div>
                    <div>
                        <p>HRA</p>
                        <b>5,428.00</b>
                    </div>
                    <div>
                        <p>Con</p>
                        <b>4,144.00</b>
                    </div>
                    <div>
                        <p>Medical</p>
                        <b>3,063.00</b>
                    </div>
                    <div>
                        <p>Education</p>
                        <b>5,203.00</b>
                    </div>
                </div>
            </div>
            <div className="salary-sidepanel-box3">
                <div className="salary-sidepanel-box-head3">Total Deduction</div>
                <div className="salary-sidepanel-box-cont">
                    <div>
                        <p>Provident Fund (PF)</p>
                        <b>1,800.00</b>
                    </div>
                    <div>
                        <p>Advance Payment</p>
                        <b>500</b>
                    </div>
                    <div>
                        <p>Canteen</p>
                        <b>1000</b>
                    </div>
                    <div>
                        <p>Income Tax</p>
                        <b>0.00</b>
                    </div>
                    <div>
                        <p>Loan</p>
                        <b>0.00</b>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PaymentSidepanel;
