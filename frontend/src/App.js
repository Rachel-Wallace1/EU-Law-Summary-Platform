import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar';
import ViewSummary from './pages/ViewSummary';
import HomePage from './pages/HomePage';
import EditSummary from './pages/EditSummary';
import NewSummary from './pages/NewSummary';
import GenerateNewSummary from './pages/GenerateNewSummary';
import Summaries from "./pages/Summaries";
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/summaries" element={<Summaries />} />
            <Route path="/summary/:celex/view" element={<ViewSummary />} />
            <Route path="/summary/:celex/edit" element={<EditSummary />} />
            <Route path="/summary/:celex/new" element={<NewSummary />} />
            <Route path="/generate_new_summary" element={<GenerateNewSummary />} />
            {/* Add other routes as needed */}
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
