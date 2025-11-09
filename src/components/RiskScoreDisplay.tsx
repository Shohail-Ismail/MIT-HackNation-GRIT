import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface RiskScoreDisplayProps {
  overallScore: number;
  latitude: number;
  longitude: number;
}

const getRiskConfig = (score: number) => {
  if (score < 25) {
    return {
      label: "Low Risk",
      color: "text-risk-low",
      bgColor: "bg-risk-low/10",
      borderColor: "border-risk-low/30",
      icon: CheckCircle,
      description: "Minimal environmental hazards detected"
    };
  }
  if (score < 50) {
    return {
      label: "Medium Risk",
      color: "text-risk-medium",
      bgColor: "bg-risk-medium/10",
      borderColor: "border-risk-medium/30",
      icon: AlertCircle,
      description: "Moderate hazard levels present"
    };
  }
  if (score < 75) {
    return {
      label: "High Risk",
      color: "text-risk-high",
      bgColor: "bg-risk-high/10",
      borderColor: "border-risk-high/30",
      icon: AlertTriangle,
      description: "Significant environmental risks identified"
    };
  }
  return {
    label: "Critical Risk",
    color: "text-risk-critical",
    bgColor: "bg-risk-critical/10",
    borderColor: "border-risk-critical/30",
    icon: XCircle,
    description: "Severe hazard conditions detected"
  };
};

const RiskScoreDisplay = ({ overallScore, latitude, longitude }: RiskScoreDisplayProps) => {
  const config = getRiskConfig(overallScore);
  const Icon = config.icon;
  
  return (
    <Card className={`border-2 ${config.borderColor} ${config.bgColor} p-8 text-center transition-all duration-500 hover:shadow-lg`}>
      <div className="flex flex-col items-center gap-4">
        <Icon className={`h-16 w-16 ${config.color} animate-pulse`} />
        
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">Overall Risk Score</h2>
          <div className={`text-6xl font-bold ${config.color} mb-2`}>
            {overallScore}
          </div>
          <div className={`text-lg font-semibold ${config.color} mb-1`}>
            {config.label}
          </div>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border w-full">
          <p className="text-xs text-muted-foreground">
            Location: {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RiskScoreDisplay;
