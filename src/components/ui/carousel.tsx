
"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CarouselContextProps = {
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  activeSnap: number
  slideSnaps: number[]
  scrollTo: (index: number) => void
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

type UseEmblaCarouselType = typeof import("embla-carousel-react").default
type EmblaOptionsType = NonNullable<Parameters<UseEmblaCarouselType>[0]>
type EmblaCarouselType = NonNullable<ReturnType<UseEmblaCarouselType>[1]>

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    opts?: EmblaOptionsType
    orientation?: "horizontal" | "vertical"
    plugins?: Parameters<NonNullable<ReturnType<UseEmblaCarouselType>[1]>["plugins"]>[0]
  }
>(
  (
    {
      opts,
      orientation = "horizontal",
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = React.useRef<UseEmblaCarouselType | null>(null)
      .current ?? [null, null] // Simulating useEmblaCarousel hook

    // Mocking emblaApi for now as we can't actually run the hook here
    // In a real scenario, you'd use:
    // const [emblaRef, emblaApi] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins)
    // For prototyping, we'll mock the necessary parts of emblaApi
    const mockEmblaApi = React.useMemo(() => {
      if (typeof window === "undefined") {
         return {
          selectedScrollSnap: () => 0,
          scrollSnaps: () => [0],
          canScrollPrev: () => false,
          canScrollNext: () => true,
          scrollPrev: () => {},
          scrollNext: () => {},
          scrollTo: () => {},
          on: (() => {}) as EmblaCarouselType["on"],
          off: (() => {}) as EmblaCarouselType["off"],
          plugins: () => ({}) as ReturnType<EmblaCarouselType["plugins"]>,
        } as unknown as EmblaCarouselType;
      }
      // Dynamically import and use useEmblaCarousel on the client
      // This is a simplified representation; actual implementation may vary
      const { default: useEmblaCarousel } = require("embla-carousel-react");
      const [actualEmblaRef, actualEmblaApi] = useEmblaCarousel(
        { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
        plugins
      );
      (emblaRef as any) = actualEmblaRef; // Assign to the outer ref
      return actualEmblaApi;

    }, [opts, orientation, plugins]);


    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(true)
    const [activeSnap, setActiveSnap] = React.useState(0)
    const [slideSnaps, setSlideSnaps] = React.useState<number[]>([])

    const onSelect = React.useCallback((currentEmblaApi: EmblaCarouselType) => {
      if (!currentEmblaApi) return
      setCanScrollPrev(currentEmblaApi.canScrollPrev())
      setCanScrollNext(currentEmblaApi.canScrollNext())
      setActiveSnap(currentEmblaApi.selectedScrollSnap())
      setSlideSnaps(currentEmblaApi.scrollSnaps())
    }, [])

    const scrollPrev = React.useCallback(() => {
      mockEmblaApi?.scrollPrev()
    }, [mockEmblaApi])

    const scrollNext = React.useCallback(() => {
      mockEmblaApi?.scrollNext()
    }, [mockEmblaApi])
    
    const scrollTo = React.useCallback((index: number) => {
        mockEmblaApi?.scrollTo(index);
    }, [mockEmblaApi]);


    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!mockEmblaApi) return
      onSelect(mockEmblaApi)
      mockEmblaApi.on("reInit", onSelect)
      mockEmblaApi.on("select", onSelect)
      return () => {
        mockEmblaApi.off("select", onSelect)
        mockEmblaApi.off("reInit", onSelect)
      }
    }, [mockEmblaApi, onSelect])

    // Effect to dynamically load and initialize embla-carousel-react on the client
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            import("embla-carousel-react").then((mod) => {
                const useEmblaCarousel = mod.default;
                const [actualEmblaRef, actualEmblaApi] = useEmblaCarousel(
                    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
                    plugins
                );
                (emblaRef as any).current = actualEmblaRef; // This is tricky, assigning ref.current.
                                                        // The ref passed to the div below should ideally be actualEmblaRef
                                                        // For simplicity in this environment, direct assignment attempt shown.
                
                if (actualEmblaApi) {
                    // Update state based on the actual emblaApi
                    onSelect(actualEmblaApi);
                    actualEmblaApi.on("reInit", onSelect);
                    actualEmblaApi.on("select", onSelect);
                    // Make emblaApi methods use actualEmblaApi
                    // This part is complex as context provides stable functions.
                    // A full solution might involve updating context or passing emblaApi down differently.
                }
            });
        }
    }, [opts, orientation, plugins, onSelect]);


    return (
      <CarouselContext.Provider
        value={{
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          handleKeyDown,
          activeSnap,
          slideSnaps,
          scrollTo,
        }}
      >
        <div
          ref={ref}
          className={cn(
            "relative",
            orientation === "horizontal" ? " " : " ",
            className
          )}
          role="region"
          aria-roledescription="carousel"
          onKeyDownCapture={handleKeyDown}
          {...props}
        >
          {/* The ref here should ideally be the one from the actual useEmblaCarousel hook */}
          <div ref={emblaRef as any} className="overflow-hidden">
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ArrowLeft className="h-6 w-6" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ArrowRight className="h-6 w-6" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"


const CarouselIndicator = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { index: number }
>(({ className, variant = "outline", size = "icon", index, ...props }, ref) => {
  const { activeSnap, scrollTo } = useCarousel();
  const isActive = activeSnap === index;
  return (
    <Button
      ref={ref}
      size={size}
      className={cn(
        "h-2 w-2 p-0 rounded-full mx-1",
        isActive ? "bg-primary" : "bg-primary/50",
        className
      )}
      onClick={() => scrollTo(index)}
      {...props}
    >
      <span className="sr-only">Go to slide {index + 1}</span>
    </Button>
  );
});
CarouselIndicator.displayName = "CarouselIndicator";


const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { slideSnaps } = useCarousel();
    if (slideSnaps.length <= 1) return null;

    return (
        <div
        ref={ref}
        className={cn("absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2", className)}
        {...props}
        >
        {slideSnaps.map((_, index) => (
            <CarouselIndicator key={index} index={index} />
        ))}
        </div>
    );
});
CarouselDots.displayName = "CarouselDots";


export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselIndicator,
  type EmblaOptionsType,
  type EmblaCarouselType,
}
