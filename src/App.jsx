import "./App.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AppRouter } from "./routes/routes";
import { useEffectEvent } from "react";

function App() {
  // const navigate = useNavigate();

  // useEffectEvent(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) navigate("/register");
  // }, []);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
