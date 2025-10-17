#!/bin/bash

export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools

echo "🚀 Iniciando emulador Android..."
$ANDROID_HOME/emulator/emulator -avd Medium_Phone_API_36.1 &

echo "⏱️  Aguardando emulador iniciar..."
adb wait-for-device
echo "✅ Emulador pronto!"
