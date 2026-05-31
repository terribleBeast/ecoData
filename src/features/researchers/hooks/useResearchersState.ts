// frontend/src/features/researchers/hooks/useResearchersState.ts

import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreateResearcherFullMutation,
  useDeleteResearcherMutation,
  useEditResearcherFullMutation,
  useLazyGetResearcherByIdQuery,
  useGetResearchersQuery,
} from "@/api/endpoints";

export const useResearchersState = () => {
  const crud = useEntityCRUD(
    useGetResearchersQuery,
    useLazyGetResearcherByIdQuery,
    useCreateResearcherFullMutation,
    useEditResearcherFullMutation,
    useDeleteResearcherMutation,
    undefined,
  );

  return {
    researchers: crud.items,
    fetchedResearcher: crud.fetchedItem,
    createResearcherFull: crud.create,
    editResearcherFull: crud.update,
    deleteResearcher: crud.remove,
    state: crud.state,
  };
};
