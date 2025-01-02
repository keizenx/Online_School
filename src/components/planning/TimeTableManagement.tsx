import { useState } from 'react';
import { Book, User, Plus, Edit, Trash2 } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  classroom: string;
  class: string;
}

interface TimeTableProps {
  userRole: 'admin' | 'teacher' | 'student';
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

export function TimeTableManagement({ userRole }: TimeTableProps) {
  const [selectedClass, setSelectedClass] = useState<string>('Terminal S2');
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);

  const [timeTable, setTimeTable] = useState<TimeSlot[]>([
    {
      id: '1',
      day: 'Lundi',
      startTime: '08:00',
      endTime: '10:00',
      subject: 'Mathématiques',
      teacher: 'Marie Martin',
      classroom: 'Salle 101',
      class: 'Terminal S2'
    },
    {
      id: '2',
      day: 'Lundi',
      startTime: '10:00',
      endTime: '12:00',
      subject: 'Physique',
      teacher: 'Jean Dupont',
      classroom: 'Salle 102',
      class: 'Terminal S2'
    }
  ]);

  const handleAddSlot = (newSlot: Omit<TimeSlot, 'id'>) => {
    setTimeTable([...timeTable, { ...newSlot, id: Date.now().toString() }]);
    setIsAddingSlot(false);
  };

  const handleUpdateSlot = (updatedSlot: TimeSlot) => {
    setTimeTable(timeTable.map(slot => 
      slot.id === updatedSlot.id ? updatedSlot : slot
    ));
    setEditingSlot(null);
  };

  const handleDeleteSlot = (slotId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce créneau ?')) {
      setTimeTable(timeTable.filter(slot => slot.id !== slotId));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Emploi du temps</h1>
        {userRole === 'admin' && (
          <button
            onClick={() => setIsAddingSlot(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouveau créneau
          </button>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Classe
        </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border rounded-md"
        >
          <option>Terminal S1</option>
          <option>Terminal S2</option>
          <option>Terminal L</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Horaire
              </th>
              {DAYS.map(day => (
                <th
                  key={day}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {TIME_SLOTS.map(time => (
              <tr key={time}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {time}
                </td>
                {DAYS.map(day => {
                  const slot = timeTable.find(
                    s => s.day === day && 
                    s.startTime === time && 
                    s.class === selectedClass
                  );

                  return (
                    <td key={`${day}-${time}`} className="px-6 py-4 whitespace-nowrap">
                      {slot ? (
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <div className="font-medium text-blue-900">
                            {slot.subject}
                          </div>
                          <div className="text-sm text-blue-700">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {slot.teacher}
                            </div>
                            <div className="flex items-center">
                              <Book className="w-4 h-4 mr-1" />
                              {slot.classroom}
                            </div>
                          </div>
                          {userRole === 'admin' && (
                            <div className="mt-2 flex space-x-2">
                              <button
                                onClick={() => setEditingSlot(slot)}
                                className="p-1 text-blue-600 hover:text-blue-700"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSlot(slot.id)}
                                className="p-1 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal d'ajout/modification */}
      {(isAddingSlot || editingSlot) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {isAddingSlot ? 'Nouveau créneau' : 'Modifier le créneau'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const slotData = {
                day: formData.get('day') as string,
                startTime: formData.get('startTime') as string,
                endTime: formData.get('endTime') as string,
                subject: formData.get('subject') as string,
                teacher: formData.get('teacher') as string,
                classroom: formData.get('classroom') as string,
                class: formData.get('class') as string,
              };

              if (editingSlot) {
                handleUpdateSlot({ ...slotData, id: editingSlot.id });
              } else {
                handleAddSlot(slotData);
              }
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jour
                </label>
                <select
                  name="day"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue={editingSlot?.day}
                >
                  {DAYS.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure de début
                  </label>
                  <select
                    name="startTime"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue={editingSlot?.startTime}
                  >
                    {TIME_SLOTS.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure de fin
                  </label>
                  <select
                    name="endTime"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue={editingSlot?.endTime}
                  >
                    {TIME_SLOTS.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matière
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  defaultValue={editingSlot?.subject}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enseignant
                </label>
                <input
                  type="text"
                  name="teacher"
                  required
                  defaultValue={editingSlot?.teacher}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salle
                </label>
                <input
                  type="text"
                  name="classroom"
                  required
                  defaultValue={editingSlot?.classroom}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classe
                </label>
                <select
                  name="class"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue={editingSlot?.class || selectedClass}
                >
                  <option>Terminal S1</option>
                  <option>Terminal S2</option>
                  <option>Terminal L</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingSlot(false);
                    setEditingSlot(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isAddingSlot ? 'Ajouter' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 