import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loadingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skeletonCard: {
    width: '48%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 12,
  },
  skeletonImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#eceef3',
  },
  skeletonText: {
    width: 78,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#eceef3',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 48,
  },
  emptyTitle: {
    color: '#4c5261',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#e94560',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
});
