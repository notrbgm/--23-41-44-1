import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center p-8 bg-gray-900 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-6">
          <ArrowLeft size={50} className="text-red-500 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Content Not Found</h1>
        <p className="text-lg text-gray-400 mb-6">
          Sorry, we couldn't find what you're looking for. The content might have been moved or removed.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <ArrowLeft size={20} />
          Back to Browse
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
