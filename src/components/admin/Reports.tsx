import { useState } from 'react';
import { BarChart, PieChart, LineChart, Download, Calendar } from 'lucide-react';

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('students');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Rapports et Statistiques</h1>
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="trimester">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Effectifs</h3>
            <BarChart className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">85</p>
          <p className="text-sm text-gray-600">Élèves inscrits</p>
          <p className="text-xs text-green-600 mt-2">↑ +5% ce mois</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Présence</h3>
            <LineChart className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">92%</p>
          <p className="text-sm text-gray-600">Taux de présence</p>
          <p className="text-xs text-green-600 mt-2">↑ +2% cette semaine</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Performance</h3>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">78%</p>
          <p className="text-sm text-gray-600">Moyenne générale</p>
          <p className="text-xs text-yellow-600 mt-2">→ Stable</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Répartition par classe</h3>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-2 py-1 border rounded-md text-sm"
            >
              <option value="students">Effectifs</option>
              <option value="attendance">Présence</option>
              <option value="grades">Notes</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center border-t">
            {/* Ici vous pouvez intégrer une vraie bibliothèque de graphiques */}
            <div className="text-gray-500">Visualisation des données {selectedReport}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Calendrier des événements</h3>
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
              <div>
                <p className="font-medium">Conseil de classe Terminal S1</p>
                <p className="text-sm text-gray-600">15 Mars 2024 - 14:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-600"></div>
              <div>
                <p className="font-medium">Réunion parents-professeurs</p>
                <p className="text-sm text-gray-600">20 Mars 2024 - 17:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-600"></div>
              <div>
                <p className="font-medium">Examens trimestriels</p>
                <p className="text-sm text-gray-600">25-29 Mars 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 