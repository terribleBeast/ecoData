import { Box, List, ListItemButton, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router";
import { entities } from "../entities";

const LeftMenu = () => {
  const currLocation = useLocation();

  const menuItems = useMemo(
    () =>
      entities.map((item) => (
        <ListItemButton
          component={Link}
          to={item.link}
          className="listItemButton"
          selected={currLocation.pathname.slice(1) === item.link}
          key={item.link}
        >
          {item.icon}
          <Typography>{item.name}</Typography>
        </ListItemButton>
      )),
    [currLocation.pathname],
  );

  return (
    <Box className="sidebar">
      <List>{menuItems}</List>
    </Box>
  );
};

export default LeftMenu;
