import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Line, Bar } from 'react-chartjs-2';
import { PieChart } from '@mui/x-charts';
import axios from 'axios';
import { backend_url, currency } from '../../App';
import './Statistic.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Container, Grid, Paper, Typography, Card, CardContent, Box } from '@mui/material';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const fetchYearlySalesData = async () => {
    const response = await axios.get(`${backend_url}/api/statistic/yearly-sales-data`);
    console.log(response.data);
    return response.data;
};

const fetchTotalCustomers = async () => {
    const response = await axios.get(`${backend_url}/api/statistic/total-customers`);
    return response.data.totalCustomers;
};

const fetchTotalSalesToday = async () => {
    const response = await axios.get(`${backend_url}/api/statistic/total-sales-today`);
    return response.data.totalSalesToday;
};

const fetchMonthlySales = async () => {
    const response = await axios.get(`${backend_url}/api/statistic/monthly-sales`);
    return response.data.totalSalesThisMonth;
};

const fetchYearlySales = async () => {
    const response = await axios.get(`${backend_url}/api/statistic/yearly-sales`);
    return response.data.totalSalesThisYear;
};

const fetchOrderStatusData = async () => {
    const response = await axios.get(`${backend_url}/api/statistic/orders/status`);
    return response.data.map(status => ({
        id: status.delivery_status,
        value: parseInt(status.total, 10),
        label: status.delivery_status,
    }));
};

const AdminDashboard = () => {
    const { data: yearlySalesData = [], error: yearlySalesError } = useQuery({
        queryKey: ['yearlySalesData'],
        queryFn: fetchYearlySalesData,
    });

    const { data: totalCustomers = 0 } = useQuery({
        queryKey: ['totalCustomers'],
        queryFn: fetchTotalCustomers,
    });

    const { data: totalSalesToday = 0 } = useQuery({
        queryKey: ['totalSalesToday'],
        queryFn: fetchTotalSalesToday,
    });

    const { data: monthlySales = 0 } = useQuery({
        queryKey: ['monthlySales'],
        queryFn: fetchMonthlySales,
    });

    const { data: yearlySales = 0 } = useQuery({
        queryKey: ['yearlySales'],
        queryFn: fetchYearlySales,
    });

    const { data: orderStatusData = [] } = useQuery({
        queryKey: ['orderStatusData'],
        queryFn: fetchOrderStatusData,
    });

    const chartData = yearlySalesData.length > 0 ? {
        labels: yearlySalesData.map(item => item.month),
        datasets: [
            {
                label: 'Total orders per month',
                data: yearlySalesData.map(item => item.total),
                backgroundColor: 'rgba(235, 108, 29, 0.856)',
                borderColor: '#a9c04b',
                borderWidth: 1,
                fill: true,
            },
        ],
    }
        : null;

    if (yearlySalesError) {
        return <div>Error loading yearly sales data: {yearlySalesError.message}</div>;
    }

    return (
        <div className='listproduct'>
            <Container>
                {/* <Typography variant="h3" gutterBottom>
                    Dashboard
                </Typography> */}
                <Box display="flex" justifyContent="center" alignItems="center" mt={4} mb={4}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Yearly Sales
                                </Typography>
                                {chartData && chartData.labels && chartData.datasets.length > 0 ? (
                                    <Bar
                                        data={chartData}
                                        options={{
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                },
                                            },
                                        }}
                                    />
                                ) : (
                                    <Typography variant="body1">No data available to display the chart.</Typography>
                                )}
                            </CardContent>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Orders by Delivery Status
                                </Typography>
                                <PieChart
                                    colors={['#fd3f3f', '#cddf23b5', '#56e456']}
                                    series={[
                                        {
                                            data: orderStatusData,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                        },
                                    ]}
                                    width={400}
                                    height={200}
                                />
                            </CardContent>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Total Customers</Typography>
                                <Typography variant="h6">{totalCustomers}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Total Sales Today</Typography>
                                <Typography variant="h6">{currency}{totalSalesToday}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Monthly Sales</Typography>
                                <Typography variant="h6">{currency}{monthlySales}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Yearly Sales</Typography>
                                <Typography variant="h6">{currency}{yearlySales}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default AdminDashboard;
