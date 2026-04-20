import "./Profile.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { ProfileBackBtn, ProfileModal } from "../../components";
import iconUser from "../../assets/icons/iconUser.svg";

export const Profile = () => {
  const nav = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    img: user?.img || null,
    ageGroup: user?.ageGroup || "Дети",
  });

  const openEdit = () => {       
    setForm({ name: user?.name || "", img: user?.img || null, ageGroup: user?.ageGroup || "Дети" });
    setModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    updateProfile(form);       
    setModal(false);
  };

  const handleLogout = () => {
    nav("/", { replace: true });       
    logout();
  };

  return (
    <div className="profile">
      <ProfileBackBtn />
      <div className="profile__inner">
        <div className="profile__avatar" onClick={openEdit}>
          <img
            src={user?.img || iconUser}
            alt={user?.name}
            className={!user?.img ? "profile__avatar-ph" : ""}
            onError={(e) => { e.currentTarget.src = iconUser; }}
          />
          <div className="profile__avatar-edit">✎</div>
        </div>

        <h2 className="profile__name">{user?.name}</h2>
        <p className="profile__age">{user?.ageGroup}</p>

        <button className="profile__btn profile__btn--edit" onClick={openEdit}>
          Редактировать профиль
        </button>
        <button className="profile__btn profile__btn--logout" onClick={handleLogout}>
          Выйти
        </button>
      </div>

      {modal && (
        <ProfileModal
          modal={{ mode: "edit" }}
          form={form} setForm={setForm}
          onSave={handleSave} onClose={() => setModal(false)}
        />
      )}
    </div>
  );
};