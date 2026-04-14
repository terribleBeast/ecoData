import {
  Biotech,
  PeopleAlt,
  Grass,
  LocationOn,
  Assignment,
  ImageSearch,
} from "@mui/icons-material";
import Research from "../src/components/pages/Research";
import Analyzator from "./components/pages/Analyzator/Analyzator";

export const entities = [
  {
    name: "Исследования",
    link: "researches",
    icon: <Assignment />,
    page: <Research />,
  },
  {
    name: "Исследователи",
    link: "researchers",
    icon: <PeopleAlt />,
    page: <div> Исследователи </div>,
  },
  {
    name: "Растения",
    link: "plants",
    icon: <Grass />,
    page: <div> Растения </div>,
  },
  {
    name: "Анализатор",
    link: "analyzer",
    icon: <ImageSearch />,
    page: <Analyzator />,
  },
  {
    name: "Локации",
    link: "locations",
    icon: <LocationOn />,
    page: <div> Локации </div>,
  },
  {
    name: "Лаборатории",
    link: "laboratories",
    icon: <Biotech />,
    page: <div> Лаборатории </div>,
  },
];
