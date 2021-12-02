// assets
import { IconCash, IconBusinessplan } from '@tabler/icons';

// constant
const icons = {
    IconCash,
    IconBusinessplan
};

// ==============================|| PAYMENTS MENU ITEMS ||============================== //

const payments = {
    id: 'payments',
    title: 'Payments',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'View Salary',
            type: 'item',
            url: '/payments/view-salary',
            icon: icons.IconCash,
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: 'View Bonus',
            type: 'item',
            url: '/payments/view-bonus',
            icon: icons.IconBusinessplan,
            breadcrumbs: false
        }
    ]
};

export default payments;
