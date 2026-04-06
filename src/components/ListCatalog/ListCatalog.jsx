import "./ListCatalog.scss";

export const ListCatalog = ({
  open,
  onClose,
  selected,
  onSelect,
  genres = [],
}) => (
  <>
    {open && <div className="drawer-overlay" onClick={onClose} />}
    <div className={`drawer ${open ? "open" : ""}`}>
      <button className="drawer__close" onClick={onClose}>
        ✕
      </button>
      <h3 className="drawer__title">Жанры</h3>
      <div className="drawer__grid">
        {["Все жанры", ...genres].map((g, i) => (
          <div
            key={i}
            className={`drawer__item ${selected === g ? "active" : ""}`}
            onClick={() => onSelect(g)}
          >
            {g}
          </div>
        ))}
      </div>
    </div>
  </>
);
