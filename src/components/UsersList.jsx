
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { apiService } from '../services/apiService';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [page]);

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = users.filter(user => 
        user.first_name.toLowerCase().includes(lowercaseSearch) ||
        user.last_name.toLowerCase().includes(lowercaseSearch) ||
        user.email.toLowerCase().includes(lowercaseSearch)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getUsers(page);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await apiService.deleteUser(userId);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers.filter(user => {
        const lowercaseSearch = searchTerm.toLowerCase();
        return user.first_name.toLowerCase().includes(lowercaseSearch) ||
               user.last_name.toLowerCase().includes(lowercaseSearch) ||
               user.email.toLowerCase().includes(lowercaseSearch);
      }));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <Toaster position="top-right" />
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">User Management</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-neutral-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="text" 
              className="block w-full p-4 pl-10 text-sm border border-neutral-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 text-neutral-800" 
              placeholder="Search users by name or email..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div 
                    key={user.id} 
                    className="bg-white rounded-xl shadow-subtle p-6 hover:shadow-hover transition"
                  >
                    <img 
                      src={user.avatar} 
                      alt={`${user.first_name} ${user.last_name}`} 
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-neutral-800">
                        {`${user.first_name} ${user.last_name}`}
                      </h2>
                      <p className="text-neutral-600 mb-4">{user.email}</p>
                      <div className="flex justify-center space-x-3">
                        <button 
                          onClick={() => navigate(`/edit/${user.id}`, { state: { user } })}
                          className="bg-gray-600 px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-neutral-600">No users match your search. Try a different term.</p>
                </div>
              )}
            </div>

            {/* Only show pagination when not filtering */}
            {searchTerm.trim() === '' && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded-md transition ${
                      page === pageNum 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersList;