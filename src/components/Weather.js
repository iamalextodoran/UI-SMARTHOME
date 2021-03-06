import React, { Component } from 'react'
import '../styles/card.scss'
import 'moment-timezone';
import { connect } from "react-redux";
import { fetchUsers, createUser } from "../actions/usersActions";
import { fetchWeather } from "../actions/weatherActions";
class Weather extends Component {
  state = {
    weather: '',
    isLoaded: false,
  };

  componentDidMount() {
    this.props.users.user && this.props.fetchWeather(this.props.users.user.city);
    fetch(`https://api.weatherbit.io/v2.0/current?city=${ this.props.users.user ? this.props.users.user.city : 'Cluj-Napoca'}&key=d50c57c063ec458dab88e7a1c530219c`)
      .then(response => response.json())
      .then(data => this.setState({ weather: data.data[0], isLoaded: true }));
    }

  render() {
    return (
      <div className="card">
        {this.state.isLoaded ? 
        <React.Fragment>
                  <div className="layout-column layout-align-center-center">
          <h2>{this.state.weather.city_name}</h2>
          <p style={{ marginTop: "-25px" }}>{this.state.weather.country_code}</p>
        </div>
        <div className="layout-row layout-align-space-between-center" style={{ marginTop: "-70px" }}>
          <div className="layout-column layout-align-center-center">
            <img src={"https://www.weatherbit.io/static/img/icons/" + this.state.weather.weather.icon + ".png"} alt={this.state.weather.weather.description} width="80px" />
            <p style={{ marginTop: "-25px" }}>{this.state.weather.description}</p>
          </div>
          <div></div>
          <div className="layout-column layout-align-end-end">
            <h2 style={{ justifyContent: "end" }}><strong>{this.state.weather.temp} °C</strong></h2>
            <p style={{ marginTop: "-25px" }}>Feels like {this.state.weather.app_temp} °C</p>
          </div>
        </div>
        </React.Fragment> : <div className="layout-column layout-align-center-center"> <p>Loading</p></div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, { fetchUsers, createUser, fetchWeather })(Weather);