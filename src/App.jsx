// import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/index";
import useCurrentUser from "./hooks/useCurrentUser";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";

const App = () => {
  const { loading, error } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-warmGray">
        <p className="text-2xl font-semibold text-deepNavy animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-warmGray">
        <p className="text-xl font-semibold text-coral">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-warmGray text-primaryText">
      <Header />
      <main className="flex-grow p-6 md:p-12 bg-white shadow-xl rounded-lg mx-4 md:mx-16 my-6">
        {/* Placeholder for future routes */}
        {/* <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
