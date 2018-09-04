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
    this.state = { currentScreen: props.navigation.state.routeName };
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: { cop: "test" }
    });
    this.props.navigation.dispatch(navigateAction);
    //console.log("rotta " + route);
    EventEmitter.emit("indice", "vai");
    this.setState({currentScreen:route});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <View style={styles.sectionHeadingStyle}>
              <Icon
                name="home"
                size={30}
                style={(this.state.currentScreen === 'Intro' ? {color:"red", marginRight:10} : {color:'grey', marginRight:10} )}
              />
              <Text
              style={[styles.view, (this.state.currentScreen === 'Intro' ? styles.active : styles.inactive )]}
                onPress={this.navigateToScreen("Intro")}
              >
                Intro
              </Text>
            </View>
            <View style={styles.sectionHeadingStyle}>
              <Icon
                name="bars"
                size={30}
                style={(this.state.currentScreen === 'Capitoli' ? {color:"red", marginRight:10} : {color:'grey', marginRight:10} )}
              />
              <Text
                style={[styles.view, (this.state.currentScreen === 'Capitoli' ? styles.active : styles.inactive )]}
                onPress={this.navigateToScreen("Capitoli")}
              >
              Capitoli
              </Text>
            </View>
            <View style={styles.sectionHeadingStyle}>
              <Icon
                name="users"
                size={30}
                style={(this.state.currentScreen === 'Credits' ? {color:"red", marginRight:10} : {color:'grey', marginRight:10} )}
              />
              <Text
                style={[styles.view, (this.state.currentScreen === 'Credits' ? styles.active : styles.inactive )]}
                onPress={this.navigateToScreen("Credits")}
              >
                Credits
              </Text>
            </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>© Netkom Group srl</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
