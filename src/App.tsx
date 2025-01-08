import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import { UserManagement } from './components/admin/UserManagement';
import { CourseManagement } from './components/courses/CourseManagement';
import { QuizManagement } from './components/quiz/QuizManagement';
import { StudentGrades } from './components/student/Grades';
import { Forums } from './components/forums/Forums';
import { Navigation } from './components/Navigation';
import { Chat } from './components/chat/Chat';
import AcademicStructure from './components/academic/AcademicStructure';
import TeacherAssignment from './components/academic/TeacherAssignment';
import { TimeTableManagement } from './components/planning/TimeTableManagement';
import { StudentProgress } from './components/student/StudentProgress';
import { SystemSettings } from './components/admin/SystemSettings';
import { Reports } from './components/admin/Reports';
import { AcademicPlanning } from './components/academic/AcademicPlanning';
import { StudentPayments } from './components/accounting/StudentPayments';
import { SalaryPayments } from './components/accounting/SalaryPayments';
import { FinancialReports } from './components/accounting/FinancialReports';
import { StudentAssignments } from './components/student/StudentAssignments';
import { StudentCourses } from './components/student/StudentCourses';
import { StudentManagement } from './components/academic/StudentManagement';
import { AcademicDashboard } from './components/academic/AcademicDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AccountingDashboard } from './components/accounting/AccountingDashboard';
import { PaymentsDashboard } from './components/accounting/PaymentsDashboard';

// Types
interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Fonction pour vérifier les permissions selon le rôle
  const hasPermission = (requiredRole: string | string[]) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  // Fonction pour obtenir la route du dashboard selon le rôle
  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'academic':
        return '/academic';
      case 'admin':
        return '/admin';
      case 'teacher':
        return '/teacher';
      case 'student':
        return '/student';
      case 'accounting':
        return '/accounting';
      default:
        return '/dashboard';
    }
  };

  return (
    <BrowserRouter>
      {user ? (
        <div className="min-h-screen bg-gray-100">
          <Navigation
            userRole={user.role}
            userName={user.name}
            onLogout={handleLogout}
          />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Redirection par défaut vers le dashboard approprié */}
              <Route path="/" element={<Navigate to={getDashboardRoute(user.role)} replace />} />
              <Route path="/dashboard" element={<Navigate to={getDashboardRoute(user.role)} replace />} />
              
              {/* Routes Admin */}
              {hasPermission('admin') && (
                <>
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/settings" element={<SystemSettings />} />
                  <Route path="/reports" element={<Reports />} />
                </>
              )}

              {/* Routes Responsable Scolarité */}
              {hasPermission('academic') && (
                <>
                  <Route path="/academic" element={<AcademicDashboard />} />
                  <Route path="/academic/structure" element={<AcademicStructure />} />
                  <Route path="/academic/teachers" element={<TeacherAssignment />} />
                  <Route path="/academic/planning" element={<AcademicPlanning />} />
                  <Route path="/academic/students" element={<StudentManagement />} />
                </>
              )}

              {/* Routes Comptabilité */}
              {hasPermission('accounting') && (
                <>
                  <Route path="/payments" element={<PaymentsDashboard />} />
                  <Route path="/payments/students" element={<StudentPayments />} />
                  <Route path="/payments/salaries" element={<SalaryPayments />} />
                  <Route path="/payments/reports" element={<FinancialReports />} />
                </>
              )}

              {/* Routes Enseignant */}
              {hasPermission(['teacher', 'admin']) && (
                <>
                  <Route path="/courses/*" element={<CourseManagement userRole={user.role} />} />
                  <Route path="/quizzes/*" element={<QuizManagement userRole={user.role} />} />
                  <Route path="/student-progress" element={<StudentProgress />} />
                </>
              )}

              {/* Routes communes Enseignant/Étudiant */}
              {hasPermission(['teacher', 'student', 'admin']) && (
                <>
                  <Route path="/forums/*" element={<Forums />} />
                  <Route path="/chat" element={<Chat userId={user.id} userRole={user.role} />} />
                </>
              )}

              {/* Routes Étudiant */}
              {hasPermission(['student']) && (
                <>
                  <Route path="/grades" element={<StudentGrades studentId={user.id} />} />
                  <Route path="/assignments" element={<StudentAssignments />} />
                  <Route path="/courses" element={<StudentCourses />} />
                </>
              )}

              <Route path="/planning" element={<TimeTableManagement userRole="admin" />} />

              {/* Routes des dashboards */}
              <Route path="/admin" element={hasPermission('admin') ? <AdminDashboard /> : <Navigate to="/" />} />
              <Route path="/teacher" element={hasPermission('teacher') ? <TeacherDashboard /> : <Navigate to="/" />} />
              <Route path="/student" element={hasPermission('student') ? <StudentDashboard /> : <Navigate to="/" />} />
              <Route path="/accounting" element={hasPermission('accounting') ? <AccountingDashboard /> : <Navigate to="/" />} />

              {/* Pour la route catch-all (*), rediriger vers le dashboard approprié */}
              <Route path="*" element={<Navigate to={getDashboardRoute(user.role)} replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}