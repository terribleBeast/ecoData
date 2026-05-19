import { Dialog } from "@mui/material";
import { useState } from "react";
import { PageChapter } from "@/shared/components";
import type { IResearchDataFull } from "@/shared/types/research";
import { ResearchesTable, ResearchFullInfo } from "../components";

const ResearchesPage = () => {
  const [selectedResearch, setSelectedResearch] =
    useState<IResearchDataFull | null>(null);

  return (
    <>
      <Dialog
        open={selectedResearch !== null}
        onClose={() => {
          setSelectedResearch(null);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedResearch && <ResearchFullInfo research={selectedResearch} />}
      </Dialog>

      <PageChapter title="Таблица исследований">
        <ResearchesTable setSelectedResearch={setSelectedResearch} />
      </PageChapter>
    </>
  );
};

export default ResearchesPage;
