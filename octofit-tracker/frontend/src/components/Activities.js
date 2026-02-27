import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log(`Fetching activities from: ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities data fetched:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error)   return <div className="alert alert-danger mt-4"><strong>Error:</strong> {error}</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>&#127939; Activities</span>
        <span className="badge bg-light text-dark">{activities.length} records</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted py-3">No activities found.</td></tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td><span className="badge bg-secondary">{activity.user}</span></td>
                    <td>{activity.type}</td>
                    <td>
                      <span className="badge bg-info text-dark">{activity.duration} min</span>
                    </td>
                    <td><span className="badge bg-primary">{activity.team}</span></td>
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

export default Activities;
