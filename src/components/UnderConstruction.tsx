import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <span className="flex justify-center mb-2">🚧
          </span>
          <CardTitle className="text-2xl font-bold">Sitio en Construcción</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Estamos trabajando en una nueva experiencia increíble.<br />
            Mientras tanto, puedes visitar nuestra página actual.
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            asChild
          >
            <a href="https://kirby-tamagoshi-classic.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              Visitar página actual <ExternalLink className="ml-2" />
            </a>
          </Button>
          <span className="text-muted-foreground text-sm">¡Vuelve pronto para ver las novedades!</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnderConstruction;
