import { useState } from "react";
import { TempChart, TempChartDataType } from "./temp-chart";

interface ChartProps{
    tempChartData:TempChartDataType
}

export const TabTPW=(props:ChartProps)=>{

    const [openTab,setOpenTab]=useState(1);

    return (

            <div  className="container ">  
                <div className="flex flex-col items-center m-8 p-8 justify-center  ">
                    <ul className="flex space-x-2">
                        <li>
                            <a
                                href="#temperature"
                                onClick={() => setOpenTab(1)}
                                className="inline-block px-4 py-2 text-white text-xl"
                            >
                                Temperature
                            </a>
                        </li>
                        <li>
                            <a
                                href="#preciptation"
                                onClick={() => setOpenTab(2)}
                                className="inline-block px-4 py-2 text-white  text-xl"
                            >
                                Preciptation
                            </a>
                        </li>
                        <li>
                            <a
                                href="#wind"
                                onClick={() => setOpenTab(3)}
                                className="inline-block px-4 py-2 text-white text-xl "
                            >
                               Wind
                            </a>
                        </li>
                    </ul>
                    <div className="text-white ">
                        <div className={openTab === 1 ? "block" : "hidden"}>                            
                            
                            <TempChart dayForecastData={props.tempChartData} />  
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"}>
                             show Precipitation Chart
                        </div>
                        <div className={openTab === 3 ? "block" : "hidden"}>
                           Show Wind Chart
                        </div>
                    </div>

                </div>
            </div>
     
    )

}