import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Play, Download, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function TestSets() {
  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ground Truth Test Set</h1>
            <p className="text-muted-foreground">Generated evaluation questions and expected answers.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
            </Button>
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200">
              <Play className="w-4 h-4" />
              Run Evaluation
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[400px]">Evaluation Question</TableHead>
                <TableHead className="w-[300px]">Ground Truth Answer</TableHead>
                <TableHead className="w-[100px]">Difficulty</TableHead>
                <TableHead>Last Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                    q: "What was the Q3 revenue for the EMEA region?",
                    a: "$4.2M, based on the 'EMEA_Sales_Q3' table aggregation.",
                    diff: "Medium",
                    status: "pass"
                },
                {
                    q: "List all active servers with >90% CPU utilization.",
                    a: "SQL query filtering 'system_metrics' where cpu > 90 and status = 'active'.",
                    diff: "Hard",
                    status: "fail"
                },
                {
                    q: "Summarize the brand tone guidelines.",
                    a: "Professional, empathetic, and clear. Avoid jargon.",
                    diff: "Easy",
                    status: "pass"
                },
                {
                    q: "Who is the primary contact for project Alpha?",
                    a: "Sarah Jenkins (Engineering Lead).",
                    diff: "Easy",
                    status: "warn"
                }
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium py-4">{row.q}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.a}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal bg-slate-50">{row.diff}</Badge>
                  </TableCell>
                  <TableCell>
                    {row.status === 'pass' && <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-sm"><CheckCircle2 className="w-4 h-4" /> Pass</div>}
                    {row.status === 'fail' && <div className="flex items-center gap-1.5 text-rose-600 font-medium text-sm"><XCircle className="w-4 h-4" /> Fail</div>}
                    {row.status === 'warn' && <div className="flex items-center gap-1.5 text-amber-600 font-medium text-sm"><AlertCircle className="w-4 h-4" /> Partial</div>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
