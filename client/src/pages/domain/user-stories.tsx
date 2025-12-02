import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, User } from "lucide-react";

export default function UserStories() {
  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Stories</h1>
            <p className="text-muted-foreground">Define the personas and goals for your agent evaluation.</p>
          </div>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4" />
            Add Story
          </Button>
        </div>

        <div className="space-y-4">
          {[
            "As a Financial Analyst, I want to query quarterly forecasts so that I can prepare the board deck.",
            "As a DevOps Engineer, I need to check server logs for errors to identify downtime causes.",
            "As a Marketing Manager, I want to see campaign performance metrics to optimize ad spend."
          ].map((story, i) => (
            <Card key={i} className="p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-relaxed text-slate-800">{story}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
