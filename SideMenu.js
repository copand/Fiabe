import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View } from "react-native";
import EventEmitter from "react-native-eventemitter";
import Icon from "react-native-vector-icons/dist/FontAwesome";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.manageLoop = this.manageLoop.bind(this);
    console.log('PROPSSSSS '  + props.navigation.state.routeName);
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
    this.setState({currentScreen:route});
  };

  manageLoop(){
    console.log('manage loop');
    EventEmitter.emit("loopmp3", "toggle");
    this.navigateToScreen("LoopMp3");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <View style={styles.sectionHeadingStyle1}>
              <Icon
                name="home"
                size={40}
                style={(this.state.currentScreen === 'Intro' || this.state.currentScreen === 'Indice' ? styles.activeIcon : styles.inactiveIcon )}
              />
              <Text
              style={[styles.view, (this.state.currentScreen === 'Intro' || this.state.currentScreen === 'Indice' ? styles.active : styles.inactive )]}
                onPress={this.navigateToScreen("Intro")}
              >
              HOME 
              </Text>
            </View>
            <View style={styles.sectionHeadingStyle2}>
              <Icon
                name="bars"
                size={40}
                style={(this.state.currentScreen === 'Capitoli' ? styles.activeIcon : styles.inactiveIcon )}
              />
              <Text
                style={[styles.view, (this.state.currentScreen === 'Capitoli' ? styles.active : styles.inactive )]}
                onPress={this.navigateToScreen("Capitoli")}
              >
              CAPITOLI
              </Text>
            </View>
            <View style={styles.sectionHeadingStyle3}>
              <Icon
                name="user"
                size={40}
                style={(this.state.currentScreen === 'Credits' ? styles.activeIcon : styles.inactiveIcon )}
              />
              <Text
                style={[styles.view, (this.state.currentScreen === 'Credits' ? styles.active : styles.inactive )]}
                onPress={this.navigateToScreen("Credits")}
              >
               INFO 
              </Text>
            </View>
            <View style={styles.sectionHeadingStyle4}>
              <Icon
                name="play-circle"
                size={40}
                style={(this.state.currentScreen === 'LoopMp3' ? styles.activeIcon : styles.inactiveIcon )}
              />
              <Text
                style={[styles.view, (this.state.currentScreen === 'LoopMp3' ? styles.active : styles.inactive )]}
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
