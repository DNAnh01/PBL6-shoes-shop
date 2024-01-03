import React, { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '~/components/SideNav';
import TopNav from '~/components/TopNav';
import { CheckRoleContext } from '~/context/CheckRoleProvider';

const AdminDefaultLayout = ({ children }) => {
    const { role } = useContext(CheckRoleContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (role !== 'admin') navigate('/');
    }, [navigate, role]);
    return (
        <Fragment>
            <TopNav />
            <SideNav />
            <main>{children}</main>
        </Fragment>
    );
};

export default AdminDefaultLayout;
