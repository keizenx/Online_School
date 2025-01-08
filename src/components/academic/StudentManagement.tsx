import { useState } from 'react';
import { UserGroupIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  email: string;
  status: 'active' | 'inactive';
}

interface StudentFormData {
  firstName: string;
  lastName: string;
  class: string;
  email: string;
}

export const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      class: 'Terminal S',
      email: 'jean.dupont@email.com',
      status: 'active'
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      class: 'Première L',
      email: 'marie.martin@email.com',
      status: 'active'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    class: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: Date.now().toString(),
      ...formData,
      status: 'active'
    };
    setStudents(prev => [...prev, newStudent]);
    setShowModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      class: '',
      email: ''
    });
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <UserGroupIcon className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Gestion des Étudiants</h1>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          className="p-2 border rounded-lg w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Ajouter un Étudiant
        </button>
      </div>

      {/* Modal d'ajout d'étudiant */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Ajouter un Étudiant</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Classe</label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Aucun étudiant trouvé
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4">{student.lastName}</td>
                  <td className="px-6 py-4">{student.firstName}</td>
                  <td className="px-6 py-4">{student.class}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">Modifier</button>
                    <button 
                      onClick={() => handleDelete(student.id)} 
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 