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
  Easing,
  AppState,
  ImageBackground,
  TouchableOpacity
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
import Credits from "./Credits";
import LoopMp3 from "./LoopMp3";
import Fiaba from "./Fiaba";
import SideMenu from './SideMenu';
import EventEmitter from "react-native-eventemitter";
import Splash from "./Splash";


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
import fiaba_135 from "./Contenuti/fiaba135.js";
import fiaba_137 from "./Contenuti/fiaba137.js";
import fiaba_140 from "./Contenuti/fiaba140.js";
import fiaba_142 from "./Contenuti/fiaba142.js";
import fiaba_145 from "./Contenuti/fiaba145.js";
import fiaba_146 from "./Contenuti/fiaba146.js";
import fiaba_175 from "./Contenuti/fiaba175.js";
import fiaba_176 from "./Contenuti/fiaba176.js";
import fiaba_220 from "./Contenuti/fiaba220.js";
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
import fiaba_298 from "./Contenuti/fiaba298.js";

import Spinner from "react-native-spinkit";
import MyHomeScreen from "./Contenuti/Indice.js";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';


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
const { widthW,height} = Dimensions.get("window");

class Fiabe extends React.Component {
  constructor(props) {
    super(props);
    console.log('navigation params');
    this.props.navigation.getParam
    this.state = { capitolo: 0, showSwiper: false, isVisible: false, isLoopPlaying:false };
    this.goToFiaba = this.goToFiaba.bind(this);
    this.callback = this.callback.bind(this);
    this.callbackLoop = this.callbackLoop.bind(this);
    this.capitolo = this.capitolo.bind(this);
    this.goToIndice = this.goToIndice.bind(this);
    const navParams = props.navigation.state.params;
    //console.log("costruttore fiabe");
    //console.log(navParams);
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
      this.props.navigation.dispatch(
        DrawerActions.closeDrawer()
        )
    }
  } 

  callbackLoop(value) {
    console.log('callbackLoop');
    if(value == "toggle"){
      console.log("loopmp3 callback", value);

      this.props.navigation.dispatch(
        DrawerActions.closeDrawer()
      )
    }
    else if(value == "pause"){
      console.log("loopmp3 callback", value);
      if(whoosh)
       whoosh.pause();
    }
    else if(value == "play"){
      console.log("loopmp3 callback", value);
      if(whoosh)
       whoosh.play();
    }
  } 

  componentWillMount() {
    EventEmitter.on("indice",  this.callback);
    EventEmitter.on("loopmp3",  this.callbackLoop);
    this.setState({isLoopPlaying:playing});
    AppState.addEventListener('change', (state) => {
      if(state === 'background' && whoosh){
        whoosh.stop();
        whoosh.release()
        globalAudio = false;
        playing = false;
      }
    })
  }

  componentWillUnmount() {
     EventEmitter.removeListener("indice", this.callback);
     EventEmitter.removeListener("loopmp3", this.callbackLoop);
  }


  componentDidMount() {
    /*
    // Must use this 100-ms delayed swiper workaround to render on Android properly
    setTimeout(() => {
      this.setState({ showSwiper: true });
    }, 100);
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 500);
    */
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
      let myvar = this.state.isLoopPlaying == true ? false : true;
      if(myvar)
        this.setState({ capitolo: 1, isLoopPlaying:myvar });
      else
        this.setState({ capitolo: 0, isLoopPlaying:myvar });
      playSound(0);
      return;
    }
    //this.refs.sliderX.scrollBy(capitolo, false);
    this.setState({ capitolo: capitolo });
    /*
    this.setState({isVisible: true});
    setTimeout(() => {
      this.setState({ isVisible: false });
    }, 1000);
    */
    //qui inizia col playall, mettiamo un flag per inibire audio singole fiabe
  };

  render() {
    var type = "ChasingDots";
    var color = "#3f77ba";
    var size = 100;
    if (this.state.capitolo == 0)
      return (
        <View>
          {this.state.isVisible && 
            <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color}/>}
          <MyHomeScreen goToIndice={this.goToIndice} capitolo={this.capitolo} navigation={this.props.navigation} isLoopPlaying={this.state.isLoopPlaying} />
        </View>
      );
    else if (this.state.capitolo == 100)
      return <Capitolo0 goToIndice={this.goToIndice} capitolo={this.capitolo} navigation={this.props.navigation} isLoopPlaying={this.state.isLoopPlaying} />;
    else if (this.state.capitolo == 1)
      return <Capitolo1 goToIndice={this.goToIndice} capitolo={this.capitolo} navigation={this.props.navigation} isLoopPlaying={this.state.isLoopPlaying} />;
    else if (this.state.capitolo == 2)
      return <Capitolo2 goToIndice={this.goToIndice} capitolo={this.capitolo}  navigation={this.props.navigation} isLoopPlaying={this.state.isLoopPlaying} />;
    else if (this.state.capitolo == 3)
      return <Capitolo3 goToIndice={this.goToIndice} capitolo={this.capitolo}  navigation={this.props.navigation} isLoopPlaying={this.state.isLoopPlaying} />;
    else if (this.state.capitolo == 4)
      return <Capitolo4 goToIndice={this.goToIndice} capitolo={this.capitolo}  navigation={this.props.navigation} isLoopPlaying={this.state.isLoopPlaying} />;
    else if (this.state.capitolo == 5)
      return <Capitolo5 goToIndice={this.goToIndice} capitolo={this.capitolo}  navigation={this.props.navigation} isLoopPlaying={this.state.isLoopPlaying} />;
    else if (this.state.capitolo == 6)
      return <Capitolo6 goToIndice={this.goToIndice} capitolo={this.capitolo}  navigation={this.props.navigation} isLoopPlaying={this.state.isLoopPlaying} />;
  }
}

pauseSoundLoop = status => {
  if(status == "pause")
    whoosh.pause();
  else if(status == "play")
    whoosh.play()
}

stopSound = (loop) => {
  if(!loop && whoosh){
    whoosh.stop();
    whoosh.release()
    playing = false;
  }
}

stopSoundLoop = () => {
  if (playing && whoosh) {
    whoosh.stop();
    whoosh.release()
    globalAudio = false;
    playing = false;
  }
}

playSound = idf => {
  // Enable playback in silence mode
  if (playing && idf == -1) {
    console.log("entro");
    whoosh.stop();
    whoosh.release()
    globalAudio = false;
    playing = false;
    return;
  } else if (playing){ 
    whoosh.stop();
    whoosh.release()
    playing = false;
    if(idf == 0)
      globalAudio = false;
    return;
  }
  if(!playing && idf == 0)
    globalAudio = true;
  Sound.setCategory("Playback");
  console.log("playSound fiaba " + idf);
  // Load the sound file 'whoosh.mp3' from the app bundle
  // See notes below about preloading sounds within initialization code below.
  $sound = idf == 0 ? "loop.mp3" : "f" + idf + ".mp3";
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
  if(!globalAudio)
    stopSound(false);
  //se non è attivo globalAudio play singola fiaba
  //console.log("globalAudio");
  //console.log(globalAudio);
  //if (!globalAudio) playSound(idf);
};


const InnerNavigator = DrawerNavigator(
  {
    Intro: {
      screen: Splash,
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
    },
    Credits: {
      screen: Credits,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="bars"
            size={25}
            style={{ color: tintColor, marginLeft: 0 }}
          />
        )
      }
    },
    LoopMp3: {
      screen: LoopMp3,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="volume-up"
            size={25}
            style={{ color: tintColor, marginLeft: 0 }}
          />
        )
      }
    }
  },
  {
  contentComponent: SideMenu,
  drawerWidth: Dimensions.get("window").width / 1.5,
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
        fontFamily: "Coiny-Regular",
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


class Capitolo0 extends React.Component {
  render() {
    return (
      <Swiper
        ref="sliderX"
        index={this.props.inizio}
        style={styles.wrapper}
        showsButtons={false}
        activeDotColor={'orange'}
        showsPagination={true}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
        loadMinimal = {true}
        loadMinimalSize = {4}
      >
        <View>
          <Fiaba
            slider={this.refs.sliderX}
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_134}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="134"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_118}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="118"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_234}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="234"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_164}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="164"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
        <Fine goToIndice={this.props.goToIndice} mynavigation={this.props.navigation}/>
        </View>
      </Swiper>
    );
  }
}

class Capitolo1 extends React.Component {
  render() {
    return (
      <Swiper
        ref="sliderX"
        index={this.props.inizio}
        style={styles.wrapper}
        showsButtons={false}
        activeDotColor={'orange'}
        showsPagination={true}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
        loadMinimal = {true}
        loadMinimalSize = {5}
      >
        <View>
          <Fiaba
            slider={this.refs.sliderX}
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_97}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="97"
            sfondo={require("./Images/bg_cap_persone.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_218}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="218"
            sfondo={require("./Images/bg_cap_persone.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_116}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="116"
            sfondo={require("./Images/bg_cap_persone.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_130}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="130"
            sfondo={require("./Images/bg_cap_persone.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_132}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="132"
            sfondo={require("./Images/bg_cap_persone.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_230}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="230"
            sfondo={require("./Images/bg_cap_persone.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_213}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="213"
            sfondo={require("./Images/bg_cap_persone.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_160}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="160"
            sfondo={require("./Images/bg_cap_persone.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_161}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="161"
            sfondo={require("./Images/bg_cap_persone.png")}
            finale={this.props.capitolo}
            capTitolo="Animali"
            numcap={2}
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
        showsButtons={false}
        showsPagination={true}
        activeDotColor={'orange'}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
        loadMinimal = {true}
        loadMinimalSize = {3}
      >
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_134}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="134"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_239}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="239"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_243}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="243"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_111}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="111"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_270}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="270"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_118}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="118"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_234}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="234"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_121}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="121"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_164}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="164"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>       
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_162}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="162"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_163}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="163"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_169}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="169"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_178}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="178"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_184}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="184"
            sfondo={require("./Images/bg_animali.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_252}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="252"
            sfondo={require("./Images/bg_animali.png")}
            finale={this.props.capitolo}
            numcap={3}
            capTitolo="Giochi da cortile e conte"
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
        showsButtons={false}
        showsPagination={true}
        activeDotColor={'orange'}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
        loadMinimal = {true}
        loadMinimalSize = {3}
      >
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_135}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="135"
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_137}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="137"
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_140}
            idf="140"
            isLoopPlaying={this.props.isLoopPlaying}
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_175}
            idf="175"
            isLoopPlaying={this.props.isLoopPlaying}
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_142}
            idf="142"
            isLoopPlaying={this.props.isLoopPlaying}
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_145}
            idf="145"
            isLoopPlaying={this.props.isLoopPlaying}
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_146}
            idf="146"
            isLoopPlaying={this.props.isLoopPlaying}
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_176}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="176"
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_39}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="39"
            sfondo={require("./Images/bg_giochi.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_220}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="220"
            sfondo={require("./Images/bg_giochi.png")}
            finale={this.props.capitolo}
            capTitolo="Buona notte, baiu bai"
            numcap={4}
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
        showsButtons={false}
        showsPagination={true}
        activeDotColor={'orange'}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
        loadMinimal = {true}
        loadMinimalSize = {3}
      >
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_157}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="157"
            sfondo={require("./Images/bg_buonanotte.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_90}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="90"
            sfondo={require("./Images/bg_buonanotte.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_154}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="154"
            sfondo={require("./Images/bg_buonanotte.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_174}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="174"
            sfondo={require("./Images/bg_buonanotte.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_186}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="186"
            sfondo={require("./Images/bg_buonanotte.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_248}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="248"
            sfondo={require("./Images/bg_buonanotte.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_151}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="151"
            sfondo={require("./Images/bg_buonanotte.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_89}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="89"
            sfondo={require("./Images/bg_buonanotte.png")}
            finale={this.props.capitolo}
            capTitolo="Le stagioni"
            numcap={5}
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
        showsButtons={false}
        showsPagination={true}
        activeDotColor={'orange'}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
        loadMinimal = {true}
        loadMinimalSize = {3}
      >
      <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_195}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="195"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_189}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="189"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_192}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="192"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_200}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="200"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_203}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="203"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_226}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="226"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_224}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="224"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_228}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="228"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_210}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="210"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_219}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="219"
            sfondo={require("./Images/bg_stagioni.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_241}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="241"
            sfondo={require("./Images/bg_stagioni.png")}
            finale={this.props.capitolo}
            capTitolo="Frottole"
            numcap={6}
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
        showsButtons={false}
        showsPagination={true}
        activeDotColor={'orange'}
        loop={false}
        onIndexChanged={index => {
          swiperIndexChanged(index);
        }}
        loadMinimal = {true}
        loadMinimalSize = {3}
      >
      <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_274}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="274"
            sfondo={require("./Images/bg_frottole.png")}
          />
      </View>
      <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_244}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="244"
            sfondo={require("./Images/bg_frottole.png")}
          />
        </View>
      <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_122}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="122"
            sfondo={require("./Images/bg_frottole.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_285}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="285"
            sfondo={require("./Images/bg_frottole.png")}
          />
        </View>
       <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_296}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="296"
            sfondo={require("./Images/bg_frottole.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_288}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="288"
            sfondo={require("./Images/bg_frottole.png")}
          />
        </View>
        <View>
          <Fiaba
            goToIndice={this.props.goToIndice}
            mynavigation={this.props.navigation}
            htmlContent={fiaba_298}
            isLoopPlaying={this.props.isLoopPlaying}
            idf="298"
            sfondo={require("./Images/bg_frottole.png")}
          />
        </View>
        <View>
        <Fine goToIndice={this.props.goToIndice} mynavigation={this.props.navigation}/>
        </View>
       
      </Swiper>
    );
  }
}


class Fine extends React.Component {
  render(){
    return(

      <View
        style={{ flex: 1, flexDirection: "column", minHeight: height ,justifyContent: "center"}}
      >
        <ImageBackground
              resizeMode={"stretch"} // or cover
              style={{ flex: 1, alignItems:'center' }} // must be passed from the parent, the number may vary depending upon your screen size
              source={require("./Images/bg_fine.png")}
            >
            <View style={{ flexDirection: "row", zIndex:10000}}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start"
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.props.mynavigation.dispatch(
                      DrawerActions.openDrawer()
                    )
                  }
                >
                  <Icon
                    name="bars"
                    type="light"
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
                   <Image
                      style={{width:'100%'}}
                      resizeMode="contain"
                      source={require("./Images/bouquet_pag_fine.png")}
                    />
                    <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:60, marginTop:'-15%'}}>
                    Fine
                    </Text>
              <TouchableOpacity
                style={styles.contenuto}
                onPress={() => {
                  console.log("props",this.props);
                  this.props.goToIndice()}}
              >
              <FontAwesome5Pro name={'book-open'} color="#FFFFFF" light size={50} style={{zIndex:12000,padding:30}} />
              </TouchableOpacity>
  
        </ImageBackground>
        </View>
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
    position:'absolute',
    zIndex:10000,
    top: '50%'
  },
  viewTop: {
    flex:1,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
});
