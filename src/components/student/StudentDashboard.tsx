import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  ChatBubbleLeftIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export const StudentDashboard = () => {
  const stats = [
    {
      title: "Cours en Cours",
      value: "6",
      icon: <BookOpenIcon className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Devoirs à Rendre",
      value: "3",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      color: "bg-yellow-500"
    },
    {
      title: "Moyenne Générale",
      value: "15.5",
      icon: <AcademicCapIcon className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      title: "Prochains Examens",
      value: "2",
      icon: <CalendarIcon className="h-6 w-6" />,
      color: "bg-purple-500"
    }
  ];

  const menuItems = [
    {
      title: 'Mes Cours',
      icon: <BookOpenIcon className="h-8 w-8" />,
      path: '/courses',
      description: 'Accéder à vos cours',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    {
      title: 'Mes Notes',
      icon: <AcademicCapIcon className="h-8 w-8" />,
      path: '/grades',
      description: 'Consulter vos notes',
      color: 'hover:bg-green-50 hover:border-green-200'
    },
    {
      title: 'Forum & Chat',
      icon: <ChatBubbleLeftIcon className="h-8 w-8" />,
      path: '/forums',
      description: 'Communiquer avec les enseignants',
      color: 'hover:bg-purple-50 hover:border-purple-200'
    }
  ];

  const recentActivities = [
    {
      title: "Devoir de Mathématiques rendu",
      time: "Il y a 1 heure",
      icon: <CheckCircleIcon className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-100"
    },
    {
      title: "Nouveau cours de Physique disponible",
      time: "Il y a 3 heures",
      icon: <BookOpenIcon className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-blue-100"
    },
    {
      title: "Note d'Anglais publiée",
      time: "Il y a 5 heures",
      icon: <AcademicCapIcon className="h-5 w-5 text-purple-600" />,
      bgColor: "bg-purple-100"
    }
  ];

  const upcomingEvents = [
    {
      title: "Examen de Mathématiques",
      date: "Demain - 10:00",
      icon: <ClockIcon className="h-5 w-5 text-red-600" />,
      bgColor: "bg-red-100"
    },
    {
      title: "Rendu du Projet de Sciences",
      date: "Dans 2 jours",
      icon: <DocumentTextIcon className="h-5 w-5 text-yellow-600" />,
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tableau de Bord Étudiant</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Section des événements à venir */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Événements à Venir</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`${event.bgColor} p-2 rounded-full`}>
                  {event.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 