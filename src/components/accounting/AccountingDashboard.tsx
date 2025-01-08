import { Link } from 'react-router-dom';
import { 
  BanknotesIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationCircleIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';

export const AccountingDashboard = () => {
  const stats = [
    {
      title: "Revenus du Mois",
      value: "75 400 €",
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      title: "Dépenses du Mois",
      value: "45 200 €",
      icon: <ArrowTrendingDownIcon className="h-6 w-6" />,
      color: "bg-red-500"
    },
    {
      title: "Paiements en Attente",
      value: "12",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      color: "bg-yellow-500"
    },
    {
      title: "Budget Restant",
      value: "30 200 €",
      icon: <CalculatorIcon className="h-6 w-6" />,
      color: "bg-blue-500"
    }
  ];

  const menuItems = [
    {
      title: 'Paiements Étudiants',
      icon: <BanknotesIcon className="h-8 w-8" />,
      path: '/payments/students',
      description: 'Gérer les frais de scolarité',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    {
      title: 'Salaires',
      icon: <UserGroupIcon className="h-8 w-8" />,
      path: '/payments/salaries',
      description: 'Gérer les salaires',
      color: 'hover:bg-green-50 hover:border-green-200'
    },
    {
      title: 'Rapports Financiers',
      icon: <ChartBarIcon className="h-8 w-8" />,
      path: '/payments/reports',
      description: 'Voir les bilans financiers',
      color: 'hover:bg-purple-50 hover:border-purple-200'
    }
  ];

  const recentTransactions = [
    {
      title: "Paiement frais de scolarité",
      amount: "+ 850 €",
      time: "Il y a 15 minutes",
      icon: <BanknotesIcon className="h-5 w-5 text-green-600" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      title: "Versement salaires",
      amount: "- 12 400 €",
      time: "Il y a 2 heures",
      icon: <UserGroupIcon className="h-5 w-5 text-red-600" />,
      bgColor: "bg-red-100",
      textColor: "text-red-600"
    },
    {
      title: "Paiement fournitures",
      amount: "- 1 200 €",
      time: "Il y a 4 heures",
      icon: <DocumentTextIcon className="h-5 w-5 text-red-600" />,
      bgColor: "bg-red-100",
      textColor: "text-red-600"
    }
  ];

  const alerts = [
    {
      title: "5 paiements en retard",
      description: "Frais de scolarité T1",
      priority: "Haute",
      icon: <ExclamationCircleIcon className="h-5 w-5 text-red-600" />,
      bgColor: "bg-red-100"
    },
    {
      title: "Échéance salaires",
      description: "Dans 3 jours",
      priority: "Moyenne",
      icon: <BanknotesIcon className="h-5 w-5 text-yellow-600" />,
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tableau de Bord Comptabilité</h1>
        <span className="text-sm text-gray-500">Gestion financière</span>
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
        {/* Section des transactions récentes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Transactions Récentes</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`${transaction.bgColor} p-2 rounded-full`}>
                    {transaction.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.title}</p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.textColor}`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section des alertes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Alertes Financières</h2>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`${alert.bgColor} p-2 rounded-full`}>
                  {alert.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-gray-600">{alert.description}</p>
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