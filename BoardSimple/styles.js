import {Animated, Text, View, Dimensions, StyleSheet} from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(239, 78, 78, 1)',
  },
  background: {
    width: PAGE_WIDTH,
    resizeMode: 'contain',
    opacity: 0.7,
    position: 'absolute'
  },
  title: {
    color: 'rgba(235, 215, 208, 1)',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  desc: {
    fontSize: PAGE_WIDTH / 20,
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
  },
  page: {
    width: PAGE_WIDTH,
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
    paddingLeft: 50,
    paddingRight: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 100,
    right: 50
  },
  icon: {
    position: 'absolute',
    top: 100,
    width: 40 * PAGE_WIDTH / 100,
    resizeMode: 'contain',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, .3)',
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },

  dotActive: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: 9,
    height: 9,
    borderRadius: 6,
    marginLeft: 4,
    marginRight: 4,
  }
});