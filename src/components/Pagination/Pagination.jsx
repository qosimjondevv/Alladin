import "./Pagination.scss";

export const Pagination = ({ page, totalPages, onChange }) => {
  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 2) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}>
        ←
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={i} className="dots">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={p === page ? "active" : ""}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ),
      )}

      <button onClick={() => onChange(page + 1)} disabled={page === totalPages}>
        →
      </button>
    </div>
  );
};
