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
import Images from '../Constants.js'

export default class Fiaba extends React.Component {

	render() {
		const idf = this.props.idf;
		const content = this.props.htmlContent;
		console.log('CONTENT');
		console.log(content);

		//const image_path = this.props.htmlContent.image_path;
		//console.log('IMAGE PATH');
		//console.log(this.props.htmlContent.pippo);
		//console.log(this.props.htmlContent.image_path);

		return (
			<ScrollView>
				<View style={{ flexDirection: "row", backgroundColor:'red' }}>
					<View
						style={{
							flex: 1,
							alignItems: "flex-start",
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
							alignItems: "flex-end",
						}}
					>
						<Button
							title="Suono"
							onPress={() => playSound(idf)}
						/>
					</View>
				</View>

				<View>
					{Object.keys(content).map(function(key){
						let classe = content[key].classe ? content[key].classe : "";
						if(content[key].type == 'image'){
							return	<Image style={styles[classe]} key={key}
								resizeMode="contain"
								source={content[key].value}
							/>
						}
						else if(content[key].type == 'text'){
							return <Text key={key} style={styles[classe]}>{content[key].value}</Text>						
						}
					})}

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
						source={image_path}
					/>
				
					<Text>Come la nostra nonnetta,</Text>
               				<Text>come la nostra vecchietta,</Text>
               				<Text>ama i suoi nipotini,</Text>
               				<Text>a tutti dà i bacini,</Text>
               				<Text>carezze dà sulle teste,</Text>
               				<Text>tutti i nipoti lei veste.</Text>
					*/}
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
	imagemc:{
		alignSelf: "center",
		height: 150,
		width: 150,
		borderWidth: 1,
		borderRadius: 75
	},
	imagemr:{
		alignSelf: "flex-end",
		height: 150,
		width: 150,
		borderWidth: 1,
		borderRadius: 75
	},
	test:{
		backgroundColor:"#FF3366"
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
