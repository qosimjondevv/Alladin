import "./ProfileCard.scss";
import iconUser from "../../assets/icons/iconUser.svg";

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