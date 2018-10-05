import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./LoopMp3.style";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity, ImageBackground, Image, Dimensions } from "react-native";
import EventEmitter from "react-native-eventemitter";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { DrawerNavigator, DrawerActions } from "react-navigation";
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;


class LoopMp3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: props.navigation.state.routeName,
      status: "stop"
    };
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: { cop: "test" }
    });
    this.props.navigation.dispatch(navigateAction);
    //console.log("rotta " + route);
    EventEmitter.emit("indice", "vai");
    this.setState({ currentScreen: route });
  };

  render() {
    return (
      <View style={styles.viewTop}>
     <ImageBackground
              resizeMode={"stretch"} // or cover
              style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
              source={require("./Images/bg_ciclocontinuo.png")}
            >
        <ScrollView>
          <View style={{ flexDirection: "row", marginBottom: 50 }}>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start"
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.dispatch(DrawerActions.openDrawer())
                }
              >
                <Icon
                  name="bars"
                  size={40}
                  style={{
                    color: "white",
                    marginLeft: 10,
                    marginTop: 10
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

        <View style={styles.viewCenter}>
        <Text style={styles.grande}>
                    RIPRODUZIONE A CICLO CONTINUO
        </Text>
        <View style={styles.containerTot}>
          <View style={styles.sectionHeadingStyle}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ status: "play" });
                playSound(0);
              }}
            >
              <View style={styles.button1}>
                <Icon
                  name="play-circle"
                  size={80}
                  style={{
                    color: "white",
                    marginRight: 10,
                    marginTop: 10
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeadingStyle}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.status == "play")
                  this.setState({ status: "pause" });
                else if (this.state.status == "pause")
                  this.setState({ status: "play" });
                pauseSoundLoop(this.state.status);
              }}
            >
              <View style={styles.button1}>
                <Icon
                  name="pause-circle"
                  size={80}
                  style={{
                    color: "white",
                    marginRight: 10,
                    marginTop: 10
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeadingStyle}>
            <TouchableOpacity onPress={() => stopSoundLoop()}>
              <View style={styles.button1}>
                <Icon
                  name="stop-circle"
                  size={80}
                  style={{
                    color: "white",
                    marginRight: 10,
                    marginTop: 10
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          </View>
          <TouchableOpacity
                style={styles.contenuto}
                onPress={() => this.props.navigation.navigate('Capitoli')}
              >
              <FontAwesome5Pro name={'book-open'} color="#FFFFFF" size={40} light style={{zIndex:12000, padding:60}} />
          </TouchableOpacity>
 
        </View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

LoopMp3.propTypes = {
  navigation: PropTypes.object
};

export default LoopMp3;
