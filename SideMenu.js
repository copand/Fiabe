import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import EventEmitter from "react-native-eventemitter";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';


const homeIconAtt = (<FontAwesome5Pro name={'home'} size={35} light  style={styles.activeIcon} />);
const homeIconIna = (<FontAwesome5Pro name={'home'} size={35} light  style={styles.inactiveIcon} />);
const syncIconAtt = (<FontAwesome5Pro name={'headphones'} size={35}  style={styles.activeIcon} />);
const syncIconIna = (<FontAwesome5Pro name={'headphones'} size={35}  style={styles.inactiveIcon} />);
const bookIconIna = (<FontAwesome5Pro name={'book-open'} size={35} light  style={styles.inactiveIcon} />);
const bookIconAtt = (<FontAwesome5Pro name={'book-open'} size={35} light  style={styles.activeIcon} />);
const userIconIna = (<FontAwesome5Pro name={'user-alt'} size={35} light  style={styles.inactiveIcon} />);
const userIconAtt = (<FontAwesome5Pro name={'user-alt'} size={35} light  style={styles.activeIcon} />);


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
          <View>
            <TouchableOpacity
                style={styles.sectionHeadingStyle1}
                onPress={this.navigateToScreen("Intro")}
            >

          {(this.state.currentScreen === "Intro" || this.state.currentScreen === "Indice") &&
          homeIconAtt}
          {(this.state.currentScreen != "Intro" && this.state.currentScreen != "Indice") &&  
          homeIconIna}
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
              INIZIO 
              </Text>
            </TouchableOpacity>
          </View>
          <View>

          <TouchableOpacity
                style={styles.sectionHeadingStyle2}
                onPress={this.navigateToScreen("Capitoli")}
            >
          {this.state.currentScreen === "Capitoli" &&
          bookIconAtt}
          {this.state.currentScreen != "Capitoli" &&
          bookIconIna}
            <Text
              style={[
                styles.view,
                this.state.currentScreen === "Capitoli"
                  ? styles.active
                  : styles.inactive
              ]}
            >
              CAPITOLI
            </Text>
            </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity
                style={styles.sectionHeadingStyle3}
                onPress={this.navigateToScreen("Credits")}
            >
          {this.state.currentScreen === "Credits" &&
          userIconAtt}
          {this.state.currentScreen != "Credits" &&
          userIconIna}
            <Text
              style={[
                styles.view,
                this.state.currentScreen === "Credits"
                  ? styles.active
                  : styles.inactive
              ]}
            >
              INFO
            </Text>
            </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity
                style={styles.sectionHeadingStyle4}
                onPress={this.navigateToScreen("LoopMp3")}
            >
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
            >
              CICLO CONTINUO
            </Text>
            </TouchableOpacity>
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
