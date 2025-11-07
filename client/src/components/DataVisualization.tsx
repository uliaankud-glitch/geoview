import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DataVisualizationProps {
  postId: string;
}

const temperatureData = [
  { neighborhood: "Downtown", avgTemp: 95, income: "High" },
  { neighborhood: "Westside", avgTemp: 89, income: "High" },
  { neighborhood: "Northridge", avgTemp: 92, income: "Medium" },
  { neighborhood: "Eastside", avgTemp: 98, income: "Low" },
  { neighborhood: "Southend", avgTemp: 97, income: "Low" },
  { neighborhood: "Midtown", avgTemp: 91, income: "Medium" },
];

export function DataVisualization({ postId }: DataVisualizationProps) {
  return (
    <Card className="p-8">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Interactive Data Visualization</h3>
        <p className="text-sm text-muted-foreground">
          Surface temperature variations across urban neighborhoods, showing correlation with socioeconomic zones
        </p>
      </div>
      <div className="min-h-[400px]" data-testid="viz-temperature-chart">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="neighborhood" 
              stroke="hsl(var(--foreground))"
              tick={{ fill: "hsl(var(--foreground))" }}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              tick={{ fill: "hsl(var(--foreground))" }}
              label={{ value: "Temperature (°F)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
            />
            <Bar dataKey="avgTemp" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Data source: Urban Climate Observatory, 2025
      </p>
    </Card>
  );
}
