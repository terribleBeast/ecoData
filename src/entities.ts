import {
  Biotech,
  PeopleAlt,
  Grass,
  LocationOn,
  Assignment,
  ImageSearch,
} from "@mui/icons-material";
import Researchers from "./components/pages/Researchers";
import Researches from "./components/pages/Researches";
import Analyzer from "./components/pages/Analyzator/Analyzator";
import { LoadingPage } from "./components/pages/InformationPages";

interface PageData {
  name: string;
  link: string;
  icon: React.ComponentType;
  component: React.ComponentType;
}

export const pages: PageData[] = [
  {
    name: "Исследования",
    link: "researches",
    icon: Assignment,
    component: Researches,
  },
  {
    name: "Исследователи",
    link: "researchers",
    icon: PeopleAlt,
    component: Researchers,
  },
  {
    name: "Растения",
    link: "plants",
    icon: Grass,
    component: LoadingPage,
  },
  {
    name: "Анализатор",
    link: "analyzer",
    icon: ImageSearch,
    component: Analyzer,
  },
  {
    name: "Локации",
    link: "locations",
    icon: LocationOn,
    component: LoadingPage,
  },
  {
    name: "Лаборатории",
    link: "laboratories",
    icon: Biotech,
    component: LoadingPage,
  },
];

export const classifiers = [
  {
    plant: "Яблоня",
    varieties: [
      "Феникс Уральское",
      // "Уральское наливное",
      "Сувенир Алтая",
      "Подарок садоводам",
      "Заветное",
      // "Жебровское",
      // "Жар-птица",
      // "Алтайское румяное",
      // "Алтайское зимнее",
      // "Алтайская красавица",
    ],
  },
  {
    plant: "Томаты",
    varieties: ["Бычье сердце"],
  },
];
