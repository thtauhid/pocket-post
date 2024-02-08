"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { SentEmail, Tracking } from "@prisma/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      align: "end" as const,
    },
  },
};

type Props = {
  emails: SentEmail[];
  tracking: Tracking[];
};

export default function Stats(props: Props) {
  // Dates
  // Past 7 days
  const dateLabels = Array.from(
    new Set(
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      })
    )
  ).sort();

  // Emails
  const updatedEmails = props.emails.map((email) => {
    return {
      ...email,
      createdAt: email.createdAt.toISOString().split("T")[0],
    };
  });

  const emailData = {
    labels: dateLabels,
    datasets: [
      {
        label: "Sent",
        data: dateLabels.map(
          (label) =>
            updatedEmails.filter((email) => email.createdAt === label).length
        ),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  // Tracking
  const updatedTracking = props.tracking.map((track) => {
    return {
      ...track,
      createdAt: track.createdAt.toISOString().split("T")[0],
    };
  });

  const trackingData = {
    labels: dateLabels,
    datasets: [
      {
        label: "Tracked",
        data: dateLabels.map(
          (label) =>
            updatedTracking.filter((track) => track.createdAt === label).length
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Opened",
        data: dateLabels.map(
          (label) =>
            updatedTracking
              .filter((track) => track.createdAt === label)
              .filter((track) => track.opens > 0).length
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div>
      <h2 className="font-bold mt-8 text-2xl">Stats</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <h3 className="font-semibold py-4">Email Sent</h3>
          <Line options={options} data={emailData} />
        </div>
        <div>
          <h3 className="font-semibold py-4">Email Tracked</h3>
          <Line options={options} data={trackingData} />
        </div>
      </div>
    </div>
  );
}
