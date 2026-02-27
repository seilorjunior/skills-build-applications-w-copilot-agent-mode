import React, { useEffect, useState } from 'react';

const RANK_MEDALS = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log(`Fetching leaderboard from: ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard data fetched:', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error)   return <div className="alert alert-danger mt-4"><strong>Error:</strong> {error}</div>;

  const sorted = entries.slice().sort((a, b) => b.points - a.points);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>&#127942; Leaderboard</span>
        <span className="badge bg-light text-dark">{entries.length} teams</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-3">No leaderboard data found.</td></tr>
              ) : (
                sorted.map((entry, index) => (
                  <tr key={entry.id || index} className={index === 0 ? 'table-warning fw-bold' : ''}>
                    <td>{RANK_MEDALS[index] || index + 1}</td>
                    <td><span className="badge bg-primary fs-6">{entry.team}</span></td>
                    <td><span className="badge bg-success fs-6">{entry.points} pts</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
