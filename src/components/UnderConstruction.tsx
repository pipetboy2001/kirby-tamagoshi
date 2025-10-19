import { ExternalLink } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-md text-center">
        <CardHeader>
          <span className="mb-2 flex justify-center">🚧</span>
          <CardTitle className="font-bold text-2xl">
            Sitio en Construcción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Estamos trabajando en una nueva experiencia increíble.
            <br />
            Mientras tanto, puedes visitar nuestra página actual.
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            asChild>
            <a
              href="https://kirby-tamagoshi-classic.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center">
              Visitar página actual <ExternalLink className="ml-2" />
            </a>
          </Button>
          <span className="text-muted-foreground text-sm">
            ¡Vuelve pronto para ver las novedades!
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnderConstruction;
