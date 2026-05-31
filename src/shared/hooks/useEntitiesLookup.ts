import {
  useLazyGetResearchersByIdsQuery,
  useLazyGetResearchesByIdsQuery,
  useGetResearchesQuery,
} from "@/api/endpoints";
import { combineState, queryState } from "./utils";

export const useGetEntitiesLookup = () => {
  const [getResearchersByIdsQuery, getResearchersByIdsQueryResult] =
    useLazyGetResearchersByIdsQuery();
  const [getResearchesByIdsQuery, getResearchesByIdsQueryResult] =
    useLazyGetResearchesByIdsQuery();
  const getResearchesQueryResult = useGetResearchesQuery();

  const state = combineState([
    queryState(getResearchersByIdsQueryResult),
    queryState(getResearchesByIdsQueryResult),
    queryState(getResearchesQueryResult),
  ]);

  return {
    researches: getResearchesQueryResult.data ?? [],
    getResearchersByIdsQuery,
    getResearchesByIdsQuery,
    state,
  };
};
