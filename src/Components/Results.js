import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);



const Results = () => {

    const [optionList, changeOptionList] = useState([])
    const [votes, changeVotes] = useState([])
    const prompt = localStorage.getItem('prompt')

    useEffect(() => {
        const getInfo = async () => {
            changeOptionList(await window.contract.getOptions({ prompt: prompt }))
            changeVotes(await window.contract.getVotes({ prompt: prompt }))
        }
        getInfo()
    }, [])

    const chartData = {
        labels: optionList,
        datasets: [
            {
                data: votes,
                label: "Votes",
                backgroundColor: "#0b5ed7",
            }
        ]
    }

    return (
        <Bar
            type="line"
            width={160}
            height={60}
            options={{
                indexAxis: 'y',
                responsive: true,
                legend: {
                    display: true,
                    position: "right"
                }
            }}
            data={chartData}
        />
    );
};
export default Results;
