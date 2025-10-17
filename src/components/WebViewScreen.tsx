import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface WebViewScreenProps {
  url: string;
  title: string;
}

export const WebViewScreen: React.FC<WebViewScreenProps> = ({ url, title }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text variant="titleMedium" style={styles.headerTitle}>
          {title}
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* WebView */}
      {!error ? (
        <>
          <WebView
            source={{ uri: url }}
            style={styles.webview}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={handleError}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            scalesPageToFit
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
          />
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text variant="bodyMedium" style={styles.loadingText}>
                Carregando...
              </Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text variant="headlineSmall" style={styles.errorTitle}>
            Erro ao carregar
          </Text>
          <Text variant="bodyMedium" style={styles.errorMessage}>
            Não foi possível carregar o conteúdo. Verifique sua conexão e tente novamente.
          </Text>
          <IconButton
            icon="refresh"
            size={32}
            onPress={() => {
              setError(false);
              setLoading(true);
            }}
            style={styles.refreshButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        paddingTop: 44,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    margin: 0,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#111827',
  },
  headerRight: {
    width: 40,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    color: '#111827',
    marginBottom: 8,
    fontWeight: '600',
  },
  errorMessage: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#3B82F6',
  },
});
