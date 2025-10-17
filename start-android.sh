#!/bin/bash

echo "🚀 Iniciando App CTC Mobile no Android..."
echo ""

# Configurar variáveis de ambiente
export JAVA_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$JAVA_HOME/bin:$PATH"

# Verificar se o Metro já está rodando
if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Metro bundler já está rodando na porta 8081"
else
    echo "📦 Iniciando Metro bundler..."
    npx react-native start --reset-cache &
    METRO_PID=$!
    echo "Metro PID: $METRO_PID"
    sleep 5
fi

echo ""
echo "📱 Instalando e abrindo app no emulador Android..."
echo ""

npx react-native run-android

echo ""
echo "✅ Pronto! O app deve abrir no emulador."
echo ""
echo "Para recarregar o app, pressione 'R' duas vezes no emulador"
echo "Para abrir o menu de desenvolvedor, pressione 'Ctrl+M' (Windows/Linux) ou 'Cmd+M' (Mac)"
