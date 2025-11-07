import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

interface DynamicVisualizationProps {
  type: "temperatureChart" | "migrationChart" | "urbanGrowth";
}

const temperatureData = [
  { area: "High Income", avgTemp: 24, greenCover: 45 },
  { area: "Mid Income", avgTemp: 27, greenCover: 30 },
  { area: "Low Income", avgTemp: 31, greenCover: 15 },
  { area: "Industrial", avgTemp: 33, greenCover: 5 }
];

const migrationData = [
  { year: "2010", migrations: 1200, temperature: 1.0 },
  { year: "2012", migrations: 1500, temperature: 1.1 },
  { year: "2014", migrations: 1800, temperature: 1.3 },
  { year: "2016", migrations: 2400, temperature: 1.4 },
  { year: "2018", migrations: 3200, temperature: 1.6 },
  { year: "2020", migrations: 4100, temperature: 1.8 },
  { year: "2022", migrations: 5300, temperature: 2.0 }
];

const urbanGrowthData = [
  { year: "2000", urban: 45, green: 35, rural: 20 },
  { year: "2005", urban: 52, green: 30, rural: 18 },
  { year: "2010", urban: 60, green: 25, rural: 15 },
  { year: "2015", urban: 68, green: 22, rural: 10 },
  { year: "2020", urban: 75, green: 18, rural: 7 },
  { year: "2025", urban: 80, green: 15, rural: 5 }
];

export function DynamicVisualization({ type }: DynamicVisualizationProps) {
  if (type === "temperatureChart") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={temperatureData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="area" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar dataKey="avgTemp" fill="hsl(var(--destructive))" name="Avg Temperature (°C)" />
          <Bar dataKey="greenCover" fill="hsl(var(--primary))" name="Green Cover (%)" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "migrationChart") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={migrationData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="year" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="migrations" stroke="hsl(var(--primary))" strokeWidth={2} name="Climate Migrations (thousands)" />
          <Line type="monotone" dataKey="temperature" stroke="hsl(var(--destructive))" strokeWidth={2} name="Temperature Anomaly (°C)" />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "urbanGrowth") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={urbanGrowthData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="year" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Area type="monotone" dataKey="urban" stackId="1" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.6)" name="Urban (%)" />
          <Area type="monotone" dataKey="green" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.6)" name="Green Space (%)" />
          <Area type="monotone" dataKey="rural" stackId="1" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground) / 0.4)" name="Rural (%)" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return null;
}
