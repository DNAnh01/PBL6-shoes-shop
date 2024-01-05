package com.dnanh01.backend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;

import com.dnanh01.backend.dto.RevenueOrProfitStatsDto;
import com.dnanh01.backend.dto.SingleStatsDto;
import com.dnanh01.backend.model.Order;
import com.dnanh01.backend.model.User;

import jakarta.persistence.QueryHint;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@Query("SELECT o FROM Order o " +
            "WHERE o.user.id = :userId " +
            "AND (o.orderStatus = 'PENDING' OR o.orderStatus = 'CONFIRMED' OR o.orderStatus = 'SHIPPED' OR o.orderStatus = 'DELIVERED')")
	public List<Order> getUsersOrders(@Param("userId") Long userId);

	
	@Query("SELECT o FROM Order o WHERE o.orderStatus IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED')")
    public List<Order> getAllOrders();
	
	public List<Order> findByUser(User user);

	@Query("SELECT o FROM Order o " +
            "WHERE o.user.id = :userId " +
            "AND (o.orderStatus = 'CONFIRMED')")
	public List<Order> getConfirmedOrdersForUser(@Param("userId") Long userId);
    
	  // --------------------DASHBOARD ADMIN--------------------

    // thống kê doanh thu, lợi nhuận theo từng giờ của một ngày nhất định được
    // chọn
    @Query(value = "WITH HourReference AS ( " +
                    "     SELECT 0 AS hour_of_day " +
                    "     UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 " +
                    "     UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 " +
                    "     UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 " +
                    "     UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 " +
                    "     UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 " +
                    "     UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 " +
                    "     UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 " +
                    "     UNION SELECT 22 UNION SELECT 23 " +
                    ") " +
                    "SELECT " +
                    "    hr.hour_of_day AS " + RevenueOrProfitStatsDto.TIME_POINT + ", " +
                    "    COALESCE(SUM(revenue_subquery.total_discounted_price), 0) AS "
                    + RevenueOrProfitStatsDto.REVENUE + ", " +
                    "    COALESCE(SUM(profit_subquery.total_profit), 0) AS " + RevenueOrProfitStatsDto.PROFIT + " "
                    +
                    "FROM " +
                    "    HourReference hr " +
                    "LEFT JOIN " +
                    "    ( " +
                    "        SELECT " +
                    "            DATE_FORMAT(o1.order_date, '%H') AS hour_of_day, " +
                    "            o1.total_discounted_price " +
                    "        FROM " +
                    "            orders o1 " +
                    "        WHERE " +
                    "            DATE_FORMAT(o1.order_date, '%d/%m/%Y') = :selectedDay " +
                    "            AND o1.order_status = 'CONFIRMED' " +
                    "    ) revenue_subquery ON hr.hour_of_day = revenue_subquery.hour_of_day " +
                    "LEFT JOIN " +
                    "    ( " +
                    "        SELECT " +
                    "            DATE_FORMAT(o2.order_date, '%H') AS hour_of_day, " +
                    "            SUM((p.discounted_price - p.warehouse_price) * oi.quantity) AS total_profit " +
                    "        FROM " +
                    "            orders o2 " +
                    "            JOIN order_item oi ON o2.id = oi.order_id " +
                    "            JOIN product p ON oi.product_id = p.id " +
                    "        WHERE " +
                    "            DATE_FORMAT(o2.order_date, '%d/%m/%Y') = :selectedDay " +
                    "            AND o2.order_status = 'CONFIRMED' " +
                    "        GROUP BY " +
                    "            hour_of_day " +
                    "    ) profit_subquery ON hr.hour_of_day = profit_subquery.hour_of_day " +
                    "GROUP BY " +
                    "    hr.hour_of_day " +
                    "ORDER BY " +
                    "    hr.hour_of_day;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getStatsForSelectedDayRevenueAndProfit(@Param("selectedDay") String selectedDay);

    // thống kê doanh thu lợi nhuận theo các ngày trong tháng được chọn
    @Query(value = "WITH RECURSIVE DayReference AS ( " +
                    "    SELECT 1 AS day_of_month " +
                    "    UNION " +
                    "    SELECT day_of_month + 1 " +
                    "    FROM DayReference " +
                    "    WHERE day_of_month < DAY(LAST_DAY(STR_TO_DATE(CONCAT(:selectedMonth, '/01'), '%m/%Y/%d'))) "
                    +
                    ")  " +
                    "SELECT " +
                    "    dr.day_of_month AS " + RevenueOrProfitStatsDto.TIME_POINT + ", " +
                    "    COALESCE(SUM(revenue_subquery.total_revenue), 0) AS " + RevenueOrProfitStatsDto.REVENUE
                    + ", " +
                    "    COALESCE(SUM(profit_subquery.total_profit), 0) AS " + RevenueOrProfitStatsDto.PROFIT + " "
                    +
                    "FROM " +
                    "    DayReference dr " +
                    "LEFT JOIN " +
                    "    ( " +
                    "        SELECT " +
                    "            DAY(o1.order_date) AS day_of_month, " +
                    "            SUM(o1.total_discounted_price) AS total_revenue " +
                    "        FROM  " +
                    "            `orders` o1 " +
                    "        WHERE " +
                    "            DATE_FORMAT(o1.order_date, '%m/%Y') = :selectedMonth " +
                    "            AND o1.order_status = 'CONFIRMED' " +
                    "        GROUP BY " +
                    "            day_of_month " +
                    "    ) revenue_subquery " +
                    "ON dr.day_of_month = revenue_subquery.day_of_month " +
                    "LEFT JOIN " +
                    "    ( " +
                    "        SELECT " +
                    "            DAY(o2.order_date) AS day_of_month, " +
                    "            SUM((p.discounted_price - p.warehouse_price) * oi.quantity) AS total_profit " +
                    "        FROM " +
                    "            orders o2 " +
                    "            JOIN order_item oi ON o2.id = oi.order_id " +
                    "            JOIN product p ON oi.product_id = p.id " +
                    "        WHERE " +
                    "            DATE_FORMAT(o2.order_date, '%m/%Y') = :selectedMonth " +
                    "            AND o2.order_status = 'CONFIRMED' " +
                    "        GROUP BY " +
                    "            day_of_month " +
                    "    ) profit_subquery " +
                    "ON dr.day_of_month = profit_subquery.day_of_month " +
                    "GROUP BY " +
                    "    dr.day_of_month " +
                    "ORDER BY " +
                    "    dr.day_of_month;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getStatsForSelectedMonthRevenueAndProfit(@Param("selectedMonth") String selectedMonth);

    // STATS

    // THEO NGÀY ĐƯỢC CHỌN

    // lấy doanh thu theo một ngày được chọn
    @Query(value = "SELECT DATE_FORMAT(o.`order_date`, '%d') AS selected_day, " +
                    "        SUM(o.`total_discounted_price`) AS " + SingleStatsDto.VALUE + " " +
                    "    FROM `orders` o " +
                    "    WHERE " +
                    "    DATE_FORMAT(o.`order_date`, '%d/%m/%Y') = :selectedDay " +
                    "    AND o.`order_status` = 'CONFIRMED' " +
                    "    GROUP BY " +
                    "    selected_day " +
                    "    ORDER BY " +
                    "    selected_day;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getRevenueBySelectedDate(@Param("selectedDay") String selectedDay);

    // lấy lợi nhuận theo một ngày được chọn

    @Query(value = "SELECT " +
                    "    DATE_FORMAT(o.`order_date`, '%d') AS selected_day, " +
                    "    SUM((p.`discounted_price` - p.`warehouse_price`) * oi.`quantity`) AS "
                    + SingleStatsDto.VALUE
                    + " " +
                    "FROM " +
                    "    `orders` o " +
                    "    JOIN `order_item` oi ON o.`id` = oi.`order_id` " +
                    "    JOIN `product` p ON oi.`product_id` = p.`id` " +
                    "WHERE " +
                    "    DATE_FORMAT(o.`order_date`, '%d/%m/%Y') = :selectedDay " +
                    "    AND o.`order_status` = 'CONFIRMED' " +
                    "GROUP BY " +
                    "    selected_day " +
                    "ORDER BY " +
                    "    selected_day;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getProfitBySelectedDate(@Param("selectedDay") String selectedDay);

    // lấy ra số lượng sản phẩm được đặt trong một ngày được chọn
    @Query(value = "SELECT DATE_FORMAT(o.`order_date`, '%d') AS selected_day, " +
                    "        SUM(o.`total_item`) AS " + SingleStatsDto.VALUE + " " +
                    "    FROM `orders` o " +
                    "    WHERE " +
                    "    DATE_FORMAT(o.`order_date`, '%d/%m/%Y') = :selectedDay " +
                    "    AND o.`order_status` = 'PENDING' " +
                    "    GROUP BY " +
                    "    selected_day " +
                    "    ORDER BY " +
                    "    selected_day;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getPendingOrderedProductCountBySelectedDate(@Param("selectedDay") String selectedDay);

    // lấy ra số lượng người sử dụng (user) trong một ngày được chọn
    // getUserCountBySelectedDate

    @Query(value = "SELECT COUNT(*) AS " + SingleStatsDto.VALUE + " " +
                    "FROM `user` u " +
                    "WHERE u.`role` = 'user' OR u.`role` = 'admin'" +
                    "    AND DATE_FORMAT(u.`create_at`, '%d/%m/%Y %H:%i:%s') <= CONCAT(:selectedDay, ' 23:59:59');", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getUserCountBySelectedDate(@Param("selectedDay") String selectedDay);

    // THEO THÁNG ĐƯỢC CHỌN

    // lấy doanh thu theo một tháng được chọn

    @Query(value = "SELECT DATE_FORMAT(o.`order_date`, '%m') AS selected_month, " +
                    "        SUM(o.`total_discounted_price`) AS " + SingleStatsDto.VALUE + " " +
                    "    FROM `orders` o " +
                    "    WHERE " +
                    "    DATE_FORMAT(o.`order_date`, '%m/%Y') = :selectedMonth " +
                    "    AND o.`order_status` = 'CONFIRMED' " +
                    "    GROUP BY " +
                    "    selected_month " +
                    "    ORDER BY " +
                    "    selected_month;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getRevenueBySelectedMonth(@Param("selectedMonth") String selectedMonth);

    // lấy lợi nhuận theo một tháng được chọn

    @Query(value = "SELECT " +
                    "    DATE_FORMAT(o.`order_date`, '%m') AS selected_month, " +
                    "    SUM((p.`discounted_price` - p.`warehouse_price`) * oi.`quantity`) AS "
                    + SingleStatsDto.VALUE
                    + " " +
                    "FROM " +
                    "    `orders` o " +
                    "    JOIN `order_item` oi ON o.`id` = oi.`order_id` " +
                    "    JOIN `product` p ON oi.`product_id` = p.`id` " +
                    "WHERE " +
                    "    DATE_FORMAT(o.`order_date`, '%m/%Y') = :selectedMonth " +
                    "    AND o.order_status = 'CONFIRMED' " +
                    "GROUP BY " +
                    "    selected_month " +
                    "ORDER BY " +
                    "    selected_month;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getProfitBySelectedMonth(@Param("selectedMonth") String selectedMonth);

    // lấy ra số lượng sản phẩm được đặt trong một tháng được chọn

    @Query(value = "SELECT DATE_FORMAT(o.`order_date`, '%M') AS selected_month, " +
                    "       SUM(o.`total_item`) AS " + SingleStatsDto.VALUE + " " +
                    "    FROM `orders` o " +
                    "    WHERE " +
                    "    DATE_FORMAT(o.`order_date`, '%m/%Y') = :selectedMonth " +
                    "    AND o.`order_status` = 'PENDING' " +
                    "    GROUP BY " +
                    "    selected_month " +
                    "    ORDER BY " +
                    "    selected_month;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getPendingOrderedProductCountBySelectedMonth(
                    @Param("selectedMonth") String selectedMonth);

    // lấy ra số lượng người sử dụng trong một tháng được chọn
    @Query(value = "SELECT COUNT(*) AS " + SingleStatsDto.VALUE + " " +
                    "FROM `user` u " +
                    "WHERE u.`role` = 'admin' OR u.`role` = 'user'" +
                    "    AND DATE_FORMAT(u.`create_at`, '%d/%m') <= :selectedMonth ;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getUserCountBySelectedMonth(@Param("selectedMonth") String selectedMonth);

    // lấy ra sản phẩm bán chạy nhất trong ngày được chọn

    @Query(value = "with `oi_info` as ( select " +
                    "                       oi.id as order_item_id, " +
                    "                       oi.quantity as number_of_products_in_each_order_item, " +
                    "                       p.id as product_id " +
                    " " +
                    "                   FROM " +
                    "                       `orders` o " +
                    "                   JOIN `order_item` oi ON o.id = oi.order_id " +
                    "                   JOIN `product` p ON oi.product_id = p.id " +
                    "                   WHERE " +
                    "                       DATE_FORMAT(o.order_date, '%d/%m/%Y') = :selectedDay " +
                    "                   AND o.order_status = 'CONFIRMED'  " +
                    "                   GROUP BY " +
                    "                       oi.id " +
                    "), `best_selling_product_info` as ( select sum(number_of_products_in_each_order_item) as `total_quantity_sold_of_each_product`, product_id  "
                    +
                    "                                       from `oi_info` " +
                    "                                       group by product_id " +
                    "                                       order by sum(number_of_products_in_each_order_item) desc "
                    +
                    "                                       limit 1) " +
                    "select  p.id, " +
                    "        p.title, " +
                    "        p.image_url, " +
                    "        p.discounted_price, " +
                    "        bspi.total_quantity_sold_of_each_product as appearance_count " +
                    "from best_selling_product_info bspi  " +
                    "join `product` p " +
                    "on bspi.product_id = p.id;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getBestSellingProductToday(@Param("selectedDay") String selectedDay);

    // lấy ra sản phẩm bán chạy nhất trong tháng được chọn

    @Query(value = "with `oi_info` as ( select " +
                    "                       oi.id as order_item_id, " +
                    "                       oi.quantity as number_of_products_in_each_order_item, " +
                    "                       p.id as product_id " +
                    " " +
                    "                   FROM " +
                    "                       `orders` o " +
                    "                   JOIN `order_item` oi ON o.id = oi.order_id " +
                    "                   JOIN `product` p ON oi.product_id = p.id " +
                    "                   WHERE " +
                    "                       DATE_FORMAT(o.order_date, '%m/%Y') = :selectedMonth " +
                    "                   AND o.order_status = 'CONFIRMED'  " +
                    "                   GROUP BY " +
                    "                       oi.id " +
                    "), `best_selling_product_info` as ( select sum(number_of_products_in_each_order_item) as `total_quantity_sold_of_each_product`, product_id  "
                    +
                    "                                       from `oi_info` " +
                    "                                       group by product_id " +
                    "                                       order by sum(number_of_products_in_each_order_item) desc "
                    +
                    "                                       limit 1) " +
                    "select  p.id, " +
                    "        p.title, " +
                    "        p.image_url, " +
                    "        p.discounted_price, " +
                    "        bspi.total_quantity_sold_of_each_product as appearance_count " +
                    "from best_selling_product_info bspi  " +
                    "join `product` p " +
                    "on bspi.product_id = p.id;", nativeQuery = true)
    @QueryHints(value = { @QueryHint(name = "org.hibernate.readOnly", value = "true") })
    public List<Object[]> getBestSellingProductMonth(@Param("selectedMonth") String selectedMonth);

}
