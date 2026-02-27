import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log(`Fetching users from: ${apiUrl}`);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users data fetched:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error)   return <div className="alert alert-danger mt-4"><strong>Error:</strong> {error}</div>;

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>&#128100; Users</span>
        <span className="badge bg-light text-dark">{users.length} total</span>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted py-3">No users found.</td></tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td><span className="badge bg-secondary">{user.username}</span></td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
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

export default Users;
