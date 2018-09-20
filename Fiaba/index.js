import React from "react";
//import HTMLView from "react-native-htmlview";
import {
	ScrollView,
	StyleSheet,
	Image,
	ImageBackground,
	TouchableOpacity,
	View,
	PixelRatio,
	Dimensions,
	Button,
	Text,
	Animated,
	Easing
} from "react-native";
import { DrawerNavigator, DrawerActions } from "react-navigation";
import Images from "../Constants.js";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import EventEmitter from "react-native-eventemitter";
const { width, height } = Dimensions.get("window");

export default class Fiaba extends React.Component {

	constructor(props) {
		super(props);
		this.state = {playing:false,pause: false};
		this.indice = this.indice.bind(this);
		this.finale = this.finale.bind(this);
	}

	indice = () => {
		this.props.goToIndice();
	};

	finale = (capitolo) => {
		this.props.finale(capitolo);
	};

	pauseLoop = () => {
		let myvar = this.state.pause == true ? false : true;
		this.setState({pause: myvar});
		if(myvar)
	    	EventEmitter.emit("loopmp3", "pause");
		else
	    	EventEmitter.emit("loopmp3", "play");
	};

	render() {
		const idf = this.props.idf;
		const content = this.props.htmlContent;
		const resizeMode = "cover";
		const playing = this.state.playing;
		let isLoopPlaying = this.props.isLoopPlaying;
		console.log('isLoopPlaying ' + isLoopPlaying);
		return (
			<View
				style={{ flex: 1, flexDirection: "column", minHeight: height }}
			>
				<ImageBackground
					resizeMode={"stretch"} // or cover
					style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
					source={this.props.sfondo}
				>
				<View style={{ flexDirection: "row" }}>
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
										size={40}
										style={{
											color: "gray",
											marginLeft: 10,
											marginTop: 10
										}}
									/>
								</TouchableOpacity>
							</View>
							
							<View
								style={{
									flex: 1,
									alignItems: "center"
								}}
							>
								<TouchableOpacity
									onPress={() => this.indice()}
								>
									<Icon
										name="home"
										size={40}
										style={{
											color: "gray",
											marginTop: 10
										}}
									/>
								</TouchableOpacity>
							</View>
						
							{!!!isLoopPlaying && (
							<View
								style={{
									flex: 1,
									alignItems: "flex-end"
								}}
							>
								<TouchableOpacity
									onPress={() => {
										let myvar = playing == true ? false : true;
										playSound(idf); 
										this.setState({playing:myvar})}
									}
								>
								{!playing &&	<Icon
										name="volume-up"
										size={40}
										style={{
											color: "gray",
											marginRight: 10,
											marginTop: 10
										}}
									/>
								}
								{playing &&	<Icon
										name="volume-off"
										size={40}
										style={{
											color: "gray",
											marginRight: 10,
											marginTop: 10
										}}
									/>
								}
								</TouchableOpacity>
							</View>
							)}
						</View>
					<ScrollView>
						

						<View style={styles.contenuto}>
							{Object.keys(content).map(function(key) {
								let classe = content[key].classe
									? content[key].classe
									: "normale";
								if (content[key].type == "image") {
									return (
										<Image
											style={styles[classe]}
											key={key}
											resizeMode="contain"
											source={content[key].value}
										/>
									);
								} else if (content[key].type == "text") {
									if(classe == "box")
										return (
										<View key={key} style={styles['box']}>
											<Text key={key} style={styles['boxTesto']}>
												{content[key].value}
											</Text>
										</View>
										);
									else
										return (
										<Text key={key} style={styles[classe]}>
											{content[key].value}
										</Text>
										);
								}
							})}
						</View>
						<View style={styles.footer}>
						</View>
						{this.props.finale &&	
						<View style={styles.footer}>
							<TouchableOpacity onPress={() => this.finale(2)}>
								<Text style={styles.finale}>Vai al prossimo capitolo: {this.props.capTitolo}</Text>
								<Icon
										name="arrow-circle-right"
										size={40}
										style={{
											color: "green",
											textAlign: "center"
										}}
									/>
							</TouchableOpacity>
						</View>
						}	
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	imagemc: {
		alignSelf: "center",
		marginBottom: 20,
		//marginTop: -30,
		width: width * 0.85
	},
	imageoc: {
		alignSelf: "center",
		marginBottom: 20,
		width: width * 0.85
	},
	imagemr: {
		alignSelf: "flex-end",
		height: 150,
		width: 150,
		borderWidth: 1,
		borderRadius: 75
	},
	testomt: {
		textAlign: 'center',
		marginTop: 25,
		fontFamily: "sans-serif",
		fontSize: 20,
		fontStyle: "italic",
		fontWeight: "200",
		letterSpacing: 2
	},
	testomb: {
		marginBottom: 25,
		fontFamily: "sans-serif",
		fontSize: 20,
		fontStyle: "italic",
		fontWeight: "200",
		letterSpacing: 2
	},
	spiegazione: {
		textAlign: 'center',
		marginTop:25,
		fontSize: 17,
		fontWeight: "200",
		letterSpacing: 2
	},
	normale: {
		marginLeft: width *0.1,
		marginRight: width * 0.1,
		textAlign: 'left',
		alignSelf: 'flex-start',
		fontFamily: "sans-serif",
		fontSize: 20,
		fontStyle: "italic",
		fontWeight: "200",
		letterSpacing: 2
	},
	test: {
		marginLeft: width *0.1,
		marginRight: width * 0.1,
		textAlign: 'left',
		alignSelf: 'flex-start',
		fontFamily: "sans-serif",
		fontSize: 20,
		fontStyle: "italic",
		fontWeight: "200",
		letterSpacing: 2
	},
	boxTesto: {
		marginLeft: width *0.1,
		marginRight: width * 0.1,
		textAlign: 'left',
		alignSelf: 'flex-start',
		fontFamily: "Arial",
		fontSize: 17,
		fontWeight: "200",
		letterSpacing: 2
	},
	box:{
		//marginLeft:width*0.05,
		//marginRight: width * 0.05,
		borderColor: 'lightgray',
		borderStyle: 'solid',
		borderWidth: 3,
		marginBottom:width*0.05,
		marginTop:width*0.05
	},
	backgroundImage: {
		flex: 1,
		resizeMode: "cover" // or 'stretch'
	},
	icon: {
		width: 24,
		height: 24
	},
	a: {
		fontWeight: "300",
		color: "#FF3366" // make links coloured pink
	},
	contenuto: {
		//paddingTop: height * 0.05,
		justifyContent: "center",
		alignItems: "center"
	},
	indice: {
		marginBottom: 50,
	},
	footer: {
		marginBottom: 50,
	},
	finale: {
		textAlign: 'center',
		fontFamily: "sans-serif",
		fontSize: 20,
		fontStyle: "italic",
		fontWeight: "200",
		letterSpacing: 2
	}
});
