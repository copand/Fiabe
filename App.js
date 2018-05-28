import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  PixelRatio,
  Dimensions,
  Button,
  Text,
  Animated,
  Easing
} from "react-native";
import HTMLView from "react-native-htmlview";
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
  DrawerActions
} from "react-navigation";
import Sound from "react-native-sound";

const { widthW } = Dimensions.get("window");

function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name == "img") {
    const a = node.attribs;
    const { src, height, width } = node.attribs;
    const imageHeight = height || 300;
    return (
      <View key={index}>
        <Image
          style={{
            width: width * PixelRatio.get(),
            height: imageHeight * PixelRatio.get()
          }}
          source={require("./foto.jpg")}
        />
      </View>
    );
  }
}

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./foto.jpg")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <View>
        <Text style={{ fontSize: 30 }}>QUI PAGINA INIZIALE</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
          malesuada sem. Nam ut lobortis elit. Aliquam scelerisque est lacus,
          vel hendrerit tortor commodo non. Quisque id neque quam. Sed nisi
          lorem, iaculis et eleifend sit amet, fermentum vehicula nunc. Sed ac
          ipsum sem.
        </Text>
      </View>
      /*
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
      */
    );
  }
}

class Fiaba1 extends React.Component {
  static navigationOptions = {
    drawerLabel: "Capitolo 1",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./foto.jpg")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  playSound(idf) {
    // Enable playback in silence mode
    Sound.setCategory("Playback");
    console.log("playSound fiaba " + idf);
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var whoosh = new Sound("elevator.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }
      // loaded successfully
      console.log(
        "duration in seconds: " +
          whoosh.getDuration() +
          "number of channels: " +
          whoosh.getNumberOfChannels()
      );

      whoosh.play(success => {
        if (success) {
          console.log("successfully finished playing");
        } else {
          console.log("playback failed due to audio decoding errors");
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          whoosh.reset();
        }
      });
    });
  }
  render() {
    const idf = 1;
    const htmlContent = `<p><h2>Ciao</h2><h1>SONO FIABA 1</h1><b>Ciao</b>
  <img src="/foto.jpg" width=50 height=50 /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mi sit amet quam hendrerit sagittis. Etiam convallis justo non diam euismod commodo.</p>
  <img src="/foto.jpg" width=200 height=200 />
  <a href="http://jsdf.co">&hearts; nice job!</a></p>`;

    return (
      <ScrollView>
        <Button
          title="menu"
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
        />
        <Button title="Suono" onPress={() => this.playSound(idf)} />
        <HTMLView
          value={htmlContent}
          renderNode={renderNode}
          stylesheet={styles}
        />
        <Button
          title="Prossima"
          onPress={() => this.props.navigation.navigate("Fiaba2")}
        />
      </ScrollView>
    );
  }
}

class Fiaba2 extends React.Component {
  static navigationOptions = {
    drawerLabel: "Capitolo 1",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./foto.jpg")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };
  render() {
    const htmlContent = `<p><h2>Ciao</h2><h1>SONO FIABA 2</h1><b>Ciao</b>
  <img src="/foto.jpg" width=200 height=200 />
  <img src="/foto.jpg" width=50 height=50 /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mi sit amet quam hendrerit sagittis. Etiam convallis justo non diam euismod commodo.</p>
  <a href="http://jsdf.co">&hearts; nice job!</a></p>`;

    return (
      <ScrollView>
        <HTMLView
          value={htmlContent}
          renderNode={renderNode}
          stylesheet={styles}
        />
        <Button
          title="Precedente"
          onPress={() => this.props.navigation.navigate("Fiaba1")}
        />
        <Button
          title="Prossima"
          onPress={() => this.props.navigation.navigate("Fiaba3")}
        />
      </ScrollView>
    );
  }
}

class Fiaba3 extends React.Component {
  static navigationOptions = {
    drawerLabel: "fiaba 3",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./foto.jpg")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };
  render() {
    const htmlContent = `<p><h2>Ciao</h2><h1>SONO FIABA 3</h1><b>Ciao</b>
  <img src="/foto.jpg" width=200 height=200 />
  <img src="/foto.jpg" width=50 height=50 /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mi sit amet quam hendrerit sagittis. Etiam convallis justo non diam euismod commodo.</p>
  <a href="http://jsdf.co">&hearts; nice job!</a></p>`;

    return (
      <ScrollView>
        <HTMLView
          value={htmlContent}
          renderNode={renderNode}
          stylesheet={styles}
        />
        <Button
          title="Precedente"
          onPress={() => this.props.navigation.navigate("Fiaba1")}
        />
        <Button
          title="Prossima"
          onPress={() => this.props.navigation.navigate("Fiaba3")}
        />
      </ScrollView>
    );
  }
}

class Fiaba4 extends React.Component {
  static navigationOptions = {
    drawerLabel: "fiaba 4",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./foto.jpg")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };
  render() {
    const htmlContent = `<p><h2>Ciao</h2><h1>SONO FIABA 4</h1><b>Ciao</b>
  <img src="/foto.jpg" width=200 height=200 />
  <img src="/foto.jpg" width=50 height=50 /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mi sit amet quam hendrerit sagittis. Etiam convallis justo non diam euismod commodo.</p>
  <a href="http://jsdf.co">&hearts; nice job!</a></p>`;

    return (
      <ScrollView>
        <HTMLView
          value={htmlContent}
          renderNode={renderNode}
          stylesheet={styles}
        />
        <Button
          title="Precedente"
          onPress={() => this.props.navigation.navigate("Fiaba1")}
        />
        <Button
          title="Prossima"
          onPress={() => this.props.navigation.navigate("Fiaba3")}
        />
      </ScrollView>
    );
  }
}

const Fiabe1 = TabNavigator(
  {
    Fiaba1: {
      screen: Fiaba1,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Fiaba2: {
      screen: Fiaba2,
      navigationOptions: {
        tabBarVisible: false
      }
    }
  },
  {
    tabBarVisible: false,
    index: 0,
    headerMode: "none",
    initialRouteName: "Fiaba1",
    transitionConfig
  }
);

const Fiabe2 = TabNavigator(
  {
    Fiaba3: {
      screen: Fiaba3,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    Fiaba4: {
      screen: Fiaba4,
      navigationOptions: {
        tabBarVisible: false
      }
    }
  },
  {
    tabBarVisible: false,
    index: 0,
    headerMode: "none",
    initialRouteName: "Fiaba3",
    transitionConfig
  }
);

export default DrawerNavigator({
  Home: {
    screen: MyHomeScreen
  },
  Capitolo1: {
    screen: Fiabe1
  },
  Capitolo2: {
    screen: Fiabe2
  }
});

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      });

      return { transform: [{ translateX }] };
    }
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  a: {
    fontWeight: "300",
    color: "#FF3366" // make links coloured pink
  }
});
