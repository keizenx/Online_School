import { Link } from 'react-router-dom';
import { 
  BanknotesIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export const PaymentsDashboard = () => {
  const stats = [
    {
      title: "Total Encaissements",
      value: "125 400 €",
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      title: "Total Décaissements",
      value: "98 200 €",
      icon: <ArrowTrendingDownIcon className="h-6 w-6" />,
      color: "bg-red-500"
    }
  ];

  const paymentCategories = [
    {
      title: 'Frais de Scolarité',
      icon: <BanknotesIcon className="h-12 w-12" />,
      path: '/payments/students',
      description: 'Gestion des paiements étudiants',
      stats: '450 étudiants',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Salaires & Indemnités',
      icon: <UserGroupIcon className="h-12 w-12" />,
      path: '/payments/salaries',
      description: 'Gestion des rémunérations',
      stats: '65 employés',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      title: 'Rapports Financiers',
      icon: <ChartBarIcon className="h-12 w-12" />,
      path: '/payments/reports',
      description: 'Bilans et analyses',
      stats: 'Données mensuelles',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    }
  ];

  const recentPayments = [
    {
      id: 1,
      type: "Frais de scolarité",
      student: "Marie Dupont",
      amount: "850 €",
      date: "15/03/2024",
      status: "Payé"
    },
    {
      id: 2,
      type: "Salaire",
      student: "Prof. Martin",
      amount: "2 400 €",
      date: "14/03/2024",
      status: "En attente"
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Paiements</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble des transactions financières</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5" />
          Nouveau Paiement
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Catégories de paiement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentCategories.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            className={`${category.color} border p-6 rounded-xl hover:shadow-lg transition-all duration-300`}
          >
            <div className={`${category.iconColor} mb-4`}>
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="text-sm font-medium text-gray-500">
              {category.stats}
            </div>
          </Link>
        ))}
      </div>

      {/* Tableau des paiements récents */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Paiements Récents</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bénéficiaire</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{payment.type}</td>
                  <td className="px-6 py-4">{payment.student}</td>
                  <td className="px-6 py-4 font-medium">{payment.amount}</td>
                  <td className="px-6 py-4">{payment.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === 'Payé' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 