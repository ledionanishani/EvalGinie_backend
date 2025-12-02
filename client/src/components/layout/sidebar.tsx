import { Users, Database, MessageSquare, FileText, Settings, Home, ChevronRight, ChevronDown, HelpCircle, LogOut, LayoutDashboard, FileJson, BookOpen, Files, BarChart2, CheckSquare } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import logo from "@assets/generated_images/minimalist_abstract_geometric_logo_for_ai_evaluation_platform.png";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const [isContextOpen, setIsContextOpen] = useState(true);
  const [isEvalOpen, setIsEvalOpen] = useState(true);

  const isActive = (path: string) => location === path;

  return (
    <div className={cn("flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border text-sidebar-foreground", className)}>
      {/* Header / Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center shrink-0 overflow-hidden">
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="font-semibold text-sm tracking-tight">
          <div className="text-sidebar-foreground">EvalsGenie</div>
          <div className="text-xs text-muted-foreground font-normal">DomainEval</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        
        {/* Main Section */}
        <div>
          <div className="px-2 mb-2 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">Platform</div>
          <nav className="space-y-1">
            <Link href="/">
              <a className={cn("flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md transition-colors", 
                isActive("/") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50")}>
                <LayoutDashboard className="w-4 h-4" />
                Home
              </a>
            </Link>
          </nav>
        </div>

        {/* Domain Editor Section */}
        <div>
          <div className="px-2 mb-2 text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">Domain Editor</div>
          
          {/* Domain Selector (Mock) */}
          <div className="px-2 mb-4">
            <div className="flex items-center gap-2 p-2 bg-background border rounded-md text-sm shadow-sm">
              <Database className="w-4 h-4 text-indigo-500" />
              <span className="font-medium">maps</span>
            </div>
          </div>

          <nav className="space-y-1">
            <Link href="/domain/maps">
              <a className={cn("flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md transition-colors", 
                isActive("/domain/maps") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50")}>
                <Settings className="w-4 h-4" />
                Domain Settings
              </a>
            </Link>

            {/* Context Group */}
            <div className="pt-2">
              <button 
                onClick={() => setIsContextOpen(!isContextOpen)}
                className="flex w-full items-center justify-between px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-sidebar-accent/50"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Context
                </div>
                {isContextOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              
              {isContextOpen && (
                <div className="mt-1 ml-4 pl-2 border-l border-sidebar-border space-y-1">
                  <Link href="/domain/maps/agent-io">
                    <a className={cn("block px-2 py-1.5 text-sm rounded-md transition-colors", 
                      isActive("/domain/maps/agent-io") ? "text-indigo-600 font-medium bg-indigo-50/50" : "text-muted-foreground hover:text-foreground")}>
                      1. Agent I/O
                    </a>
                  </Link>
                  <Link href="/domain/maps/user-stories">
                    <a className={cn("block px-2 py-1.5 text-sm rounded-md transition-colors", 
                      isActive("/domain/maps/user-stories") ? "text-indigo-600 font-medium bg-indigo-50/50" : "text-muted-foreground hover:text-foreground")}>
                      2. User Stories
                    </a>
                  </Link>
                  <Link href="/domain/maps/prompts">
                    <a className={cn("block px-2 py-1.5 text-sm rounded-md transition-colors", 
                      isActive("/domain/maps/prompts") ? "text-indigo-600 font-medium bg-indigo-50/50" : "text-muted-foreground hover:text-foreground")}>
                      3. Prompt / Code
                    </a>
                  </Link>
                   <Link href="/domain/maps/rag-context">
                    <a className={cn("block px-2 py-1.5 text-sm rounded-md transition-colors", 
                      isActive("/domain/maps/rag-context") ? "text-indigo-600 font-medium bg-indigo-50/50" : "text-muted-foreground hover:text-foreground")}>
                      4. RAG Context
                    </a>
                  </Link>
                  <Link href="/domain/maps/training">
                    <a className={cn("block px-2 py-1.5 text-sm rounded-md transition-colors", 
                      isActive("/domain/maps/training") ? "text-indigo-600 font-medium bg-indigo-50/50" : "text-muted-foreground hover:text-foreground")}>
                      5. Sample Q&A
                    </a>
                  </Link>
                </div>
              )}
            </div>

            {/* Evaluation Group */}
             <div className="pt-2">
              <button 
                onClick={() => setIsEvalOpen(!isEvalOpen)}
                className="flex w-full items-center justify-between px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-sidebar-accent/50"
              >
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Evaluation
                </div>
                {isEvalOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              
              {isEvalOpen && (
                <div className="mt-1 ml-4 pl-2 border-l border-sidebar-border space-y-1">
                  <Link href="/domain/maps/test-sets">
                    <a className={cn("block px-2 py-1.5 text-sm rounded-md transition-colors", 
                      isActive("/domain/maps/test-sets") ? "text-indigo-600 font-medium bg-indigo-50/50" : "text-muted-foreground hover:text-foreground")}>
                      Test Sets (GT)
                    </a>
                  </Link>
                  <Link href="/domain/maps/metrics">
                    <a className={cn("block px-2 py-1.5 text-sm rounded-md transition-colors", 
                      isActive("/domain/maps/metrics") ? "text-indigo-600 font-medium bg-indigo-50/50" : "text-muted-foreground hover:text-foreground")}>
                      Metrics Dashboard
                    </a>
                  </Link>
                </div>
              )}
            </div>

          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium text-xs">
            JD
          </div>
          <div className="text-xs">
            <div className="font-medium text-foreground">John Doe</div>
            <div className="text-muted-foreground">john@example.com</div>
          </div>
        </div>
        <div className="space-y-1">
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-sidebar-accent/50">
                <HelpCircle className="w-3.5 h-3.5" />
                Help & Documentation
            </a>
            <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-sidebar-accent/50">
                <LogOut className="w-3.5 h-3.5" />
                Sign out
            </a>
        </div>
      </div>
    </div>
  );
}
