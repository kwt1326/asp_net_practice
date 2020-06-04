import React, { Component, Fragment } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.data.text,
      weather: [], // test call api
    }
  }

  componentDidMount() {
    this.setState({
      text: 'Client Loaded',
    })
    this.callApiWeather();
  }

  callApiWeather = async () => {
    await axios({
      method: 'GET',
      url: 'https://localhost:5001/WeatherForecast',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then(res => {
      console.log(res)
      this.setState({ weather: res.data })
    }).catch(err => {
      console.log(err)
    })
  }

  renderWeatherTable = () => {
    const { weather } = this.state;
    if (!!weather) {
      return (
        <table>
          <thead>
            <tr>
              <td style={{ padding: '10px' }}>
                Random Weather
              </td>
            </tr>
          </thead>
          <tbody>
            {
              weather.map(elem => {
                return (<tr>
                  <td style={{ padding: '10px' }}>{elem.date}</td>
                  <td style={{ padding: '10px' }}>{elem.summary}</td>
                  <td style={{ padding: '10px' }}>{elem.temperatureC}</td>
                  <td style={{ padding: '10px' }}>{elem.temperatureF}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.text}</h1>
        {
          this.state.weather
          && this.renderWeatherTable()
        }
      </div>
    );
  }
}

export default App;
