import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { Switch, Input, Button } from "@rneui/themed";
import { connect } from "react-redux";
import { logoutUser } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (token) => dispatch(logoutUser(token)),
});

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  setChecked = (value) => {
    this.setState({ checked: value });
  };
  handleChangePassword = () => {
    const { currentPassword, newPassword } = this.state;
    console.log(currentPassword);
  };
  handleLogout = () => {
    const { token } = this.props.auth;
    this.props.logoutUser(token);
  };
  render() {
    const { checked } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.changeVisibility}>
          <Text style={styles.subTitle}>Data Visibility</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={checked}
              color="#00BFDE"
              onValueChange={(value) => this.setChecked(value)}
            />
          </View>
        </View>
        <View style={styles.changePasswordContainer}>
          <Text style={styles.changePasswordTitle}>Change Password</Text>
          <Input
            placeholder="Current Password"
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={true}
            value={this.state.currentPassword}
            onChangeText={(current) =>
              this.setState({ currentPassword: current })
            }
          />
          <Input
            placeholder="New Password"
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={true}
            value={this.state.newPassword}
            onChangeText={(newPass) => this.setState({ newPassword: newPass })}
          />
          <Input
            placeholder="Confirm Password"
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirm) =>
              this.setState({ confirmPassword: confirm })
            }
          />
          <Button
            title="Update"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.btnTitleStyle}
            onPress={() => this.handleChangePassword()}
          />
        </View>
        <Button
          title="Logout"
          type="transparent"
          buttonStyle={styles.buttonStyleLog}
          titleStyle={styles.btnTitleStyleLog}
          onPress={() => this.handleLogout()}
        />
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
  container: { backgroundColor: "#EAF0F5" },
  changePasswordContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  changeVisibility: {
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  switchContainer: {
    flex: 1,
  },
  subTitle: {
    flex: 1,
    paddingTop: 10,
    fontFamily: "Quicksand-SemiBold",
    color: "#576F82",
    fontSize: 15,
  },
  changePasswordTitle: {
    marginLeft: 20,
    marginBottom: 20,
    fontFamily: "Quicksand-SemiBold",
    color: "#576F82",
    fontSize: 15,
  },
  inputContainerStyle: {
    borderStyle: "solid",
    borderColor: "#EAF0F5",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingLeft: 10,
  },
  inputStyle: {
    fontFamily: "Quicksand-Regular",
    color: "#576F82",
    fontSize: 16,
  },
  buttonStyle: {
    height: 50,
    backgroundColor: "#00BFDE",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  buttonStyleLog: {
    height: 50,
    borderWidth: 1,
    borderColor: "#00BFDE",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 70,
  },
  btnTitleStyle: {
    color: "#fff",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
  },
  btnTitleStyleLog: {
    color: "#00BFDE",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
  },
});
