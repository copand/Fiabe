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
	SectionList,
	Switch,
	Platform,
	Alert
} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import * as RNIap from "react-native-iap";
import { AsyncStorage } from "react-native";
import { DrawerNavigator, DrawerActions } from "react-navigation";

var pagato = false;

const { width, height } = Dimensions.get("window");

const itemSkus = Platform.select({
	ios: ["capitoli_tutti"],
	android: ["capitoli_tutti"]
});

export default class MyHomeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			productList: [],
			receipt: "",
			ricevuta: false,
			availableItemsMessage: "",
			switchValue: false
		};
	}

	componentWillMount() {
		//vale solo per android
		RNIap.endConnection();
	}

	componentWillUpdate(prevProps, prevState) {
		// only update chart if the data has changed
		//console.log("componentWillUpdate di INDICE");
		//console.log(prevProps);
		//console.log(prevState);
	}

	async componentDidMount() {
		try {
			//per i test x rimuovere ricevuta su localstorage
			//await AsyncStorage.removeItem('ricevuta');

			await AsyncStorage.getItem("ricevuta").then(value => {
				//'inapp:it.netkomgroup.fiabe:'
				var regex1 = RegExp("^inapp:it.netkomgroup.fiabe:*.");
				console.log("testo la regexp ", regex1.test(value));
				if (regex1.test(value)) {
					this.setState({ ricevuta: "ok" });
				}
			});
			console.log("aspetto  asyncstorage, valore " + this.state.ricevuta);
			if (this.state.ricevuta != "ok") {
				const result = await RNIap.prepare();
				console.log("result", result);
				const products = await RNIap.getProducts(itemSkus);
				this.setState({ productList: products });
				//this.setState({ items });
				console.log("products", products);
				//OCCHIO lo commento in debug  ma in produzione potrebbe servire per recuperare lo storico
				this.getAvailablePurchases();
				//this.getPurchaseHistory();
			}
		} catch (err) {
			console.warn(err.code, err.message);
		}
	}

	goToNext = () => {
		this.props.navigation.navigate("Second", {
			receipt: this.state.receipt
		});
	};

	getItems = async () => {
		try {
			const products = await RNIap.getProducts(itemSkus);
			console.log("Products", products);
			this.setState({ productList: products });
		} catch (err) {
			console.warn(err.code, err.message);
		}
	};

	buyItem = async sku => {
		try {
			console.info("buyItem: " + sku);
			// const purchase = await RNIap.buyProduct(sku);
			const purchase = await RNIap.buyProductWithoutFinishTransaction(
				sku
			);
			this.setState({ receipt: purchase.transactionReceipt });
			console.info("purchase", purchase);
			/*
			try {
				await AsyncStorage.setItem(
					"ricevuta",
					purchase.transactionReceipt
				);
			} catch (error) {
				// Error saving data
				console.log("Errore storare ricevuta ", errore);
			}
			*/
		} catch (err) {
			console.warn(err.code, err.message);
			console.log("errore nel pagamento", err.message);
			Alert.alert(err.message);
		}
	};

	buyItemOrig = async sku => {
		try {
			console.info("buyItemOrig: " + sku);
			// const purchase = await RNIap.buyProduct(sku);
			const purchase = await RNIap.buyProduct(sku);
			console.info(purchase);
			this.setState({ receipt: purchase.transactionReceipt });
			if (purchase.transactionReceipt) {
				try {
					await AsyncStorage.setItem(
						"ricevuta",
						purchase.transactionReceipt
					);
				} catch (error) {
					// Error saving data
					console.log("Errore storare ricevuta ", errore);
				}
				console.log("settiamo state.ricevuta a ok dentro buyItem");
				this.setState({ ricevuta: "ok" });
				pagato = true;
				if (Platform.OS === "android") return;
				RNIap.finishTransaction();
				console.log("chiamata finish transaction, vale solo per apple");
			}
		} catch (err) {
			console.warn(err.code, err.message);
			Alert.alert(err.message);
		}
	};

	buySubscribeItem = async sku => {
		try {
			console.log("buySubscribeItem: " + sku);
			const purchase = await RNIap.buySubscription(sku);
			console.info(purchase);
			this.setState({ receipt: purchase.transactionReceipt }, () =>
				this.goToNext()
			);
		} catch (err) {
			console.warn(err.code, err.message);
			Alert.alert(err.message);
		}
	};

	getPurchaseHistory = async () => {
		try {
			const purchased = await RNIap.getPurchaseHistory();
			console.info("Purchased :: ", purchased);
		} catch (err) {
			console.log("Errore su purchased", err);
		}
	};

	getAvailablePurchases = async () => {
		try {
			console.info(
				"Get available purchases (non-consumable or unconsumed consumable)"
			);
			const purchases = await RNIap.getAvailablePurchases();
			console.info("Available purchases :: ", purchases);
			if (purchases && purchases.length > 0) {
				try {
					await AsyncStorage.setItem(
						"ricevuta",
						purchases[0].transactionReceipt
					);
				} catch (error) {
					// Error saving data
					console.log("Errore storare ricevuta ", error);
				}

				pagato = true;
				console.log(
					"settiamo state.ricevuta a ok dentro getAvaiPurchases"
				);
				this.setState({
					availableItemsMessage: `Got ${purchases.length} items.`,
					receipt: purchases[0].transactionReceipt,
					ricevuta: "ok"
				});
			}
		} catch (err) {
			console.warn(err.code, err.message);
			Alert.alert(err.message);
		}
	};

	onPress = fiaba => {
		console.log("vado al capitolo " + fiaba);
		this.props.capitolo(fiaba);
		//console.log(this.props.navigation);
		//this.props.navigation.navigate("Fiabe",{fiabe: fiaba})
		//console.log('finito');
	};

	onPressBlock = fiaba => {
			Alert.alert("Contenuti bloccati","Sblocca tutte le 60 filastrocche col pusante stella!");
	};

	playAll = () => {
		this.props.capitolo(-1);
		//console.log(this.props.navigation);
		//this.props.navigation.navigate("Fiabe",{fiabe: fiaba})
		//console.log('finito');
	};

	toggleSwitch = value => {
		console.log("Switch is: " + value);
		this.setState({ switchValue: value });
		if (value == true) {
			//playSound(-1);
			this.props.capitolo(-1);
		} else if (value == false) {
			playSound(-1);
		}
	};

	render() {
		const { productList, receipt, availableItemsMessage } = this.state;
		const receipt100 = receipt.substring(0, 100);
		const playing = this.props.isLoopPlaying;

		//facciamo 2 view: gratis/pagato
		console.log("sono in render");
		console.log("ricevuta", this.state.ricevuta);

		if (!this.state.ricevuta)
			return (
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						minHeight: height,
					}}
				>
					<ImageBackground
						resizeMode={"stretch"} // or cover
						style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
						source={require("../Images/bg_01.jpg")}
					>
						<View style={{ flexDirection: "row", zIndex: 10000 }}>
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
											color: "gray",
											marginLeft: 10,
											marginTop: 10
										}}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.containerTot}>
							<View style={styles.containerCapDemo}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPress(100)}
								>
									<Text style={styles.grande}>
										Capitolo dimostrativo
									</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.container}>
								<TouchableOpacity
									//onPress={() =>
									//	this.buyItemOrig("android.test.purchased")
									//}
									onPress={() =>
										this.buyItemOrig("capitoli_tutti")
									}
								>
									<View style={styles.button1}>
										<Icon
											style={{}}
											name="star"
											size={40}
											color="gold"
										/>
										<Text style={styles.bottoneStella}>
											Sblocca tutte le 60 filastrocche!
										</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.containerCap1}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPressBlock(1)}
								>
									<Text style={styles.grande}>
										Persone e famiglia
									</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.containerCap2}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPressBlock(2)}
								>
									<Text style={styles.grande}>Animali</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.containerCap3}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPressBlock(3)}
								>
									<Text style={styles.grande}>
										Giochi da cortile, conti e ricami
									</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.containerCap4}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPressBlock(4)}
								>
									<Text style={styles.grande}>
										Buona notte, baiu bai
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.containerCap5}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPressBlock(5)}
								>
									<Text style={styles.grande}>
										Le stagioni
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.containerCap6}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPressBlock(6)}
								>
									<Text style={styles.grande}>Frottole</Text>
								</TouchableOpacity>
							</View>
							
						</View>

							
					</ImageBackground>
				</View>
			);
		else
			return (
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						minHeight: height
					}}
				>
					<ImageBackground
						resizeMode={"stretch"} // or cover
						style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
						source={require("../Images/bg_01.jpg")}
					>
						<View style={{ flexDirection: "row", zIndex: 10000 }}>
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
											color: "gray",
											marginLeft: 10,
											marginTop: 10
										}}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.containerTot}>
						<View style={styles.containerCap1}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPress(1)}
								>
									<Text style={styles.grande}>
										Persone e famiglia
									</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.containerCap2}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPress(2)}
								>
									<Text style={styles.grande}>Animali</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.containerCap3}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPress(3)}
								>
									<Text style={styles.grande}>
										Giochi da cortile, conti e ricami
									</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.containerCap4}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPress(4)}
								>
									<Text style={styles.grande}>
										Buona notte, baiu bai
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.containerCap5}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPress(5)}
								>
									<Text style={styles.grande}>
										Le stagioni
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.containerCap6}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.onPress(6)}
								>
									<Text style={styles.grande}>Frottole</Text>
								</TouchableOpacity>
							</View>
	
						</View>

						<View style={styles.audio}>
							<TouchableOpacity
								onPress={() =>
									this.props.navigation.navigate("LoopMp3")
								}
							>
								<View style={styles.button1}>
									{!playing && (
										<Icon
											name="volume-up"
											size={40}
											style={{
												color: "gray",
												marginRight: 10,
												marginTop: 10
											}}
										/>
									)}
									{playing && (
										<Icon
											name="volume-off"
											size={40}
											style={{
												color: "gray",
												marginRight: 10,
												marginTop: 10
											}}
										/>
									)}
									<Text style={{ flex: 1 }}>
										Ascolta tutte le fiabe
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				</View>
			);
	}
}

const styles = StyleSheet.create({
	switch: {
		flex: 1,
		alignItems: "center",
		marginTop: 100
	},
	paga: {
		flex: 1,
		position: "absolute",
		bottom: 100,
		width: "100%"
	},
	audio: {
		flex: 1,
		position: "absolute",
		bottom: 30,
		width: "100%"
	},
	button1: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	container: {
		marginTop: 10
	},
	containerCap1: {
		backgroundColor:'red',
		marginTop: 10,
		width:'90%',
		padding:10,
		borderRadius:10,
		justifyContent: "center",
		alignItems: "center"
	},
	containerCap2: {
		backgroundColor:'orange',
		marginTop: 10,
		width:'90%',
		padding:10,
		borderRadius:10,
		justifyContent: "center",
		alignItems: "center"
	},
	containerCap3: {
		backgroundColor:'#CCCC00',
		marginTop: 10,
		width:'90%',
		padding:10,
		borderRadius:10,
		justifyContent: "center",
		alignItems: "center"
	},
	containerCap4: {
		backgroundColor:'green',
		marginTop: 10,
		width:'90%',
		padding:10,
		borderRadius:10,
		justifyContent: "center",
		alignItems: "center"
	},
	containerCap5: {
		backgroundColor:'blue',
		marginTop: 10,
		width:'90%',
		padding:10,
		borderRadius:10,
		justifyContent: "center",
		alignItems: "center"
	},
	containerCap6: {
		backgroundColor:'purple',
		marginTop: 10,
		width:'90%',
		padding:10,
		borderRadius:10,
		justifyContent: "center",
		alignItems: "center"
	},
	containerCapDemo: {
		backgroundColor:'brown',
		marginTop: 10,
		width:'90%',
		padding:10,
		borderRadius:10,
		justifyContent: "center",
		alignItems: "center"
	},
	containerTot: {
		marginTop: 10,
		marginLeft: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	container1: {
		marginTop: 10,
	},
	icon: {
		width: 24,
		height: 24
	},
	grande: {
		fontSize: 25,
		color:'#ffffff'
	},
	bottoneStella: {
		fontSize: 20,
		color:'black'
	},
	piccolo: {}
});
