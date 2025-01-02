import { useState } from 'react';
import { MessageSquare, Search, Users, School, User } from 'lucide-react';

interface ChatProps {
  userId: string;
  userRole: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: Date;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'class' | 'department';
  participants: string[];
  lastMessage?: string;
  unreadCount?: number;
}

export function Chat({ userId, userRole }: ChatProps) {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Simuler des salles de chat selon le rôle
  const getChatRooms = (): ChatRoom[] => {
    const rooms: ChatRoom[] = [];

    switch (userRole) {
      case 'student':
        rooms.push(
          {
            id: 'class-general',
            name: 'Chat de classe',
            type: 'class',
            participants: ['all'],
            lastMessage: 'Dernier message du chat de classe',
            unreadCount: 3
          },
          {
            id: 'prof-math',
            name: 'Prof. Martin - Mathématiques',
            type: 'direct',
            participants: ['student1', 'teacher1'],
            lastMessage: 'Question sur l\'exercice 3',
            unreadCount: 1
          }
        );
        break;

      case 'teacher':
        rooms.push(
          {
            id: 'class-math-2A',
            name: 'Classe 2A - Mathématiques',
            type: 'class',
            participants: ['all'],
            lastMessage: 'Rappel : Devoir pour lundi',
            unreadCount: 5
          },
          {
            id: 'teachers-room',
            name: 'Salle des professeurs',
            type: 'department',
            participants: ['teachers'],
            lastMessage: 'Discussion sur le programme',
            unreadCount: 2
          },
          {
            id: 'admin-contact',
            name: 'Administration',
            type: 'department',
            participants: ['teachers', 'admin'],
            lastMessage: 'Info : Réunion jeudi',
            unreadCount: 0
          }
        );
        break;

      case 'admin':
        rooms.push(
          {
            id: 'all-staff',
            name: 'Tout le personnel',
            type: 'department',
            participants: ['all-staff'],
            lastMessage: 'Annonce importante',
            unreadCount: 0
          },
          {
            id: 'admin-team',
            name: 'Équipe administrative',
            type: 'department',
            participants: ['admin-team'],
            lastMessage: 'Planning de la semaine',
            unreadCount: 1
          }
        );
        break;

      default:
        break;
    }

    return rooms;
  };

  const chatRooms = getChatRooms();

  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'direct':
        return <User className="w-5 h-5" />;
      case 'class':
        return <School className="w-5 h-5" />;
      case 'department':
        return <Users className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: userId,
        senderName: 'Utilisateur actuel',
        senderRole: userRole,
        content: newMessage,
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Messagerie</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Liste des conversations */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100vh-300px)]">
            {chatRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  activeRoom === room.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getRoomIcon(room.type)}
                    <div>
                      <h3 className="font-medium">{room.name}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {room.lastMessage}
                      </p>
                    </div>
                  </div>
                  {room.unreadCount ? (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {room.unreadCount}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone de chat */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md flex flex-col">
          {activeRoom ? (
            <>
              {/* En-tête du chat */}
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  {getRoomIcon(chatRooms.find(r => r.id === activeRoom)?.type || '')}
                  <h2 className="font-semibold">
                    {chatRooms.find(r => r.id === activeRoom)?.name}
                  </h2>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-gray-500 text-center">
                  Début de la conversation
                </p>
              </div>

              {/* Zone de saisie */}
              <div className="p-4 border-t">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    className="flex-1 px-4 py-2 border rounded-lg"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleSendMessage}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">
                Sélectionnez une conversation pour commencer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 