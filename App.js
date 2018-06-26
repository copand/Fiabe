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
  DrawerActions
} from "react-navigation";
import Sound from "react-native-sound";
import Swiper from "react-native-swiper";
import Intro from "./BoardSimple";
import Fiaba from "./Fiaba";

var playing = false;
var whoosh = null;
const { widthW } = Dimensions.get("window");

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Home",
    /*
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("/comelanostranonnetta.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
    */
  };

  render() {
    return (
           <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />
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

	fiaba_1 = {
		0 :{	value: require("./Images/fiabe/comelanostranonnetta.png"),
			type:  "image", classe: 'imagemc'},
		1 :{	value: "Come la nostra nonnetta,",
			type:  "text"},
		2 :{	value: "come la nostra vecchietta,",
			type:  "text"},
		3 :{	value: "ama i suoi nipotini",
			type:  "text", classe: "test"},
		4 :{	value: "a tutti dà i bacini",
			type:  "text"},
		5 :{	value: "carezze dà sulle teste",
			type:  "text"},
		6 :{	value: "tutti i nipoti lei veste.",
			type:  "text"},
    7 :{  value: require("./Images/fiabe/comelanostranonnetta.png"),
      type:  "image", classe: 'imagemc'},
    8 :{  value: "Come la nostra nonnetta,",
      type:  "text"},
    9 :{  value: "come la nostra vecchietta,",
      type:  "text"},
    10 :{  value: "ama i suoi nipotini",
      type:  "text", classe: "test"},
    11 :{  value: "a tutti dà i bacini",
      type:  "text"},
    12 :{  value: "carezze dà sulle teste",
      type:  "text"},
    13 :{  value: "tutti i nipoti lei veste.",
      type:  "text"},
    14 :{  value: require("./Images/fiabe/comelanostranonnetta.png"),
      type:  "image", classe: 'imagemc'},
    15 :{  value: "Come la nostra nonnetta,",
      type:  "text"},
    16 :{  value: "come la nostra vecchietta,",
      type:  "text"},
    17 :{  value: "ama i suoi nipotini",
      type:  "text", classe: "test"},
    18 :{  value: "a tutti dà i bacini",
      type:  "text"},
    19 :{  value: "carezze dà sulle teste",
      type:  "text"},
    20 :{  value: "tutti i nipoti lei veste.",
      type:  "text"}
	}

  htmlContent1 = `<img width=50 src="11" />
           <div>               <p>Come la nostra nonnetta,</p>
               <p>come la nostra vecchietta ,</p>
               <p>ama i suoi nipotini,</p>
               <p>a tutti dà i bacini,</p>
               <p>carezze dà sulle teste,</p>
               <p>tutti i nipoti lei veste.</p>
       </div>`;

 htmlContent15 = `<p><h2>Ciao</h2><h1>SONO FIABA 2</h1><b>Ciao</b>
 <div>               <p>Come la nostra nonnetta,</p>
               <p>come la nostra vecchietta ,</p>
               <p>ama i suoi nipotini,</p>
               <p>a tutti dà i bacini,</p>
               <p>carezze dà sulle teste,</p>
               <p>tutti i nipoti lei veste.</p>
           </div>
  <img src="/foto.jpg" width=200 height=200 />
  <img src="/foto.jpg" width=50 height=50 /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mi sit amet quam hendrerit sagittis. Etiam convallis justo non diam euismod commodo.</p>
  <a href="http://jsdf.co">&hearts; nice job!</a></p>`;
  
  htmlContent2 = `<p><h2>Ciao</h2><h1>SONO FIABA 2</h1><b>Ciao</b>
  <img src="/foto.jpg" width=200 height=200 />
  <img src="/foto.jpg" width=50 height=50 /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mi sit amet quam hendrerit sagittis. Etiam convallis justo non diam euismod commodo.</p>
  <a href="http://jsdf.co">&hearts; nice job!</a></p>`;
  htmlContent3 = `<p><h2>Ciao</h2><h1>SONO FIABA 3</h1><b>Ciao</b>
  <img src="/foto.jpg" width=200 height=200 />
  <img src="/foto.jpg" width=50 height=50 /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mi sit amet quam hendrerit sagittis. Etiam convallis justo non diam euismod commodo.</p>
  <a href="http://jsdf.co">&hearts; nice job!</a></p>`;

  htmlContent4 = `<p><h2>Ciao</h2><h1>SONO FIABA 4</h1><b>Ciao</b>
  <img src="/foto.jpg" width=200 height=200 />
  <img src="/foto.jpg" width=50 height=50 /><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu mi sit amet quam hendrerit sagittis. Etiam convallis justo non diam euismod commodo.</p>
  <a href="http://jsdf.co">&hearts; nice job!</a></p>`;

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
            htmlContent={this.fiaba_1}
            idf="1"
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

export default DrawerNavigator({
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
  },
  wrapper: {
    flex:1
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
