import { Route, Routes } from "react-router";
import { AuthProvider, RequireAuth } from "./contexts/AuthContext";
import { Layout } from "./layouts/Layout/Layout";
import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { SignupPage } from "./pages/signup/SignupPage";

function App() {
  return (<AuthProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  </AuthProvider>)
}

export default App;
