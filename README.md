# ctc-mobile

Repositório dedicado ao aplicativo React Native bare do Portal do Paciente CTC.

## Inicialização sugerida
1. Criar o projeto bare com TypeScript:
   ```bash
   npx react-native init ctcMobile --template react-native-template-typescript
   ```
2. Mover o conteúdo gerado para este diretório, mantendo a raiz limpa para versionamento independente.
3. Instalar dependências essenciais:
   ```bash
   npm install @react-navigation/native @react-navigation/stack
   npm install @tanstack/react-query axios
   npm install react-native-mmkv
   npm install --save-dev typescript @types/react @types/react-native
   ```
4. Adicionar integrações nativas:
   - OCR (biblioteca a definir com o time nativo)
   - Visualizador de exames (PDF/DICOM)
   - Fastcomm SDK (via `@ctc/core`)

## Estrutura esperada
```
ctc-mobile/
├── android/
├── ios/
├── src/
│   ├── app/
│   ├── modules/
│   ├── providers/
│   └── utils/
├── package.json
├── metro.config.js
└── README.md
```

## Próximos passos
- Consumir `@ctc/core` para autenticação, agendamentos e integrações com middleware.
- Configurar Fastlane/EAS para builds de produção.
- Implementar automação de testes (Detox) e política de versionamento alinhada com as lojas.
