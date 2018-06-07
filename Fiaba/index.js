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
import {
  DrawerNavigator,
  DrawerActions
} from "react-navigation";

function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name == "img") {
    const a = node.attribs;
    const { src, height, width } = node.attribs;
    const imageHeight = height || 300;
    return (
      <View key={index}>
        <Image
          style={{
            width: width * PixelRatio.get(),
            height: imageHeight * PixelRatio.get()
          }}
          source={require("../foto.jpg")}
        />
      </View>
    );
  }
}


export default class Fiaba extends React.Component {

	static navigationOptions = {
		drawerLabel: "Capitolo 1",
		drawerIcon: ({ tintColor }) => (
			<Image
				source={require("../foto.jpg")}
				style={[styles.icon, { tintColor: tintColor }]}
			/>
		)
	};

	render() {
		const idf = this.props.idf;
		const htmlContent = this.props.htmlContent; 

		return (
			<ScrollView>
				<Button
					title="menu"
					onPress={() =>
						this.props.mynavigation.dispatch(
							DrawerActions.openDrawer()
						)
					}
				/>
				<Button title="Suono" onPress={() => playSound(idf)} />
				<HTMLView
					value={htmlContent}
					renderNode={renderNode}
					stylesheet={styles}
				/>
				<Button
					title="Prossima"
					onPress={() =>
						this.props.mynavigation.navigate("Capitolo2")
					}
				/>
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
  },
})
