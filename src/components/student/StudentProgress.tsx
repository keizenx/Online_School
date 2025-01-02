import { useState } from 'react';
import { BookOpen, GraduationCap, TrendingUp } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  class: string;
  averageGrade: number;
  completedAssignments: number;
  totalAssignments: number;
  attendance: number;
  subjects: {
    name: string;
    grade: number;
    progress: number;
  }[];
}

export function StudentProgress() {
  const [selectedClass, setSelectedClass] = useState('Terminal S1');
  const [searchTerm, setSearchTerm] = useState('');

  const students: Student[] = [
    {
      id: '1',
      name: 'Alice Martin',
      class: 'Terminal S1',
      averageGrade: 85,
      completedAssignments: 15,
      totalAssignments: 20,
      attendance: 95,
      subjects: [
        { name: 'Mathématiques', grade: 88, progress: 85 },
        { name: 'Physique', grade: 82, progress: 75 },
        { name: 'SVT', grade: 85, progress: 80 }
      ]
    },
    {
      id: '2',
      name: 'Thomas Dubois',
      class: 'Terminal S1',
      averageGrade: 78,
      completedAssignments: 14,
      totalAssignments: 20,
      attendance: 90,
      subjects: [
        { name: 'Mathématiques', grade: 75, progress: 70 },
        { name: 'Physique', grade: 80, progress: 85 },
        { name: 'SVT', grade: 79, progress: 75 }
      ]
    }
  ];

  const filteredStudents = students.filter(student => 
    student.class === selectedClass &&
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Suivi des Élèves</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option>Terminal S1</option>
            <option>Terminal S2</option>
            <option>Terminal L</option>
          </select>

          <input
            type="text"
            placeholder="Rechercher un élève..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-gray-600">{student.class}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{student.averageGrade}%</p>
                <p className="text-sm text-gray-600">Moyenne générale</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Devoirs</span>
                </div>
                <p className="text-lg font-semibold">
                  {student.completedAssignments}/{student.totalAssignments}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <GraduationCap className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">Présence</span>
                </div>
                <p className="text-lg font-semibold">{student.attendance}%</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-600">Progression</span>
                </div>
                <p className="text-lg font-semibold">+15%</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Progression par matière</h4>
              {student.subjects.map(subject => (
                <div key={subject.name} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{subject.name}</span>
                    <span className="font-medium">{subject.grade}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 