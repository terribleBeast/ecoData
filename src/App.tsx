import { Content, Header, Footer } from "@/features/structure/ui/index.tsx";
import { Routes, Route } from "react-router";
import React, { Suspense, useMemo } from "react";
import { entityRoutes, standaloneRoutes } from "@/app/routes.ts";
import AuthForm from "@/features/auth/AuthPage.tsx";
import { LoadingComponent, NotValidRouteComponent } from "@/shared/components";
import { Box } from "@mui/material";
import { Page } from "@/shared/ui/layout/Page.tsx";

const Home = React.lazy(() => import("./features/home/Home.tsx"));

const MainLayout = React.memo(() => (
  <>
    <Header />
    <Content />
    <Footer />
  </>
));

function App() {
  const entityRouteElements = useMemo(
    () =>
      entityRoutes.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={<Page title={item.title}>{<item.pageComponent />}</Page>}
        >
          <Route path=":id" element={<item.detailComponent />} />
          <Route path=":id/edit" element={<item.detailComponent />} />
          <Route path="new" element={<item.detailComponent />} />
        </Route>
      )),
    [],
  );
  const standaloneEntitiesElements = useMemo(
    () =>
      standaloneRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.pageComponent />}
        />
      )),
    [],
  );

  return (
    <Box sx={{ height: "100dvh", width: "100dvw" }}>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {...entityRouteElements}
            {...standaloneEntitiesElements}
            {<Route path="*" element={<NotValidRouteComponent />} />}
          </Route>

          <Route path="/auth" element={<AuthForm />}></Route>
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
