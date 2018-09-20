import React, { Component } from "react";
import { Animated, Text, View, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";
import styles from "./styles";
//import {Actions} from "react-native-router-flux";
import PAGES from "./DataSimple";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { DrawerNavigator, DrawerActions } from "react-navigation";

export default class Index extends Component {

  static navigationOptions = {
    drawer: () => ({
      label: 'Home',
      icon: () => <DrawerIcon iconName="home" iconSize={25} iconColor="#FFF" />
    })
  };
  
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
      <View style={{ flexDirection: "row", zIndex:10000}}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start"
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.dispatch(
                      DrawerActions.openDrawer()
                    )
                  }
                >
                  <Icon
                    name="bars"
                    size={40}
                    style={{
                      color: "gray",
                      marginLeft: 10,
                      marginTop: 10
                    }}
                  />
                </TouchableOpacity>
              </View>
          </View>
 
        <Animatable.Image
          animation="fadeIn"
          duration={4000}
          direction="alternate"
          source={require("../Images/bg_01.jpg")}
          style={styles.background}
        />
        <Swiper
          loop={false}
          showsButtons={true}
          dot={<View style={styles.dot} />}
          onMomentumScrollEnd={this.startAnimate.bind(this)}
          activeDot={<View style={styles.dotActive} />}
          paginationStyle={{ bottom: 70, right: 0 }}
        >
          {PAGES.map((page, i) => (
            <Animated.View key={i} style={[styles.page]}>
            <Text style={styles.desc2}>{page.description2}</Text>
            <Text style={styles.desc3}>{page.description3}</Text>
            <Text style={styles.desc4}>{page.description4}</Text>
              <Animated.Image
                source={page.iconImage}
                style={[
                  styles.icon,
                  { transform: [{ scale: imageAnimate }] },
                  { opacity: imageAnimate }
                ]}
              />
              <Text style={styles.desc}>{page.description}</Text>
              <Text style={styles.desc1}>{page.description1}</Text>
              <Text style={styles.desc5}>{page.description5}</Text>
              <Text style={styles.desc6}>{page.description6}</Text>
              <Animated.Image
                source={page.iconImage1}
                style={[
                  styles.icon1,
                  { transform: [{ scale: imageAnimate }] },
                  { opacity: imageAnimate }
                ]}
              />
              {i == 1 && (
                <TouchableOpacity
                  style={styles.footer}
                  onPress={() => this.props.navigation.navigate("Capitoli")}
                >
                <Icon name="play" size={50} style={{color:'#3f77ba',marginLeft:0}} />
                </TouchableOpacity>
              )}
            </Animated.View>
          ))}
        </Swiper>
      </View>
    );
  }
}
