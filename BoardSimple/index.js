import React, {Component} from 'react';
import {Animated, Text, View, TouchableOpacity} from 'react-native';
import Swiper from "react-native-swiper";
import * as Animatable from 'react-native-animatable';
import styles from "./styles";
//import {Actions} from "react-native-router-flux";
import PAGES from './DataSimple';

export default class Index extends Component {
  state = {
    iconSize: 120,
    animateValue: new Animated.Value(1)
  }

  startAnimate() {
    this.state.animateValue.setValue(1.2);

    Animated.spring(
      this.state.animateValue,
      {toValue: 0.9, tension: 40, friction: 3}
    ).start();
  }


  componentWillMount() {
    this.startAnimate();
  }

  render() {
    const imageAnimate = this.state.animateValue;
    return (
      <View style={styles.container}>
        <Animatable.Image animation="fadeInDown"
                          iterationCount="infinite"
                          duration={9000}
                          direction="alternate"
                          source={require('@images/background.png')} style={styles.background} />
        <Swiper
          loop={false}
          dot={<View style={styles.dot} />}
          onMomentumScrollEnd={this.startAnimate.bind(this)}
          activeDot={<View style={styles.dotActive} />}
          paginationStyle={{bottom: 70, right: 0}}>

          {PAGES.map((page, i) => (
            <Animated.View key={i} style={[styles.page]}>
              <Animated.Image
                source={page.iconImage}
                style={[
                  styles.icon,
                  {transform: [{scale: imageAnimate}]},
                  {opacity: imageAnimate},
                ]} />
                <Text
                style={styles.desc}>{page.description}</Text>
                {i== 4 &&
               <TouchableOpacity style={styles.footer} onPress={() =>
            this.props.navigation.navigate("Home")}><Text style={styles.desc}>Capito</Text></TouchableOpacity>
                }
                 
            </Animated.View>
          ))}
        </Swiper>
      </View>
    );
  }
}
