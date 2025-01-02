import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (userData: {
    id: string;
    email: string;
    role: string;
    name: string;
  }) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de connexion
    onLoginSuccess({
      id: '1',
      email,
      role,
      name: email.split('@')[0]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center space-x-3">
        <GraduationCap className="w-12 h-12 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">École en ligne</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Connexion</h2>
          <p className="text-sm text-gray-600 mt-2">
            Veuillez sélectionner votre rôle et entrer vos identifiants
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Étudiant</option>
              <option value="teacher">Enseignant</option>
              <option value="admin">Administrateur</option>
              <option value="academic">Responsable Scolarité</option>
              <option value="accounting">Comptabilité</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}