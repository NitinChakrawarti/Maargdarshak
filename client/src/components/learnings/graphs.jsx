import { useSelector } from 'react-redux';
import { AgCharts } from 'ag-charts-react';
import { useEffect, useState } from 'react';

export const Graphs = () => {
    const [completed, setCompleted] = useState(0);
    const [pending, setPending] = useState(0);

    const todos = useSelector((state) => state.todos);
    const tasktodo = todos.todos;

    useEffect(() => {
        // Update state for completed and pending tasks
        const donetask = tasktodo.filter((ele) => ele.label === 'done');
        setCompleted(donetask.length);
        setPending(tasktodo.length - donetask.length);
    }, [tasktodo]); // Re-run whenever `tasktodo` changes

    const chartOptions = {
        data: [
            { asset: 'Completed', amount: completed },
            { asset: 'Pending', amount: pending },
        ],
        series: [
            {
                type: 'donut',
                calloutLabelKey: 'asset',
                angleKey: 'amount',
                innerRadiusRatio: 0.7,
            },
        ],
        color: {
            fills: ['#34D399', '#F87171'], // Example colors for Completed & Pending
        },
    };

    return (
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'lightblue'}}>
            <AgCharts options={chartOptions}  />
        </div>
    );
};
