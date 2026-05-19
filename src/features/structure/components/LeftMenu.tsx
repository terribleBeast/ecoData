import { Box, List, ListItemButton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import { pages } from "@/app/routes";

interface IMenuItem {
  isSelected: boolean;
  link: string;
  icon: React.ComponentType;
  name: string;
}

const MenuItem = (data: IMenuItem) => (
  <ListItemButton
    component={Link}
    to={data.link}
    selected={data.isSelected}
    key={data.link}
    sx={(theme) => ({
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.75rem 1rem",
      cursor: "pointer",
      borderBottom: `1px solid ${theme.palette.border}`,
      borderRadius: "8px",
      margin: "0 0.5rem 0.25rem 0.5rem",
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: theme.palette.menuHover,
      },
      "&.Mui-selected": {
        backgroundColor: theme.palette.activeItem,
        fontWeight: 600,
      },
    })}
  >
    {<data.icon />}
    <Typography>{data.name}</Typography>
  </ListItemButton>
);

const LeftMenu = () => {
  const currLocation = useLocation();

  // TODO: use useMemo
  const menuItems = pages.map((item) => (
    <MenuItem
      {...item}
      isSelected={item.link.slice(1) === currLocation.pathname}
    />
  ));

  return (
    <Box
      component="nav"
      sx={(theme) => ({
        width: "auto",
        backgroundColor: theme.palette.menuBg,
        borderRight: `1px solid ${theme.palette.border}`,
        flexDirection: "column",
      })}
    >
      <List disablePadding>{menuItems}</List>
    </Box>
  );
};

export default LeftMenu;
