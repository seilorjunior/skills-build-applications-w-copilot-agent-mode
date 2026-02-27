import React, { useEffect, useState } from 'react';

const DIFFICULTY_COLORS = {
  Easy:   'success',
  Medium: 'warning',
  Hard:   'danger',
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log(`Fetching workouts from: ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Workouts data fetched:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error)   return <div className="alert alert-danger mt-4"><strong>Error:</strong> {error}</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>&#129330; Workouts</span>
        <span className="badge bg-light text-dark">{workouts.length} total</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-3">No workouts found.</td></tr>
              ) : (
                workouts.map((workout, index) => (
                  <tr key={workout.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td className="fw-semibold">{workout.name}</td>
                    <td className="text-muted">{workout.description}</td>
                    <td>
                      <span className={`badge bg-${DIFFICULTY_COLORS[workout.difficulty] || 'secondary'}`}>
                        {workout.difficulty}
                      </span>
                    </td>
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

export default Workouts;
