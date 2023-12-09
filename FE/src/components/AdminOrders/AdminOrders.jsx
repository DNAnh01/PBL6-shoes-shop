import React, { Fragment } from 'react';
import Icon from '../Icons/Icon';
import OrdersTable from '../OrdersTable/OrdersTable';

const AdminOrders = () => {
    return (
        <Fragment>
            <header className={`align-items-center d-flex p-2`}>
                <Icon icon="orders" classes={`ml-2`} />
                <h5 className={`mb-0 ml-4`}>Admin Orders</h5>
            </header>
            <OrdersTable />
        </Fragment>
    );
};

export default AdminOrders;
