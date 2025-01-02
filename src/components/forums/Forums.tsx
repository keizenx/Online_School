import { useState } from 'react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: string;
  replies: number;
  category: string;
}

export function Forums() {
  const [posts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'Comment débuter avec React?',
      author: 'John Doe',
      date: '2024-01-01',
      replies: 5,
      category: 'React'
    },
    {
      id: '2',
      title: 'Problème avec TypeScript',
      author: 'Jane Smith',
      date: '2024-01-02',
      replies: 3,
      category: 'TypeScript'
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forums de discussion</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Nouvelle discussion
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>Par {post.author}</span>
                    <span>Le {new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.replies} réponses</span>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {post.category}
                </span>
              </div>
              <div className="mt-4">
                <button className="text-blue-600 hover:text-blue-900">Voir la discussion</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
