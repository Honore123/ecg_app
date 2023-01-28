import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import { Card, ListItem, Icon } from "@rneui/themed";
import { LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    ecg: state.ecg,
  };
};

const screenWidth = Dimensions.get("window").width - 68;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(37, 50, 64, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForLabels: {
    fontFamily: "Quicksand-Regular",
    fontSize: 10,
  },
};

class Data extends Component {
  render() {
    const { data } = this.props.ecg;
    let ecgData = new Array();
    let time = new Array();
    data.forEach((data) => {
      ecgData.push(data.data);
      time.push(data.recorded_time);
    });
    const chartData = {
      labels: time,
      datasets: [
        {
          data: ecgData,
          color: (opacity = 1) => `rgba(241, 58, 77, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.measurement}>Latest Measurements</Text>

        <Card containerStyle={styles.cardContainer}>
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>Blood Pressure</Text>
            <Text style={styles.lastTime} h1>
              Last updated 7 Hours ago
            </Text>
            <Card.Divider style={{ marginBottom: 20 }} />
          </View>

          <LineChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            withVerticalLines={false}
            withHorizontalLines={false}
            withDots={false}
            withHorizontalLabels={true}
            withShadow={false}
          />
        </Card>
        <Text style={styles.otherData}>Past Data</Text>
        <View>
          {data[0] ? (
            data.map((ecg, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={styles.ecgValue}>
                    {ecg.data}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.ecgDate}>
                    {ecg.recorded_time}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          ) : (
            <View style={{ alignItems: "center", marginTop: "50%", flex: 1 }}>
              <Icon name="emoji-sad" type="entypo" size={30} color="#9D9EA0" />
              <Text style={{ marginTop: 10, fontSize: 17, color: "#9D9EA0" }}>
                No sales yet!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Data);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EAF0F5",
    paddingHorizontal: 20,
  },
  measurement: {
    fontSize: 18,
    fontFamily: "Quicksand-SemiBold",
    color: "#253240",
    marginTop: 20,
  },
  cardContainer: {
    marginTop: 15,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#EAF0F5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  cardTitleContainer: {
    paddingLeft: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Quicksand-SemiBold",
    color: "#253240",
    marginBottom: 6,
  },
  lastTime: {
    fontFamily: "Quicksand-Regular",
    color: "#677484",
    marginBottom: 20,
  },
  otherData: {
    fontSize: 18,
    fontFamily: "Quicksand-SemiBold",
    color: "#253240",
    marginBottom: 15,
  },
  ecgValue: {
    fontSize: 15,
    fontFamily: "Quicksand-SemiBold",
    color: "#253240",
    marginBottom: 6,
  },
  ecgDate: {
    fontFamily: "Quicksand-Regular",
    color: "#677484",
  },
});
