import {
  Dimensions
} from "react-native";

export default {
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  sectionHeadingStyle1: {
    backgroundColor: '#F7931E',
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 15,
    height: Dimensions.get("window").height / 4.2,
  },
  sectionHeadingStyle2: {
    backgroundColor: '#30AEE2',
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 15,
    height: Dimensions.get("window").height / 4.1,
  },
  sectionHeadingStyle3: {
    backgroundColor: '#F7CF0B',
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 15,
    height: Dimensions.get("window").height / 4.1,
  },
  sectionHeadingStyle4: {
    backgroundColor: '#D31DD8',
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 15,
    height: Dimensions.get("window").height / 4.2,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  active: {
    fontSize:20,
    color: 'black'
  },
  inactive: {
    fontSize:20,
    color: 'white'
  },
  activeIcon: {
    color: 'black',
    marginRight:10
  },
  inactiveIcon: {
    color: 'white',
    marginRight:10
  },
};