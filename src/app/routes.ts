import {
  Biotech,
  PeopleAlt,
  Grass,
  LocationOn,
  Assignment,
  ImageSearch,
} from "@mui/icons-material";
import { ResearchersPage } from "@/features/researchers/ui/ResearchersPage";
import { ResearcherDetailDialog } from "@/features/researchers/ui/ResearcherDetailDialog";
import AnalyzerPage from "@/features/analyzer/ui/AnalyzerPage";
import ResearchesPage from "@/features/researches/ui/ResearchesPage";
import { ResearchDetailDialog } from "@/features/researches/ui/ResearchDetialDialog";
export interface IEntityInfo {
  name: string;
  path: EntityPathType;
}

export const entityPaths = {
  PLANTS: "plants",
  LABS: "laboratories",
  RESEARCHERS: "researchers",
  RESEARCHES: "researches",
  LOCATIONS: "locations",
  ANALYZER: "analyzer",
} as const;
export type EntityPathType = (typeof entityPaths)[keyof typeof entityPaths];
export const entityNames = {
  PLANTS: "Растения",
  LABS: "Лаборатории",
  RESEARCHERS: "Исследователи",
  RESEARCHES: "Исследования",
  LOCATIONS: "Локации",
  ANALYZER: "Анализатор",
} as const;
export type EntityNameType = (typeof entityNames)[keyof typeof entityNames];

export interface MenuItemData {
  title: EntityNameType;
  path: EntityPathType;
  icon: React.ComponentType;
}

export const menuItems: MenuItemData[] = [
  {
    title: entityNames.RESEARCHES,
    path: entityPaths.RESEARCHES,
    icon: Assignment,
  },
  {
    title: entityNames.RESEARCHERS,
    path: entityPaths.RESEARCHERS,
    icon: PeopleAlt,
  },
  {
    title: entityNames.PLANTS,
    path: entityPaths.PLANTS,
    icon: Grass,
  },
  {
    title: entityNames.ANALYZER,
    path: entityPaths.ANALYZER,
    icon: ImageSearch,
  },
  {
    title: entityNames.LOCATIONS,
    path: entityPaths.LOCATIONS,
    icon: LocationOn,
  },
  {
    title: entityNames.LABS,
    path: entityPaths.LABS,
    icon: Biotech,
  },
];

export interface EntityRouteConfig {
  title: string;
  path: EntityPathType;
  pageComponent: React.ComponentType;
  detailComponent: React.ComponentType;
}
export const entityRoutes: EntityRouteConfig[] = [
  {
    title: entityNames.RESEARCHERS,
    path: entityPaths.RESEARCHERS,
    pageComponent: ResearchersPage,
    detailComponent: ResearcherDetailDialog,
  },
  {
    title: entityNames.RESEARCHES,
    path: entityPaths.RESEARCHES,
    pageComponent: ResearchesPage,
    detailComponent: ResearchDetailDialog,
  },
];
// Special routes that don't follow the table+detail pattern
export const standaloneRoutes: EntityRouteConfig[] = [
  {
    title: entityNames.ANALYZER,
    path: "analyzer",
    pageComponent: AnalyzerPage,
    detailComponent: () => null, // analyzer has no detail dialog
  },
];
