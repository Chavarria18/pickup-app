Frontend: React + TypeScript + Vite, React Router, Zustand, React Hook Form + Zod, Leaflet , Bootstrap
Backend: AWS Lambda (Node.js) + API Gateway (HTTP API) + DynamoDB
Hosting: AWS Amplify

Requisitos
- Node.js 20 o superior
- AWS CLI v2 configurada (aws configure)
- Cuenta de AWS*

Solo necesita una variable de entrono que seria el endpoint , en .env
VITE_API_URL=https://TU_ID.execute-api.us-east-1.amazonaws.com

cd pickup-app
npm install

- npm run dev       # http://localhost:5173
- npm run build     # build de producción
- npm run preview   # probar el build









