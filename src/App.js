// import logo from './logo.svg';
import "./App.css";
import { Content, Header, Footer } from "./components";
import { Routes, Route } from "react-router";
// import Home from "./components/pages/Home";
import React, { Suspense } from "react";

import { entities } from "./entities";
import AuthForm from "./components/pages/Auth";

const Home = React.lazy(() => import("./components/pages/Home"));
// const Content = React.lazy(() => import("./components"));

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Content />}>
            <Route index element={<Home />} />

            {entities.map((item, index) => (
              <Route
                path={item.link}
                element={<h2 className="tmp-page">{item.page}</h2>}
                key={index}
              />
            ))}

            {<Route path="*" element={<div>Not valid path</div>} />}
          </Route>

          <Route path="/auth" element={<AuthForm />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
