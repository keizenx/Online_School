import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  ChatBubbleLeftIcon,
  UsersIcon,
  ClockIcon,
  DocumentCheckIcon 
} from '@heroicons/react/24/outline';

export const TeacherDashboard = () => {
  // Données factices pour la démo
  const stats = [
    {
      title: "Cours Actifs",
      value: "8",
      icon: <BookOpenIcon className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Étudiants",
      value: "124",
      icon: <UsersIcon className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      title: "Devoirs à Corriger",
      value: "12",
      icon: <DocumentCheckIcon className="h-6 w-6" />,
      color: "bg-yellow-500"
    },
    {
      title: "Prochains Cours",
      value: "3",
      icon: <ClockIcon className="h-6 w-6" />,
      color: "bg-purple-500"
    }
  ];

  const menuItems = [
    {
      title: 'Mes Cours',
      icon: <BookOpenIcon className="h-8 w-8" />,
      path: '/courses',
      description: 'Gérer vos cours',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    {
      title: 'Évaluations',
      icon: <AcademicCapIcon className="h-8 w-8" />,
      path: '/quizzes',
      description: 'Gérer les évaluations',
      color: 'hover:bg-green-50 hover:border-green-200'
    },
    {
      title: 'Forum & Chat',
      icon: <ChatBubbleLeftIcon className="h-8 w-8" />,
      path: '/forums',
      description: 'Communiquer avec les étudiants',
      color: 'hover:bg-purple-50 hover:border-purple-200'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tableau de Bord Enseignant</h1>
        <span className="text-sm text-gray-500">Bienvenue dans votre espace</span>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 
              transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${item.color}`}
          >
            <div className="flex items-center gap-4">
              <div className="text-blue-600">{item.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Section des activités récentes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Activités Récentes</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <DocumentCheckIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Nouveau devoir soumis</p>
                <p className="text-xs text-gray-500">Il y a {index + 1} heure{index > 0 ? 's' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 