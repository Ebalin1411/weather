import React, { useState, useEffect} from 'react'
import { Line } from "react-chartjs-2";
import './App.css';
import {FaSearchLocation} from 'react-icons/fa'
import axios from 'axios'

import { getWeatherDetails, WeatherDayDetail } from './weatherAPIservice';
import { TempPHW } from './components/temp-PHW';
import { LocationSummary} from './components/location-summary';
import { DayForecast } from './components/day-forecast';
import { TempChart, TempChartDataType } from './components/temp-chart';
import { TabTPW } from './components/tabTPW';
import dayjs from 'dayjs';



function App() {
  //State Information
  const [locationName ,setLocation]= useState<string>('Chennai');   
  const [weatherRecords,setWeatherInfo] =useState<WeatherDayDetail>(); 
  const [weekForecastData,setWeekForecastData]=useState<Record<string,any>>();  
  
  const  getWeatherRecords = async()=>{   
        try{

             
              const postUrl =await  getWeatherDetails(locationName).then(
                (weatherInfo:any)=>{                  
                    const currentDay = dayjs().format('ddd');
                    setWeatherInfo(weatherInfo.weekForecastObj[currentDay][0]);              
                    setWeekForecastData(weatherInfo.weekForecastObj) 
                   
                  });
                }catch(error){
                  console.log(error)
                  alert('Weather Record Not Found')
                  window.location.reload();
                }

               }

    const onDayForecastClick=(dayName:string)=>{
      const chartYaxisData =[];
      if(weekForecastData){
        setWeatherInfo(weekForecastData[dayName][0]);       
        const chartYaxisData:number[]=[];
        for(var i=0; i<weekForecastData[dayName].length-1; i++ ){          
           
          chartYaxisData.push(weekForecastData[dayName][0].phwData.temperature)
        
        }
        
       
      }
     
    };
    let timeForChartData = []
    let temparatureForChartData = []
    if (weatherRecords && weekForecastData){      
        const selectedDay =weatherRecords.dayForecastData.day;
        console.log('selected Day:::::',selectedDay);

           timeForChartData = weekForecastData[selectedDay].map(
          (tempElement:WeatherDayDetail)=>dayjs(tempElement.locTime.dateTimeInEpoch*1000).format('hh:mm A'));

          temparatureForChartData = weekForecastData[selectedDay].map(
            (tempElement:WeatherDayDetail)=>tempElement.dayForecastData.maxTemp);

        console.log('selected Day Temp List for Chart:::::',temparatureForChartData)
        console.log('selected Day Time List for Chart:::::',timeForChartData  )

    }

  return (
    <div className="container min-h-screen bg-black align items-center relative">

      {/* inputbox code starts here */}
            <div>
                <input type='text' 
                      onChange={e=>setLocation(e.target.value)}
                      value = {locationName}
                      className ="border-2 border-gray-300 bg-white h-10 w-full  rounded-full text-xl focus:outline-none"
                      placeholder="Enter Location">
                </input>
                <button className="absolute item-center right-0 top-3  mr-3 cursor-pointer " onClick={getWeatherRecords}> <FaSearchLocation/> </button>
            </div> 
             

          {/* Top left div and Right Div code starts here */}
            <div className="result">
                  <div className='flex justify-evenly text-white'> 
                          
                          <div className='flex justify-evenly'>
                          {weatherRecords && weatherRecords.phwData &&(
                             <TempPHW
                             data={weatherRecords.phwData }/>
                             ) }         
                          </div>
                          <div className='flex justify-evenly'>                           
                              
                           {weatherRecords && weatherRecords.locTime && (
                               <LocationSummary
                           locdata={weatherRecords.locTime}/>
                           ) }                
                          </div>
                      

            </div>
             {/* Chart Section  */}
             
              <div>
                    
                     <TabTPW tempChartData={{
                            dayTime:timeForChartData,
                            dayTemperature:temparatureForChartData,
                     }} />   
              </div>  
            {/* Day Forecast bottom div */}
             
              { weekForecastData &&(           
                  <div className='flex justify-evenly'>
                    {Object.keys(weekForecastData).map((dayName:string)=>(     
                        <div  key={dayName} onClick={()=>onDayForecastClick(dayName)}>
                          <DayForecast
                              dayForecastData={weekForecastData[dayName][0].dayForecastData} /> 
                              

                        </div>                
                      
                      ))}                  
                   
                  </div>
                 
              )}
            </div>

       

    </div>
    
  );
  
}

export default App;
