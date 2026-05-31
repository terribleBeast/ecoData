import { useEntityCRUD } from "@/shared/hooks/useEntityCRUD";
import {
  useCreateResearchMutation,
  useDeleteResearchMutation,
  useEditResearchMutation,
  useLazyGetResearchByIdQuery,
  useGetResearchesQuery,
} from "@/api/endpoints";

export const useResearchesState = () => {
  const crud = useEntityCRUD(
    useGetResearchesQuery,
    useLazyGetResearchByIdQuery,
    useCreateResearchMutation,
    useEditResearchMutation,
    useDeleteResearchMutation,
    undefined,
  );

  return {
    researches: crud.items,
    fetchedResearch: crud.fetchedItem,
    createResearch: crud.create,
    editResearch: crud.update,
    deleteResearch: crud.remove,
    state: crud.state,
  };
};
