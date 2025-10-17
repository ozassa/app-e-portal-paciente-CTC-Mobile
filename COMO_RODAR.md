# 🚀 Como Rodar o App CTC Mobile

## ✅ Jeito Mais Fácil (Recomendado)

### Passo 1: Abrir o Android Studio
1. Abra o **Android Studio**
2. Clique em **"More Actions"** (três pontinhos)
3. Selecione **"Virtual Device Manager"**
4. Clique no ▶️ para iniciar o emulador **"Medium_Phone_API_36.1"**
5. Aguarde o emulador inicializar completamente

### Passo 2: Rodar o App
Abra o **Terminal** (app nativo do Mac) e navegue até a pasta do projeto:

```bash
cd /Users/arthurozassa/Documents/GitHub/app-e-portal-paciente-CTC-Mobile
```

Execute o script:

```bash
./start-android.sh
```

**Pronto!** O app vai abrir automaticamente no emulador! 🎉

---

## 🔧 Alternativa: Comandos Manuais

Se preferir rodar manualmente:

### Terminal 1 - Metro Bundler:
```bash
cd /Users/arthurozassa/Documents/GitHub/app-e-portal-paciente-CTC-Mobile
npm start
```

### Terminal 2 - Instalar no Android (com emulador aberto):
```bash
cd /Users/arthurozassa/Documents/GitHub/app-e-portal-paciente-CTC-Mobile
export JAVA_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$JAVA_HOME/bin:$PATH"
npx react-native run-android
```

---

## 🐛 Resolução de Problemas

### App não conecta ao Metro?
1. No emulador, aperte **Cmd+M** (ou **Ctrl+M**)
2. Selecione **"Reload"**

### Erro de compilação?
Limpe o cache:
```bash
cd android
./gradlew clean
cd ..
npm start --reset-cache
```

### Emulador não aparece?
Reinicie o ADB:
```bash
~/Library/Android/sdk/platform-tools/adb kill-server
~/Library/Android/sdk/platform-tools/adb start-server
```

---

## 📱 Testando o App

Quando o app abrir, você verá:
- **Tela de Login** com campos de CPF e Senha
- Após login: **Tela de 2FA** (código SMS)
- Após 2FA: **Dashboard** com carteirinha do paciente

**Credenciais de teste:** Configure no backend via seeds!

---

## ✨ Dicas

- Para recarregar o app rapidamente: pressione **R** duas vezes no emulador
- Para abrir o menu de desenvolvedor: **Cmd+M** (Mac) ou **Ctrl+M** (Windows/Linux)
- O Metro bundler deve estar rodando sempre que você estiver desenvolvendo
