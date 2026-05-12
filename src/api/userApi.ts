import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IUserData, User } from "../Models/User";
const port = "8000";
const host = `http://localhost:${port}`;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: host }),
  tagTypes: ["User"], // Define tag types for caching and invalidation

  endpoints: (builder) => ({
    // get User
    getUser: builder.query<IUserData, { email: string }>({
      query: (email) => `/users?email=${email}`,
      transformResponse: (response: { data: IUserData }): IUserData =>
        response.data,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
      providesTags: ({ email }) => [{ type: "User", id: email }], // Tag individual users
    }),

    // get Users
    getUsers: builder.query({
      query: () => "/users",
    }),

    // create User
    createUser: builder.mutation<IUserData, { email: string }>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: new User({ ...user }),
      }),
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(`User ${data.email} is created. Old email ${email}`);
        } catch (error) {
          console.error("Error creating user:", error);
        }
      },
      invalidatesTags: ["User"],
    }),

    // update User Info
    // updateUserInfo: builder.mutation({
    //   query: ({ id, email, password, info, responds }) => ({
    //     url: `/users/${id}`,
    //     method: 'PUT',
    //     body: new User({ email, password, id, info, responds }),
    //   }),
    //   invalidatesTags: (result, error, { email }) => [{ type: 'User', id: email }], // Invalidate the updated user
    // }),
    // getUsers: builder.query({
    //   query: () => `/users`,
    //   providesTags: (result) =>
    //     result
    //       ?
    //       [
    //         ...result.map(({ id }) => ({ type: 'User', id })),
    //         { type: 'User', id: 'LIST' },
    //       ] : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
    //       [{ type: 'User', id: 'LIST' }],
    // }),

    // update User Respond
    updateUser: builder.mutation<IUserData, IUserData>({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PUT",
        body: { ...data },
      }),
      async onQueryStarted(data_, { dispatch, queryFulfilled }) {
        try {
          const oldUserData = dispatch(
            userApi.endpoints.getUser.initiate({ email: data_.email }),
          ).unwrap();
          const { data } = await queryFulfilled;

          console.log(`Updating user with id: ${data.id}`, oldUserData); // Check data here.
        } catch (error) {
          console.error("Error updating user:", error);
        }
      },
      invalidatesTags: (data) => [{ type: "User", id: data.email }],
    }),

    deleteUserRespond: builder.mutation({
      query: ({ id, email, password_hash }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: new User({ email, password_hash, id }),
      }),
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(`Put ${email}`, data); // Check data here.
        } catch (error) {
          console.error("Error deleting user respond:", error);
        }
      },
      invalidatesTags: ({ email }) => [{ type: "User", id: email }],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(`Deleted user with id: ${id}`, data); // Check data here.
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },
      invalidatesTags: (id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  // useUpdateUserRespondMutation,
  // useDeleteUserRespondMutation,
  useDeleteUserMutation,
} = userApi;
