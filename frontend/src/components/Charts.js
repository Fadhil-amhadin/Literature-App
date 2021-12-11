import React from 'react'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import Month from './Month'
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts'

const currentMonth = new Date().getMonth()
const monthVar = Month()[currentMonth + 1].name
function Charts() {
    const {data: analytics} = useQuery("AnalyticsChace", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            },
        }
        const response = await API().get('/analytics', config)
        return response.data
    })
    const data = calculate(analytics)
    return (
        <>
            <h1>Traffic {monthVar} 2021</h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data} margin={{right: 30}}>
                    <CartesianGrid/>
                    <XAxis dataKey="date"
                        interval={"preserveEnd"}/>
                    <YAxis></YAxis>
                    <Legend/>
                    <Tooltip/>
                    <Line dataKey="visitor"
                        stroke="blue" activeDot={{r: 8}}/>
                    <Line dataKey="download"
                        stroke="red" activeDot={{r: 8}}/>
                    <Line dataKey="upload"
                        stroke="green" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>  
        </>
    )
}

const calculate = (data) => {
    let isData = data ? data : []
    const container = []
    const month = Month()[currentMonth + 1]
    for(let i = 1; i < month.days + 1; i++){
        container.push({
            date: `${i} ${month.name}`,
            visitor: 0,
            download: 0,
            upload: 0
        })
        let visitorCont = 0
        let download = 0
        let upload = 0
        for(let j = 0; j < isData.length; j++){
            if(isData[j].date.slice(8,) == i){
                visitorCont++
                download += JSON.parse(isData[j].literatureDw).length
                upload += JSON.parse(isData[j].literatureUp).length
                container[i-1].visitor = visitorCont
                container[i-1].download = download
                container[i-1].upload = upload
            }
        }
    }
    return container
}
export default Charts
