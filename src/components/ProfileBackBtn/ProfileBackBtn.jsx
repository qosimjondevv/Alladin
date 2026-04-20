import "./ProfileBackBtn.scss";
import { useNavigate } from "react-router-dom";
import { useEscapeBack } from "../../hooks/useEscapeBack";
import iconBack from "../../assets/icons/iconCaruselLeft.svg";

export const ProfileBackBtn = () => {
  const nav = useNavigate();
  useEscapeBack();

  return (
    <button className="profile-back" onClick={() => nav(-1)}>
      <img src={iconBack} alt="back" />
    </button>
  );
};