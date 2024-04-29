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
import NewSummary from './pages/NewSummary';
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
        <Router>
            <div className="App">
                <CSRFTokenProvider>
                    <AuthProvider>
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path="/signin" element={<SignIn/>}/>
                            <Route path="/summaries" element={<Summaries/>}/>
                            <Route path="/summary/:celex/view" element={<ProtectedRoute allowedRoles={[UserRole.NO_ROLE_ASSIGNED, UserRole.CITIZEN, UserRole.EDITOR, UserRole.LEGAL_EXPERT, UserRole.MANAGER]}><ViewSummary/></ProtectedRoute>}/>
                            <Route path="/summary/:celex/edit" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR]}><EditSummary/></ProtectedRoute>}/>
                            <Route path="/summary/:celex/new" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR]}><NewSummary/></ProtectedRoute>}/>
                            <Route path="/summary/:celex/timeline" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.LEGAL_EXPERT, UserRole.MANAGER]}><SummaryTimeline/></ProtectedRoute>}/>
                            <Route path="/summary/:celex/diff" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR, UserRole.LEGAL_EXPERT, UserRole.MANAGER]}><SummaryDiff/></ProtectedRoute>}/>
                            <Route path="/generate_new_summary" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR]}><GenerateNewSummary/></ProtectedRoute>}/>
                            <Route path="/manager" element={<ProtectedRoute allowedRoles={[UserRole.MANAGER]}><ManagerView/></ProtectedRoute>}/>
                            <Route path="/settings" element={<ProtectedRoute allowedRoles={[UserRole.EDITOR]}><Settings/></ProtectedRoute>}/>
                            <Route path="/usertable" element={<ProtectedRoute allowedRoles={[UserRole.MANAGER]}><UserTable/></ProtectedRoute>}/>
                        </Routes>
                    </AuthProvider>
                </CSRFTokenProvider>
            </div>
        </Router>
    );
}

export default App;