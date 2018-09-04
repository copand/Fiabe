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
import SideMenu from './SideMenu';
import EventEmitter from "react-native-eventemitter";


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
import fiaba_111 from "./Contenuti/fiaba111.js";
import fiaba_118 from "./Contenuti/fiaba118.js";
import fiaba_121 from "./Contenuti/fiaba121.js";
import fiaba_134 from "./Contenuti/fiaba134.js";
import fiaba_162 from "./Contenuti/fiaba162.js";
import fiaba_163 from "./Contenuti/fiaba163.js";
import fiaba_164 from "./Contenuti/fiaba164.js";
import fiaba_169 from "./Contenuti/fiaba169.js";
import fiaba_178 from "./Contenuti/fiaba178.js";
import fiaba_184 from "./Contenuti/fiaba184.js";
import fiaba_234 from "./Contenuti/fiaba234.js";
import fiaba_239 from "./Contenuti/fiaba239.js";
import fiaba_243 from "./Contenuti/fiaba243.js";
import fiaba_252 from "./Contenuti/fiaba252.js";
import fiaba_270 from "./Contenuti/fiaba270.js";
//capitolo 3
import fiaba_39 from "./Contenuti/fiaba39.js";
//capitolo 4
import fiaba_89 from "./Contenuti/fiaba89.js";
import fiaba_90 from "./Contenuti/fiaba90.js";
import fiaba_151 from "./Contenuti/fiaba151.js";
import fiaba_154 from "./Contenuti/fiaba154.js";
import fiaba_157 from "./Contenuti/fiaba157.js";
import fiaba_174 from "./Contenuti/fiaba174.js";
import fiaba_186 from "./Contenuti/fiaba186.js";
import fiaba_248 from "./Contenuti/fiaba248.js";
//capitolo5
import fiaba_189 from "./Contenuti/fiaba189.js";
import fiaba_192 from "./Contenuti/fiaba192.js";
import fiaba_195 from "./Contenuti/fiaba195.js";
import fiaba_200 from "./Contenuti/fiaba200.js";
import fiaba_203 from "./Contenuti/fiaba203.js";
import fiaba_210 from "./Contenuti/fiaba210.js";
import fiaba_219 from "./Contenuti/fiaba219.js";
import fiaba_224 from "./Contenuti/fiaba224.js";
import fiaba_226 from "./Contenuti/fiaba226.js";
import fiaba_228 from "./Contenuti/fiaba228.js";
import fiaba_241 from "./Contenuti/fiaba241.js";
//capitolo6
import fiaba_122 from "./Contenuti/fiaba122.js";
import fiaba_244 from "./Contenuti/fiaba244.js";
import fiaba_274 from "./Contenuti/fiaba274.js";
import fiaba_285 from "./Contenuti/fiaba285.js";
import fiaba_288 from "./Contenuti/fiaba288.js";
import fiaba_296 from "./Contenuti/fiaba296.js";

import Spinner from "react-native-spinkit";
import MyHomeScreen from "./Contenuti/Indice.js";
import Icon from "react-native-vector-icons/dist/FontAwesome";

var indexTOIDF = [
  97,
  116,
  130,
  132,
  160,
  161,
  213,
  218,
  230,
  111,
  118,
  121,
  134,
  162,
  163,
  164,
  169,
  178,
  184,
  234,
  239,
  243,
  252,
  270,
  39,
  89,
  90,
  151,
  154,
  157,
  174,
  186,
  248
];
var globalIndex = -1;
var globalAudio = false;
var playing = false;
var whoosh = null;
const { widthW } = Dimensions.get("window");

class Fiabe extends React.Component {
  constructor(props) {
    super(props);
    console.log('navigation params');
    this.props.navigation.getParam
    this.state = { capitolo: 0, showSwiper: false, isVisible: true };
    this.goToFiaba = this.goToFiaba.bind(this);
    this.callback = this.callback.bind(this);
    this.capitolo = this.capitolo.bind(this);
    this.goToIndice = this.goToIndice.bind(this);
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

  callback(value) {
    if(value == "vai"){
      console.log("indice callback", value);
      this.setState({capitolo:0});
    }
  } 

  componentWillMount() {
    EventEmitter.on("indice",  this.callback);
  }

  componentWillUnmount() {
     EventEmitter.removeListener("indice", this.callback);
  }


  componentDidMount() {
    // Must use this 100-ms delayed swiper workaround to render on Android properly
    setTimeout(() => {
      this.setState({ showSwiper: true });
    }, 100);
    setTimeout(() => {
      this.setState({ isVisible: false });
    }, 500);
  }

  goToFiaba(fiaba) {
    console.log("sono in goToFiaba " + fiaba);
    this.refs.sliderX.scrollBy(fiaba, false);
  }

  goToIndice() {
    //this.refs.sliderX.scrollBy(-globalIndex, false);
    console.log("gotoindice ");
    this.setState({ capitolo: 0 });
  }

  capitolo(capitolo) {
    if (capitolo == -1) {
      //this.props.navigation.navigate("Fiaba1")
      globalAudio = true;
      console.log("capitolo globalAudio " + capitolo);
      console.log(globalAudio);
      playSound(-1);
    }
    //this.refs.sliderX.scrollBy(capitolo, false);
    this.setState({ capitolo: capitolo });

    //qui inizia col playall, mettiamo un flag per inibire audio singole fiabe
  };

  render() {
    var type = "ChasingDots";
    var color = "#3f77ba";
    var size = 100;
    if (this.state.capitolo == 0)
      return (
        <View>
          <MyHomeScreen goToIndice={this.goToIndice} capitolo={this.capitolo} />
        </View>
      );
    else if (this.state.capitolo == 1)
      return <Capitolo1 goToIndice={this.goToIndice} capitolo={this.capitolo} />;
    else if (this.state.capitolo == 2)
      return <Capitolo2 goToIndice={this.goToIndice} />;
    else if (this.state.capitolo == 3)
      return <Capitolo3 goToIndice={this.goToIndice} />;
    else if (this.state.capitolo == 4)
      return <Capitolo4 goToIndice={this.goToIndice} />;
    else if (this.state.capitolo == 5)
      return <Capitolo5 goToIndice={this.goToIndice} />;
    else if (this.state.capitolo == 6)
      return <Capitolo6 goToIndice={this.goToIndice} />;
  }
}

playSound = idf => {
  // Enable playback in silence mode
  if (playing && idf == -1) {
    console.log("entro");
    whoosh.stop();
    globalAudio = false;
    playing = false;
    return;
  } else if (playing) whoosh.stop();
  Sound.setCategory("Playback");
  console.log("playSound fiaba " + idf);
  // Load the sound file 'whoosh.mp3' from the app bundle
  // See notes below about preloading sounds within initialization code below.
  $sound = idf == -1 ? "loop.mp3" : "f" + idf + ".mp3";
  console.log("playSound fiaba " + $sound);
  //$sound = idf == 0 ? "loop.mp3" : idf+".mp3";
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
  this.currentSlideIndex = index;
  globalIndex = index;
  let idf = indexTOIDF[index];
  console.log("non suono fiaba idf", idf);
  //se non è attivo globalAudio play singola fiaba
  //console.log("globalAudio");
  //console.log(globalAudio);
  //if (!globalAudio) playSound(idf);
};


const InnerNavigator = DrawerNavigator(
  {
    Intro: {
      screen: Intro,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="home"
            size={25}
            style={{ color: tintColor, marginLeft: 0 }}
          />
        )
      }
    },
    Capitoli: {
      screen: props => <Fiabe {...props} inizio={0} />,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="bars"
            size={25}
            style={{ color: tintColor, marginLeft: 0 }}
          />
        )
      }
    }
  },
  {
  contentComponent: SideMenu,
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
  /*
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
  */
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

class Capitolo1 extends React.Component {
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
        <View>
          <Fiaba
            slider={this.refs.sliderX}
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_97}
            idf="97"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_116}
            idf="116"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_130}
            idf="130"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_132}
            idf="132"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_160}
            idf="160"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_161}
            idf="161"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_213}
            idf="213"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_218}
            idf="218"
            sfondo={require("./Images/bg_01.jpg")}
          />
        </View>
        <View>
          <Fiaba
            finale={this.props.capitolo}
            capTitolo="Animali"
            goToIndice={this.props.goToIndice}
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

class Capitolo2 extends React.Component {
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
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_111}
            idf="111"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_118}
            idf="118"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_121}
            idf="121"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_134}
            idf="134"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_162}
            idf="162"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_163}
            idf="163"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_164}
            idf="164"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_169}
            idf="169"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_178}
            idf="178"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_184}
            idf="184"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_234}
            idf="234"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_239}
            idf="239"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_243}
            idf="243"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_252}
            idf="252"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_270}
            idf="270"
            sfondo={require("./Images/bg_02.jpg")}
          />
        </View>
      </Swiper>
    );
  }
}

class Capitolo3 extends React.Component {
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
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_39}
            idf="39"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
      </Swiper>
    );
  }
}

class Capitolo4 extends React.Component {
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
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_89}
            idf="89"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_90}
            idf="90"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_151}
            idf="151"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_154}
            idf="154"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_157}
            idf="157"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_174}
            idf="174"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_186}
            idf="186"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_248}
            idf="248"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
      </Swiper>
    );
  }
}

class Capitolo5 extends React.Component {
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
      <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_189}
            idf="189"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_192}
            idf="192"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_195}
            idf="195"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_200}
            idf="200"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_203}
            idf="203"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_210}
            idf="210"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_219}
            idf="219"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_224}
            idf="224"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_226}
            idf="226"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_228}
            idf="228"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_241}
            idf="241"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
      </Swiper>
    );
  }
}

class Capitolo6 extends React.Component {
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
      <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_122}
            idf="122"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_244}
            idf="244"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_274}
            idf="274"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_285}
            idf="285"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_288}
            idf="288"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_296}
            idf="296"
            sfondo={require("./Images/bg_03.jpg")}
          />
        </View>
      </Swiper>
    );
  }
}
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
  },
  spinner: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "45%"
  }
});
