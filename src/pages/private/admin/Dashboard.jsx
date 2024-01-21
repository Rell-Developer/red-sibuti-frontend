// Importaciones
// import { Chart } from "chart.js/auto";
import * as echarts from 'echarts';
// import { llenadoBarra } from "../../../components/private/graphs/BarGr.jsx";
// import { llenadoLinea } from "../../../components/private/graphs/LineGr.jsx";
// import { llenadoTorta } from "../../../components/private/graphs/PieGr.jsx";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Spinner from "../../../components/public/Spinner.jsx";
import clienteAxios from "../../../config/axios.jsx";
import StadisticCard from "../../../components/private/cards/StadisticCard.jsx";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});
    const [graphics, setGraphics] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
        init()
		// setTimeout(() => init(), 1000);
	}, []);

	const init = async () => {
		
        let userSession = sessionStorage.getItem("user");

        if (userSession) {
            userSession = JSON.parse(userSession);
            setUser(userSession);
        }

		if(userSession.rol === "admin"){
			// console.log("llegando al init");

			// let canvas = document.querySelectorAll("#myChart");
			// let canvasPie = document.querySelectorAll("#myChartPie");
			// let canvaPorLugarViaje = document.querySelectorAll("#myChartPorLugarViaje");
			// let dashboard = document.querySelector("#dashboard");
			// let btnEstadisticas = document.querySelector('#btnMostrarEstadisticas');
			// let canvaDocenteViajan = document.querySelector("#docentesViajanChart");
	
			// let { data } = await clienteAxios("../../../../src/assets/docentes.json");
			// let docentesViajan = 0;
			// let docentesNoViajan = 0;
	

			// dashboard.classList.remove("hidden");
			// setLoading(true);
	
			// Creacion de las estadisticas
			// new Chart(canvaDocenteViajan, llenadoTorta(dataDocentesViajan));
			// canvasPie.forEach((canva) => new Chart(canva, llenadoTorta(viajan)));
			// canvaPorLugarViaje.forEach(
			// 	(canva) => new Chart(canva, llenadoTorta(viajePorLugar)),
			// );
	
			// canvas.forEach((canva) => new Chart(canva, llenadoLinea(datos)));
	
			// new Chart(canva, llenadoLinea(datos));
            setTimeout(async() => {
                
                const graphs = await fetch("/src/assets/json/graphs.json").then( res => res.json());
                setGraphics(graphs);
                setLoading(false);
            }, 500);
		}else{
            navigate("/inicio/control/empleos");
        }
	};

    const createGraph = async(nodeId) => {
        setTimeout(async() => {
            console.log(nodeId);
            var chartDom = document.querySelector(`#${nodeId}`);
            console.log(chartDom);
            console.log(chartDom && !chartDom.getAttribute("_echarts_instance_"));
    
            if (chartDom && !chartDom.getAttribute("_echarts_instance_")) {
                console.log("paso");
                var myChart = echarts.init(chartDom);
                var option;
    
                const { data } = await clienteAxios("/get-employments-count-by-status");
                console.log(data);
                if (data.result) {
                    option = {
                        title: {
                            text: '',
                            subtext: '',
                            left: "center"
                        },
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left'
                        },
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
                    
                }
                return
        
            }
        }, 1000);
    }

	return (
		<>
			<section className="w-full overflow-scroll p-5 bg-color1">
				<h2 className="font-bold text-3xl ml-5 mb-5">Estadisticas</h2>
                {
                    loading ? (
                        <div className={`p-5 bg-white rounded-xl mx-auto shadow m-5 w-1/4`}> <Spinner/> </div>
                    ):(
                        <div id="dashboard" className={`w-full`}>
                            <div className="w-full lg:w-5/6 mx-auto grid grid-cols-12">
                                {/* <div className="p-6 m-3 bg-white rounded-lg shadow col-span-6">
                                    <p className="font-bold text-black">Empleos por Estatus</p>
                                    <div
                                        id='employmentsStatus'
                                        className="w-full flex justify-center"
                                        style={{height: "250px"}}
                                        onLoad={createGraph("employmentsStatus")}
                                    >
                                        {   loading && (<Spinner/>)     }
                                    </div>
                                </div> */}
                                {
                                    graphics.length > 0 ? (<>
                                        {   graphics.map( graph => <StadisticCard data={graph}/>)   }
                                    </>):(
                                        <div className='col-span-full'>
                                            <Spinner/>
                                        </div>
                                    )
                                }
                                {/* <div className="p-6 m-3 bg-white rounded-lg shadow col-span-6">
                                    <p className="font-bold text-black">Empleos por Cargo</p>
                                    <div
                                        id='employmentsPositions'
                                        className="w-full flex justify-center"
                                        style={{height: "250px"}}
                                        onLoad={createGraph("employmentsPositions")}
                                    >
                                        {   loading && (<Spinner/>)     }
                                    </div>
                                </div> */}
                                {/* <div className="grid grid-cols-2">
                                    
                                    <div>
                                        <div className="p-6 m-3 bg-white rounded-lg shadow">
                                            <p className="font-bold text-black">Estudiantes que Viajan</p>
                                            <div
                                                className="w-full flex justify-center"
                                                style={{ height: "250px" }}
                                            >
                                                <canvas id="myChartPie" className="transition-all"></canvas>
                                            </div>
                                        </div>
                                        <div className="p-6 m-3 bg-white rounded-lg shadow">
                                            <p className="font-bold text-black">Docentes que Viajan</p>
                                            <div
                                                className="w-full flex justify-center"
                                                style={{ height: "250px" }}
                                            >
                                                <canvas id="docentesViajanChart"></canvas>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid">
                                        <div className="p-6 m-3 bg-white rounded-lg shadow">
                                            <p className="font-bold text-black">
                                                Usuarios Registrados por Mes
                                            </p>
                                            <div className="w-full flex justify-center">
                                                <canvas id="myChart"></canvas>
                                            </div>
                                        </div>
                                        <div className="p-6 m-3 bg-white rounded-lg shadow">
                                            <p className="font-bold text-black">Por Lugar de Viaje</p>
                                            <div className="w-full flex justify-center">
                                                <canvas id="myChartPorLugarViaje"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div className="p-6 m-3 bg-white rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div>
                                    <div className="p-6 m-3 bg-white rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div>
                                    <div className="p-6 m-3 bg-white rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div>
                                    <div className="p-6 m-3 bg-white rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div>
                                    <div className="p-6 m-3 bg-sky-200 rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div>
                                    <div className="p-6 m-3 bg-sky-200 rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div>
                                    <div className="p-6 m-3 bg-sky-200 rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div>
                                    <div className="p-6 m-3 bg-sky-200 rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div>
                                    <div className="p-6 m-3 bg-sky-200 rounded-lg shadow">
                                        <canvas id="myChart"></canvas>  
                                    </div> */}
                            </div>
                        </div>
                    )
                }
			</section>
		</>
	);
};

export default Dashboard;