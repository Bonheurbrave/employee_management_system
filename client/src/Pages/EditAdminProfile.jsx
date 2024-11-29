import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditAdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ email: '', username: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    // Fetch admin data
    fetch('http://localhost:5000/api/admins')
      .then((response) => response.json())
      .then((data) => {
        setAdmin(data);
        setFormData({ email: data.email, username: data.username });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.username) {
      setError('All fields are required');
      return;
    }

    fetch(`http://localhost:5000/api/admins/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
            setError(data.error);
            navigate('/profile'); // Navigate to profile page
        } else {
          alert('Admin updated successfully');
        }
      })
      .catch((error) => {
        console.error('Error updating admin data:', error);
        setError('Failed to update admin');
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-xl">Loading...</p>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-xl">No admin data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Edit Admin Profile</h1>

        {error && <p className="text-blue-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdminProfile;
