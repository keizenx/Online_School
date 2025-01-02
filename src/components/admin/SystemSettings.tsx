import { useState } from 'react';
import { Settings, Bell, Shield, School, Globe, Database } from 'lucide-react';

interface SystemConfig {
  schoolName: string;
  academicYear: string;
  emailNotifications: boolean;
  maintenanceMode: boolean;
  defaultLanguage: string;
  timezone: string;
  theme: string;
  maxStudentsPerClass: number;
  backupFrequency: string;
}

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [config, setConfig] = useState<SystemConfig>({
    schoolName: "École en ligne",
    academicYear: "2023-2024",
    emailNotifications: true,
    maintenanceMode: false,
    defaultLanguage: "fr",
    timezone: "Europe/Paris",
    theme: "light",
    maxStudentsPerClass: 30,
    backupFrequency: "daily"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de sauvegarde des paramètres
    console.log('Settings saved:', config);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Paramètres du Système</h1>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sauvegarder les modifications
        </button>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar de navigation */}
        <div className="w-64">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'general' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Général
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'appearance' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Globe className="w-5 h-5 mr-3" />
                Apparence
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'academic' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <School className="w-5 h-5 mr-3" />
                Académique
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Shield className="w-5 h-5 mr-3" />
                Sécurité
              </button>
              <button
                onClick={() => setActiveTab('backup')}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'backup' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Database className="w-5 h-5 mr-3" />
                Sauvegardes
              </button>
            </nav>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Paramètres généraux</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'établissement
                </label>
                <input
                  type="text"
                  value={config.schoolName}
                  onChange={(e) => setConfig({...config, schoolName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Année académique
                </label>
                <input
                  type="text"
                  value={config.academicYear}
                  onChange={(e) => setConfig({...config, academicYear: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuseau horaire
                </label>
                <select
                  value={config.timezone}
                  onChange={(e) => setConfig({...config, timezone: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={config.maintenanceMode}
                  onChange={(e) => setConfig({...config, maintenanceMode: e.target.checked})}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="maintenanceMode" className="ml-2 text-sm text-gray-700">
                  Mode maintenance
                </label>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Apparence</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thème
                </label>
                <select
                  value={config.theme}
                  onChange={(e) => setConfig({...config, theme: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="system">Système</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Paramètres académiques</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre maximum d'élèves par classe
                </label>
                <input
                  type="number"
                  value={config.maxStudentsPerClass}
                  onChange={(e) => setConfig({...config, maxStudentsPerClass: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Paramètres de notifications</h2>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={config.emailNotifications}
                  onChange={(e) => setConfig({...config, emailNotifications: e.target.checked})}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">
                  Activer les notifications par email
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Paramètres de sécurité</h2>
              {/* Contenu des paramètres de sécurité */}
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold mb-4">Paramètres de sauvegarde</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fréquence des sauvegardes
                </label>
                <select
                  value={config.backupFrequency}
                  onChange={(e) => setConfig({...config, backupFrequency: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="hourly">Toutes les heures</option>
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 