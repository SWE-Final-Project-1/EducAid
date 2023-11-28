import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/assignments" element={<Assignment />} />
          <Route path="/people" element={<People />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
