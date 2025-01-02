import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  time: string;
  class: string;
  subject: string;
  teacher: string;
  room: string;
}

export function AcademicPlanning() {
  const [selectedClass, setSelectedClass] = useState('Terminal S1');
  const [showAddModal, setShowAddModal] = useState(false);

  const timeSlots: TimeSlot[] = [
    {
      id: '1',
      day: 'Lundi',
      time: '08:00 - 10:00',
      class: 'Terminal S1',
      subject: 'Mathématiques',
      teacher: 'Marie Martin',
      room: 'Salle 101'
    },
    {
      id: '2',
      day: 'Lundi',
      time: '10:15 - 12:15',
      class: 'Terminal S1',
      subject: 'Physique',
      teacher: 'Thomas Dubois',
      room: 'Salle 102'
    }
  ];

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const hours = ['08:00', '10:15', '14:00', '16:15'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Planning Académique</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border rounded-md w-64"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option>Terminal S1</option>
            <option>Terminal S2</option>
            <option>Terminal L</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un cours
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-6 gap-px bg-gray-200">
          <div className="bg-gray-50 p-4"></div>
          {days.map(day => (
            <div key={day} className="bg-gray-50 p-4 font-medium text-center">
              {day}
            </div>
          ))}
        </div>

        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-6 gap-px bg-gray-200">
            <div className="bg-white p-4 text-sm text-gray-600">
              {hour}
            </div>
            {days.map(day => {
              const slot = timeSlots.find(
                s => s.day === day && s.time.startsWith(hour)
              );
              return (
                <div key={`${day}-${hour}`} className="bg-white p-4">
                  {slot && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="font-medium text-blue-900">
                        {slot.subject}
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        {slot.teacher}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        {slot.room}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Ajouter un cours</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jour
                </label>
                <select className="w-full px-3 py-2 border rounded-md">
                  {days.map(day => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horaire
                </label>
                <select className="w-full px-3 py-2 border rounded-md">
                  {hours.map(hour => (
                    <option key={hour}>{hour}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matière
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enseignant
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salle
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 