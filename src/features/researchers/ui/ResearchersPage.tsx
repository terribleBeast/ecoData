import { Dialog } from "@mui/material";
import { useState } from "react";
import { getMockResearches } from "@/mock_data";
import { PageChapter } from "@/shared/components/Templates";
import type { IResearcherData } from "../../../shared/types/researcher";
import { ResearcherFullInfo, ResearchersTable } from "../components";

const ResearchersPage = () => {
  const [selectedResearcher, setSelectedResearcher] =
    useState<IResearcherData | null>(null);

  return (
    <>
      <Dialog
        open={selectedResearcher !== null}
        onClose={() => {
          setSelectedResearcher(null);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedResearcher !== null && (
          <ResearcherFullInfo
            researcher={selectedResearcher}
            researches={getMockResearches()}
          />
        )}
      </Dialog>
      <PageChapter title="Таблица исследователей">
        <ResearchersTable setSelectedResearcher={setSelectedResearcher} />
      </PageChapter>
    </>
  );
};

export default ResearchersPage;
