import dashboard from './dashboard';
import attendance from './attendance';
import payments from './payments';
import roles from './roles';
import employee from './employee';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, employee, attendance, payments, roles]
};

export default menuItems;
