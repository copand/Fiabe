import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View } from "react-native";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params:{cop:1}
    });
    this.props.navigation.dispatch(navigateAction);
    console.log("rotta " + route);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.sectionHeadingStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("Intro")}
              >
                Intro
              </Text>
            </View>
          </View>
          <View>
            {/*<Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            */}
            <View style={styles.sectionHeadingStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("Capitoli")}
              >
                Capitoli
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.sectionHeadingStyle}>
              <Text
                style={styles.navItemStyle}
                onPress={this.navigateToScreen("Credits")}
              >
               Credits 
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
