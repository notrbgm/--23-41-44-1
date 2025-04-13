import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "sonner";
import { auth, signUp, signIn } from "@/lib/firebase";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";

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
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
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
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative z-20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {isLogin ? "Sign In" : "Create Account"}
                </h2>
                <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 relative">
                {!isLogin && (
                  <div className="relative">
                    <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                )}
                <div className="relative">
                  <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="relative">
                  <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2.5 rounded-md hover:bg-red-700 transition duration-300"
                >
                  {isLogin ? "Sign In" : "Sign Up"}
                </button>
              </form>

              <div className="mt-4 text-sm text-center">
                {isLogin ? "New to CinePlay?" : "Already a member?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-600 hover:underline"
                >
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AuthModal;
