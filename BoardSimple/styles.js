import {Animated, Text, View, Dimensions, StyleSheet} from 'react-native';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: PAGE_WIDTH,
    resizeMode: 'cover',
    opacity: 0.9,
    position: 'absolute'
  },
  title: {
    color: 'rgba(235, 215, 208, 1)',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  vai: {
    fontSize: PAGE_WIDTH / 20,
    color: '#3f77ba',
    backgroundColor: 'transparent',
    marginTop: 120,
    lineHeight: 25,
  },
  desc: {
    fontSize: PAGE_WIDTH / 17,
    color: '#3f77ba',
    backgroundColor: 'transparent',
    marginTop: 60,
    lineHeight: 25,
  },
  desc1: {
    fontSize: PAGE_WIDTH / 20,
    color: '#3f77ba',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
  },
  desc2: {
    fontSize: PAGE_WIDTH / 17,
    color: '#000000',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
  },
  desc3: {
    fontSize: PAGE_WIDTH / 25,
    color: '#000000',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
  },
  desc4: {
    fontSize: PAGE_WIDTH / 17,
    color: '#3f77ba',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
  },
  desc5: {
    fontSize: PAGE_WIDTH / 25,
    color: '#000000',
    backgroundColor: 'transparent',
    marginTop: 20,
    lineHeight: 25,
  },
  desc6: {
    fontSize: PAGE_WIDTH / 17,
    color: '#000000',
    backgroundColor: 'transparent',
    marginTop: 10,
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
    bottom: 50,
    right: 50
  },
  icon: {
    position: 'absolute',
    top: 150,
    width: 80 * PAGE_WIDTH / 100,
    resizeMode: 'contain',
  },
  icon1: {
    position: 'absolute',
    top: 250,
    width: 50 * PAGE_WIDTH / 100,
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