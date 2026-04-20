import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useEscapeBack = () => {
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") nav(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);
};