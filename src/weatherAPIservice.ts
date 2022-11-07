import * as React from 'react';
import axios from 'axios'
import dayjs from  'dayjs'
import { PHWDataType } from './components/temp-PHW'
import{LocationSummaryType} from './components/location-summary'
import { DayForecastDataType } from './components/day-forecast';


const APIKey = 'd3835c83bcca0d1188350ce17234e7cf'

export interface WeatherDayDetail{
    phwData: PHWDataType,
    dayForecastData:DayForecastDataType,
    locTime:LocationSummaryType,
    //tempChartData:TempChartDataType
  }

export const getWeatherDetails=async(location:string)=>{
   const baseUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKey}&units=metric`
   return await  axios.post(baseUrl).then(resp=>{
      const locationDetails = resp.data.city //To get City details       

        //Restructure the forecast data to a key value object
      const weekForecastObj=  resp.data.list.reduce(
        (acc:any,weatherItem:any)=>{         
          console.log('Weather Item',weatherItem)
              const currentWeather: WeatherDayDetail  = {

                      phwData:{
                          temperature:Math.round(weatherItem.main.temp) ,                
                          temperatureUnits:'C',
                          precipitation:weatherItem.main.pressure,  
                          humidity:weatherItem.main.humidity,  
                          windSpeed:weatherItem.wind.speed,  
                          icon:weatherItem.weather[0].icon
                         // icon:'50d'              
                      },
                      dayForecastData:{
                          day:dayjs(weatherItem.dt*1000).format('ddd'),
                          icon:weatherItem.weather[0].icon,              
                          maxTemp:Math.round(weatherItem.main.temp_max),
                          minTemp:Math.round(weatherItem.main.temp_min),              
                      },
                      locTime:{
                        city:locationDetails.name,
                        country:locationDetails.country,
                        weatherDescription:weatherItem.weather[0].main,
                        currentTime:dayjs(weatherItem.dt*1000).format('dddd,HH:mm A'),
                        dateTimeInEpoch:weatherItem.dt
                    }
                  }; 
                  
       
                  
                 
                  const day = dayjs(weatherItem.dt*1000).format('ddd')
                      if(day in acc){
                        acc[day].push(currentWeather)

                      }else{
                          acc[day]=[currentWeather]
                      }
                          console.log('weekForecast Data::',day)
                          return acc
                  },{})
                
               
                   console.log('weekForecast Data::',weekForecastObj)
                  
      return{
        
        weekForecastObj, 
      
      } 
    
  });
 
};