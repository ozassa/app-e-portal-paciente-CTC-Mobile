#!/bin/bash

# Configurar variáveis de ambiente
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME=~/Library/Android/sdk
export PATH=/usr/local/bin:$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$JAVA_HOME/bin

echo "=========================================="
echo "Configurações:"
echo "JAVA_HOME: $JAVA_HOME"
echo "ANDROID_HOME: $ANDROID_HOME"
echo "Node: $(which node) - $(node --version)"
echo "npm: $(which npm) - $(npm --version)"
echo "=========================================="

cd android
./gradlew clean assembleDebug
