import { useState } from 'react';
import { BookOpen, Plus, Search, FileText, Video, Link as LinkIcon } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  content: ChapterContent[];
}

interface ChapterContent {
  id: string;
  type: 'text' | 'video' | 'pdf' | 'link';
  title: string;
  content: string;
}

interface CourseManagementProps {
  userRole: string;
}

export function CourseManagement({ userRole }: CourseManagementProps) {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Introduction à React',
      description: 'Fondamentaux de React et développement moderne',
      chapters: [
        {
          id: 'chap1',
          title: 'Les bases de React',
          content: [
            {
              id: 'content1',
              type: 'text',
              title: 'Introduction',
              content: 'React est une bibliothèque JavaScript...'
            },
            {
              id: 'content2',
              type: 'video',
              title: 'Démonstration',
              content: 'https://example.com/video.mp4'
            }
          ]
        }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const canEdit = ['teacher', 'admin'].includes(userRole);

  const handleAddContent = (chapterId: string, content: ChapterContent) => {
    if (selectedCourse) {
      const updatedCourse = {
        ...selectedCourse,
        chapters: selectedCourse.chapters.map(chapter => {
          if (chapter.id === chapterId) {
            return {
              ...chapter,
              content: [...chapter.content, content]
            };
          }
          return chapter;
        })
      };
      setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
      setSelectedCourse(updatedCourse);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des cours</h1>
        {canEdit && (
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau cours
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Liste des cours */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un cours..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-300px)]">
            {courses
              .filter(course => 
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(course => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedCourse?.id === course.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Contenu du cours */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md">
          {selectedCourse ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{selectedCourse.title}</h2>
              <p className="text-gray-600 mb-6">{selectedCourse.description}</p>

              {selectedCourse.chapters.map(chapter => (
                <div key={chapter.id} className="mb-6">
                  <h3 className="text-lg font-medium mb-4">{chapter.title}</h3>
                  
                  <div className="space-y-4">
                    {chapter.content.map(content => (
                      <div key={content.id} className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {content.type === 'text' && <FileText className="w-5 h-5 text-blue-600" />}
                          {content.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                          {content.type === 'link' && <LinkIcon className="w-5 h-5 text-blue-600" />}
                          <h4 className="font-medium">{content.title}</h4>
                        </div>
                        
                        {content.type === 'text' && (
                          <p className="text-gray-600">{content.content}</p>
                        )}
                        {content.type === 'video' && (
                          <div className="aspect-w-16 aspect-h-9">
                            {/* Intégration vidéo ici */}
                            <p className="text-gray-500">Vidéo: {content.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {canEdit && (
                    <button
                      onClick={() => handleAddContent(chapter.id, {
                        id: Date.now().toString(),
                        type: 'text',
                        title: 'Nouveau contenu',
                        content: ''
                      })}
                      className="mt-4 flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter du contenu
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-300px)]">
              <p className="text-gray-500">Sélectionnez un cours pour voir son contenu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
