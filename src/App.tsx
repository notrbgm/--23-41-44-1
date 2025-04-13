// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountSettings from "@/pages/AccountSettings";
import Navbar from "@/components/Navbar";
import Index from "@/pages/Index";
import Search from "@/pages/Search";
import Category from "@/pages/Category";
import Watch from "@/pages/Watch";
import Legal from "@/pages/Legal";
import MyList from "@/pages/MyList";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:type" element={<Category />} />
        <Route path="/:type/:id/watch" element={<Watch />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/account-settings" element={<AccountSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
