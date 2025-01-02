import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import { Dashboard } from './components/Dashboard';
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
              <Route path="/dashboard" element={<Dashboard userRole={user.role} />} />
              
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
                  <Route path="/academic/structure" element={<AcademicStructure />} />
                  <Route path="/academic/teachers" element={<TeacherAssignment />} />
                  <Route path="/academic/planning" element={<AcademicPlanning />} />
                </>
              )}

              {/* Routes Comptabilité */}
              {hasPermission('accounting') && (
                <>
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

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
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