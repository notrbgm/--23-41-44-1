import React, { useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { toast } from "sonner";
import { auth, signUp, signIn } from "@/firebase";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success("Logged in successfully!");
      } else {
        await signUp(email, password);
        toast.success("Account created successfully!");
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
        
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            
          </Transition.Child>

          
            
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                
                  
                    {isLogin ? "Sign In" : "Create Account"}
                  
                  <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <span className="sr-only">Close</span>
                    X
                  </button>
                

                
                  {!isLogin && (
                    
                      <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      
                    
                  )}
                  
                    <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    
                  
                  
                    <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    
                  
                  <button type="submit" className="w-full bg-red-600 text-white py-2.5 rounded-md hover:bg-red-700 transition duration-300">
                    {isLogin ? "Sign In" : "Sign Up"}
                  </button>
                
                
                  {isLogin ? "New to CinePlay?" : "Already a member?"}
                  
                
              </Transition.Child>
            
          
        
      </Dialog>
    </Transition.Root>
  );
};

export default AuthModal;
