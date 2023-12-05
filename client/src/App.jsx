import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { Upload } from "./pages/Upload";
import { Assignment } from "./pages/Assignment";
import { People } from "./pages/People";
import { Settings } from "./pages/Settings";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { Profile } from "./pages/Profile";
import { AssignmentInfo } from "./pages/AssignmentInfo";
import { Signup } from "./pages/Signup";
import { UserProvider } from "./contexts/UserContext";
import WsProvider from "./contexts/WsContext";
import { Login } from "./pages/Login";
import { Callback } from "./pages/Callback";
import { Onboard } from "./pages/Onboard";
import PrivateRoutes from "./components/auth/PrivateRoutes";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <WsProvider>
          <Router>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<Callback />} />
              <Route path="/auth/onboard" element={<Onboard />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<Create />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/assignments" element={<Assignment />} />
                <Route path="/assignments/:id" element={<AssignmentInfo />} />
                <Route path="/people" element={<People />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Router>
        </WsProvider>
      </UserProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
