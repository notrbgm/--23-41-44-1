// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from './firebase/firebaseConfig';
import Navbar from '@/components/Navbar';
import Index from '@/pages/Index';
import Search from '@/pages/Search';
import Category from '@/pages/Category';
import Watch from '@/pages/Watch';
import Legal from '@/pages/Legal';
import MyList from '@/pages/MyList';
import AccountSettings from '@/pages/AccountSettings';
import SignIn from '@/pages/SignIn';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Optionally, render a loading spinner or message
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:type" element={<Category />} />
        <Route path="/:type/:id/watch" element={<Watch />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/login" element={<SignIn />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/my-list" element={<MyList />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
