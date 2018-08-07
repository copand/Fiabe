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
import Icon from "react-native-vector-icons/dist/FontAwesome";

const { width, height } = Dimensions.get("window");

export default class MyHomeScreen extends React.Component {
	onPress = fiaba => {
		this.props.capitolo(fiaba);
		//console.log(this.props.navigation);
		//this.props.navigation.navigate("Fiabe",{fiabe: fiaba})
		//console.log('finito');
	};

	playAll = () => {
		playSound(0);
		//console.log(this.props.navigation);
		//this.props.navigation.navigate("Fiabe",{fiabe: fiaba})
		//console.log('finito');
	};

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
					<View style={styles.container1}>
						<View style={styles.container}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => this.onPress(1)}
							>
								<Text style={styles.grande}>
									Persone e famiglia
								</Text>
								<Text style={styles.piccolo}>
									9 filastrocche
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.container}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => this.onPress(4)}
							>
								<Text style={styles.grande}>Animali</Text>
								<Text style={styles.piccolo}>
									15 filastrocche
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.container}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => this.onPress(4)}
							>
								<Text style={styles.grande}>
									Giochi da cortile, conti e ricami
								</Text>
								<Text style={styles.piccolo}>
									10 filastrocche
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.container}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => this.onPress(4)}
							>
								<Text style={styles.grande}>
									Buona notte, baiu bai
								</Text>
								<Text style={styles.piccolo}>
									8 filastrocche
								</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.container}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => this.onPress(4)}
							>
								<Text style={styles.grande}>Frottole</Text>
								<Text style={styles.piccolo}>
									7 filastrocche
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.audio}>
						<TouchableOpacity onPress={() => this.playAll()}>
							<View style={styles.button1}>
								<Icon style={{flex:1}} name="headphones" size={40} />
								<Text style={{flex:1}} >Ascolta tutte le fiabe</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	audio: {
		flex:1,
		position: "absolute",
		bottom: 30,
		width:'100%'
	},
	button1: {
		flexDirection: "column",
		justifyContent: 'center',
        alignItems: 'center',
	},
	container: {
		marginTop: 10
	},
	container1: {
		marginTop: 80,
		marginLeft: 20
	},
	icon: {
		width: 24,
		height: 24
	},
	grande: {
		fontSize: 25
	},
	piccolo: {}
});
