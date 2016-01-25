'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';
import Forecast from './components/Forecast';

export default class FirstProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      forecast: null
    };
  }
  _handleTextChange(e) {
    var zip = e.nativeEvent.text;
    const key = 'efd8435c31da6b49f6fc52ac1f7f01f7';
    this.setState({
      zip: zip
    });
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&units=imperial&APPID=' + key)
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        forecast: {
          main: responseJSON.weather[0].main,
          description:  responseJSON.weather[0].description,
          temp:  responseJSON.main.temp
        }
      })
      .catch(err => console.warn(err));
    });

  }
  render() {

    let content = this.state.forecast ? <Forecast
           main={this.state.forecast.main}
           description={this.state.forecast.description}
           temp={Math.round(this.state.forecast.temp)} /> : null

    return (
      <View style={styles.container}>
        <Image source={require('./ios/FirstProject/Images.xcassets/Image.imageset/cloudy.jpg')}
          resizeMode='cover'
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
              Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                 onSubmitEditing={(e) => this._handleTextChange(e)}
                  returnKeyType='go'
                  maxLength={5}
                  placeholder='5-digit zip'
                />
             </View>
           </View>
            {content}
         </View>
        </Image>
      </View>

    );
  }
}

const baseFontSize = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4D4D4D',
    marginTop: 20
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },

  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',

  },

  row: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
    justifyContent: 'center'
  },

  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginTop: 5,
    alignSelf: 'center',
    padding: 10

  },
  zipCode: {
    width: 150,
    height: baseFontSize,
    textAlign: 'center'
  },

  mainText: {
   flex: 1,
   fontSize: baseFontSize,
   color: '#FFFFFF'
 },

  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40
  },

});
