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
const { width, height } = Dimensions.get("window");

export default class Fiaba extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.indice = this.indice.bind(this);
		console.log("costruttore fiaba");
	}

	indice = () => {
		this.props.goToIndice();
	};

	render() {
		const idf = this.props.idf;
		const content = this.props.htmlContent;
		const resizeMode = "cover";
		return (
			<View
				style={{ flex: 1, flexDirection: "column", minHeight: height }}
			>
				<ImageBackground
					resizeMode={"stretch"} // or cover
					style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
					source={this.props.sfondo}
				>
					<ScrollView>
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
									alignItems: "flex-end"
								}}
							>
								<TouchableOpacity
									onPress={() => playSound(idf)}
								>
									<Icon
										name="volume-up"
										size={40}
										style={{
											color: "gray",
											marginRight: 10,
											marginTop: 10
										}}
									/>
								</TouchableOpacity>
							</View>
						</View>

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
									return (
										<Text key={key} style={styles[classe]}>
											{content[key].value}
										</Text>
									);
								}
							})}
						</View>

						<View style={styles.indice}>
							<TouchableOpacity onPress={() => this.indice()}>
								<Text style={styles.grande}>Indice</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	imagemc: {
		alignSelf: "center",
		marginBottom: 30,
		width: width * 0.9
	},
	imageoc: {
		alignSelf: "center",
		marginBottom: 30,
		width: width * 0.9
	},
	imagemr: {
		alignSelf: "flex-end",
		height: 150,
		width: 150,
		borderWidth: 1,
		borderRadius: 75
	},
	testomt: {
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
	test: {
		fontFamily: "sans-serif",
		fontSize: 20,
		fontStyle: "italic",
		fontWeight: "200",
		letterSpacing: 2
	},
	normale: {
		fontFamily: "sans-serif",
		fontSize: 20,
		fontStyle: "italic",
		fontWeight: "200",
		letterSpacing: 2
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
		paddingTop: height * 0.05,
		justifyContent: "center",
		alignItems: "center"
	},
	indice: {
		marginBottom: 50,
	}
});
