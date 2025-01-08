import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';

export const AcademicDashboard = () => {
  const stats = [
    {
      title: "Total Étudiants",
      value: "450",
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Total Classes",
      value: "15",
      icon: <BuildingLibraryIcon className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      title: "Enseignants",
      value: "28",
      icon: <AcademicCapIcon className="h-6 w-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Taux de Réussite",
      value: "92%",
      icon: <ChartBarIcon className="h-6 w-6" />,
      color: "bg-yellow-500"
    }
  ];

  const menuItems = [
    {
      title: 'Gestion des Étudiants',
      icon: <UserGroupIcon className="h-8 w-8" />,
      path: '/academic/students',
      description: 'Gérer les dossiers étudiants',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    {
      title: 'Structure Académique',
      icon: <BuildingLibraryIcon className="h-8 w-8" />,
      path: '/academic/structure',
      description: 'Gérer les classes et niveaux',
      color: 'hover:bg-green-50 hover:border-green-200'
    },
    {
      title: 'Affectation Enseignants',
      icon: <AcademicCapIcon className="h-8 w-8" />,
      path: '/academic/teachers',
      description: 'Gérer les affectations',
      color: 'hover:bg-purple-50 hover:border-purple-200'
    },
    {
      title: 'Planning Académique',
      icon: <CalendarIcon className="h-8 w-8" />,
      path: '/academic/planning',
      description: 'Gérer le calendrier scolaire',
      color: 'hover:bg-yellow-50 hover:border-yellow-200'
    }
  ];

  const recentActivities = [
    {
      title: "Nouvel étudiant inscrit",
      time: "Il y a 30 minutes",
      icon: <UserGroupIcon className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Mise à jour du planning",
      time: "Il y a 2 heures",
      icon: <CalendarIcon className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "Affectation enseignant modifiée",
      time: "Il y a 3 heures",
      icon: <AcademicCapIcon className="h-5 w-5 text-purple-600" />,
      bgColor: "bg-purple-100"
    }
  ];

  const alerts = [
    {
      title: "Conflit d'emploi du temps - Terminal S",
      priority: "Haute",
      icon: <BellAlertIcon className="h-5 w-5 text-red-600" />,
      bgColor: "bg-red-100"
    },
    {
      title: "Capacité maximale atteinte - 2nde B",
      priority: "Moyenne",
      icon: <ClipboardDocumentListIcon className="h-5 w-5 text-yellow-600" />,
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tableau de Bord Scolarité</h1>
        <span className="text-sm text-gray-500">Gestion académique</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section des activités récentes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Activités Récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`${activity.bgColor} p-2 rounded-full`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section des alertes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Alertes</h2>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`${alert.bgColor} p-2 rounded-full`}>
                  {alert.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-gray-500">Priorité: {alert.priority}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 