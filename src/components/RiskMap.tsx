import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface RiskMapProps {
  latitude: number;
  longitude: number;
  riskScore: number;
}

const RiskMap = ({ latitude, longitude, riskScore }: RiskMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Placeholder for map implementation
    // In a real app, this would integrate with Mapbox, Google Maps, or Leaflet
  }, [latitude, longitude]);

  const getRiskColor = (score: number) => {
    if (score < 25) return "#10b981"; // green
    if (score < 50) return "#f59e0b"; // amber
    if (score < 75) return "#ef4444"; // red
    return "#dc2626"; // dark red
  };

  return (
    <Card className="overflow-hidden bg-card border-border">
      <div ref={mapRef} className="relative h-[400px] bg-muted">
        {/* Placeholder map visualization */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="text-center space-y-4">
            <div 
              className="mx-auto h-32 w-32 rounded-full border-4 flex items-center justify-center animate-pulse"
              style={{ 
                borderColor: getRiskColor(riskScore),
                backgroundColor: `${getRiskColor(riskScore)}20`
              }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: getRiskColor(riskScore) }}>
                  {riskScore}
                </div>
                <div className="text-xs text-muted-foreground">Risk Score</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>Lat: {latitude.toFixed(4)}°</div>
              <div>Lng: {longitude.toFixed(4)}°</div>
            </div>
            <div className="text-xs text-muted-foreground max-w-xs">
              Map visualization with risk overlay will appear here. 
              This would integrate with mapping services like Mapbox or Google Maps.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RiskMap;
