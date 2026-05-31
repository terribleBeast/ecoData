import { GenericEntityDetailDialog } from "@/shared/ui/EntityDetailDialog";
import { ResearcherFullInfo } from "../components/ResearcherFullInfo";
import { ResearcherForm } from "./ResearcherForm";
import type { ISelectedResearcher } from "../types";
import { useDetailDialog } from "../hooks/useDetailDialog";
import { type DetailDialogModeType, getDialogType } from "@/shared/utils";
import { useLocation, useParams } from "react-router";

export const ResearcherDetailDialog = () => {
  const {
    useHandleDetail,
    state,
    handleCreateResearcher,
    handleEditResearcher,
    researches,
  } = useDetailDialog();

  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const dialogType: DetailDialogModeType = getDialogType(pathname);
  const {
    data: detail,
    isLoading,
    isError,
  } = useHandleDetail(id ? Number(id) : -1);

  return (
    <GenericEntityDetailDialog<ISelectedResearcher>
      mode={dialogType}
      data={detail}
      state={state}
      renderRead={(detail) => <ResearcherFullInfo researcher={detail} />}
      renderCreate={() => (
        <ResearcherForm
          onSubmit={handleCreateResearcher}
          endpointState={{
            ...state,
            successMsg: "Пользователь создан",
          }}
          researches={researches}
          title={"Создание пользователя"}
          submitLabel={"Создать"}
          submitLoadingLabel={"Создание..."}
        />
      )}
      renderEdit={(detail) => (
        <ResearcherForm
          onSubmit={handleEditResearcher}
          researches={researches}
          endpointState={{
            ...state,
            successMsg: "Данные изменины",
          }}
          title={"Редактирование данных пользователя"}
          submitLabel={"Изменить"}
          submitLoadingLabel={"Изменение..."}
          initialData={detail}
        />
      )}
    />
  );
};
