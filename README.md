# CTC Mobile App - React Native

Aplicativo mobile do Portal do Paciente CTC.

## Tecnologias

- React Native 0.73.2
- TypeScript 5.0.4
- React Navigation 6
- React Native Paper 5
- React Query (TanStack Query)
- React Hook Form + Zod
- AsyncStorage

## Estrutura do Projeto

```
src/
├── screens/         # Telas do aplicativo
├── navigation/      # Configuração de rotas
├── components/      # Componentes reutilizáveis
├── services/        # Serviços de API
├── contexts/        # Contexts do React
├── hooks/           # Custom hooks
├── utils/           # Funções utilitárias
├── types/           # Tipos TypeScript
├── config/          # Configurações
├── theme/           # Tema e estilos
└── assets/          # Imagens e recursos
```

## Instalação

```bash
# Instalar dependências
npm install

# iOS (requer macOS)
cd ios && pod install && cd ..

# Executar
npm run ios     # iOS
npm run android # Android
```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```
API_URL=http://localhost:3001/api
API_TIMEOUT=30000
NODE_ENV=development
```

## Scripts

- `npm start` - Iniciar Metro Bundler
- `npm run ios` - Executar no iOS
- `npm run android` - Executar no Android
- `npm test` - Executar testes
- `npm run lint` - Verificar código

## Funcionalidades

- Login com CPF e senha
- Autenticação 2FA
- Dashboard com informações do paciente
- Agendamentos e consultas
- Lista de unidades CTC
- Perfil do usuário
- Tema claro/escuro
