import {
  useGetResearcherByIdQuery,
  useLazyGetResearchesByIdsQuery,
} from "@/api/endpoints";
import { useState, useEffect } from "react";
import type { ISelectedResearcher } from "../types";
import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import type { IResearcherDataFull } from "@/shared/types/researcher";
import { useNavigate } from "react-router";
import { useResearchersState } from "./useResearchersState";
import { useGetEntitiesLookup } from "@/shared/hooks/useEntitiesLookup";

export const useDetailDialog = () => {
  const [detail, setDetail] = useState<ISelectedResearcher | null>(null);
  const navigate = useNavigate();

  const useHandleDetail = (id: number) => {
    const {
      data: researcher,
      isLoading,
      isError,
    } = useGetResearcherByIdQuery(id, { skip: id === -1 });
    const [getResearchesByIds] = useLazyGetResearchesByIdsQuery();

    useEffect(() => {
      if (!researcher) return;

      getResearchesByIds(researcher.researches_id)
        .unwrap()
        .then((researches) => setDetail({ ...researcher, researches }));
    }, [researcher, getResearchesByIds]);

    return { data: detail, isLoading, isError };
  };

  const { createResearcherFull, state, editResearcherFull } =
    useResearchersState();

  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const { researches } = useGetEntitiesLookup();

  const handleCreateResearcher = async (data: IResearcherDataFull) => {
    try {
      await createResearcherFull(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  const handleEditResearcher = async (data: IResearcherDataFull) => {
    try {
      await editResearcherFull(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  return {
    useHandleDetail,
    researches,
    handleCreateResearcher,
    handleEditResearcher,
    state,
  };
};
