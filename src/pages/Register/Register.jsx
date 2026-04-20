import "./Register.scss";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import iconUser from "../../assets/icons/iconUser.svg";

export const Register = () => {
  const nav      = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form,   setForm]   = useState({ name: "", password: "" });
  const [errors, setErrors] = useState({});
  const from = location.state?.from || "/";

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name     = "Имя обязательно";
    if (!form.password.trim()) e.password = "Пароль обязателен";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    login(form.name, form.password);
    nav(from, { replace: true });
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  return (
    <div className="reg">
      <div className="reg__box">
        <div className="reg__avatar">
          <img src={iconUser} alt="" />
        </div>

        <h2 className="reg__title">Вы регистрируетесь на alladdin</h2>
        <p className="reg__sub">Придумайте пароль для входа на всех устройствах.</p>

        <div className="reg__fields">
          <div className={`reg__field ${errors.name ? "error" : ""}`}>
            <img src={iconUser} alt="" className="reg__field-icon" />
            <input
              type="text"
              placeholder="Имя"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoComplete="username"
            />
          </div>
          {errors.name && <p className="reg__error">{errors.name}</p>}

          <div className={`reg__field ${errors.password ? "error" : ""}`}>
            <img src={iconUser} alt="" className="reg__field-icon" />
            <input
              type="password"
              placeholder="Придумайте пароль"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              autoComplete="new-password"
            />
          </div>
          {errors.password && <p className="reg__error">{errors.password}</p>}
        </div>

        <button className="reg__btn" onClick={handleSubmit}>
          Продолжить
        </button>
      </div>
    </div>
  );
};