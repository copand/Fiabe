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
//import HTMLView from "react-native-htmlview";
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
  DrawerActions,
  createDrawerNavigator
} from "react-navigation";
import Sound from "react-native-sound";
import Swiper from "react-native-swiper";
import Intro from "./BoardSimple";
import Fiaba from "./Fiaba";
import fiaba_1 from "./Contenuti/fiaba1.js";
import fiaba_2 from "./Contenuti/fiaba2.js";

var playing = false;
var whoosh = null;
const { widthW } = Dimensions.get("window");

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "HomeCop",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("./Images/fiabe/comelanostranonnetta.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "powderblue" }} />
        <View style={{ flex: 2, backgroundColor: "skyblue" }} />
        <View style={{ flex: 3, backgroundColor: "steelblue" }} />
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

class Fiabe extends React.Component {
  render() {
    return (
      <Swiper
        index={this.props.inizio}
        style={styles.wrapper}
        showsButtons={true}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
      >
        <View style={styles.slide1}>
          <Text>CAPITOLO UNO</Text>
        </View>
        <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_1}
            idf="1"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_2}
            idf="2"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>

        {/*
     <View style={styles.slide2}>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={this.htmlContent2}
            idf="2"
          />
        </View>
        <View style={styles.slide1}>
          <Text>CAPITOLO DUE</Text>
        </View>

        <View style={styles.slide1}>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={this.htmlContent3}
            idf="3"
          />
        </View>
        <View style={styles.slide2}>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={this.htmlContent4}
            idf="4"
          />
        </View>
  */}
      </Swiper>
    );
  }
}

playSound = idf => {
  // Enable playback in silence mode
  if (playing) {
    whoosh.stop();
  }
  Sound.setCategory("Playback");
  console.log("playSound fiaba " + idf);
  // Load the sound file 'whoosh.mp3' from the app bundle
  // See notes below about preloading sounds within initialization code below.
  $sound = idf == 0 ? "genoa.mp3" : "elevator.mp3";
  whoosh = new Sound($sound, Sound.MAIN_BUNDLE, error => {
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
        playing = false;
      } else {
        console.log("playback failed due to audio decoding errors");
        whoosh.reset();
      }
    });
    playing = true;
  });
};

swiperIndexChanged = index => {
  console.log("swiperIndexChanged", "index", index);
  //stoppiamo suono se attivo
  playSound(index);
};

const CopDrawer = DrawerNavigator(
  {
    Intro: {
      screen: Intro
    },
    Home: {
      screen: MyHomeScreen
    },
    Capitolo1: {
      screen: props => <Fiabe {...props} inizio={0} />
    },
    Capitolo2: {
      screen: props => <Fiabe {...props} inizio={3} />
    }
  },
  {
    drawerPosition: "left",
    drawerWidth: Dimensions.get("window").width / 2.0,
    drawerBackgroundColor: "orange",
    contentOptions: {
      activeTintColor: "#d03036",
      activeBackgroundColor: "rgba(0,0,0,0)",
      inactiveBackgroundColor: "rgba(0,0,0,0)",
      inactiveTintColor: "#545f7a",
      style: {
        marginVertical: 0
      },
      labelStyle: {
        fontWeight: "bold",
        fontFamily: "Roboto",
        backgroundColor: "transparent"
      }
    }
  }
);

export default class CopContainer extends React.Component {
  render() {
    return <CopDrawer />;
  }
}

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
  },
  wrapper: {
    flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
