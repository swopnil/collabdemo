import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, User, Search } from 'lucide-react';
import { Button } from '../ui/button';
const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <span 
              className="text-xl font-bold cursor-pointer"
              onClick={() => navigate('/')}
            >
              CampusConnect
            </span>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => navigate('/campus-network')}
              className="text-sm font-medium transition-colors hover:text-blue-600"
            >
              Campus Network
            </button>
            <button 
              onClick={() => navigate('/opportunities')}
              className="text-sm font-medium transition-colors hover:text-blue-600"
            >
              Opportunities
            </button>
            <button 
              onClick={() => navigate('/workspace')}
              className="text-sm font-medium transition-colors hover:text-blue-600"
            >
              Workspace
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search..."
                className="pl-8 pr-4 py-2 w-[200px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <MessageSquare className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <User className="h-5 w-5" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setShowDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setShowDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setIsAuthenticated(false);
                          setShowDropdown(false);
                        }}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <button 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;