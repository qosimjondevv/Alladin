import "./ProfileCard.scss";
import { useNavigate } from "react-router-dom";
import { useEffect }   from "react";
import iconUser        from "../../assets/icons/iconUser.svg";
import iconBack        from "../../assets/icons/iconCaruselLeft.svg"; 

export const ProfileCard = ({ profile, onClick }) => (
  <div className="profile-card" onClick={() => onClick(profile)}>
    <div className="profile-card__avatar">
      {profile.img
        ? <img src={profile.img} alt={profile.name} />
        : <img src={iconUser} alt="" className="profile-card__placeholder" />
      }
    </div>
    <p className="profile-card__name">{profile.name}</p>
  </div>
);

export const AddProfileCard = ({ onClick }) => (
  <div className="profile-card profile-card--add" onClick={onClick}>
    <div className="profile-card__avatar avatar--add">+</div>
    <p className="profile-card__name">Добавить</p>
  </div>
);

export const ProfileBackBtn = () => {
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") nav(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  return (
    <button className="profile-back" onClick={() => nav(-1)}>
      <img src={iconBack} alt="back" />
    </button>
  );
};