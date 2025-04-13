import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; // Add useState
import AuthModal from "@/components/AuthModal"; // Import AuthModal
import Index from "@/pages/Index";
import Watch from "@/pages/Watch";
import Search from "@/pages/Search";
import Category from "@/pages/Category";
import Legal from "@/pages/Legal";
import MyList from "@/pages/MyList";
import AccountSettings from "@/pages/AccountSettings"; // Import AccountSettings page

const queryClient = new QueryClient();

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // State for modal

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* Auth Modal */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
        />

        <BrowserRouter>
          <Routes>
            {/* Pass setIsAuthModalOpen to Index page */}
            <Route 
              path="/" 
              element={<Index showAuthModal={() => setIsAuthModalOpen(true)} />} 
            />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:type" element={<Category />} />
            <Route path="/:type/:id/watch" element={<Watch />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/account-settings" element={<AccountSettings />} /> {/* Account settings route */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
