import { StyleSheet } from 'react-native';

// Estilos de la pantalla, su encabezado, las tarjetas y sus estados vacíos.
export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  listContent: {
    padding: 18,
    paddingBottom: 32,
  },
  listRow: {
    gap: 14,
    marginBottom: 14,
  },
  header: {
    marginBottom: 20,
  },
  eyebrow: {
    color: '#E94560',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 5,
  },
  title: {
    color: '#202635',
    fontSize: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: '#727887',
    fontSize: 13,
    marginTop: 4,
  },
  errorBanner: {
    borderRadius: 10,
    backgroundColor: '#ffebee',
    marginTop: 12,
    padding: 12,
  },
  errorText: {
    color: '#a51f37',
    fontSize: 13,
    alignSelf: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  emptyTitle: {
    color: '#4c5261',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    color: '#727887',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  retryButton: {
    borderRadius: 10,
    backgroundColor: '#e94560',
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
});
