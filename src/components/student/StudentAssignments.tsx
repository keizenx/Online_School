import { useState } from 'react';
import { Calendar, Clock, BookOpen, CheckCircle, Filter } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'late';
  grade?: number;
  description: string;
  teacher: string;
}

export function StudentAssignments() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Dissertation sur Molière',
      subject: 'Français',
      dueDate: '2024-03-15',
      status: 'completed',
      grade: 16,
      description: 'Analyser l\'impact du théâtre de Molière sur la société française.',
      teacher: 'Mme Martin'
    },
    {
      id: '2',
      title: 'Exercices d\'équations',
      subject: 'Mathématiques',
      dueDate: '2024-03-20',
      status: 'pending',
      description: 'Résoudre les exercices 15 à 20 du chapitre 4.',
      teacher: 'M. Dubois'
    },
    {
      id: '3',
      title: 'Exposé sur les énergies renouvelables',
      subject: 'Physique',
      dueDate: '2024-02-28',
      status: 'late',
      description: 'Présentation sur les différentes formes d\'énergies renouvelables.',
      teacher: 'Mme Bernard'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesSubject = subjectFilter === 'all' || assignment.subject === subjectFilter;
    return matchesStatus && matchesSubject;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En cours';
      case 'late':
        return 'En retard';
      default:
        return status;
    }
  };

  const subjects = [...new Set(assignments.map(a => a.subject))];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Devoirs</h1>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Terminés</option>
              <option value="pending">En cours</option>
              <option value="late">En retard</option>
            </select>
          </div>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">Toutes les matières</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Devoirs à rendre</h3>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">5</p>
          <p className="text-sm text-gray-600">Cette semaine</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Devoirs terminés</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-gray-600">Ce mois-ci</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Moyenne générale</h3>
            <BookOpen className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">15.5</p>
          <p className="text-sm text-gray-600">Sur les devoirs notés</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="grid gap-6 p-6">
          {filteredAssignments.map(assignment => (
            <div key={assignment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{assignment.title}</h3>
                  <p className="text-gray-600">{assignment.subject} - {assignment.teacher}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(assignment.status)}`}>
                    {getStatusText(assignment.status)}
                  </span>
                  {assignment.grade && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {assignment.grade}/20
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mb-3">{assignment.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>À rendre le {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
              {assignment.status === 'pending' && (
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Rendre le devoir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 