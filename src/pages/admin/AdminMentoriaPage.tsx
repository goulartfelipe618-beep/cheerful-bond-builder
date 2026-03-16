import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, GraduationCap, Pencil } from "lucide-react";
import { toast } from "sonner";

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

const emptyCard = { titulo: "", descricao: "", imagem_url: "", link_url: "", tipo: "conteudo", ordem: 0 };

export default function AdminMentoriaPage() {
  const [cards, setCards] = useState<MentoriaCard[]>([]);
  const [form, setForm] = useState(emptyCard);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const fetchCards = async () => {
    const { data } = await (supabase.from("mentoria_cards" as any).select("*").order("tipo").order("ordem", { ascending: true }) as any);
    if (data) setCards(data);
  };

  useEffect(() => { fetchCards(); }, []);

  const handleSave = async () => {
    if (!form.titulo.trim() || !form.imagem_url.trim()) {
      toast.error("Título e URL da imagem são obrigatórios");
      return;
    }
    const payload = { ...form, link_url: form.link_url || null };

    if (editingId) {
      const { error } = await (supabase.from("mentoria_cards" as any).update(payload).eq("id", editingId) as any);
      if (error) { toast.error("Erro ao atualizar"); return; }
      toast.success("Card atualizado!");
    } else {
      const { error } = await (supabase.from("mentoria_cards" as any).insert(payload) as any);
      if (error) { toast.error("Erro ao criar"); return; }
      toast.success("Card criado!");
    }
    setForm(emptyCard);
    setEditingId(null);
    setOpen(false);
    fetchCards();
  };

  const handleDelete = async (id: string) => {
    const { error } = await (supabase.from("mentoria_cards" as any).delete().eq("id", id) as any);
    if (error) { toast.error("Erro ao excluir"); return; }
    toast.success("Card excluído!");
    fetchCards();
  };

  const handleToggle = async (id: string, ativo: boolean) => {
    await (supabase.from("mentoria_cards" as any).update({ ativo: !ativo }).eq("id", id) as any);
    fetchCards();
  };

  const openEdit = (card: MentoriaCard) => {
    setForm({ titulo: card.titulo, descricao: card.descricao || "", imagem_url: card.imagem_url, link_url: card.link_url || "", tipo: card.tipo, ordem: card.ordem });
    setEditingId(card.id);
    setOpen(true);
  };

  const sobreCards = cards.filter(c => c.tipo === "sobre_sistema");
  const conteudoCards = cards.filter(c => c.tipo === "conteudo");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" /> Mentoria — Gerenciar Cards
          </h1>
          <p className="text-sm text-muted-foreground">Gerencie os cards exibidos na página de Mentoria dos motoristas.</p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setForm(emptyCard); setEditingId(null); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Novo Card</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Card" : "Novo Card"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Tipo</label>
                <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sobre_sistema">Sobre o Sistema (1080×760)</SelectItem>
                    <SelectItem value="conteudo">Conteúdo (1080×1920)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Título *</label>
                <Input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Nome do card" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Descrição</label>
                <Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Breve descrição" rows={2} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">URL da Imagem *</label>
                <Input value={form.imagem_url} onChange={(e) => setForm({ ...form, imagem_url: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Link (opcional)</label>
                <Input value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Ordem</label>
                <Input type="number" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} />
              </div>
              <Button onClick={handleSave} className="w-full">{editingId ? "Salvar Alterações" : "Criar Card"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sobre o Sistema */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Sobre o Sistema <Badge variant="secondary">{sobreCards.length}</Badge></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sobreCards.map((card) => (
            <Card key={card.id} className={!card.ativo ? "opacity-50" : ""}>
              <div className="relative" style={{ aspectRatio: "1080/760" }}>
                <img src={card.imagem_url} alt={card.titulo} className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardContent className="p-3 space-y-2">
                <p className="font-semibold text-sm text-foreground truncate">{card.titulo}</p>
                <div className="flex items-center justify-between">
                  <Switch checked={card.ativo} onCheckedChange={() => handleToggle(card.id, card.ativo)} />
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(card)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(card.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Conteúdos */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Conteúdos <Badge variant="secondary">{conteudoCards.length}</Badge></h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {conteudoCards.map((card) => (
            <Card key={card.id} className={!card.ativo ? "opacity-50" : ""}>
              <div className="relative" style={{ aspectRatio: "1080/1920" }}>
                <img src={card.imagem_url} alt={card.titulo} className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardContent className="p-3 space-y-2">
                <p className="font-semibold text-xs text-foreground truncate">{card.titulo}</p>
                <div className="flex items-center justify-between">
                  <Switch checked={card.ativo} onCheckedChange={() => handleToggle(card.id, card.ativo)} />
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(card)}><Pencil className="h-3 w-3" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(card.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
