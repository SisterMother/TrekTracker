import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import $ from 'jquery'
import config from '../../../passport/config.json'
import dummyWeather from './dummyweather.jsx'
import {leanSevenDayForecastArray} from '../helpers/helpers.js';

class Weather extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      weatherForecast: null,
      leanWeatherForecast: null,
      weatherDetailOpen: false,
      anchorEl: null,
      dayIndexDetail: 0
    }
    this.leanSevenDayForecastArray = leanSevenDayForecastArray.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentDidMount() {
    //not using axios because we are getting CORS cross origin issues with weather API. Ajax doesn't have problem
    //call the weather api on long,lat
    var urlBuilder = `http://api.wunderground.com/api/`;
    urlBuilder += `${config.WUNDERGROUND_KEY}`;
    urlBuilder += `/forecast10day/q/`;
    urlBuilder += `${this.props.latitude},`;
    urlBuilder += `${this.props.longitude}.json`
    var thisComponent = this;
    $.ajax({
      url: urlBuilder,
      method: 'GET',
      success: function(data) {
        console.log(data);
        //weatherForecast contains all detail about upcoming weather
        thisComponent.setState({weatherForecast: data.forecast});
        //Construct a more compact data structure containing only the weather info we care about
        thisComponent.leanSevenDayForecastArray(data.forecast)
          .then((leanWeatherArray) =>{
            console.log('leanWeatherArray has been stored in Weather state ', thisComponent.state.leanWeatherForecast);
          })
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  clickDayWeather(event, dayIndex) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      weatherDetailOpen: true,
      anchorEl: event.currentTarget,
      dayIndexDetail: dayIndex
    });
  }
  handleRequestClose() {
    this.setState({
      weatherDetailOpen: false,
    });
  }

  render () {
    var element = this.state.leanWeatherForecast === null ? (<div></div>) :
      (<div className='rootWeather'>
        <GridList className='gridListWeather' cellHeight={100} cols={this.state.leanWeatherForecast.length}>
          {this.state.leanWeatherForecast.map((tile, index) => (
            <GridTile
              key={tile.title}
              title={tile.title}
              subtitle={tile.subtitle}
              actionIcon={
                <IconButton onClick={(event) => {this.clickDayWeather(event, index)}}>
                  <NavigationExpandMore color="rgb(0, 188, 212)" />
                </IconButton>}
              className='titleStyleWeather'
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img src={tile.img} />
              <div>{' '}</div>
            </GridTile>
          ))}
        </GridList>
        <Popover
          open={this.state.weatherDetailOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <Paper className='weatherDetailPopup' zDepth={5}>
              <div>
                <img src={this.state.leanWeatherForecast[this.state.dayIndexDetail].dayImage}/>
                <div>
                  {`${this.state.leanWeatherForecast[this.state.dayIndexDetail].dayName}: 
                   ${this.state.leanWeatherForecast[this.state.dayIndexDetail].daySummary}`}
                </div>
                <div>
                  {`Sunrise: ${this.state.leanWeatherForecast[this.state.dayIndexDetail].sunrise}`}
                </div>
              </div>
              <div>
                <img src={this.state.leanWeatherForecast[this.state.dayIndexDetail].nightImage}/>
                <div>
                  {`${this.state.leanWeatherForecast[this.state.dayIndexDetail].nightName}: 
                   ${this.state.leanWeatherForecast[this.state.dayIndexDetail].nightSummary}`}
                </div>
                <div>
                  {`Sunset: ${this.state.leanWeatherForecast[this.state.dayIndexDetail].sunset}`}
                </div>
              </div>
            </Paper>
          </Menu>
        </Popover>
        <div>
          <img className='wundergroundimg' src={'https://icons.wxug.com/logos/JPG/wundergroundLogo_4c_horz.jpg'} width="10%" height="10%"/>
          <a className = 'wundergroundimg' href='https://sunrise-sunset.org/api'>Sunrise Sunset API</a>
        </div>
      </div>);
    return (
      element
    );
  }
}

export default Weather;