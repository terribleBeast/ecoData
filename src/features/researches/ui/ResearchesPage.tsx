import { Dialog } from "@mui/material";
import { ResearchesTable, ResearchFullInfo } from "../components";
import { useResearchesPage } from "../hooks/useResearchesPage";
import { PageChapter } from "@/shared/ui/layout";

const ResearchesPage = () => {
  const {
    researches,
    handleSelectResearch,
    selectedResearch,
    onCloseFullInfo,
    isLoading,
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

      <PageChapter header={{ title: "Таблица исследований" }}>
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
