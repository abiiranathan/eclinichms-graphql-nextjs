import React, { useEffect, useState } from "react";
import { GetVisit_visit_vitals } from "../../../graphql/schema";
import { long_datetime, sort_vitals } from "../../../utils/date";
import { Line } from "react-chartjs-2";

interface Props {
  vitals: GetVisit_visit_vitals[];
}

interface VitalProps {
  vital: GetVisit_visit_vitals;
  index: number;
}

interface VitalsGraphProps {
  vitals: GetVisit_visit_vitals[];
}

export default function TriageNotes({ vitals }: Props) {
  const sortedVitals = sort_vitals([...vitals], "ASC");
  const headers = [
    "ID",
    "Date",
    "Recorded by",
    "BP(mmHg)",
    "PR(bpm)",
    "Temp(oC)",
    "RR(/min)",
    "SpO2(%)",
  ];

  return (
    <div className="p-3 bg-white rounded-lg shadow mt-3 max-w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-gray-100 my-3 border">
        <thead className="bg-red-50">
          <tr>
            {headers.map(header => (
              <th
                key={header}
                scope="col"
                className="border px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-x divide-gray-200">
          {sortedVitals.map((vital, index) => (
            <TableRow vital={vital} index={index + 1} key={vital.id} />
          ))}
        </tbody>
      </table>
      <VitalsGraph vitals={sortedVitals} />
    </div>
  );
}

export function TableRow({ vital, index }: VitalProps) {
  return (
    <tr>
      <td className="p-2 whitespace-nowrap border">{index}</td>
      <td className="p-2 whitespace-nowrap border">{long_datetime(vital.createdAt)}</td>
      <td className="p-2 whitespace-nowrap border">{vital.user.name}</td>
      <td className="p-2 whitespace-nowrap border">
        {vital.sbp} / {vital.dbp}
      </td>
      <td className="p-2 whitespace-nowrap border">{vital.pulse}</td>
      <td className="p-2 whitespace-nowrap border">{vital.temperature}</td>
      <td className="p-2 whitespace-nowrap border">{vital.resp}</td>
      <td className="p-2 whitespace-nowrap border">{vital.spo2}</td>
    </tr>
  );
}

interface ChartFormat {
  labels: string[];
  datasets: any[];
}

interface DataFormat {
  sbps: ChartFormat;
  dbps: ChartFormat;
  temps: ChartFormat;
  pulses: ChartFormat;
}

const defaultData: ChartFormat = {
  labels: [],
  datasets: [],
};

const chartOptions = {
  options: {
    responsive: true,
    layout: {
      padding: 20,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        drawBorder: true,
        drawOnChartArea: true,
        drawTicks: true,
      },
      ticks: {
        autoSkip: false,
        maxRotation: 30,
        minRotation: 30,
      },
    },
    y: {
      type: "linear",
      beginAtZero: false,
      max: 300,
      min: 30,
      ticks: {
        display: false,
        stepSize: 5,
        count: 25,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
  },
};

export function VitalsGraph({ vitals }: VitalsGraphProps) {
  const [data, setData] = useState<DataFormat>({
    sbps: defaultData,
    dbps: defaultData,
    temps: defaultData,
    pulses: defaultData,
  });

  useEffect(() => {
    const seen_dates = new Set<string>();

    const labels = vitals.map(v => {
      const d = new Date(v.createdAt).getDate().toString();
      const defaultDateOpts: Intl.DateTimeFormatOptions = {
        hour12: false,
        minute: "2-digit",
        hour: "2-digit",
      };

      if (seen_dates.has(d)) {
        return new Date(v.createdAt).toLocaleString("en", defaultDateOpts);
      } else {
        seen_dates.add(d);
        return new Date(v.createdAt).toLocaleString("en", {
          day: "2-digit",
          ...defaultDateOpts,
        });
      }
    });

    const sbps: (number | null)[] = [];
    const dbps: (number | null)[] = [];
    const pulses: (number | null)[] = [];
    const temps: (number | null)[] = [];

    vitals.forEach(v => {
      sbps.push(v.sbp);
      dbps.push(v.dbp);
      pulses.push(v.pulse);
      temps.push(v.temperature);
    });

    const newChartData: DataFormat = {
      sbps: {
        labels,
        datasets: [
          {
            label: "Systolic BP(mmHg)",
            data: sbps,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(211, 58, 91, 0.685)",
            yAxisID: "y-axis",
          },
        ],
      },
      dbps: {
        labels,
        datasets: [
          {
            label: "Diastolic BP(mmHg)",
            data: dbps,
            fill: false,
            backgroundColor: "rgb(32, 63, 204)",
            borderColor: "rgba(26, 80, 197, 0.787)",
            yAxisID: "y-axis",
          },
        ],
      },
      pulses: {
        labels,
        datasets: [
          {
            label: "Pulse Rate(beats/min)",
            data: pulses,
            fill: false,
            backgroundColor: "rgb(212, 59, 212)",
            borderColor: "rgb(117, 6, 117)",
            yAxisID: "y-axis",
          },
        ],
      },
      temps: {
        labels,
        datasets: [
          {
            label: "Temperature(oC)",
            data: temps,
            fill: true,
            backgroundColor: "rgba(235, 163, 48, 0.6)",
            borderColor: "rgba(224, 162, 82, 0.822)",
            yAxisID: "y-axis-2",
          },
        ],
      },
    };

    setData(newChartData);
  }, [vitals]);

  return (
    <div>
      <div className="flex mb-5 items-center text-lg text-sky-700">Vitals monitoring charts</div>
      <div className={`grid grid-cols-1 md:grid-cols-2 items-center gap-2`}>
        <div className="max-w-md">
          <Line data={data.sbps} options={chartOptions} width={300} />
        </div>
        <div className="max-w-md">
          <Line data={data.dbps} options={chartOptions} width={300} />
        </div>
        <div className="max-w-md">
          <Line data={data.pulses} options={chartOptions} width={300} />
        </div>
        <div className="max-w-md">
          <Line data={data.temps} options={chartOptions} width={300} />
        </div>
      </div>
    </div>
  );
}
