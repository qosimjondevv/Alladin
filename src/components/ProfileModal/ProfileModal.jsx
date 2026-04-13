import "./ProfileModal.scss";
import iconUser from "../../assets/icons/iconUser.svg";
import iconEdit from "../../assets/icons/iconEdit.svg";
import { AGE_GROUPS } from "../../constants";

export const ProfileModal = ({ modal, form, setForm, onSave, onDelete, onClose }) => {
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, img: URL.createObjectURL(file) }));
  };

  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm" onClick={(e) => e.stopPropagation()}>
        <h2 className="pm__title">
          {modal.mode === "add" ? "Добавить профиль" : "Редактировать профиль"}
        </h2>
        <p className="pm__subtitle">
          Добавить профиль для другого человека, смотрящего aladdin.
        </p>

        <label className="pm__avatar">
          <input type="file" accept="image/*" hidden onChange={handleImgChange} />
          {form.img
            ? <img src={form.img} alt="" className="pm__avatar-img" />
            : <img src={iconUser} alt="" className="pm__avatar-placeholder" />
          }
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
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
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
          <button className="pm__btn pm__btn--save"   onClick={onSave}>Продолжить</button>
          <button className="pm__btn pm__btn--cancel" onClick={onClose}>Отменить</button>
        </div>

        {modal.mode === "edit" && (
          <button className="pm__btn pm__btn--delete" onClick={onDelete}>
            Удалить профиль
          </button>
        )}
      </div>
    </div>
  );
};