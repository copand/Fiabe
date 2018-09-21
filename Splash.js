import React, { Component } from "react";
import { Animated, Text, View, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";
//import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerNavigator, DrawerActions } from "react-navigation";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default class Splash extends Component {

  state = {
    iconSize: 120,
    animateValue: new Animated.Value(1)
  };

  startAnimate() {
    this.state.animateValue.setValue(1.2);

    Animated.spring(this.state.animateValue, {
      toValue: 0.9,
      tension: 40,
      friction: 3
    }).start();
  }

  componentWillMount() {
    this.startAnimate();
  }

  render() {
    const imageAnimate = this.state.animateValue;
    return (
      <View style={styles.container}>
        <Animatable.Image
          animation="fadeIn"
          duration={4000}
          direction="alternate"
          source={require("./Images/bg_01.jpg")}
          style={styles.background}
        />
        <Swiper
          loop={false}
          showsButtons={true}
          dot={<View style={styles.dot} />}
          onMomentumScrollEnd={this.startAnimate.bind(this)}
          activeDot={<View style={styles.dotActive} />}
          paginationStyle={{ bottom: 70, right: 0 }}
          showsButtons={false}
          showsPagination={false}
          ref="sliderCop"
        >
        <View style={{flex:1}}>
          <TouchableOpacity
                  onPress={() =>
                    this.refs.sliderCop.scrollBy(1, true)
                  }
                >
        <Text>
        UnO
        </Text>
        </TouchableOpacity>
        </View>
        <View>
        <Text>
        DuE
        </Text>
        </View>
        </Swiper>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
