import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SlideData {
  id: string;
  titulo: string;
  subtitulo: string;
  imagem_url: string;
  mostrar_texto: boolean;
  link_url: string;
}

interface SlideCarouselProps {
  pagina: string;
  fallbackSlides?: { titulo: string; subtitulo: string; imagem_url?: string; mostrar_texto?: boolean; link_url?: string }[];
}

export default function SlideCarousel({ pagina, fallbackSlides }: SlideCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await supabase
        .from("slides")
        .select("id, titulo, subtitulo, imagem_url, mostrar_texto, link_url")
        .eq("pagina", pagina)
        .eq("ativo", true)
        .order("ordem", { ascending: true });

      if (data && data.length > 0) {
        setSlides(data as SlideData[]);
      }
      setLoading(false);
    };
    fetchSlides();
  }, [pagina]);

  const displaySlides = slides.length > 0
    ? slides
    : (fallbackSlides || []).map((s, i) => ({ id: `fallback-${i}`, ...s }));

  const nextSlide = useCallback(() => {
    setCurrentSlide((c) => (c < displaySlides.length - 1 ? c + 1 : 0));
  }, [displaySlides.length]);

  const prevSlide = () => setCurrentSlide((c) => (c > 0 ? c - 1 : displaySlides.length - 1));

  // Auto-play every 5 seconds
  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, displaySlides.length]);

  if (loading || displaySlides.length === 0) return null;

  const currentSlideData = displaySlides[currentSlide];
  const showText = currentSlideData?.mostrar_texto && (currentSlideData.titulo || currentSlideData.subtitulo);
  const linkUrl = currentSlideData?.link_url;

  const renderSlide = (slide: typeof displaySlides[0], index: number) => {
    const isActive = index === currentSlide;
    const hasImage = !!slide?.imagem_url;

    const imageEl = hasImage ? (
      <img
        src={slide.imagem_url}
        alt={slide.titulo || "Slide"}
        className="w-full h-auto block"
      />
    ) : (
      <div className="h-72 bg-gradient-to-r from-primary/80 to-primary" />
    );

    return (
      <div
        key={slide.id || index}
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
      >
        {linkUrl && isActive ? (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
            {imageEl}
          </a>
        ) : (
          imageEl
        )}
      </div>
    );
  };

  return (
    <div className="relative rounded-xl overflow-hidden w-full">
      {/* Container that sizes based on first image */}
      <div className="relative">
        {/* Invisible first image to set height */}
        {displaySlides[0]?.imagem_url ? (
          <img src={displaySlides[0].imagem_url} alt="" className="w-full h-auto block invisible" />
        ) : (
          <div className="h-72 invisible" />
        )}
        {/* Slides overlay */}
        {displaySlides.map((s, i) => renderSlide(s, i))}
      </div>

      {/* Overlay com texto */}
      {showText && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-12 transition-opacity duration-700">
          <div className="max-w-lg">
            {currentSlideData.titulo && (
              <h2 className="text-3xl font-bold text-white mb-2">{currentSlideData.titulo}</h2>
            )}
            {currentSlideData.subtitulo && (
              <p className="text-white/80">{currentSlideData.subtitulo}</p>
            )}
          </div>
        </div>
      )}

      {/* Navegação */}
      {displaySlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {displaySlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-white scale-110' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
