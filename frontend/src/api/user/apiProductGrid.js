import axiosClient from '../axiosClient';

const apiProductGrid = {
    getAllProduct(pageNumber = 0, pageSize) {
        const url = `/api/products/?color=&size=&minPrice=0&maxPrice=100000000&minDiscount=0&brand=&stock=null&sort=price_low&pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return axiosClient.get(url);
    },
};
export default apiProductGrid;
