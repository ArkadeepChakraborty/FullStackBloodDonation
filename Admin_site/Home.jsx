import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/Home.css';
import './Css/Homeone.css';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Home = () => {
  const [stats, setStats] = useState({
    bloodGroups: [],
    donorCount: 0,
    userCount: 0,
  });

  useEffect(() => {
    toast.success('Welcome back Admin, Arkadeep'); // Show success toast

    const fetchStats = async () => {
      try {
        const [bloodGroupRes, donorRes, userRes] = await Promise.all([
          fetch('http://localhost:5000/admin/blood-groups/count'),
          fetch('http://localhost:5000/admin/donors/count'),
          fetch('http://localhost:5000/admin/users/count'),
        ]);

        const bloodGroups = await bloodGroupRes.json();
        const donors = await donorRes.json();
        const users = await userRes.json();

        setStats({
          bloodGroups,
          donorCount: donors.count,
          userCount: users.count,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // Bar Chart Data
  const barData = {
    labels: stats.bloodGroups.map((group) => group._id),
    datasets: [
      {
        label: 'Number of Donors',
        data: stats.bloodGroups.map((group) => group.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    },
  };

  // Pie Chart Data
  const pieData = {
    labels: ['Donors', 'Users'],
    datasets: [
      {
        data: [stats.donorCount, stats.userCount],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    },
  };

  return (
    <div className="Dashboard">
      <h1>Statistics</h1>
      <div className="stats-container">
        {stats.bloodGroups.map((bloodGroup) => (
          <div key={bloodGroup._id} className="stat-card">
            <h3>{bloodGroup._id}</h3>
            <p>
              Count: <strong>{bloodGroup.count}</strong>
            </p>
          </div>
        ))}
        <div className="stat-card">
          <h3>Total Donors</h3>
          <p>Count: <strong>{stats.donorCount}</strong></p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>Count: <strong>{stats.userCount}</strong></p>
        </div>
      </div>

      {/* Bar Chart */}
      <h1>Bar Charts of Donate Bloodgroup</h1>
      <div className="chart-container">
        {stats.bloodGroups.length > 0 ? (
          <Bar key={JSON.stringify(barData)} data={barData} options={barOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      {/* Pie Chart */}
      <h1>Pie Chart of No of Users and Donors</h1>
      <div className="chart-container">
        {stats.donorCount > 0 || stats.userCount > 0 ? (
          <Pie key={JSON.stringify(pieData)} data={pieData} options={pieOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        closeButton={false} // Disable the close button (X)
        autoClose={3000} // Optional: Set auto-close time (3 seconds)
        hideProgressBar={false} // Optional: Show the progress bar
      />
    </div>
  );
};

export default Home;
