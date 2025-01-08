import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  Cog6ToothIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  BellAlertIcon,
  ServerIcon
} from '@heroicons/react/24/outline';

export const AdminDashboard = () => {
  const stats = [
    {
      title: "Utilisateurs Actifs",
      value: "256",
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Alertes Système",
      value: "2",
      icon: <BellAlertIcon className="h-6 w-6" />,
      color: "bg-red-500"
    },
    {
      title: "Taux de Performance",
      value: "98%",
      icon: <ServerIcon className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      title: "Sessions Actives",
      value: "45",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      color: "bg-purple-500"
    }
  ];

  const menuItems = [
    {
      title: 'Gestion des Utilisateurs',
      icon: <UserGroupIcon className="h-8 w-8" />,
      path: '/users',
      description: 'Gérer les comptes utilisateurs',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    {
      title: 'Paramètres Système',
      icon: <Cog6ToothIcon className="h-8 w-8" />,
      path: '/settings',
      description: 'Configuration du système',
      color: 'hover:bg-green-50 hover:border-green-200'
    },
    {
      title: 'Rapports',
      icon: <ChartBarIcon className="h-8 w-8" />,
      path: '/reports',
      description: 'Voir les statistiques',
      color: 'hover:bg-purple-50 hover:border-purple-200'
    }
  ];

  const recentActivities = [
    {
      title: "Nouvel utilisateur créé",
      time: "Il y a 10 minutes",
      icon: <UserGroupIcon className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Mise à jour système effectuée",
      time: "Il y a 2 heures",
      icon: <Cog6ToothIcon className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "Sauvegarde automatique",
      time: "Il y a 4 heures",
      icon: <ServerIcon className="h-5 w-5 text-purple-600" />,
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tableau de Bord Administrateur</h1>
        <span className="text-sm text-gray-500">Console d'administration</span>
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
        <h2 className="text-lg font-semibold mb-4">Activités Système Récentes</h2>
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
    </div>
  );
}; 