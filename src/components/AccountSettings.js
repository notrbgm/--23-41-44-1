import React from 'react';

const AccountSettings = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900">
        <div className="text-red-600 text-2xl font-bold">
          <a href="/">CINEPLAY</a>
        </div>
        <nav className="space-x-4">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/tv-shows" className="hover:text-gray-400">TV Shows</a>
          <a href="/movies" className="hover:text-gray-400">Movies</a>
          <a href="/categories" className="hover:text-gray-400">Categories</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h1 className="text-3xl font-semibold mb-6">Account Settings</h1>
        <div className="space-y-4">
          {/* Account Information */}
          <section>
            <h2 className="text-xl font-medium">Account Information</h2>
            <div className="space-y-2">
              <div>
                <label htmlFor="username" className="block">Username</label>
                <input
                  type="text"
                  id="username"
                  defaultValue="JohnDoe"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
              </div>
              <div>
                <label htmlFor="email" className="block">Email</label>
                <input
                  type="email"
                  id="email"
                  defaultValue="johndoe@example.com"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
              </div>
            </div>
          </section>

          {/* Change Password */}
          <section>
            <h2 className="text-xl font-medium">Change Password</h2>
            <div className="space-y-2">
              <div>
                <label htmlFor="current-password" className="block">Current Password</label>
                <input
                  type="password"
                  id="current-password"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block">Confirm New Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
              </div>
            </div>
          </section>

          {/* Save Changes Button */}
          <div>
            <button className="w-full p-2 bg-red-600 hover:bg-red-700 rounded">
              Save Changes
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 p-4">
        <div className="text-center">
          <p>&copy; 2025 CINEPLAY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AccountSettings;
