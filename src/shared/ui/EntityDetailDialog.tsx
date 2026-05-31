import { Box, Dialog, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { LoadingComponent } from "../components";
import type { DetailDialogModeType } from "../utils";

export type EntityDetailDialogProps<TDetail extends { id: number }> = {
  data: TDetail | null;
  state: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  /** Render the read-only detail view. */
  renderRead: (detail: TDetail) => React.ReactNode;

  /** Render the create form. Called when route is /new. */
  renderCreate: (onClose: () => void) => React.ReactNode;

  /** Render the edit form. Called when route is /:id/edit. */
  renderEdit: (detail: TDetail, onClose: () => void) => React.ReactNode;

  /** Max width for the dialog. Defaults to "xl". */
  readonly maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";

  readonly mode: DetailDialogModeType;
};

export function GenericEntityDetailDialog<TDetail extends { id: number }>({
  renderRead,
  renderCreate,
  mode,
  data,
  state,
  renderEdit,
  maxWidth = "xl",
}: EntityDetailDialogProps<TDetail>) {
  const navigate = useNavigate();

  const handleClose = () => {
    // Navigate to the entity base path (the parent layout route)
    navigate("..");
  };
  const isNew = mode === "create";
  const isEdit = mode === "edit";
  const isRead = mode === "read";

  maxWidth = isNew || isEdit ? "xs" : maxWidth;
  return (
    <Dialog open fullWidth maxWidth={maxWidth} onClose={handleClose}>
      {state.isLoading && <LoadingComponent />}
      {!state.isLoading && state.isError && (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error">Ошибка загрузки данных</Typography>
        </Box>
      )}
      {isNew && renderCreate(handleClose)}
      {isEdit && data && renderEdit(data, handleClose)}
      {isRead && data && renderRead(data)}
      {!state.isLoading && !state.isError && !isNew && !isEdit && !data && (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">Объект не найден</Typography>
        </Box>
      )}
    </Dialog>
  );
}
