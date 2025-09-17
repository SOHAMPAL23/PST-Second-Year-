import React, { useEffect, useState } from "react";
import "./API.css";

function API() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState(null); // store selected character

  useEffect(() => {
    setLoading(true);
    fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=12`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.items || []);
        setTotalPages(json.meta?.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching API:", err);
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="wrapper">
      {/* Cards */}
      <div className="card-container">
        {data.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => setSelected(item)} // click to view more images
          >
            <img src={item.image} alt={item.name} className="card-img" />
            <h3 className="card-title">{item.name}</h3>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal / Expanded View for More Images */}
      {selected && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelected(null)}>
              ✖
            </button>
            <h2>{selected.name}</h2>
            <div className="image-gallery">
              {selected.images?.map((img, idx) => (
                <img key={idx} src={img} alt={selected.name} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default API;
