import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import apiGetAllUser from '~/api/admin/apiGetAllUser';

export default function CustomersTable() {
    const [users, setUsers] = useState([]);
    console.log(users);
    const getAllUser = useCallback(async () => {
        try {
            const response = await apiGetAllUser.getAllUser();
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getAllUser();
    }, [getAllUser]);

    return (
        <div>
            <TableContainer component={Paper} variant="outlined" className="custom-table-container">
                <Table aria-label="demo table">
                    <TableHead>
                        <TableRow className="custom-header">
                            <TableCell className="custom-header-order">Last Name</TableCell>
                            <TableCell className="custom-header-order">First Name</TableCell>
                            <TableCell className="custom-header-order">Email</TableCell>
                            <TableCell className="custom-header-order">Address</TableCell>
                            <TableCell className="custom-header-order">Phone</TableCell>
                            <TableCell className="custom-header-order">Create At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="custom-cell">
                                <TableCell align="left" className="custom-cell-order">
                                    {user.lastName}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {user.firstName}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {user.email}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    <span>
                                        {user.addresses.length > 0 && (
                                            <div>
                                                {`${user.addresses[user.addresses.length - 1].streetAddress} ${
                                                    user.addresses[user.addresses.length - 1].city
                                                }`}
                                            </div>
                                        )}
                                    </span>
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {user.mobile}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {new Date(user.createAt).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
