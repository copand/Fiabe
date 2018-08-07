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
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";
import Sound from "react-native-sound";
import Swiper from "react-native-swiper";
import Intro from "./BoardSimple";
import Fiaba from "./Fiaba";
// capitolo1
import fiaba_97 from "./Contenuti/fiaba97.js";
import fiaba_116 from "./Contenuti/fiaba116.js";
import fiaba_130 from "./Contenuti/fiaba130.js";
import fiaba_132 from "./Contenuti/fiaba132.js";
import fiaba_160 from "./Contenuti/fiaba160.js";
import fiaba_161 from "./Contenuti/fiaba161.js";
import fiaba_213 from "./Contenuti/fiaba213.js";
import fiaba_218 from "./Contenuti/fiaba218.js";
import fiaba_230 from "./Contenuti/fiaba230.js";
// capitolo2
import MyHomeScreen from "./Contenuti/Indice.js";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

var playing = false;
var whoosh = null;
const { widthW } = Dimensions.get("window");

class Fiabe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goToFiaba = this.goToFiaba.bind(this);
    const navParams = props.navigation.state.params;
    console.log("costruttore fiabe");
    console.log(navParams);
    if (navParams && navParams.fiabe) {
      console.log("vado alla fiaba");
      //this.goToFiaba(navParams.fiabe);
      //TODO da dinamicizzare in ComponentDidMount
      setTimeout(() => {
        this.goToFiaba(navParams.fiabe);
      }, 5000);
    }
  }

  goToFiaba(fiaba) {
    console.log("sono in goToFiaba " + fiaba);
    console.log(this.refs);
    this.refs.sliderX.scrollBy(fiaba, false);
  }

  capitolo = capitolo => {
    //this.props.navigation.navigate("Fiaba1")
    console.log("salto al capitolo da swyper " + capitolo);
  };

  render() {
    return (
      <Swiper
        ref="sliderX"
        index={this.props.inizio}
        style={styles.wrapper}
        showsButtons={true}
        showsPagination={false}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
      >
        <MyHomeScreen capitolo={this.goToFiaba} />
        <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_97}
            idf="97"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_116}
            idf="116"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_130}
            idf="130"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
       <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_132}
            idf="132"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_160}
            idf="160"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
      <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_161}
            idf="161"
            sfondo={require("./Images/bg_01.jpg")}
          />
      </View>
      <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_213}
            idf="213"
            sfondo={require("./Images/bg_01.jpg")}
          />
      </View>
      <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_218}
            idf="218"
            sfondo={require("./Images/bg_01.jpg")}
          />
      </View>
      <View>
          <Fiaba
            mynavigation={this.props.navigation}
            htmlContent={fiaba_230}
            idf="230"
            sfondo={require("./Images/bg_01.jpg")}
          />
      </View>
 
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

capitolo = capitolo => {
  //this.props.navigation.navigate("Fiaba1")
  //console.log('salto al capitolo ' + capitolo);
};

const InnerNavigator = DrawerNavigator(
  {
    Intro: {
      screen: Intro,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
             <Icon name="home" size={25} style={{color:tintColor,marginLeft:0}} />
        )
      }
    },
    Capitoli: {
      screen: props => <Fiabe {...props} inizio={0} />,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
             <Icon name="bars" size={25} style={{color:tintColor,marginLeft:0}} />
        )
      }
    }
  },
  {
    drawerPosition: "left",
    drawerWidth: Dimensions.get("window").width / 2.0,
    drawerBackgroundColor: "#ffffff",
    contentOptions: {
      activeTintColor: "#3f77ba",
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

const SimpleApp = StackNavigator(
  {
    Indice: { screen: InnerNavigator }
  },
  {
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);

/*
const AppCop = createStackNavigator({

    Home: {
      screen: props => <MyHomeScreen {...props} capitolo={this.capitolo} />
    },
    Fiabe: {
      screen: props => <Fiabe {...props} inizio={0} />
    }
});


const CopDrawer = DrawerNavigator(
  {
    Intro: {
      screen: Intro
    },
    Home: {
      screen: props => <MyHomeScreen {...props} capitolo={this.capitolo} />
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
*/
export default class CopContainer extends React.Component {
  render() {
    return <SimpleApp />;
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
