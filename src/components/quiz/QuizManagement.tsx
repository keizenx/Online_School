import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Check, X } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  course: string;
  duration: number;
  attempts: number;
  questions: Question[];
  published: boolean;
}

interface Question {
  id: string;
  text: string;
  type: 'multiple' | 'single' | 'text';
  options?: string[];
  correctAnswers: string[];
  points: number;
}

interface QuizManagementProps {
  userRole: string;
}

export function QuizManagement({ userRole }: QuizManagementProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Introduction à React - Quiz 1',
      course: 'React Fundamentals',
      duration: 30,
      attempts: 2,
      published: true,
      questions: [
        {
          id: 'q1',
          text: 'Qu\'est-ce que JSX?',
          type: 'multiple',
          options: [
            'Une extension de syntaxe JavaScript',
            'Un nouveau langage de programmation',
            'Un framework JavaScript',
            'Un préprocesseur CSS'
          ],
          correctAnswers: ['Une extension de syntaxe JavaScript'],
          points: 2
        }
      ]
    }
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const canEdit = ['teacher', 'admin'].includes(userRole);

  const handleDeleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    setSelectedQuiz(null);
  };

  const handlePublishQuiz = (quizId: string) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId ? { ...quiz, published: !quiz.published } : quiz
    ));
  };

  const handleAddQuestion = (quizId: string, question: Question) => {
    if (selectedQuiz) {
      const updatedQuiz = {
        ...selectedQuiz,
        questions: [...selectedQuiz.questions, question]
      };
      setQuizzes(quizzes.map(q => q.id === quizId ? updatedQuiz : q));
      setSelectedQuiz(updatedQuiz);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Quiz</h1>
        {canEdit && (
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau Quiz
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Liste des quiz */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un quiz..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-300px)]">
            {quizzes
              .filter(quiz => 
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(quiz => (
                <div
                  key={quiz.id}
                  className={`p-4 border-b hover:bg-gray-50 ${
                    selectedQuiz?.id === quiz.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => setSelectedQuiz(quiz)}
                    >
                      <h3 className="font-medium">{quiz.title}</h3>
                      <p className="text-sm text-gray-500">
                        {quiz.course} • {quiz.duration} min
                      </p>
                    </div>
                    {canEdit && (
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handlePublishQuiz(quiz.id)}
                          className={`p-1 rounded ${
                            quiz.published ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          {quiz.published ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="p-1 text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Contenu du quiz */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md">
          {selectedQuiz ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedQuiz.title}</h2>
                  <p className="text-gray-600">
                    Durée: {selectedQuiz.duration} minutes • 
                    Tentatives autorisées: {selectedQuiz.attempts}
                  </p>
                </div>
                {canEdit && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    Modifier
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {selectedQuiz.questions.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Question {index + 1}</span>
                        <h3 className="text-lg font-medium">{question.text}</h3>
                      </div>
                      <span className="text-sm text-gray-500">{question.points} pts</span>
                    </div>

                    {question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div 
                            key={optIndex}
                            className={`p-3 border rounded-lg ${
                              question.correctAnswers.includes(option)
                                ? 'border-green-200 bg-green-50'
                                : ''
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {canEdit && (
                <button
                  onClick={() => handleAddQuestion(selectedQuiz.id, {
                    id: Date.now().toString(),
                    text: 'Nouvelle question',
                    type: 'multiple',
                    options: [],
                    correctAnswers: [],
                    points: 1
                  })}
                  className="mt-6 flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter une question
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-300px)]">
              <p className="text-gray-500">Sélectionnez un quiz pour voir son contenu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
