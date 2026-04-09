// import '../App.css'
import { Box } from "@mui/material";
import LeftMenu from "../LeftMenu";
import { Outlet } from "react-router";

function Content() {
  return (
    <Box>
      <main>
        <LeftMenu></LeftMenu>
        <div className="tmp-page">
          <Outlet />
        </div>
      </main>
    </Box>
  );
}

export default Content;
