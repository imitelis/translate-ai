import { languages } from "./i18n";
import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// components
import NavBar from "./components/NavBar"

// language
import { detectLanguage } from "./i18n";

const NotFound = lazy(() => import("./components/NotFound"));
const Translate = lazy(() => import("./components/Translate"));

function App() {
  const [language, setLanguage] = useState("en");

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const detectedLanguage = detectLanguage({ path });
    setLanguage(detectedLanguage);
  }, [path]);

  return (
    <>
    <NavBar path={path} language={language}  />
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
            key={`translate-${lang}`}
            path={`translate/${lang}?`}
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
          />,
        ])}
      </Routes>
    </>
  );
}

export default App;
