import { useState } from 'react';
import { User, Search, Plus, X } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  assignedClasses: string[];
}

export default function TeacherAssignment() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Marie Martin',
      email: 'marie.martin@ecole.fr',
      department: 'Sciences',
      subjects: ['Mathématiques', 'Physique'],
      assignedClasses: ['Terminal S1', 'Terminal S2']
    },
    {
      id: '2',
      name: 'Jean Dupont',
      email: 'jean.dupont@ecole.fr',
      department: 'Lettres',
      subjects: ['Français', 'Philosophie'],
      assignedClasses: ['Terminal L']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const departments = ['Sciences', 'Lettres', 'Langues'];
  const subjects = ['Mathématiques', 'Physique', 'Français', 'Philosophie', 'Anglais', 'Histoire-Géographie'];
  const classes = ['Terminal S1', 'Terminal S2', 'Terminal L'];

  const handleAddTeacher = (formData: FormData) => {
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      department: formData.get('department') as string,
      subjects: formData.getAll('subjects') as string[],
      assignedClasses: formData.getAll('classes') as string[]
    };
    setTeachers([...teachers, newTeacher]);
    setIsAddingTeacher(false);
  };

  const handleUpdateTeacher = (formData: FormData) => {
    if (!selectedTeacher) return;

    const updatedTeacher: Teacher = {
      ...selectedTeacher,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      department: formData.get('department') as string,
      subjects: formData.getAll('subjects') as string[],
      assignedClasses: formData.getAll('classes') as string[]
    };

    setTeachers(teachers.map(teacher => 
      teacher.id === selectedTeacher.id ? updatedTeacher : teacher
    ));
    setSelectedTeacher(null);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Affectation des Enseignants</h1>
        <button
          onClick={() => setIsAddingTeacher(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvel Enseignant
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un enseignant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <User className="w-10 h-10 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.email}</p>
                  <p className="text-sm text-gray-600 mt-1">{teacher.department}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeacher(teacher)}
                className="text-blue-600 hover:text-blue-700"
              >
                Modifier
              </button>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Matières</h4>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map(subject => (
                  <span
                    key={subject}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Classes</h4>
              <div className="flex flex-wrap gap-2">
                {teacher.assignedClasses.map(className => (
                  <span
                    key={className}
                    className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded"
                  >
                    {className}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'ajout/modification */}
      {(isAddingTeacher || selectedTeacher) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isAddingTeacher ? 'Nouvel Enseignant' : 'Modifier Enseignant'}
              </h2>
              <button
                onClick={() => {
                  setIsAddingTeacher(false);
                  setSelectedTeacher(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              if (isAddingTeacher) {
                handleAddTeacher(formData);
              } else {
                handleUpdateTeacher(formData);
              }
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={selectedTeacher?.name}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={selectedTeacher?.email}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Département
                </label>
                <select
                  name="department"
                  required
                  defaultValue={selectedTeacher?.department}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matières
                </label>
                <select
                  name="subjects"
                  multiple
                  defaultValue={selectedTeacher?.subjects}
                  className="w-full px-3 py-2 border rounded-md"
                  size={4}
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Maintenez Ctrl pour sélectionner plusieurs matières
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classes
                </label>
                <select
                  name="classes"
                  multiple
                  defaultValue={selectedTeacher?.assignedClasses}
                  className="w-full px-3 py-2 border rounded-md"
                  size={4}
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Maintenez Ctrl pour sélectionner plusieurs classes
                </p>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingTeacher(false);
                    setSelectedTeacher(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isAddingTeacher ? 'Ajouter' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 