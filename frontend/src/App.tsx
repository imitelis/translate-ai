import { languages } from "./i18n";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const NotFound = lazy(() => import("./views/NotFound"));
const Translate = lazy(() => import("./views/Translate"));

function App() {
  return (
    <>
      <Routes>
        {languages.map((lang) => [
          <Route
            key={`translate-${lang}`}
            path={`/${lang}?`}
            element={
              <Suspense fallback={<>loading...</>}>
                <Translate />
              </Suspense>
            }
          />,
          <Route
            key={`notfound-${lang}`}
            path={`/*`}
            element={
              <Suspense fallback={<>loading...</>}>
                <NotFound />
              </Suspense>
            }
          />
        ])}
      </Routes>
    </>
  );
}

export default App;
