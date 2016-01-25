'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <View>
        <Text style={styles.bigText}>
        {this.props.main}
        </Text>
        <Text style={styles.mainText}>
        Current Conditions: {this.props.description}
        </Text>
        <Text style={styles.bigText}>
          {this.props.temp} &#8457;
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 10,
    color: '#ffffff',

  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF'
  },

});
