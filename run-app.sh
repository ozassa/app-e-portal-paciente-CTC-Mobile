#!/bin/bash
set -e

# Configurar variáveis
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME=~/Library/Android/sdk
export PATH=/usr/local/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$JAVA_HOME/bin:$PATH

echo "🚀 Iniciando build do app CTC Mobile..."
echo "======================================"

# Verificar emulador
echo "📱 Verificando emulador..."
adb devices

if [ -z "$(adb devices | grep -v 'List' | grep 'device')" ]; then
    echo "❌ Nenhum emulador detectado!"
    echo "Por favor, inicie o emulador primeiro:"
    echo "$ANDROID_HOME/emulator/emulator -avd Medium_Phone_API_36.1 &"
    exit 1
fi

echo "✅ Emulador encontrado!"

# Limpar build anterior
echo "🧹 Limpando builds anteriores..."
cd android
./gradlew clean
cd ..

# Fazer o build e instalar
echo "🔨 Fazendo build e instalando..."
cd android
./gradlew app:installDebug

if [ $? -eq 0 ]; then
    echo "✅ App instalado com sucesso!"
    echo "🎉 Abrindo o app no emulador..."
    adb shell am start -n com.ctcmobile/.MainActivity
else
    echo "❌ Erro no build"
    exit 1
fi
