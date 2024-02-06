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
  // Emails
  const emailLabels = Array.from(
    new Set(
      props.emails
        .map((email) => email.createdAt.toISOString().split("T")[0])
        .sort()
    )
  );

  const updatedEmails = props.emails.map((email) => {
    return {
      ...email,
      createdAt: email.createdAt.toISOString().split("T")[0],
    };
  });

  const emailData = {
    labels: emailLabels,
    datasets: [
      {
        label: "Sent",
        data: emailLabels.map(
          (label) =>
            updatedEmails.filter((email) => email.createdAt === label).length
        ),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  // Tracking
  const trackingLabels = Array.from(
    new Set(
      props.emails
        .map((email) => email.createdAt.toISOString().split("T")[0])
        .sort()
    )
  );

  const updatedTracking = props.tracking.map((track) => {
    return {
      ...track,
      createdAt: track.createdAt.toISOString().split("T")[0],
    };
  });

  const trackingData = {
    labels: trackingLabels,
    datasets: [
      {
        label: "Tracked",
        data: trackingLabels.map(
          (label) =>
            updatedTracking.filter((track) => track.createdAt === label).length
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Opened",
        data: trackingLabels.map(
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
