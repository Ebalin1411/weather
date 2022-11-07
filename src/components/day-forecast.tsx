import React from 'react';

export interface DayForecastDataType{
   day:string;
   icon:string;
   maxTemp:number;
   minTemp:number;
   

}
interface Props{
    dayForecastData:DayForecastDataType
}

export const DayForecast=({dayForecastData}:Props)=>{
   // console.log('Data comming as a Props from dayForecastData Component', dayForecastData)
    return (
        <div>
            <div className='flex-col text-center gap-1  text-white hover:bg-gray-900 rounded-md'>
                <div>
                    <span className='font-bold'>{dayForecastData.day}</span>
                </div>            
                <div>
                    <img src={`https://openweathermap.org/img/w/${dayForecastData.icon}.png`}  alt='How is weather like' />
                </div>            
                <div className="flex justify-evenly text-xs">
                    <span>{dayForecastData.maxTemp}°</span>
                    <span>{dayForecastData.minTemp}°</span>
                </div>
             </div>

        </div>
        
        
    )

}