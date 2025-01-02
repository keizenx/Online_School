import { useState } from 'react';
import { Search, BookOpen, Clock, Star, Filter } from 'lucide-react';

interface Course {
    id: string;
    title: string;
    subject: string;
    teacher: string;
    progress: number;
    lastAccessed?: string;
    description: string;
    duration: string;
    rating: number;
    videoUrl?: string;
  }
  
  export function StudentCourses() {
    const courses: Course[] = [
      {
        id: '1',
        title: 'Démonstration',
        subject: 'Introduction',
        teacher: 'Mme Martin',
        progress: 0,
        description: 'Vidéo de présentation de la plateforme.',
        duration: '5 minutes',
        rating: 4.7,
        videoUrl: "/videos/introduction_react_1_deployment.mp4"
      },
    {   
      id: '2',
      title: 'Littérature française du XVIIe siècle',
      subject: 'Français',
      teacher: 'Mme Martin',
      progress: 75,
      lastAccessed: '2024-03-10',
      description: 'Étude approfondie des grands auteurs classiques.',
      duration: '12 heures',
      rating: 4.5
    },
    {
      id: '3',
      title: 'Fonctions et dérivées',
      subject: 'Mathématiques',
      teacher: 'M. Dubois',
      progress: 45,
      lastAccessed: '2024-03-12',
      description: 'Introduction au calcul différentiel.',
      duration: '15 heures',
      rating: 4.8
    },
    {
      id: '4',
      title: 'Mécanique newtonienne',
      subject: 'Physique',
      teacher: 'Mme Bernard',
      progress: 30,
      lastAccessed: '2024-03-11',
      description: 'Les lois fondamentales de la mécanique.',
      duration: '10 heures',
      rating: 4.2
    }
  ];
  const [searchTerm, setSearchTerm] = useState('');
const [subjectFilter, setSubjectFilter] = useState('all');

  const subjects = [...new Set(courses.map(course => course.subject))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || course.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Cours</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md w-64"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Cours suivis</h3>
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">8</p>
          <p className="text-sm text-gray-600">Sur 10 cours disponibles</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Temps d'étude</h3>
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">24h</p>
          <p className="text-sm text-gray-600">Ce mois-ci</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Progression moyenne</h3>
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold">65%</p>
          <p className="text-sm text-gray-600">Tous cours confondus</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {course.videoUrl && (
              <div className="aspect-w-16 aspect-h-9">
                <video
                  className="w-full"
                  controls
                  poster="/video-thumbnail.jpg"
                >
                  <source src={course.videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                  <p className="text-gray-600">{course.subject} - {course.teacher}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </span>
                <span>
                  Dernier accès: {course.lastAccessed ? new Date(course.lastAccessed).toLocaleDateString() : 'Jamais'}
                </span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progression</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Continuer le cours
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 