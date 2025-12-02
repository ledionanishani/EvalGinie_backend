import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, FileJson } from "lucide-react";

export default function AgentIO() {
  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Agent Input/Output Samples</h1>
            <p className="text-muted-foreground">Define the expected behavior of your agent with real examples.</p>
          </div>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4" />
            Add Sample
          </Button>
        </div>

        <div className="grid gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sample #{i}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-muted-foreground">Agent Input</label>
                  <div className="p-3 bg-slate-50 rounded-md text-sm font-mono border min-h-[100px]">
                    {`{
  "query": "What is the forecast for Q3?",
  "user_id": "12345"
}`}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-muted-foreground">Expected Output</label>
                  <div className="p-3 bg-slate-50 rounded-md text-sm font-mono border min-h-[100px]">
                    {`{
  "forecast_amount": 1500000,
  "confidence": 0.95,
  "currency": "USD"
}`}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
