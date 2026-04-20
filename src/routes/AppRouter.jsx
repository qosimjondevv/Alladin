import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { ProtectedRoute } from "./ProtectedRoute";
import { Layout } from "../containers/Layout/Layout";
import {
  Home, 
  Catalog, 
  Search,
  MovieDetail, 
  Profile, 
  MyMovie, 
  Person, 
  Collection, 
  Register, 
  Subscriptions, 
  Kids} from"../pages"


const P = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

const L = ({ children }) => <Layout>{children}</Layout>;

export const AppRouter = () => {
  const { isLoggedIn } = useAuth();
    const location = useLocation(); 


  return (
    <Routes>
      <Route
       path="/register"
        element={
          isLoggedIn
           ? <Navigate to={location.state?.from ?? "/"} replace />: <Register />}/>

      <Route path="/" element={<L><Home /></L>}/>
      <Route path="/movie/:id" element={<L><MovieDetail /></L>} />
      <Route path="/catalog" element={<L><Catalog /></L>} />
      <Route path="/collections" element={<L><Collection /></L>}/>
      <Route path="/subscriptions" element={<L><Subscriptions /></L>}/>
      <Route path="/kids" element={<L><Kids /></L>}/>
      <Route path="/search" element={<L><Search /></L>}/>

      <Route path="/my" element={<P><MyMovie /></P>}/>
      <Route path="/profile" element={<P><Profile /></P>}/>
      <Route path="/person/:id" element={<P><Person /></P>}/>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};