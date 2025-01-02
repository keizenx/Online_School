import { 
  CalendarDays, 
  GraduationCap, 
  BookOpen, 
  Users2, 
  FileText, 
  MessageSquare, 
  ClipboardList,
  DollarSign,
  School,
  UserCog,
  BookCheck,
  PenTool
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardProps {
  userRole: string;
}

interface ActionCard {
  title: string;
  description: string;
  icon: any;
  link: string;
  color: string;
}

export function Dashboard({ userRole }: DashboardProps) {
  const getStats = () => {
    switch (userRole) {
      case 'student':
        return [
          { title: 'Cours en cours', value: '5', icon: BookOpen },
          { title: 'Moyenne générale', value: '85%', icon: GraduationCap },
          { title: 'Prochains examens', value: '3', icon: CalendarDays },
        ];
      case 'teacher':
        return [
          { title: 'Classes', value: '4', icon: Users2 },
          { title: 'Étudiants', value: '120', icon: GraduationCap },
          { title: 'Cours', value: '6', icon: BookOpen },
        ];
      case 'admin':
        return [
          { title: 'Utilisateurs', value: '450', icon: Users2 },
          { title: 'Cours actifs', value: '32', icon: BookOpen },
          { title: 'Enseignants', value: '24', icon: GraduationCap },
        ];
      case 'academic':
        return [
          { title: 'Filières', value: '8', icon: School },
          { title: 'Classes', value: '24', icon: Users2 },
          { title: 'Enseignants', value: '45', icon: GraduationCap },
        ];
      case 'accounting':
        return [
          { title: 'Paiements en attente', value: '28', icon: DollarSign },
          { title: 'Revenus du mois', value: '45,750€', icon: DollarSign },
          { title: 'Étudiants à jour', value: '85%', icon: Users2 },
        ];
      default:
        return [];
    }
  };

  const getActionCards = (): ActionCard[] => {
    switch (userRole) {
      case 'student':
        return [
          {
            title: 'Mes cours',
            description: 'Accédez à vos cours et ressources pédagogiques',
            icon: BookOpen,
            link: '/courses',
            color: 'bg-blue-50'
          },
          {
            title: 'Mes devoirs',
            description: 'Consultez et soumettez vos devoirs',
            icon: ClipboardList,
            link: '/assignments',
            color: 'bg-green-50'
          },
          {
            title: 'Mes notes',
            description: 'Consultez vos résultats et moyennes',
            icon: FileText,
            link: '/grades',
            color: 'bg-yellow-50'
          },
          {
            title: 'Forum de discussion',
            description: 'Échangez avec vos camarades et professeurs',
            icon: MessageSquare,
            link: '/forums',
            color: 'bg-purple-50'
          }
        ];

      case 'teacher':
        return [
          {
            title: 'Gestion des cours',
            description: 'Créez et gérez vos cours',
            icon: BookOpen,
            link: '/courses',
            color: 'bg-blue-50'
          },
          {
            title: 'Évaluations',
            description: 'Créez des quiz et corrigez les devoirs',
            icon: PenTool,
            link: '/quizzes',
            color: 'bg-green-50'
          },
          {
            title: 'Suivi des élèves',
            description: 'Consultez les progrès de vos élèves',
            icon: BookCheck,
            link: '/student-progress',
            color: 'bg-yellow-50'
          },
          {
            title: 'Communication',
            description: 'Interagissez avec les élèves et parents',
            icon: MessageSquare,
            link: '/chat',
            color: 'bg-purple-50'
          }
        ];

      case 'admin':
        return [
          {
            title: 'Gestion des utilisateurs',
            description: 'Gérez les comptes et les accès',
            icon: UserCog,
            link: '/users',
            color: 'bg-blue-50'
          },
          {
            title: 'Configuration système',
            description: 'Paramètres et configuration globale',
            icon: School,
            link: '/settings',
            color: 'bg-green-50'
          },
          {
            title: 'Rapports',
            description: 'Statistiques et analyses',
            icon: FileText,
            link: '/reports',
            color: 'bg-yellow-50'
          }
        ];

      case 'academic':
        return [
          {
            title: 'Structure académique',
            description: 'Gérez les filières et classes',
            icon: School,
            link: '/academic/structure',
            color: 'bg-blue-50'
          },
          {
            title: 'Affectation enseignants',
            description: 'Assignez les cours aux enseignants',
            icon: Users2,
            link: '/academic/teachers',
            color: 'bg-green-50'
          },
          {
            title: 'Planning',
            description: 'Gestion des emplois du temps',
            icon: CalendarDays,
            link: '/academic/planning',
            color: 'bg-yellow-50'
          }
        ];

      case 'accounting':
        return [
          {
            title: 'Paiements étudiants',
            description: 'Suivi des frais de scolarité',
            icon: DollarSign,
            link: '/payments/students',
            color: 'bg-blue-50'
          },
          {
            title: 'Salaires',
            description: 'Gestion des salaires du personnel',
            icon: DollarSign,
            link: '/payments/salaries',
            color: 'bg-green-50'
          },
          {
            title: 'Rapports financiers',
            description: 'Bilans et statistiques',
            icon: FileText,
            link: '/payments/reports',
            color: 'bg-yellow-50'
          }
        ];

      default:
        return [];
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {getStats().map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Cartes d'action */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getActionCards().map((card, index) => (
          <Link key={index} to={card.link}>
            <div className={`${card.color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
              <div className="flex items-center mb-4">
                <card.icon className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
