import "./Profile.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconUser from "../../assets/icons/iconUser.svg";
import iconEdit from "../../assets/icons/iconEdit.svg";

const AGE_GROUPS = ["Дети", "Возраст от 13 до 16 лет"];

export const Profile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Администратор",
      img: null,
      ageGroup: "Возраст от 13 до 16 лет",
    },
  ]);
  const [modal, setModal] = useState(null); // null | { mode: "add" | "edit", profile? }
  const [form, setForm] = useState({ name: "", img: null, ageGroup: "Дети" });

  const openAdd = () => {
    setForm({ name: "", img: null, ageGroup: "Дети" });
    setModal({ mode: "add" });
  };

  const openEdit = (profile) => {
    setForm({
      name: profile.name,
      img: profile.img,
      ageGroup: profile.ageGroup,
    });
    setModal({ mode: "edit", profile });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, img: url }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal.mode === "add") {
      setProfiles((p) => [...p, { id: Date.now(), ...form }]);
    } else {
      setProfiles((p) =>
        p.map((pr) => (pr.id === modal.profile.id ? { ...pr, ...form } : pr)),
      );
    }
    setModal(null);
  };

  const handleDelete = () => {
    setProfiles((p) => p.filter((pr) => pr.id !== modal.profile.id));
    setModal(null);
  };

  return (
    <div className="profile-page">
      <div className="profile-page__list">
        {profiles.map((p) => (
          <div key={p.id} className="profile-card" onClick={() => openEdit(p)}>
            <div className="profile-card__avatar">
              {p.img ? (
                <img src={p.img} alt={p.name} />
              ) : (
                <img
                  src={iconUser}
                  alt=""
                  className="profile-card__placeholder"
                />
              )}
            </div>
            <p className="profile-card__name">{p.name}</p>
          </div>
        ))}
        <div className="profile-card profile-card--add" onClick={openAdd}>
          <div className="profile-card__avatar profile-card__avatar--add">
            +
          </div>
          <p className="profile-card__name">Добавить</p>
        </div>
      </div>

      {modal && (
        <div className="pm-overlay" onClick={() => setModal(null)}>
          <div className="pm" onClick={(e) => e.stopPropagation()}>
            <h2 className="pm__title">
              {modal.mode === "add"
                ? "Добавить профиль"
                : "Редактировать профиль"}
            </h2>
            <p className="pm__subtitle">
              Добавить профиль для другого человека, смотрящего aladdin.
            </p>

            <label className="pm__avatar">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImgChange}
              />
              {form.img ? (
                <img src={form.img} alt="" className="pm__avatar-img" />
              ) : (
                <img src={iconUser} alt="" className="pm__avatar-placeholder" />
              )}
              <div className="pm__avatar-edit">
                <img src={iconEdit} alt="" />
              </div>
            </label>

            <label className="pm__field">
              <img src={iconUser} alt="" className="pm__field-icon" />
              <input
                className="pm__input"
                type="text"
                placeholder="Имя"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </label>

            <p className="pm__age-label">показать контент для</p>
            <div className="pm__age-group">
              {AGE_GROUPS.map((a, i) => (
                <button
                  key={i}
                  className={`pm__age-btn ${form.ageGroup === a ? "active" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, ageGroup: a }))}
                >
                  {a}
                </button>
              ))}
            </div>

            <div className="pm__actions">
              <button className="pm__btn pm__btn--save" onClick={handleSave}>
                Продолжить
              </button>
              <button
                className="pm__btn pm__btn--cancel"
                onClick={() => setModal(null)}
              >
                Отменить
              </button>
            </div>

            {modal.mode === "edit" && (
              <button
                className="pm__btn pm__btn--delete"
                onClick={handleDelete}
              >
                Удалить профиль
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
