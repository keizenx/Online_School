import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  userRole: string;
  userName: string;
  onLogout: () => void;
}

export function Navigation({ userRole, userName, onLogout }: NavigationProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-600" : "text-gray-700";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className={`${isActive('/dashboard')} hover:text-blue-600`}
            >
              Dashboard
            </Link>

            {userRole === 'admin' && (
              <Link 
                to="/users" 
                className={`${isActive('/users')} hover:text-blue-600`}
              >
                Utilisateurs
              </Link>
            )}

            {userRole === 'academic' && (
              <>
                <Link 
                  to="/academic/structure" 
                  className={`${isActive('/academic/structure')} hover:text-blue-600`}
                >
                  Structure
                </Link>
                <Link 
                  to="/academic/teachers" 
                  className={`${isActive('/academic/teachers')} hover:text-blue-600`}
                >
                  Enseignants
                </Link>
              </>
            )}

            {userRole === 'accounting' && (
              <Link 
                to="/payments" 
                className={`${isActive('/payments')} hover:text-blue-600`}
              >
                Paiements
              </Link>
            )}

            {['teacher', 'admin'].includes(userRole) && (
              <>
                <Link 
                  to="/courses" 
                  className={`${isActive('/courses')} hover:text-blue-600`}
                >
                  Cours
                </Link>
                <Link 
                  to="/quizzes" 
                  className={`${isActive('/quizzes')} hover:text-blue-600`}
                >
                  Quiz
                </Link>
              </>
            )}

            {['teacher', 'student', 'admin'].includes(userRole) && (
              <>
                <Link 
                  to="/forums" 
                  className={`${isActive('/forums')} hover:text-blue-600`}
                >
                  Forums
                </Link>
                <Link 
                  to="/chat" 
                  className={`${isActive('/chat')} hover:text-blue-600`}
                >
                  Chat
                </Link>
              </>
            )}

            {userRole === 'student' && (
              <Link 
                to="/grades" 
                className={`${isActive('/grades')} hover:text-blue-600`}
              >
                Notes
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{userName}</span>
            <button
              onClick={onLogout}
              className="text-gray-700 hover:text-blue-600"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}