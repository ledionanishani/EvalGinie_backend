import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const DATA = [
  { name: 'Factuality', score: 88 },
  { name: 'Relevance', score: 92 },
  { name: 'Coherence', score: 95 },
  { name: 'Safety', score: 100 },
];

export default function MetricsDashboard() {
  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Readiness Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights into your agent's performance.</p>
        </div>

        {/* Top KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Overall Score" value="91/100" icon={<BarChart3 className="w-4 h-4 text-indigo-600" />} trend="+2.5%" />
            <KpiCard title="Hallucination Rate" value="1.2%" icon={<AlertTriangle className="w-4 h-4 text-amber-600" />} trend="-0.5%" good={true} />
            <KpiCard title="Avg Latency" value="840ms" icon={<Zap className="w-4 h-4 text-indigo-600" />} trend="+12ms" good={false} />
            <KpiCard title="Pass Rate" value="94.5%" icon={<CheckCircle className="w-4 h-4 text-emerald-600" />} trend="+1.2%" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {/* Chart */}
            <Card className="col-span-2 shadow-sm">
                <CardHeader>
                    <CardTitle>Metric Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="score" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="shadow-sm bg-indigo-50/50 border-indigo-100">
                <CardHeader>
                    <CardTitle className="text-indigo-900">Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 bg-white rounded-lg border border-indigo-100 shadow-sm">
                        <div className="text-xs font-semibold text-indigo-600 uppercase mb-1">Latency</div>
                        <p className="text-sm text-slate-700">Consider caching SQL schema lookups to reduce latency by ~200ms.</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-indigo-100 shadow-sm">
                        <div className="text-xs font-semibold text-amber-600 uppercase mb-1">Hallucination</div>
                        <p className="text-sm text-slate-700">Add "User ID" to the prompt context to fix 2 failed test cases regarding personalization.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </Layout>
  );
}

function KpiCard({ title, value, icon, trend, good = true }: any) {
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${good ? 'text-emerald-600' : 'text-rose-600'} flex items-center mt-1`}>
                    {trend} from last run
                </p>
            </CardContent>
        </Card>
    )
}
