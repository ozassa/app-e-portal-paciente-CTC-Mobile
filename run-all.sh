#!/bin/bash

export JAVA_HOME="/opt/homebrew/opt/openjdk@17"
export ANDROID_HOME=~/Library/Android/sdk
export PATH=/usr/local/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$JAVA_HOME/bin:$PATH

echo "🚀 CTC Mobile - Iniciando tudo..."
echo "======================================"

# Verificar se emulador já está rodando
if adb devices | grep -q "emulator"; then
    echo "✅ Emulador já está rodando"
else
    echo "📱 Iniciando emulador..."
    $ANDROID_HOME/emulator/emulator -avd Medium_Phone_API_36.1 &
    
    echo "⏱️  Aguardando emulador iniciar (isso pode levar 30-60 segundos)..."
    adb wait-for-device
    
    # Dar mais tempo para o emulador terminar de carregar
    sleep 10
    echo "✅ Emulador pronto!"
fi

echo ""
echo "🧹 Limpando build anterior..."
cd android
./gradlew clean > /dev/null 2>&1
cd ..

echo "🔨 Fazendo build e instalando app..."
cd android
./gradlew app:installDebug

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ App instalado com sucesso!"
    echo "🎉 Abrindo o app..."
    adb shell am start -n com.ctcmobile/.MainActivity
    echo ""
    echo "======================================"
    echo "✨ App CTC Mobile rodando no emulador!"
    echo "======================================"
else
    echo ""
    echo "❌ Erro no build. Verifique os logs acima."
    exit 1
fi
