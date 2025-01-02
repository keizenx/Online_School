import { useState } from 'react';
import { Calendar, Clock, Shield, User, AlertTriangle, CheckCircle, Plus, Trash2, Edit } from 'lucide-react';

interface SecurityShift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  guard: string;
  location: string;
  status: 'planned' | 'in-progress' | 'completed' | 'issue';
  notes?: string;
}

export function SecurityPlanning() {
  const [shifts, setShifts] = useState<SecurityShift[]>([
    {
      id: '1',
      date: '2024-03-15',
      startTime: '08:00',
      endTime: '16:00',
      guard: 'Jean Kouassi',
      location: 'Entrée principale',
      status: 'planned'
    },
    {
      id: '2',
      date: '2024-03-15',
      startTime: '16:00',
      endTime: '00:00',
      guard: 'Marie Akissi',
      location: 'Entrée principale',
      status: 'planned'
    }
  ]);

  const [isAddingShift, setIsAddingShift] = useState(false);
  const [editingShift, setEditingShift] = useState<SecurityShift | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'issue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'issue': return <AlertTriangle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const handleAddShift = (newShift: Omit<SecurityShift, 'id'>) => {
    setShifts([...shifts, { ...newShift, id: Date.now().toString() }]);
    setIsAddingShift(false);
  };

  const handleUpdateShift = (updatedShift: SecurityShift) => {
    setShifts(shifts.map(shift => 
      shift.id === updatedShift.id ? updatedShift : shift
    ));
    setEditingShift(null);
  };

  const handleDeleteShift = (shiftId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce créneau ?')) {
      setShifts(shifts.filter(shift => shift.id !== shiftId));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Planning de Sécurité</h1>
        <button
          onClick={() => setIsAddingShift(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau créneau
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendrier */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700 mb-2">Points de contrôle</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                Entrée principale
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                Parking
              </div>
              <div className="flex items-center text-yellow-600">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Zone administrative
              </div>
            </div>
          </div>
        </div>

        {/* Liste des créneaux */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-semibold">Créneaux du {new Date(selectedDate).toLocaleDateString()}</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {shifts
                .filter(shift => shift.date === selectedDate)
                .map(shift => (
                  <div key={shift.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-medium">{shift.location}</h3>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {shift.guard}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {shift.startTime} - {shift.endTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(shift.status)}`}>
                          {getStatusIcon(shift.status)}
                          <span className="ml-1">{shift.status}</span>
                        </span>
                        <button
                          onClick={() => setEditingShift(shift)}
                          className="p-1 text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteShift(shift.id)}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'ajout/modification */}
      {(isAddingShift || editingShift) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {isAddingShift ? 'Nouveau créneau' : 'Modifier le créneau'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const shiftData = {
                date: formData.get('date') as string,
                startTime: formData.get('startTime') as string,
                endTime: formData.get('endTime') as string,
                guard: formData.get('guard') as string,
                location: formData.get('location') as string,
                status: 'planned' as const,
                notes: formData.get('notes') as string
              };

              if (editingShift) {
                handleUpdateShift({ ...shiftData, id: editingShift.id });
              } else {
                handleAddShift(shiftData);
              }
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure de début
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure de fin
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agent de sécurité
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emplacement
                </label>
                <select className="w-full px-3 py-2 border rounded-md">
                  <option>Entrée principale</option>
                  <option>Parking</option>
                  <option>Zone administrative</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingShift(false);
                    setEditingShift(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isAddingShift ? 'Ajouter' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 