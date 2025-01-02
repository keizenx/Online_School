import { useState } from 'react';
import { Settings, Database, Bell, Shield, Calendar, BarChart2, FileText, Users } from 'lucide-react';

interface SystemConfig {
  academicYear: string;
  semesterDates: {
    start: string;
    end: string;
  };
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    absenceAlerts: boolean;
  };
  securitySettings: {
    passwordExpiration: number;
    sessionTimeout: number;
    twoFactorAuth: boolean;
  };
}

interface Statistics {
  studentCount: number;
  teacherCount: number;
  courseCount: number;
  averageGrade: number;
  attendanceRate: number;
  successRate: number;
}

export function SystemConfiguration() {
  const [activeTab, setActiveTab] = useState<'config' | 'reports'>('config');
  const [config, setConfig] = useState<SystemConfig>({
    academicYear: '2023-2024',
    semesterDates: {
      start: '2023-09-01',
      end: '2024-06-30'
    },
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
      absenceAlerts: true
    },
    securitySettings: {
      passwordExpiration: 90,
      sessionTimeout: 30,
      twoFactorAuth: false
    }
  });

  const [statistics, _setStatistics] = useState<Statistics>({
    studentCount: 450,
    teacherCount: 35,
    courseCount: 48,
    averageGrade: 14.5,
    attendanceRate: 92,
    successRate: 87
  });

  const handleConfigUpdate = (section: keyof SystemConfig, value: any) => {
    setConfig({
      ...config,
      [section]: value
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Administration Système</h1>
        <div className="mt-4 border-b">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('config')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'config'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="w-5 h-5 inline-block mr-2" />
              Configuration
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart2 className="w-5 h-5 inline-block mr-2" />
              Rapports & Statistiques
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'config' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Paramètres académiques */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Paramètres Académiques
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Année Académique
                </label>
                <input
                  type="text"
                  value={config.academicYear}
                  onChange={(e) => handleConfigUpdate('academicYear', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début du semestre
                </label>
                <input
                  type="date"
                  value={config.semesterDates.start}
                  onChange={(e) => handleConfigUpdate('semesterDates', {
                    ...config.semesterDates,
                    start: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin du semestre
                </label>
                <input
                  type="date"
                  value={config.semesterDates.end}
                  onChange={(e) => handleConfigUpdate('semesterDates', {
                    ...config.semesterDates,
                    end: e.target.value
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Paramètres de notification */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-600" />
              Paramètres de Notification
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Notifications par email
                </label>
                <input
                  type="checkbox"
                  checked={config.notificationSettings.emailNotifications}
                  onChange={(e) => handleConfigUpdate('notificationSettings', {
                    ...config.notificationSettings,
                    emailNotifications: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Notifications SMS
                </label>
                <input
                  type="checkbox"
                  checked={config.notificationSettings.smsNotifications}
                  onChange={(e) => handleConfigUpdate('notificationSettings', {
                    ...config.notificationSettings,
                    smsNotifications: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Alertes d'absence
                </label>
                <input
                  type="checkbox"
                  checked={config.notificationSettings.absenceAlerts}
                  onChange={(e) => handleConfigUpdate('notificationSettings', {
                    ...config.notificationSettings,
                    absenceAlerts: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </div>
            </div>
          </div>

          {/* Paramètres de sécurité */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Paramètres de Sécurité
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration du mot de passe (jours)
                </label>
                <input
                  type="number"
                  value={config.securitySettings.passwordExpiration}
                  onChange={(e) => handleConfigUpdate('securitySettings', {
                    ...config.securitySettings,
                    passwordExpiration: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeout de session (minutes)
                </label>
                <input
                  type="number"
                  value={config.securitySettings.sessionTimeout}
                  onChange={(e) => handleConfigUpdate('securitySettings', {
                    ...config.securitySettings,
                    sessionTimeout: parseInt(e.target.value)
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Authentification à deux facteurs
                </label>
                <input
                  type="checkbox"
                  checked={config.securitySettings.twoFactorAuth}
                  onChange={(e) => handleConfigUpdate('securitySettings', {
                    ...config.securitySettings,
                    twoFactorAuth: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Statistiques générales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Étudiants</h3>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold mt-2">{statistics.studentCount}</p>
              <p className="text-sm text-gray-500 mt-1">Inscrits</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Moyenne générale</h3>
                <BarChart2 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold mt-2">{statistics.averageGrade}/20</p>
              <p className="text-sm text-gray-500 mt-1">Note moyenne</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Taux de réussite</h3>
                <BarChart2 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold mt-2">{statistics.successRate}%</p>
              <p className="text-sm text-gray-500 mt-1">Année en cours</p>
            </div>
          </div>

          {/* Graphiques et analyses détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Évolution des résultats</h3>
              {/* Intégrer ici un graphique d'évolution */}
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                Graphique d'évolution des résultats
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Répartition par filière</h3>
              {/* Intégrer ici un graphique circulaire */}
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                Graphique de répartition par filière
              </div>
            </div>
          </div>

          {/* Boutons d'export */}
          <div className="flex justify-end space-x-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FileText className="w-4 h-4 mr-2" />
              Exporter en PDF
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Database className="w-4 h-4 mr-2" />
              Exporter en Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 