interface GradesProps {
  studentId?: string;
}

export function StudentGrades({ studentId: _studentId }: GradesProps) {
  const grades = [
    {
      id: '1',
      course: 'Introduction à React',
      assignments: [
        { name: 'Quiz 1', score: 85, maxScore: 100 },
        { name: 'Projet Mi-parcours', score: 92, maxScore: 100 },
        { name: 'Quiz Final', score: 88, maxScore: 100 }
      ],
      average: 88.33
    },
    {
      id: '2',
      course: 'JavaScript Avancé',
      assignments: [
        { name: 'TP 1', score: 95, maxScore: 100 },
        { name: 'Quiz Mi-semestre', score: 78, maxScore: 100 },
        { name: 'Projet Final', score: 90, maxScore: 100 }
      ],
      average: 87.67
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes Notes</h1>

      <div className="space-y-6">
        {grades.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{course.course}</h2>
                <div className="text-sm">
                  Moyenne: <span className="font-semibold">{course.average.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-medium text-gray-500">Évaluation</th>
                    <th className="text-right text-sm font-medium text-gray-500">Note</th>
                    <th className="text-right text-sm font-medium text-gray-500">Pourcentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {course.assignments.map((assignment, index) => (
                    <tr key={index}>
                      <td className="py-3 text-sm">{assignment.name}</td>
                      <td className="py-3 text-sm text-right">
                        {assignment.score}/{assignment.maxScore}
                      </td>
                      <td className="py-3 text-sm text-right">
                        {((assignment.score / assignment.maxScore) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
