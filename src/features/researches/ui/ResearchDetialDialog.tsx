import { GenericEntityDetailDialog } from "@/shared/ui/EntityDetailDialog";
import { ResearchFullInfo } from "../components/ResearchesFullInfo";
import { ResearchForm } from "./ResearchForm";
import type { ISelectedResearch } from "../types";
import { useDetailDialog } from "../hooks/useDetailDialog";
import { type DetailDialogModeType, getDialogType } from "@/shared/utils";
import { useLocation, useParams } from "react-router";

export const ResearchDetailDialog = () => {
  const {
    useHandleDetail,
    state,
    handleCreateResearch,
    handleEditResearch,
    researchers,
  } = useDetailDialog();

  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const dialogType: DetailDialogModeType = getDialogType(pathname);
  const { data: detail } = useHandleDetail(id ? Number(id) : -1);

  return (
    <GenericEntityDetailDialog<ISelectedResearch>
      mode={dialogType}
      data={detail}
      state={state}
      renderRead={(detail) => <ResearchFullInfo research={detail} />}
      renderCreate={() => (
        <ResearchForm
          onSubmit={handleCreateResearch}
          endpointState={{
            ...state,
            successMsg: "Исследование создано",
          }}
          researchers={researchers}
          title="Создание исследования"
          submitLabel="Создать"
          submitLoadingLabel="Создание..."
        />
      )}
      renderEdit={(detail) => (
        <ResearchForm
          onSubmit={handleEditResearch}
          researchers={researchers}
          endpointState={{
            ...state,
            successMsg: "Данные изменены",
          }}
          title="Редактирование исследования"
          submitLabel="Изменить"
          submitLoadingLabel="Изменение..."
          initialData={detail}
        />
      )}
    />
  );
};
