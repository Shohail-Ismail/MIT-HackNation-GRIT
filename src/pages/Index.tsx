import { useState } from "react";
import { Mountain, Droplets, Leaf, Waves, Wind, AlertTriangle } from "lucide-react";
import Hero from "@/components/Hero";
import LocationInput from "@/components/LocationInput";
import RiskScoreDisplay from "@/components/RiskScoreDisplay";
import RiskFactorCard from "@/components/RiskFactorCard";
import RiskMap from "@/components/RiskMap";
import { toast } from "sonner";

interface RiskData {
  latitude: number;
  longitude: number;
  overallScore: number;
  factors: {
    terrain: number;
    disasters: number;
    soilMoisture: number;
    vegetation: number;
    seaLevel: number;
    storms: number;
  };
}

const Index = () => {
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeLocation = (lat: number, lng: number) => {
    setIsAnalyzing(true);
    toast.info("Analyzing location...");
    
    // Simulate API call with random risk scores
    setTimeout(() => {
      const generateScore = () => Math.floor(Math.random() * 100);
      
      const factors = {
        terrain: generateScore(),
        disasters: generateScore(),
        soilMoisture: generateScore(),
        vegetation: generateScore(),
        seaLevel: generateScore(),
        storms: generateScore(),
      };
      
      const overallScore = Math.floor(
        Object.values(factors).reduce((a, b) => a + b, 0) / 6
      );
      
      setRiskData({
        latitude: lat,
        longitude: lng,
        overallScore,
        factors,
      });
      
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 2000);
  };

  const scrollToAnalysis = () => {
    document.getElementById("analysis-section")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onGetStarted={scrollToAnalysis} />
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        <section id="analysis-section" className="max-w-4xl mx-auto">
          <LocationInput onAnalyze={analyzeLocation} />
        </section>

        {riskData && (
          <>
            <section className="max-w-6xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Risk Assessment Results</h2>
                <p className="text-muted-foreground">
                  Comprehensive analysis based on multiple environmental factors
                </p>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <RiskScoreDisplay
                    overallScore={riskData.overallScore}
                    latitude={riskData.latitude}
                    longitude={riskData.longitude}
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <RiskMap
                    latitude={riskData.latitude}
                    longitude={riskData.longitude}
                    riskScore={riskData.overallScore}
                  />
                </div>
              </div>
            </section>

            <section className="max-w-6xl mx-auto space-y-6">
              <h3 className="text-2xl font-bold text-foreground text-center">
                Risk Factor Breakdown
              </h3>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <RiskFactorCard
                  title="Terrain Risk"
                  score={riskData.factors.terrain}
                  icon={Mountain}
                  description="Elevation & topography analysis"
                />
                <RiskFactorCard
                  title="Historic Disasters"
                  score={riskData.factors.disasters}
                  icon={AlertTriangle}
                  description="Past hazard occurrences"
                />
                <RiskFactorCard
                  title="Soil Moisture"
                  score={riskData.factors.soilMoisture}
                  icon={Droplets}
                  description="Ground saturation levels"
                />
                <RiskFactorCard
                  title="Vegetation Health"
                  score={riskData.factors.vegetation}
                  icon={Leaf}
                  description="Dryness & fire risk index"
                />
                <RiskFactorCard
                  title="Sea Level Rise"
                  score={riskData.factors.seaLevel}
                  icon={Waves}
                  description="Coastal flooding potential"
                />
                <RiskFactorCard
                  title="Storm Patterns"
                  score={riskData.factors.storms}
                  icon={Wind}
                  description="Severe weather likelihood"
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
