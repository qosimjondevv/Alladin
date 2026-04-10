import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Catalog } from "../pages/Catalog/Catalog";
import { Search } from "../pages/Search/Search";
import { MovieDetail } from "../pages/MovieDetail";
import { Profile } from "../pages/Profile/Profile";
import { MyMovie } from "../pages/MyMovie/MyMovie";
import { Person } from "../pages/Person/Person";
import { Collection } from "../pages/Collection/Collection";
import { Register } from "../pages/Register";


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppRouter = () => {
  const navigate = useNavigate();

useEffect(() => {
  const user = localStorage.getItem("user");
  if (!user) navigate("/register");
}, []);

  return (
    <Routes>
      
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
                <>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my" element={<MyMovie />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/collections" element={<Collection />} />

          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
    
    </Routes>
  );
};