import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { apiService } from '../services/apiService';

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/');
      return;
    }

    // Prefill from route state
    if (location.state?.user) {
      setUser({
        first_name: location.state.user.first_name,
        last_name: location.state.user.last_name,
        email: location.state.user.email
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.updateUser(id, user);
      toast.success('User updated successfully');
      navigate('/users');
    } catch (error) {
      toast.error('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-subtle">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-neutral-800">
            Edit User
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Update user details
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={user.first_name}
              onChange={(e) => setUser({...user, first_name: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={user.last_name}
              onChange={(e) => setUser({...user, last_name: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className=" bg-gray-600 w-full py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update User'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="w-full py-2 bg-neutral-200 text-neutral-800 rounded-md hover:bg-neutral-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;