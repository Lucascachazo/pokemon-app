import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f6fa',
    overflow: 'hidden',
  },
  list: {
    flex: 1,
    minHeight: 0,
  },
  listContent: {
    padding: 18,
    paddingBottom: 76,
  },
  listRow: {
    gap: 14,
    marginBottom: 14,
  },
  loadingMore: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    borderTopColor: '#e3e7ef',
    borderTopWidth: 1,
    backgroundColor: '#f5f6fa',
    elevation: 8,
    zIndex: 8,
  },
  loadingMoreText: {
    color: '#727887',
    fontSize: 15,
  },
});
