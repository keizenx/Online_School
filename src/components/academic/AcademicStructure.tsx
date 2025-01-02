import { useState } from 'react';
import { Building, BookOpen, Users, Plus, ChevronRight } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  description: string;
  levels: Level[];
}

interface Level {
  id: string;
  name: string;
  classes: Class[];
}

interface Class {
  id: string;
  name: string;
  capacity: number;
  students: number;
}

export default function AcademicStructure() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: 'Sciences',
      description: 'Filières scientifiques',
      levels: [
        {
          id: '1-1',
          name: 'Terminal',
          classes: [
            {
              id: '1-1-1',
              name: 'Terminal S1',
              capacity: 35,
              students: 32
            },
            {
              id: '1-1-2',
              name: 'Terminal S2',
              capacity: 35,
              students: 30
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Lettres',
      description: 'Filières littéraires',
      levels: [
        {
          id: '2-1',
          name: 'Terminal',
          classes: [
            {
              id: '2-1-1',
              name: 'Terminal L',
              capacity: 30,
              students: 25
            }
          ]
        }
      ]
    }
  ]);

  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [isAddingLevel, setIsAddingLevel] = useState<string | null>(null); // departmentId
  const [isAddingClass, setIsAddingClass] = useState<{departmentId: string, levelId: string} | null>(null);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  const toggleDepartment = (departmentId: string) => {
    setExpandedDepartments(prev => 
      prev.includes(departmentId) 
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const handleAddDepartment = (name: string, description: string) => {
    setDepartments([
      ...departments,
      {
        id: Date.now().toString(),
        name,
        description,
        levels: []
      }
    ]);
    setIsAddingDepartment(false);
  };

  const handleAddLevel = (departmentId: string, levelName: string) => {
    setDepartments(departments.map(dept => {
      if (dept.id === departmentId) {
        return {
          ...dept,
          levels: [
            ...dept.levels,
            {
              id: `${departmentId}-${Date.now()}`,
              name: levelName,
              classes: []
            }
          ]
        };
      }
      return dept;
    }));
    setIsAddingLevel(null);
  };

  const handleAddClass = (departmentId: string, levelId: string, className: string, capacity: number) => {
    setDepartments(departments.map(dept => {
      if (dept.id === departmentId) {
        return {
          ...dept,
          levels: dept.levels.map(level => {
            if (level.id === levelId) {
              return {
                ...level,
                classes: [
                  ...level.classes,
                  {
                    id: `${levelId}-${Date.now()}`,
                    name: className,
                    capacity,
                    students: 0
                  }
                ]
              };
            }
            return level;
          })
        };
      }
      return dept;
    }));
    setIsAddingClass(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Structure Académique</h1>
        <button
          onClick={() => setIsAddingDepartment(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle Filière
        </button>
      </div>

      <div className="space-y-4">
        {departments.map(department => (
          <div key={department.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-4 bg-gray-50 border-b flex items-center justify-between cursor-pointer"
              onClick={() => toggleDepartment(department.id)}
            >
              <div className="flex items-center">
                <Building className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <h2 className="font-semibold">{department.name}</h2>
                  <p className="text-sm text-gray-500">{department.description}</p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 transition-transform ${
                  expandedDepartments.includes(department.id) ? 'transform rotate-90' : ''
                }`}
              />
            </div>

            {expandedDepartments.includes(department.id) && (
              <div className="p-4">
                <div className="ml-4 space-y-4">
                  {department.levels.map(level => (
                    <div key={level.id} className="border-l-2 border-gray-200 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                          <h3 className="font-medium">{level.name}</h3>
                        </div>
                        <button
                          onClick={() => setIsAddingClass({ departmentId: department.id, levelId: level.id })}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          + Ajouter une classe
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                        {level.classes.map(cls => (
                          <div key={cls.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Users className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="font-medium">{cls.name}</span>
                              </div>
                              <div className="text-sm text-gray-500">
                                {cls.students}/{cls.capacity} élèves
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setIsAddingLevel(department.id)}
                    className="ml-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Ajouter un niveau
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal d'ajout de filière */}
      {isAddingDepartment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Nouvelle Filière</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddDepartment(
                formData.get('name') as string,
                formData.get('description') as string
              );
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la filière
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingDepartment(false)}
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

      {/* Modal d'ajout de niveau */}
      {isAddingLevel && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Nouveau Niveau</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddLevel(
                isAddingLevel,
                formData.get('name') as string
              );
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du niveau
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingLevel(null)}
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

      {/* Modal d'ajout de classe */}
      {isAddingClass && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Nouvelle Classe</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddClass(
                isAddingClass.departmentId,
                isAddingClass.levelId,
                formData.get('name') as string,
                parseInt(formData.get('capacity') as string)
              );
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la classe
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacité
                </label>
                <input
                  type="number"
                  name="capacity"
                  required
                  min="1"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingClass(null)}
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