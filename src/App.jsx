import { Header, Footer } from "./components/index";
import useCurrentUser from "./hooks/useCurrentUser";

const App = () => {
  const { loading, error } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {/* Display a generic error message */}
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="w-full">
        <Header />
        <main className="flex-grow p-4 md:p-8">
          {/* Placeholder for future routes */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
