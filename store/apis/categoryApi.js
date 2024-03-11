// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { getCookie } from 'cookies-next';
// import { useSelector } from 'react-redux';

// // const {token} = useSelector(state=> state.auth)
// const token = getCookie("token");

// export const categoryApi = createApi({

//     reducerPath: 'category',

//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://api.safqapay.com/api'
//     }),

//     endpoints: (builder) => ({

//         getCategories: builder.query({
//             query: () => ({
//                 url: '/product/categories', 
//                 method: 'post', 
//                 body: { token }
//             })
//         }),

//         getCategories: builder.query({
//             query: (id) => ({
//                 url: `/product/category/show/${id}`,
//                 method: 'get'
//             })
//         }),

//     })

// })

// export const { usegetCategoriesQuery, useGetCategoriesQuery, } = categoryApi;
