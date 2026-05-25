import { Dialog } from "@mui/material";
import { useState } from "react";
import { PageChapter } from "@/shared/components";
import { ResearchesTable, ResearchFullInfo } from "../components";
import type { ISelectedResearch } from "../types";
import { useResearchersPage } from "@/features/researchers/hooks/useResearchersPage";
import { useResearchesPage } from "../hooks/useResearchesPage";

const ResearchesPage = () => {
  const {
    researches,
    handleSelectResearch,
    selectedResearch,
    onCloseFullInfo,
    isLoading,
    isError,
  } = useResearchesPage();

  return (
    <>
      <Dialog
        open={selectedResearch !== null}
        onClose={onCloseFullInfo}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedResearch && <ResearchFullInfo research={selectedResearch} />}
      </Dialog>

      <PageChapter title="Таблица исследований">
        <ResearchesTable
          data={researches}
          handleSelectResearch={handleSelectResearch}
          isLoading={isLoading}
        />
      </PageChapter>
    </>
  );
};

export default ResearchesPage;
