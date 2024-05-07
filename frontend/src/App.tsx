import { languages } from "./i18n";
import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// components
import NavigationBar from "./components/NavigationBar";

// language
import { detectLanguage } from "./i18n";

const About = lazy(() => import("./views/About"));
const NotFound = lazy(() => import("./views/NotFound"));
const Translate = lazy(() => import("./views/Translate"));
import Loading from './views/Loading'

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
      <NavigationBar path={path} language={language} />
      <Routes>
        {languages.map((lang) => [
          <Route
            key={`translate-${lang}`}
            path={`/${lang}?`}
            element={
              <Suspense fallback={<Loading/>}>
                <Translate />
              </Suspense>
            }
          />,
          <Route
            key={`translate-${lang}`}
            path={`translate/${lang}?`}
            element={
              <Suspense fallback={<Loading/>}>
                <Translate />
              </Suspense>
            }
          />,
          <Route
            key={`about-${lang}`}
            path={`/about/${lang}?`}
            element={
              <Suspense fallback={<Loading/>}>
                <About />
              </Suspense>
            }
          />,
          <Route
            key={`notfound-${lang}`}
            path={`/*`}
            element={
              <Suspense fallback={<Loading/>}>
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
