import axiosClient from '../axiosClient';

const apiBrand = {
    getProductByBrand(brand, pageNumber = 0, pageSize = 12) {
        console.log(brand);
        const url = `/api/products/?color=&size=&minPrice=0&maxPrice=10000000&minDiscount=0&brand=${brand}&stock=null&sort=price_low&pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return axiosClient.get(url);
    },
};
export default apiBrand;
