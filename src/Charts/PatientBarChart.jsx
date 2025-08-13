import { useContext, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PatientsContext } from '../Context/PatientsContext';


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientBarChart() {
  const { patients ,fetchPatients} = useContext(PatientsContext);

  useEffect(()=>{
      fetchPatients()
  },[])

  // Define age ranges
  const ageRanges = [
    '0-10',
    '11-20',
    '21-30',
    '31-40',
    '41-50',
    '51-60',
    '61-70',
    '71-80',
    '81-90',
    '91+',
  ];

  // Count patients in each age range
  const ageCounts = ageRanges.map((range, index) => {
    const [min, max] = range.split('-').map(Number); // Split range into min and max (e.g., '0-10' -> [0, 10])
    return patients?.filter((patient) => {
      const age = patient.age;
      // Handle the last range (91+)
      if (index === ageRanges.length - 1) {
        return age >= min;
      }
      return age >= min && age <= max;
    }).length || 0;
  });

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend since we only have one dataset
      },
      title: {
        display: true,
        text: 'Patients Ages in the Emergency Department',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} patients`, // Show "X patients" in tooltip
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age (Years)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Patients',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 5, // Set y-axis ticks to increment by 5
        },
      },
    },
    barPercentage: 1, // Make bars adjacent (histogram style)
    categoryPercentage: 0.8, // Remove gaps between bars
  };

  // Chart.js data
  const data = {
    labels: ageRanges,
    datasets: [
      {
        label: 'Number of Patients',
        data: ageCounts,
        backgroundColor: '#fccee8',
        borderColor: '#fccee8',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}