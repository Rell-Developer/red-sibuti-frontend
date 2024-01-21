import * as echarts from 'echarts';
import { useEffect, useState } from "react";
import Spinner from "../../public/Spinner.jsx";
import clienteAxios from "../../../config/axios.jsx";

const StadisticCard = ({data}) => {
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        createGraph({
            nodeId: data.nodeId,
            route: data.route
        });
    },[])

    const createGraph = async(dash) => {        
        var chartDom = document.querySelector(`#${dash.nodeId}`);
        console.log(chartDom);
        console.log(chartDom && !chartDom.getAttribute("_echarts_instance_"));

        if (chartDom && !chartDom.getAttribute("_echarts_instance_")) {
            // console.log("paso");
            var myChart = echarts.init(chartDom);
            var option;

            // const { data } = await clienteAxios("/get-employments-count-by-status");
            const { data } = await clienteAxios(dash.route);
            // console.log(data);
            if (data.result) {
                console.log(data.result);
                option = {
                    title: {
                        text: '',
                        subtext: '',
                        left: "center"
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     left: 'left'
                    // },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '60%',
                            data: data.result || [],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
        
                option && myChart.setOption(option);
                setLoading(false);
            }
            return
    
        }
    }

    return (
        <div className="p-6 m-3 bg-white rounded-lg shadow col-span-6">
            <p className="font-bold text-black">{data.title}</p>
            <div
                id={data.nodeId}
                className="w-full flex justify-center"
                style={{height: "250px"}}
            >
                {/* {   loading && <Spinner/>     } */}
            </div>
        </div>
    )
}

export default StadisticCard;