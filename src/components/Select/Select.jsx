import "./Select.scss";
import { useSelect } from "../../hooks/useSelect";

export const Select = ({ label, options, value, onSelect }) => {
  const { open, pos, ref, handleOpen, setOpen } = useSelect();

  return (
    <div className="fb-select" ref={ref} onClick={handleOpen}>
      <span className="fb-select__label">{label}</span>
      <span className="fb-select__value">
        {value} <span className="fb-select__arrow">{open ? "▴" : "▾"}</span>
      </span>
      {open && (
        <div
          className="fb-select__dropdown"
          style={{ position: "fixed", top: pos.top, left: pos.left }}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((o, i) => (
            <div
              key={i}
              className={`fb-select__option ${value === o ? "active" : ""}`}
              onClick={() => { onSelect(o); setOpen(false); }}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};