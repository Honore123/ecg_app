import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { loginUser } from "../redux/ActionCreators";
import { Input, Button } from "@rneui/themed";

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleLogin = () => {
    const { email, password } = this.state;
    this.props.loginUser({ email, password });
  };
  render() {
    const { isLoading } = this.props.auth;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome to ECG Monitoring App</Text>
          <Text style={styles.headerTitle}>LOGIN</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            textContentType="emailAddress"
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <Input
            placeholder="Password"
            textContentType="password"
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          {isLoading ? (
            <Button
              title="Login"
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.btnTitleStyle}
              loading
            />
          ) : (
            <Button
              title="Login"
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.btnTitleStyle}
              onPress={() => this.handleLogin()}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginTop: 20,
    paddingBottom: 70,
    backgroundColor: "#FFFFFF",
  },
  welcomeText: {
    fontSize: 20,
    color: "#576F82",
    fontFamily: "Quicksand-SemiBold",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  headerTitle: {
    marginTop: 20,
    fontSize: 20,
    color: "#576F82",
    fontFamily: "Quicksand-Regular",
  },
  inputContainer: {
    marginTop: 20,
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
  btnTitleStyle: {
    color: "#fff",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
