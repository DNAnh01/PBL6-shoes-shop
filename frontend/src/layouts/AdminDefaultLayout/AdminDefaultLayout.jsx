import React, { Fragment } from 'react';
import SideNav from '~/components/SideNav';
import TopNav from '~/components/TopNav';

const AdminDefaultLayout = ({ children }) => {
    return (
        <Fragment>
            <TopNav />
            <SideNav />
            <main>{children}</main>
        </Fragment>
    );
};

export default AdminDefaultLayout;
