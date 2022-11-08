
import { Line } from "react-chartjs-2";
import{Chart as ChartJS,LineElement}from 'chart.js'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

ChartJS.register(
    LineElement 
)

export interface TempChartDataType{
   
    dayTime:string[];     //For Label
    dayTemperature:number[];     //For Dataset Data
 
 }

 interface Props{
     dayForecastData:TempChartDataType
 }
 


 export const TempChart=({dayForecastData}:Props)=>{
    const data={
        labels:dayForecastData.dayTime,     
        datasets:[{
            label: 'Data Temp',
            data:dayForecastData.dayTemperature,
            fill: true,
            borderColor: 'yellow',
            tension: 0.1
        }]
    
    }
   
    const option ={
        responsive: true,
        maintainAspectRatio:false,
        scales:{
            y:{
                beginAtZero:true
            }       
        },
      
    }
   return (
    <div className='text-white box-border h-80   p-4 m-4 border-2'>
        <h1>Temperature Chart</h1>
        <Line 
         height={100}
         width={900}
         data={data}
         options={option}
         />
    </div>
   )
   
}
