import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./Credits.style";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import EventEmitter from "react-native-eventemitter";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { DrawerNavigator, DrawerActions } from "react-navigation";

class Credits extends Component {
  constructor(props) {
    console.log('Credits constructor');
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
      <View>
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
               Qui mettiamo i credits 
              </Text>
            </View>
        </ScrollView>
      </View>
    );
  }
}

Credits.propTypes = {
  navigation: PropTypes.object
};

export default Credits;
