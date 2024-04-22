import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { ResetPasswordProvider } from "./context/ResetPasswordContext";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ErrorTokenResetPage from "./pages/ErrorTokenResetPage";

function App() {
  return(
    <AuthProvider>
      <TaskProvider>
        <ResetPasswordProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="*" element={<h1>Page not found</h1>}/>
                <Route path="/" element={ <HomePage />} />
                <Route path="/login" element={ <LoginPage/>} />
                <Route path="/register" element={ <RegisterPage/>} />
                <Route path="/forgot-password" element={ <ForgotPasswordPage/> }/>
                <Route path="/reset-password-error" element={ <ErrorTokenResetPage /> }/>
                <Route path="/reset-password/:id/:resetToken" element={ <ResetPasswordPage/> }/>

                <Route element= { <ProtectedRoute /> }>
                  <Route path="/tasks" element={  <TasksPage /> } />
                  <Route path="/add-task" element={ <TaskFormPage /> } />
                  <Route path="/tasks/:id" element={ <TaskFormPage /> } />
                  <Route path="/profile" element={ <ProfilePage /> } />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </ResetPasswordProvider>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App;