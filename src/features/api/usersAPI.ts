import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const port = "3001";
const host = `http://localhost:${port}`;
// import { UserData } from "../../Models/User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: host }),
  tagTypes: ["UserData"], // Define tag types for caching and invalidation

  endpoints: (builder) => ({
    // get User
    getUser: builder.query({
      query: (email) => ({ url: `/researchers?email=${email}` }),
      transformResponse: (response) => {
        // console.log("response")
        // console.log(response[0])

        return response[0];
      }, // Extract the first user from the array
      providesTags: (result, error, email) => [{ type: "UserData", id: email }], // Tag individual users
    }),

    // create User
    createUser: builder.mutation({
      query: (user) => ({
        url: "/researchers",
        method: "POST",
        body: user,
      }),

      // async onQueryStarted({ email }, { dispatch, queryFulfilled }) {

      //     try {
      //         const { data } = await queryFulfilled;
      //         console.log(`User ${data.email} is created`);
      //     } catch (error) {
      //         console.error("Error creating user:", error);
      //     }
      // },
      invalidatesTags: ["UserData"],
    }),
  }),
});

export const { useLazyGetUserQuery, useCreateUserMutation } = userApi;
