import React, { useState } from 'react'

export interface PHWDataType{
    temperature:number;
    temperatureUnits:string;
    precipitation:number;
    humidity:number;
    windSpeed:number;  
    icon:string
}

interface Props{
       data:PHWDataType   
}

export const TempPHW =({data}:Props) => {
    // console.log('Data comming as a Props from tempPHW Component', data)     
    const [weatherUnit,setWeatherUnit]=useState(1);

    return <div className='flex gap-10'>
                <div className=''>
                     <img src={`https://openweathermap.org/img/w/${data.icon}.png`}  alt='How is weather like' /> 
                </div>
               
                <div className='flex text-2xl'>
                    <span className='text-5xl font-bold'>{data.temperature}</span>
                    <span>{data.temperatureUnits}°</span>
                </div>
                <div className='flex-col'>
                    <span className='block'>{data.precipitation}</span>
                    <span  className='block'>{data.humidity}</span>
                    <span  className='block'>{data.windSpeed}mph</span>
                </div>
            </div>
   


}