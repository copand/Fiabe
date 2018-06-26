import React from "react";
import HTMLView from "react-native-htmlview";
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
import Images from '../Constants.js'

function renderNode(node, index, siblings, parent, defaultRenderer) {
	if (node.name == "img") {
		const a = node.attribs;
		const { src, height, width } = node.attribs;
		console.log("test img");
		console.log(Images);
		console.log(Images[src]);
		//src= String(".."+src);
		const imageHeight = height || 300;
		return (
			<View key={index}>
				<Image
					style={{
						width: width * PixelRatio.get(),
						height: imageHeight * PixelRatio.get()
					}}
					source={Images[src]}
				/>
			</View>
		);
	}
}

export default class Fiaba extends React.Component {
	static navigationOptions = {
	};

	render() {
		const idf = this.props.idf;
		const htmlContent = this.props.htmlContent;

		return (
			<ScrollView>
				<View style={{ flexDirection: "row" }}>
					<View
						style={{
							flex: 1,
							alignItems: "flex-start",
							flexDirection: "row"
						}}
					>
						<Button
							style={{ width: "50%" }}
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
							alignItems: "flex-end",
							flexDirection: "row"
						}}
					>
						<Button
							style={{ width: "50%" }}
							title="Suono"
							onPress={() => playSound(idf)}
						/>
					</View>
				</View>
				{/*
					<Image
						resizeMode="contain"
						style={{
							alignSelf: "center",
							height: 150,
							width: 150,
							borderWidth: 1,
							borderRadius: 75
						}}
						source={require("../comelanostranonnetta.png")}
					/>
				*/}
				<HTMLView
					value={htmlContent}
					renderNode={renderNode}
					stylesheet={styles}
				/>
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
	icon: {
		width: 24,
		height: 24
	},
	a: {
		fontWeight: "300",
		color: "#FF3366" // make links coloured pink
	}
});
