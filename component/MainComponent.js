import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import { Icon } from "@rneui/themed";
import { connect } from "react-redux";
import { fetchData } from "../redux/ActionCreators";
import Dashboard from "./DashboardComponent";
import Data from "./DataComponent";
import Setting from "./SettingComponent";
import Login from "./LoginComponent";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchData: (token, userId) => dispatch(fetchData(token, userId)),
});
const Tab = createBottomTabNavigator();
let customFonts = {
  "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
};
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    if (this.props.auth.user) {
      const { token } = this.props.auth;
      const { id } = this.props.auth.user;

      this.props.fetchData(token, id);
    }
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    if (!this.state.fontsLoaded) {
      return null;
    }
    if (isAuthenticated) {
      return (
        <Tab.Navigator>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarLabelStyle: {
                fontFamily: "Quicksand-SemiBold",
              },
              tabBarIcon: ({ color }) => (
                <Icon name="home" type="ant-design" color={color} />
              ),
              tabBarActiveTintColor: "#00BFDE",
              tabBarInactiveTintColor: "#576F82",
              headerTitleStyle: {
                fontFamily: "Quicksand-SemiBold",
                color: "#253240",
              },
            }}
          />
          <Tab.Screen
            name="ECG Data"
            component={Data}
            options={{
              tabBarLabelStyle: {
                fontFamily: "Quicksand-SemiBold",
              },
              tabBarIcon: ({ color }) => (
                <Icon name="database" type="ant-design" color={color} />
              ),
              tabBarActiveTintColor: "#00BFDE",
              tabBarInactiveTintColor: "#576F82",
              headerTitleStyle: {
                fontFamily: "Quicksand-SemiBold",
                color: "#253240",
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Setting}
            options={{
              tabBarLabelStyle: {
                fontFamily: "Quicksand-SemiBold",
              },
              tabBarIcon: ({ color }) => (
                <Icon name="setting" type="ant-design" color={color} />
              ),
              tabBarActiveTintColor: "#00BFDE",
              tabBarInactiveTintColor: "#576F82",
              headerTitleStyle: {
                fontFamily: "Quicksand-SemiBold",
                color: "#253240",
              },
            }}
          />
        </Tab.Navigator>
      );
    }
    return <Login />;
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
});
