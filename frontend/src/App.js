import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import ViewSummary from './pages/ViewSummary';
import HomePage from './pages/HomePage';
import EditSummary from './pages/EditSummary';
import GenerateNewSummary from './pages/GenerateNewSummary';
import Summaries from "./pages/Summaries";
import {AuthProvider} from './components/AuthContext';
import SummaryTimeline from "./pages/SummaryTimeline";
import SummaryDiff from "./pages/SummaryDiff";
import {CSRFTokenProvider} from "./components/CSRFTokenContext";
import ManagerView from "./pages/ManagerView";
import Settings from "./pages/Settings";
import UserTable from "./pages/UserTable";
import {UserRole} from "./components/enums";

function App() {
    return (
        <Router> {/* router needed for all components below to make use of routing */}
            <div className="App">
                <CSRFTokenProvider> {/* Provides context for csrfToken to all the children components below */}
                    <AuthProvider> {/* Provides context for isLoggedIn, user to all the children components below */}
                        <NavBar/> {/* Provides navbar shared across all components below */}
                        <Routes> {/* Any children below should ONLY be a path and element to define the App's routes */}
                            <Route path="/" element={<HomePage/>}/> {/* Path and element */}
                            <Route path="/signup" element={<SignUp/>}/> {/* Path and element */}
                            <Route path="/signin" element={<SignIn/>}/> {/* Path and element */}
                            <Route path="/summaries" element={<Summaries/>}/> {/* Path and element */}
                            <Route path="/summary/:celex/view" element={<ProtectedRoute allowedRoles={[UserRole.NO_ROLE_ASSIGNED, UserRole.CITIZEN, UserRole.EDITOR, UserRole.LEGAL_EXPERT, UserRole.MANAGER]}><ViewSummary/></ProtectedRoute>}/> {/* Path and element and protected */}
                            <Route path="/summary/:celex/edit" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR]}><EditSummary/></ProtectedRoute>}/> {/* Path and element and protected */}
                            <Route path="/summary/:celex/timeline" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.LEGAL_EXPERT, UserRole.MANAGER]}><SummaryTimeline/></ProtectedRoute>}/> {/* Path and element and protected */}
                            <Route path="/summary/:celex/diff" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.LEGAL_EXPERT, UserRole.MANAGER]}><SummaryDiff/></ProtectedRoute>}/> {/* Path and element and protected */}
                            <Route path="/generate_new_summary" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.LEGAL_EXPERT, UserRole.MANAGER]}><GenerateNewSummary/></ProtectedRoute>}/> {/* Path and element and protected */}
                            <Route path="/manager" element={<ProtectedRoute allowedRoles={[UserRole.MANAGER]}><ManagerView/></ProtectedRoute>}/> {/* Path and element and protected */}
                            <Route path="/settings" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.LEGAL_EXPERT, UserRole.MANAGER, UserRole.CITIZEN]}><Settings/></ProtectedRoute>}/> {/* Path and element and protected */}
                            <Route path="/usertable" element={<ProtectedRoute allowedRoles={[UserRole.MANAGER]}><UserTable/></ProtectedRoute>}/> {/* Path and element and protected */}
                        </Routes>
                    </AuthProvider>
                </CSRFTokenProvider>
            </div>
        </Router>
    );
}

export default App;