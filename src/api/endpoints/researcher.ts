import type {
  IResearcherDataFull,
  IResearcherData,
} from "@/shared/types/researcher";
import { apiSlice } from "../apiSlice";

export const researcherEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResearchers: builder.query<IResearcherDataFull[], void>({
      query: () => "/researchers",
      transformResponse: (response: {
        data: IResearcherDataFull[];
      }): IResearcherDataFull[] => {
        return response.data;
      },
      providesTags: [{ type: "Researchers", id: "LIST" }],
    }),
    getResearcherById: builder.query<IResearcherDataFull, number>({
      query: (id) => `/researchers/${id}`,
      transformResponse: (response: { data: IResearcherDataFull }) =>
        response.data,
      transformErrorResponse: (response) => console.error(response.status),
      providesTags: (response, error, arg) => [
        { type: "Researchers", id: arg },
      ],
    }),
    getResearchersByIds: builder.query<IResearcherData[], number[]>({
      query: (ids) => `/researchers/ids=${ids.join(",")}`,
      transformResponse: (response: { data: IResearcherData[] }) =>
        response.data,
      transformErrorResponse: (response) => console.error(response.status),
    }),

    editResearcherFull: builder.mutation<
      IResearcherDataFull,
      Partial<IResearcherDataFull>
    >({
      query: (researcher) => ({
        url: `/researchers/${researcher.id}`,
        method: "PATCH",
        body: researcher,
      }),
      invalidatesTags: (researcher) => [
        { type: "Researchers", id: researcher?.id },
      ],
    }),

    createResearcherFull: builder.mutation<void, IResearcherDataFull>({
      query: (credentials) => ({
        url: "/researchers",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => console.error(response.status),
      invalidatesTags: ["Researchers"],
    }),
    deleteResearcher: builder.mutation<void, number>({
      query: (id) => ({
        url: `/researchers/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => console.error(response.status),
      invalidatesTags: [{ type: "Researchers", id: "LIST" }],
    }),
  }),
});
export const {
  useGetResearchersQuery,
  useLazyGetResearchersByIdsQuery,
  useGetResearcherByIdQuery,
  useLazyGetResearcherByIdQuery,
  useCreateResearcherFullMutation,
  useEditResearcherFullMutation,
  useDeleteResearcherMutation,
} = researcherEndpoints;
