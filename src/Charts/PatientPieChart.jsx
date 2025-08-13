import { useContext} from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PatientsContext } from '../Context/PatientsContext';


// Register Chart.js components for pie chart
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PatientPieChart() {
  const { patients } = useContext(PatientsContext);

  // Count male and female patients
  const genderCounts = {
    Male: patients?.filter((patient) => patient.gender === 'male').length || 0,
    Female: patients?.filter((patient) => patient.gender === 'female').length || 0,
  };

  let total = genderCounts.Male + genderCounts.Female;

  // Chart.js data
  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Number of Patients',
        data: [genderCounts.Male, genderCounts.Female],
        backgroundColor: ['#60a5fa', '#fccee8'], // Blue for Male, Pink for Female   
        borderColor: ['#3b82f6', '#fccee8'], // Darker shades for borders
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#6a7282', // gray
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Patient Gender Distribution in the Emergency Department',
        color: "#1E90FF", // Use dynamic color from var(--text-color)
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${((context.raw / total) * 100).toFixed(1)}%`,
        },
      },
    },
  };

  return <Pie options={options} data={data} />;
}