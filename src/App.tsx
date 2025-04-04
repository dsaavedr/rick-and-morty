import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { StarredIdsContext } from "./context/starredIds";
import CharacterDetail from "./components/CharacterDetail";
import { useLocation } from "react-router-dom";

function App() {
  const [starredIds, setStarredIds] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(location.pathname);

  useEffect(() => {
    if (previousPath != location.pathname) {
      setDrawerOpen(false);
      setPreviousPath(location.pathname);
    }
  }, [location, previousPath]);

  return (
    <StarredIdsContext.Provider value={{ starredIds, setStarredIds }}>
      <div className="flex">
        <Sidebar onClose={() => setDrawerOpen(false)} drawerOpen={drawerOpen} />
        <CharacterDetail
          drawerOpen={drawerOpen}
          onMenuClick={() => setDrawerOpen(true)}
        />
      </div>
    </StarredIdsContext.Provider>
  );
}

export default App;
