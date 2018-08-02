import React from "react";
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
	Easing, 
	SectionList
} from "react-native";
const { width, height } = Dimensions.get("window");

export default class MyHomeScreen extends React.Component {
	static navigationOptions = {
		drawerLabel: "HomeCop",
		drawerIcon: ({ tintColor }) => (
			<Image
			source={require("../Images/fiabe/comelanostranonnetta.png")}
			style={[styles.icon, { tintColor: tintColor }]}
			/>
			)
	};

	onPress = (fiaba) => {
		this.props.capitolo(fiaba);
		//console.log(this.props.navigation);
		//this.props.navigation.navigate("Fiabe",{fiabe: fiaba})
		//console.log('finito');
	}

	render() {
		return (
			<View
			style={{ flex: 1, flexDirection: "column", minHeight: height }}
			>
			<ImageBackground
					resizeMode={"stretch"} // or cover
					style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
					source={require("../Images/bg_01.jpg")}
					>
					<View style={styles.container}>
					<TouchableOpacity
					style={styles.button}
					onPress={() => this.onPress(1)}
					>
					 <Text style={styles.grande}>Persone e famiglia</Text>
					 <Text style={styles.piccolo}>9 filastrocche</Text>
       				</TouchableOpacity>
					</View>
					</ImageBackground>
					</View>
					);
	}
}

const styles = StyleSheet.create({
	icon: {
		width: 24,
		height: 24
	},
	grande:{
		fontSize:25
	},
	piccolo:{

	}
});
