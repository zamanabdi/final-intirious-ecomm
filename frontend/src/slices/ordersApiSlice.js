import { apiSlice } from "./apiSlices";
import { ORDERS_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    orderPaid: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/pay`,
        method: "POST",
        body: { ...data },
      }),
    }),

   getMyOrders: builder.query({
    query: () => ({
      url: `${ORDERS_URL}/mine`,

    }),
    keepUnusedDataFor:5,
   }), 
  }),
});
export const {
  useDeliverOrderMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useOrderPaidMutation,
  useGetMyOrdersQuery
} = ordersApiSlice;
