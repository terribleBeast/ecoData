import {
  Biotech,
  PeopleAlt,
  Grass,
  LocationOn,
  Assignment,
  ImageSearch,
} from "@mui/icons-material";
import Researchers from "./components/pages/Researchers";
import Researches from "../src/components/pages/Researches";
import Analyzator from "./components/pages/Analyzator/Analyzator";

export const pages = [
  {
    name: "Исследования",
    link: "researches",
    icon: <Assignment />,
    page: <Researches />,
  },
  {
    name: "Исследователи",
    link: "researchers",
    icon: <PeopleAlt />,
    page: <Researchers />,
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
