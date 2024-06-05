// src/App.js

import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router.js";

const App = () => {
  const routing = useRoutes(ThemeRoutes);

  return <div className="dark">{routing}</div>;
};

export default App;
