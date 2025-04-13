import React, { useState } from "react";
import "./AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="auth-modal-header">
          <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
          <button 
            className="auth-modal-switch"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "New to CinePlay? Sign up now." : "Already have an account? Sign in."}
          </button>
        </div>

        {/* Form */}
        <form className="auth-form">
          {!isLogin && (
            <input type="text" placeholder="Username" className="auth-input" />
          )}
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          <button type="submit" className="auth-submit">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
