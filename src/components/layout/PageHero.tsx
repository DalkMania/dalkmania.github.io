import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleArrowRight } from "lucide-react";

export const PageHero = () => {
  return (
    <div className="relative min-h-[calc(100vh-142px)] flex items-center justify-center px-6 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl !leading-[1.2] tracking-tight text-balance">
          Building Engaging Web Experiences
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Hey there! I'm a Niklas, a Developer who loves building web experiences. From crafting beautiful frontends to
          powering robust backends. I focus on creating compelling, beautiful websites that reflect your company values.
          Originally from Southern Sweden, but now call the Bay Area home. I love music, art, and winegums.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <a href="/about/">
            <Button variant="outline" size="lg" className="rounded-full text-base shadow-none hover:cursor-pointer">
              Learn More About Me <CircleArrowRight className="!h-5 !w-5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
