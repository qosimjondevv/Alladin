import { Routes, Route, Navigate } from "react-router-dom";
import { Home }          from "../pages/Home/Home";
import { Catalog }       from "../pages/Catalog/Catalog";
import { Search }        from "../pages/Search/Search";
import { MovieDetail }   from "../pages/MovieDetail/MovieDetail";
import { Profile }       from "../pages/Profile/Profile";
import { MyMovie }       from "../pages/MyMovie/MyMovie";
import { Person }        from "../pages/Person/Person";
import { Collection }    from "../pages/Collection/Collection";
import { Register }      from "../pages/Register/Register";
import { Subscriptions } from "../pages/Subscriptions/Subscriptions";
import { Kids }          from "../pages/Kids/Kids";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/register" replace />;
};

const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

export const AppRouter = () => (
  <Routes>
    {/* Public */}
    <Route path="/register" element={<Register />} />

    {/* Protected */}
    <Route path="/"              element={<P><Home /></P>}          />
    <Route path="/catalog"       element={<P><Catalog /></P>}       />
    <Route path="/search"        element={<P><Search /></P>}        />
    <Route path="/movie/:id"     element={<P><MovieDetail /></P>}   />
    <Route path="/profile"       element={<P><Profile /></P>}       />
    <Route path="/my"            element={<P><MyMovie /></P>}       />
    <Route path="/person/:id"    element={<P><Person /></P>}        />
    <Route path="/collections"   element={<P><Collection /></P>}    />
    <Route path="/subscriptions" element={<P><Subscriptions /></P>} />
    <Route path="/kids"          element={<P><Kids /></P>}          />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);