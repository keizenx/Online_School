import { useState } from 'react';
import { Calendar, FileText, Upload, Check, X, Clock, AlertCircle } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  course: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  grade?: number;
  feedback?: string;
  attachments: string[];
}

interface AssignmentManagementProps {
  userRole: string;
}

export function AssignmentManagement({ userRole }: AssignmentManagementProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Devoir de mathématiques',
      description: 'Exercices sur les fonctions dérivées',
      dueDate: '2024-03-20',
      course: 'Mathématiques',
      status: 'pending',
      attachments: []
    }
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradeData, setGradeData] = useState({ grade: 0, feedback: '' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Check className="w-4 h-4" />;
      case 'graded': return <Check className="w-4 h-4" />;
      case 'late': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleSubmitAssignment = (assignmentId: string, files: FileList) => {
    // Logique de soumission de devoir
    setAssignments(assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        return {
          ...assignment,
          status: 'submitted',
          attachments: [...assignment.attachments, ...Array.from(files).map(file => file.name)]
        };
      }
      return assignment;
    }));
  };

  const handleGradeAssignment = (assignmentId: string, grade: number, feedback: string) => {
    // Logique de notation
    setAssignments(assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        return {
          ...assignment,
          status: 'graded',
          grade,
          feedback
        };
      }
      return assignment;
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Devoirs</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des devoirs */}
        <div className="lg:col-span-1 space-y-4">
          {assignments.map(assignment => (
            <div
              key={assignment.id}
              onClick={() => setSelectedAssignment(assignment)}
              className={`p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow ${
                selectedAssignment?.id === assignment.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{assignment.title}</h3>
                  <p className="text-sm text-gray-500">{assignment.course}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${getStatusColor(assignment.status)}`}>
                  {getStatusIcon(assignment.status)}
                  <span className="ml-1">{assignment.status}</span>
                </span>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                <span>À rendre le {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Détails du devoir */}
        <div className="lg:col-span-2">
          {selectedAssignment ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{selectedAssignment.title}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{selectedAssignment.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date limite</h3>
                  <p className="mt-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                  </p>
                </div>

                {selectedAssignment.attachments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fichiers joints</h3>
                    <div className="mt-1 space-y-2">
                      {selectedAssignment.attachments.map((file, index) => (
                        <div key={index} className="flex items-center text-sm text-blue-600">
                          <FileText className="w-4 h-4 mr-1" />
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedAssignment.grade && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Note</h3>
                    <p className="mt-1 text-lg font-semibold">{selectedAssignment.grade}/20</p>
                  </div>
                )}

                {selectedAssignment.feedback && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Commentaires</h3>
                    <p className="mt-1">{selectedAssignment.feedback}</p>
                  </div>
                )}

                {userRole === 'student' && selectedAssignment.status === 'pending' && (
                  <div className="mt-6">
                    <button
                      onClick={() => setIsSubmitting(true)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Rendre le devoir
                    </button>
                  </div>
                )}

                {userRole === 'teacher' && selectedAssignment.status === 'submitted' && (
                  <div className="mt-6">
                    <button
                      onClick={() => setIsGrading(true)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Noter
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-48">
              <p className="text-gray-500">Sélectionnez un devoir pour voir les détails</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de soumission */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Rendre le devoir</h3>
              <button
                onClick={() => setIsSubmitting(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && selectedAssignment) {
                      handleSubmitAssignment(selectedAssignment.id, e.target.files);
                      setIsSubmitting(false);
                    }
                  }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Cliquez pour sélectionner vos fichiers
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, Word, ou images
                  </p>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsSubmitting(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Soumettre
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isGrading && selectedAssignment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Noter le devoir</h3>
            <input
              type="number"
              value={gradeData.grade}
              onChange={(e) => setGradeData({ ...gradeData, grade: Number(e.target.value) })}
              className="w-full mb-4"
            />
            <textarea
              value={gradeData.feedback}
              onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
              className="w-full mb-4"
            />
            <button
              onClick={() => {
                handleGradeAssignment(selectedAssignment.id, gradeData.grade, gradeData.feedback);
                setIsGrading(false);
              }}
            >
              Enregistrer la note
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 