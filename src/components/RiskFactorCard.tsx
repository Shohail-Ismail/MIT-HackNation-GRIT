import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface RiskFactorCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
  description: string;
}

const getRiskLevel = (score: number) => {
  if (score < 25) return { label: "Low", color: "text-risk-low" };
  if (score < 50) return { label: "Medium", color: "text-risk-medium" };
  if (score < 75) return { label: "High", color: "text-risk-high" };
  return { label: "Critical", color: "text-risk-critical" };
};

const getProgressColor = (score: number) => {
  if (score < 25) return "bg-risk-low";
  if (score < 50) return "bg-risk-medium";
  if (score < 75) return "bg-risk-high";
  return "bg-risk-critical";
};

const RiskFactorCard = ({ title, score, icon: Icon, description }: RiskFactorCardProps) => {
  const risk = getRiskLevel(score);
  
  return (
    <Card className="group overflow-hidden border-border bg-card p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-card-foreground">{score}</span>
          <span className={`text-sm font-semibold ${risk.color}`}>{risk.label} Risk</span>
        </div>
        <Progress 
          value={score} 
          className="h-2"
          indicatorClassName={getProgressColor(score)}
        />
      </div>
    </Card>
  );
};

export default RiskFactorCard;
