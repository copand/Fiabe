import React from "react";
//import HTMLView from "react-native-htmlview";
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
import { DrawerNavigator, DrawerActions } from "react-navigation";
import Images from "../Constants.js";

export default class Fiaba extends React.Component {
	render() {
		const idf = this.props.idf;
		const content = this.props.htmlContent;
		const resizeMode = "cover";
		const {width, height} = Dimensions.get('window');
		return (
			<ScrollView>

				<View style={{ flexDirection: "row", backgroundColor: "red" }}>
					<View
						style={{
							flex: 1,
							alignItems: "flex-start"
						}}
					>
						<Button
							title="menu"
							onPress={() =>
								this.props.mynavigation.dispatch(
									DrawerActions.openDrawer()
								)
							}
						/>
					</View>
					<View
						style={{
							flex: 1,
							alignItems: "flex-end"
						}}
					>
						<Button title="Suono" onPress={() => playSound(idf)} />
					</View>
				</View>

				<View
					style={{
						minHeight: height
					}}
				>
				<View
					style={{
						position:"absolute",
						backgroundColor: "orange",
						top:0,
						left:0,
						bottom:0,
						right:0
					}}
				>
					<Image
						style={{
							flex: 1,
							resizeMode
						}}
						source={this.props.sfondo}
					/>
				</View>
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
				{/*
				<Button
					title="Prossima"
					onPress={() =>
						this.props.mynavigation.navigate("Capitolo2")
					}
				/>
				*/}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	imagemc: {
		alignSelf: "center",
		height: 150,
		width: 150,
		borderWidth: 1,
		borderRadius: 75
	},
	imagemr: {
		alignSelf: "flex-end",
		height: 150,
		width: 150,
		borderWidth: 1,
		borderRadius: 75
	},
	test: {
		backgroundColor: "#FF3366"
	},
	normale: {
		color: "green"
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
	}
});
