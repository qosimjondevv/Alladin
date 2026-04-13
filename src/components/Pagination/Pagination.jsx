import "./Pagination.scss";

export const Pagination = ({ page, totalPages, onChange }) => {
  const getPages = () => {
    const pages = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination__edge"
        onClick={() => onChange(1)}
        disabled={page === 1}
        title="Первая"
      >«</button>

      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >←</button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`d${i}`} className="dots">…</span>
        ) : (
          <button
            key={p}
            className={p === page ? "active" : ""}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >→</button>

      <button
        className="pagination__edge"
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
        title="Последняя"
      >»</button>
    </div>
  );
};