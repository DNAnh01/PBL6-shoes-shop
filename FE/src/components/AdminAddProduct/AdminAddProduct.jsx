import React, { Fragment } from 'react';
import AddProductPage from '../AddProductPage';
import Icon from '../Icons/Icon';

const AdminAddProduct = () => {
    return (
        <Fragment>
            <header className={`align-items-center d-flex p-2`}>
                <Icon icon="add_product" classes={`ml-2`} />
                <h5 className={`mb-0 ml-4`}>Admin Add Product</h5>
            </header>
            <AddProductPage />
        </Fragment>
    );
};

export default AdminAddProduct;
