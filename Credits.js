import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./Credits.style";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity, ImageBackground, Image, Dimensions } from "react-native";
import EventEmitter from "react-native-eventemitter";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { DrawerNavigator, DrawerActions } from "react-navigation";
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Swiper from "react-native-swiper";

const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;


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
      <View style={styles.container}>

     <ImageBackground
              resizeMode={"stretch"} // or cover
              style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
              source={require("./Images/bg_regole.png")}
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
                    this.props.navigation.dispatch(
                      DrawerActions.openDrawer()
                    )
                  }
                >
                  <Icon
                    name="bars"
                    size={40}
                    style={{
                      color: "black",
                      marginLeft: 10,
                      marginTop: 10
                    }}
                  />
                </TouchableOpacity>
              </View>
          </View>
        <Swiper
          loop={false}
          showsButtons={true}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.dotActive} />}
          paginationStyle={{ bottom: 70, right: 0 }}
          showsButtons={false}
          showsPagination={true}
          ref="sliderCop"
        >
          <ScrollView>
        <View style={styles.contenuto}>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 10, paddingTop:10,'textAlign':'center'}}>
          REGOLE
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:30,'textAlign':'justify'}}>
          Le 60 filastrocche pubblicate in questa applicazione sono tradotte dal russo e destinate ai bambini di età prescolastica. 
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:30,'textAlign':'justify'}}>
          Ogni filastrocca è composta da un testo scritto accompagnato da immagini originali disegnate a mano libera e un file audio per ascoltarne la lettura da narratori professionisti.
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:30,'textAlign':'justify'}}>
          Le filastrocche sono suddivise in capitoli e possono essere ascoltate singolarmente oppure di seguito senza interruzioni.
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:30,'textAlign':'justify'}}>
          Il folclore russo per bambini è un mondo meraviglioso di fantasia e amore verso sé stessi e l’ambiente circostante. La tradizione del folclore russo è quella di accompagnare i minimi eventi nella vita del bambino con le strofe rimate, che sia un momento del bagnetto o della pappa per i più piccini, ma anche i giochi all’aperto per i bimbi più grandi. 
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:30,'textAlign':'justify'}}>
          Attraverso il folclore i bimbi imparano a parlare, a contare, a relazionarsi con le persone e animali, a capire i meccanismi e i ruoli nella società.
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:30,'textAlign':'justify'}}>
          Essendo folclore ogni filastrocca in lingua originale può avere più versioni. Come testo di riferimento in russo puoi consultare l’enciclopedia del folclore per bambini «Al nostro gran cancello…» (Энциклопедия детского фольклора “Как у наших у ворот…”, серия «Моя первая книга», изд.: «Белый город», 2009).
          </Text>
          <TouchableOpacity
                style={styles.contenuto}
                onPress={() => this.props.navigation.navigate('Capitoli')}
              >
              <FontAwesome5Pro name={'book-open'} color="orange" size={70} style={{zIndex:12000,padding:20}} />
              </TouchableOpacity>
  
          </View>
          </ScrollView>
          <ScrollView>

          <View style={styles.contenuto}>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 10, paddingTop:10,paddingLeft:-10,'textAlign':'center'}}>
          INFO
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:10,'textAlign':'justify'}}>
          Studio di registrazione:
          NOME
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:10,'textAlign':'justify'}}>
          Voci:
          Marco Bertarini
          Sonia Palla
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:10,'textAlign':'justify'}}>
          Svilupo software:
          NETKOM GROUP srl
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:10,'textAlign':'justify'}}>
          Traduzioni:
          VIKTORYIA ZAKHAROVA
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:10,'textAlign':'justify'}}>
          Immagini:
          VIKTORYIA ZAKHAROVA
          </Text>
          <Text style={{'color':'#000000',fontSize: PAGE_WIDTH / 16, paddingTop:10,'textAlign':'justify'}}>
          Contatti:
          russofolclore@gmail.com
          </Text>

          <TouchableOpacity
                style={styles.contenuto}
                onPress={() => this.props.navigation.navigate('Capitoli')}
              >
              <FontAwesome5Pro name={'book-open'} color="orange" size={70} style={{zIndex:12000, padding:20}} />
              </TouchableOpacity>
          </View>
          </ScrollView>
        </Swiper>
            </ImageBackground>
      </View>
    );
  }
}

Credits.propTypes = {
  navigation: PropTypes.object
};

export default Credits;
