import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ExternalLink, GraduationCap, BookOpen } from "lucide-react";
import SlideCarousel from "@/components/SlideCarousel";

interface MentoriaCard {
  id: string;
  tipo: string;
  titulo: string;
  descricao: string;
  imagem_url: string;
  link_url: string | null;
  ordem: number;
  ativo: boolean;
}

export default function MentoriaPage() {
  const [sobreCards, setSobreCards] = useState<MentoriaCard[]>([]);
  const [conteudoCards, setConteudoCards] = useState<MentoriaCard[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await (supabase
        .from("mentoria_cards" as any)
        .select("*")
        .eq("ativo", true)
        .order("ordem", { ascending: true }) as any);
      if (data) {
        setSobreCards(data.filter((c: MentoriaCard) => c.tipo === "sobre_sistema"));
        setConteudoCards(data.filter((c: MentoriaCard) => c.tipo === "conteudo"));
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="space-y-8">
      {/* Slide Carousel */}
      <SlideCarousel pagina="mentoria" />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          Mentoria
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Conteúdos exclusivos para elevar sua operação de transporte executivo.
        </p>
      </div>

      {/* Sobre o Sistema - Small rectangular cards (1080x760 ratio) */}
      {sobreCards.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Sobre o Sistema
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {sobreCards.map((card) => (
              <a
                key={card.id}
                href={card.link_url || "#"}
                target={card.link_url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="relative" style={{ aspectRatio: "1080/760" }}>
                    <img
                      src={card.imagem_url}
                      alt={card.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs sm:text-sm font-bold leading-tight line-clamp-2">
                        {card.titulo}
                      </p>
                      {card.descricao && (
                        <p className="text-white/70 text-[10px] sm:text-xs mt-1 line-clamp-1">
                          {card.descricao}
                        </p>
                      )}
                    </div>
                    {card.link_url && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Conteúdos - Tall portrait cards (1080x1920 ratio) */}
      {conteudoCards.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Conteúdos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {conteudoCards.map((card) => (
              <a
                key={card.id}
                href={card.link_url || "#"}
                target={card.link_url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="relative" style={{ aspectRatio: "1080/1920" }}>
                    <img
                      src={card.imagem_url}
                      alt={card.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs sm:text-sm font-bold leading-tight line-clamp-2">
                        {card.titulo}
                      </p>
                      {card.descricao && (
                        <p className="text-white/70 text-[10px] sm:text-xs mt-1 line-clamp-2">
                          {card.descricao}
                        </p>
                      )}
                    </div>
                    {card.link_url && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {sobreCards.length === 0 && conteudoCards.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <GraduationCap className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">Nenhum conteúdo disponível</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Os conteúdos de mentoria serão adicionados pelo administrador em breve.
          </p>
        </div>
      )}
    </div>
  );
}
