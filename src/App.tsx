import "./App.css";
import { Content, Header, Footer } from "./components";
import { Page } from "./components/Templates";
import { Routes, Route } from "react-router";
import React, { Suspense } from "react";
import { pages } from "./entities";
import AuthForm from "./components/pages/Auth";
import {
  LoadingPage,
  NotValidRoutePage,
} from "./components/pages/InformationPages";
import { Box } from "@mui/material";

const Home = React.lazy(() => import("./components/pages/Home.tsx"));

function App() {
  return (
    <Box sx={{ height: "100dvh", width: "100dvw" }}>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Content />
                <Footer />
              </>
            }
          >
            <Route index element={<Home />} />

            {pages.map((item, index) => (
              <Route
                path={item.link}
                element={<Page title={item.name}>{<item.component />}</Page>}
                key={index}
              />
            ))}
            {<Route path="*" element={<NotValidRoutePage />} />}
          </Route>

          <Route path="/auth" element={<AuthForm />}></Route>
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
