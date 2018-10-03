import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import EventEmitter from "react-native-eventemitter";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

const syncIconAtt = (<FontAwesome5Pro name={'sync'} size={35}  style={styles.activeIcon} />);
const syncIconIna = (<FontAwesome5Pro name={'sync'} size={35}  style={styles.inactiveIcon} />);

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.manageLoop = this.manageLoop.bind(this);
    console.log("PROPSSSSS " + props.navigation.state.routeName);
    this.state = { currentScreen: props.navigation.state.routeName };
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: { cop: "test" }
    });
    this.props.navigation.dispatch(navigateAction);
    console.log("rotta " + route);
    EventEmitter.emit("indice", "vai");
    this.setState({ currentScreen: route });
  };

  manageLoop() {
    console.log("manage loop");
    EventEmitter.emit("loopmp3", "toggle");
    this.navigateToScreen("LoopMp3");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.sectionHeadingStyle1}>
            <TouchableOpacity
                onPress={this.navigateToScreen("Intro")}
            >
              <Icon
                name="home"
                size={40}
                style={
                  this.state.currentScreen === "Intro" ||
                  this.state.currentScreen === "Indice"
                    ? styles.activeIcon
                    : styles.inactiveIcon
                }
              />
              <Text
                style={[
                  styles.view,
                  this.state.currentScreen === "Intro" ||
                  this.state.currentScreen === "Indice"
                    ? styles.active
                    : styles.inactive
                ]}
                onPress={this.navigateToScreen("Intro")}
              >
                HOME
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionHeadingStyle2}>
            <Icon
              name="bars"
              size={40}
              style={
                this.state.currentScreen === "Capitoli"
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
            />
            <Text
              style={[
                styles.view,
                this.state.currentScreen === "Capitoli"
                  ? styles.active
                  : styles.inactive
              ]}
              onPress={this.navigateToScreen("Capitoli")}
            >
              CAPITOLI
            </Text>
          </View>
          <View style={styles.sectionHeadingStyle3}>
            <Icon
              name="user"
              size={40}
              style={
                this.state.currentScreen === "Credits"
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
            />
            <Text
              style={[
                styles.view,
                this.state.currentScreen === "Credits"
                  ? styles.active
                  : styles.inactive
              ]}
              onPress={this.navigateToScreen("Credits")}
            >
              INFO E REGOLE
            </Text>
          </View>
          <View style={styles.sectionHeadingStyle4}>
          {this.state.currentScreen === "LoopMp3" &&
          syncIconAtt}
          {this.state.currentScreen != "LoopMp3" &&
          syncIconIna}
            <Text
              style={[
                styles.view,
                this.state.currentScreen === "LoopMp3"
                  ? styles.active
                  : styles.inactive
              ]}
              onPress={this.navigateToScreen("LoopMp3")}
            >
              CICLO CONTINUO
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
