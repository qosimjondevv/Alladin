import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./utils/auth";
import { FavoritesProvider } from "./utils/FavoritesProvider";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <AppRouter />
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;