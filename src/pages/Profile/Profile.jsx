// pages/Profile/Profile.jsx
import "./Profile.scss";
import { useState }    from "react";
import { ProfileCard, AddProfileCard, ProfileBackBtn } from "../../components/ProfileCard/ProfileCard";
import { ProfileModal }                                from "../../components/ProfileModal/ProfileModal";

export const Profile = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Администратор", img: null,    ageGroup: "Возраст от 13 до 16 лет" },
  ]);
  const [modal, setModal] = useState(null);
  const [form,  setForm]  = useState({ name: "", img: null, ageGroup: "Дети" });

  const openAdd  = () => { setForm({ name: "", img: null, ageGroup: "Дети" }); setModal({ mode: "add" }); };
  const openEdit = (p)  => { setForm({ name: p.name, img: p.img, ageGroup: p.ageGroup }); setModal({ mode: "edit", profile: p }); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal.mode === "add") {
      setProfiles((p) => [...p, { id: Date.now(), ...form }]);
    } else {
      setProfiles((p) => p.map((pr) => pr.id === modal.profile.id ? { ...pr, ...form } : pr));
    }
    setModal(null);
  };

  const handleDelete = () => {
    setProfiles((p) => p.filter((pr) => pr.id !== modal.profile.id));
    setModal(null);
  };

  return (
    <div className="profile-page">
      <ProfileBackBtn />

      <div className="profile-page__list">
        {profiles.map((p) => (
          <ProfileCard key={p.id} profile={p} onClick={openEdit} />
        ))}
        <AddProfileCard onClick={openAdd} />
      </div>

      {modal && (
        <ProfileModal
          modal={modal}
          form={form}
          setForm={setForm}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};