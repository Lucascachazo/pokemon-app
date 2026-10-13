import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginBottom: 22,
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
    color: '#7B8291',
    fontSize: 14,
    marginTop: 2,
  },
  searchBox: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9ECF2',
    backgroundColor: '#fff',
    marginTop: 18,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#272b36',
    fontSize: 15,
  },
  resultCount: {
    color: '#727887',
    fontSize: 13,
    marginTop: 10,
  },
  offlineBanner: {
    backgroundColor: '#fff4dc',
    borderRadius: 10,
    marginTop: 14,
    padding: 12,
  },
  offlineText: {
    color: '#765816',
    fontSize: 13,
  },
  errorBanner: {
    backgroundColor: '#ffebee',
    borderRadius: 10,
    marginTop: 10,
    padding: 12,
  },
  errorText: {
    color: '#a51f37',
    fontSize: 13,
  },
});
