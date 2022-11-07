import React from 'react';


export interface LocationSummaryType{
    city:string,
    country:string,
    weatherDescription:string
    currentTime:string
    dateTimeInEpoch:number
}

interface Props{
    locdata:LocationSummaryType
}


export const LocationSummary = ({locdata}:Props) => {
   // console.log('Data comming as a Props from LocationSummary Component', locdata)   

    return  <div className='flex flex-col'>
                <div className='flex gap-2 text-2xl'>
                    <span>{locdata.city}</span>
                    <span>{locdata.country}</span>
                </div>
                <div className='flex flex-col'>
                    <span>{locdata.currentTime}</span>
                    <span>{locdata.weatherDescription}</span>   
                </div>
            </div>

}