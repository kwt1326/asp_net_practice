import React, { Component, Fragment } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.data.text,
      weather: [], // test call api
      testImg: null,
    }

    this.inputfile = React.createRef();
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
      url: 'http://localhost:5000/WeatherForecast',
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

  callApiPingPost = async () => {
    const formData = new FormData();
    console.log(this.inputfile.files[0]);
    formData.append("File", this.inputfile.files[0]);
    await axios({
      method: 'POST',
      url: 'http://localhost:5000/Test/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      withCredentials: true,
    }).then(res => {
      console.log(res)
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
        <button onClick={() => { this.callApiPingPost() }}>TEST PING</button>
        <input ref={(mount) => { this.inputfile = mount }} type='file' />
      </div>
    );
  }
}

export default App;
