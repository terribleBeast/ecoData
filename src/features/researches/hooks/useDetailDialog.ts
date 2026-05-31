import {
  useGetResearchByIdQuery,
  useLazyGetPredictionQuery,
  useLazyGetResearchersByIdsQuery,
} from "@/api/endpoints";
import { useState, useEffect } from "react";
import type { ISelectedResearch } from "../types";
import { useSuccessNavigation } from "@/shared/hooks/useFormCallback";
import type { IResearchDataFull } from "@/shared/types/research";
import { useNavigate } from "react-router";
import { useResearchesState } from "./useResearchesState";
import { useGetEntitiesLookup } from "@/shared/hooks/useEntitiesLookup";

export const useDetailDialog = () => {
  const [detail, setDetail] = useState<ISelectedResearch | null>(null);
  const navigate = useNavigate();

  const useHandleDetail = (id: number) => {
    const {
      data: research,
      isLoading,
      isError,
    } = useGetResearchByIdQuery(id, { skip: id === -1 });
    const [getPrediction] = useLazyGetPredictionQuery();
    const [getResearchersByIds] = useLazyGetResearchersByIdsQuery();

    useEffect(() => {
      if (!research) return;

      Promise.all([
        getPrediction(research.id).unwrap(),
        getResearchersByIds(research.researchers_id).unwrap(),
      ]).then(([results, researchers]) =>
        setDetail({ ...research, results, researchers }),
      );
    }, [research, getPrediction, getResearchersByIds]);

    return { data: detail, isLoading, isError };
  };

  const { createResearch, state, editResearch } = useResearchesState();

  const onSuccess = useSuccessNavigation(() => navigate(".."), 1000);

  const { researchers } = useGetEntitiesLookup();

  const handleCreateResearch = async (data: IResearchDataFull) => {
    try {
      await createResearch(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  const handleEditResearch = async (data: IResearchDataFull) => {
    try {
      await editResearch(data);
      onSuccess();
    } catch {
      // FormTemplate shows the error via endpointState.isError
    }
  };
  return {
    useHandleDetail,
    researchers,
    handleCreateResearch,
    handleEditResearch,
    state,
  };
};
