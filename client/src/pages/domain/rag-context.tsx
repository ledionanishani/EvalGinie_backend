import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Trash2, ExternalLink } from "lucide-react";

export default function RagContext() {
  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">RAG Context</h1>
            <p className="text-muted-foreground">Upload documents or provide key terms to ground your agent.</p>
          </div>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:bg-slate-50/50 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="font-medium text-slate-900">Click to upload or drag and drop</h3>
          <p className="text-sm text-muted-foreground mt-1">PDF, TXT, MD or DOCX (max 10MB)</p>
        </div>

        {/* File List */}
        <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Indexed Documents</h3>
            {[
                { name: "Q3_Financial_Report.pdf", size: "2.4 MB", date: "Today" },
                { name: "Engineering_Oncall_Playbook.md", size: "45 KB", date: "Yesterday" },
                { name: "Marketing_Brand_Guidelines_v2.docx", size: "1.1 MB", date: "Dec 1, 2025" }
            ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="font-medium text-sm text-slate-900">{file.name}</div>
                            <div className="text-xs text-muted-foreground">{file.size} • Uploaded {file.date}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <ExternalLink className="w-3.5 h-3.5 mr-1" />
                            View
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
