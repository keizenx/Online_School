import { useState } from 'react';
import { Download } from 'lucide-react';

interface SVGElement {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  children?: SVGElement[];
  style?: {
    fill?: string;
    stroke?: string;
    fontSize?: number;
  };
}

export function ExportWireframe() {
  const [isExporting, setIsExporting] = useState(false);

  const generateSVG = (elements: SVGElement[]) => {
    const width = 1440;
    const height = 900;

    const renderElement = (element: SVGElement): string => {
      switch (element.type) {
        case 'navbar':
          return `
            <g>
              <rect x="0" y="0" width="${width}" height="64" fill="#ffffff" />
              <line x1="0" y1="64" x2="${width}" y2="64" stroke="#e5e7eb" />
              <text x="32" y="40" font-size="16" fill="#111827">École en ligne</text>
            </g>
          `;

        case 'sidebar':
          return `
            <g>
              <rect x="0" y="0" width="256" height="${height}" fill="#ffffff" />
              <line x1="256" y1="0" x2="256" y2="${height}" stroke="#e5e7eb" />
            </g>
          `;

        case 'card':
          return `
            <g>
              <rect 
                x="${element.x}" 
                y="${element.y}" 
                width="${element.width}" 
                height="${element.height}" 
                fill="#ffffff" 
                rx="8"
                filter="drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))"
              />
              ${element.text ? `
                <text 
                  x="${element.x + 16}" 
                  y="${element.y + 32}" 
                  font-size="${element.style?.fontSize || 16}"
                  fill="#111827"
                >${element.text}</text>
              ` : ''}
            </g>
          `;

        case 'button':
          return `
            <g>
              <rect 
                x="${element.x}" 
                y="${element.y}" 
                width="${element.width}" 
                height="40" 
                fill="#2563eb" 
                rx="6"
              />
              <text 
                x="${element.x + element.width/2}" 
                y="${element.y + 25}" 
                fill="white" 
                text-anchor="middle"
                font-size="14"
              >${element.text}</text>
            </g>
          `;

        case 'input':
          return `
            <g>
              <rect 
                x="${element.x}" 
                y="${element.y}" 
                width="${element.width}" 
                height="40" 
                fill="white" 
                stroke="#d1d5db"
                rx="6"
              />
              ${element.text ? `
                <text 
                  x="${element.x + 16}" 
                  y="${element.y - 8}" 
                  font-size="14" 
                  fill="#374151"
                >${element.text}</text>
              ` : ''}
            </g>
          `;

        case 'table':
          return `
            <g>
              <rect 
                x="${element.x}" 
                y="${element.y}" 
                width="${element.width}" 
                height="${element.height}" 
                fill="white" 
                rx="8"
              />
              <line 
                x1="${element.x}" 
                y1="${element.y + 40}" 
                x2="${element.x + element.width}" 
                y2="${element.y + 40}" 
                stroke="#e5e7eb" 
              />
            </g>
          `;

        default:
          return '';
      }
    };

    const svgContent = `
      <svg 
        width="${width}" 
        height="${height}" 
        xmlns="http://www.w3.org/2000/svg"
        style="background-color: #f3f4f6;"
      >
        <defs>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');
            text { 
              font-family: 'Inter', sans-serif;
              font-weight: 500;
            }
          </style>
        </defs>
        ${elements.map(el => renderElement(el)).join('\n')}
      </svg>
    `;

    return svgContent;
  };

  const screens = [
    {
      name: 'Login',
      elements: [
        {
          type: 'card',
          x: 520,
          y: 200,
          width: 400,
          height: 400,
          text: 'Connexion',
          style: { fontSize: 24 },
          children: [
            {
              type: 'input',
              x: 540,
              y: 280,
              width: 360,
              height: 40,
              text: 'Email'
            },
            {
              type: 'input',
              x: 540,
              y: 360,
              width: 360,
              height: 40,
              text: 'Mot de passe'
            },
            {
              type: 'button',
              x: 540,
              y: 440,
              width: 360,
              height: 40,
              text: 'Se connecter'
            }
          ]
        }
      ]
    },
    {
      name: 'Dashboard',
      elements: [
        {
          type: 'navbar',
          x: 0,
          y: 0,
          width: 1440,
          height: 64
        },
        {
          type: 'card',
          x: 32,
          y: 96,
          width: 1376,
          height: 120,
          text: 'Tableau de bord',
          style: { fontSize: 24 }
        }
      ]
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      screens.forEach((screen) => {
        const svg = generateSVG(screen.elements);
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${screen.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Download className="w-5 h-5 mr-2" />
        {isExporting ? 'Exportation...' : 'Exporter en SVG'}
      </button>
    </div>
  );
} 