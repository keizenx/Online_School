import { useState } from 'react';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

interface FinancialData {
  month: string;
  income: number;
  expenses: number;
  profit: number;
  category: string;
}

export function FinancialReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [selectedYear, setSelectedYear] = useState('2024');

  const financialData: FinancialData[] = [
    {
      month: 'Janvier',
      income: 85000,
      expenses: 65000,
      profit: 20000,
      category: 'Frais de scolarité'
    },
    {
      month: 'Février',
      income: 82000,
      expenses: 63000,
      profit: 19000,
      category: 'Frais de scolarité'
    },
    {
      month: 'Mars',
      income: 88000,
      expenses: 67000,
      profit: 21000,
      category: 'Frais de scolarité'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rapports Financiers</h1>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="month">Mensuel</option>
            <option value="quarter">Trimestriel</option>
            <option value="year">Annuel</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Revenus totaux</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">255 000€</p>
          <p className="text-sm text-green-600">+8% vs année précédente</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Dépenses totales</h3>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold">195 000€</p>
          <p className="text-sm text-red-600">+5% vs année précédente</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Bénéfice net</h3>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">60 000€</p>
          <p className="text-sm text-blue-600">+15% vs année précédente</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Marge bénéficiaire</h3>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">23.5%</p>
          <p className="text-sm text-purple-600">+2% vs année précédente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Évolution mensuelle</h3>
          <div className="h-80 flex items-center justify-center border-t">
            {/* Ici vous pouvez intégrer un graphique d'évolution */}
            <div className="text-gray-500">Graphique d'évolution des revenus/dépenses</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Répartition des revenus</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Frais de scolarité</span>
                <span className="text-sm text-gray-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Services annexes</span>
                <span className="text-sm text-gray-600">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Activités extra-scolaires</span>
                <span className="text-sm text-gray-600">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Détails mensuels</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mois
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Revenus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Dépenses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Bénéfice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {financialData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.income.toLocaleString()}€
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.expenses.toLocaleString()}€
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.profit.toLocaleString()}€
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Prévisions</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Revenus prévus (prochain trimestre)</span>
                <span className="text-green-600">+5%</span>
              </div>
              <p className="text-2xl font-bold">267 750€</p>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Dépenses prévues (prochain trimestre)</span>
                <span className="text-red-600">+3%</span>
              </div>
              <p className="text-2xl font-bold">200 850€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 