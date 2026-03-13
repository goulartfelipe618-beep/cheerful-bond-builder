import { Button } from "@/components/ui/button";
import { Plus, Search, LayoutGrid, List, Save, Trash2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const UF_LIST = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

interface Veiculo {
  marca: string; modelo: string; ano: string; placa: string;
  cor: string; combustivel: string; renavam: string; status: string;
}

interface Subparceiro {
  nome: string; cpfCnpj: string; funcao: string;
  telefone: string; email: string;
}

interface Parceiro {
  id: string;
  razaoSocial: string; nomeFantasia: string;
  cnpj: string; inscricaoEstadual: string;
  email: string; telefone: string; whatsapp: string;
  status: string;
  endereco: string; cidade: string; uf: string; cep: string;
  responsavelNome: string; responsavelTelefone: string; responsavelEmail: string;
  observacoes: string;
  veiculos: Veiculo[];
  subparceiros: Subparceiro[];
}

const emptyParceiro = (): Parceiro => ({
  id: crypto.randomUUID(),
  razaoSocial: "", nomeFantasia: "",
  cnpj: "", inscricaoEstadual: "",
  email: "", telefone: "", whatsapp: "",
  status: "Ativo",
  endereco: "", cidade: "", uf: "", cep: "",
  responsavelNome: "", responsavelTelefone: "", responsavelEmail: "",
  observacoes: "",
  veiculos: [],
  subparceiros: [],
});

const emptyVeiculo = (): Veiculo => ({
  marca: "", modelo: "", ano: new Date().getFullYear().toString(), placa: "",
  cor: "", combustivel: "", renavam: "", status: "Ativo",
});

const emptySubparceiro = (): Subparceiro => ({
  nome: "", cpfCnpj: "", funcao: "", telefone: "", email: "",
});

export default function MotoristaParceriasPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [open, setOpen] = useState(false);
  const [parceiros, setParceiros] = useState<Parceiro[]>([]);
  const [form, setForm] = useState<Parceiro>(emptyParceiro());
  const [searchTerm, setSearchTerm] = useState("");

  const update = (field: keyof Parceiro, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const addVeiculo = () => {
    setForm((p) => ({ ...p, veiculos: [...p.veiculos, emptyVeiculo()] }));
  };

  const updateVeiculo = (i: number, field: keyof Veiculo, value: string) => {
    setForm((p) => {
      const v = [...p.veiculos];
      v[i] = { ...v[i], [field]: value };
      return { ...p, veiculos: v };
    });
  };

  const removeVeiculo = (i: number) => {
    setForm((p) => ({ ...p, veiculos: p.veiculos.filter((_, idx) => idx !== i) }));
  };

  const addSubparceiro = () => {
    setForm((p) => ({ ...p, subparceiros: [...p.subparceiros, emptySubparceiro()] }));
  };

  const updateSubparceiro = (i: number, field: keyof Subparceiro, value: string) => {
    setForm((p) => {
      const s = [...p.subparceiros];
      s[i] = { ...s[i], [field]: value };
      return { ...p, subparceiros: s };
    });
  };

  const removeSubparceiro = (i: number) => {
    setForm((p) => ({ ...p, subparceiros: p.subparceiros.filter((_, idx) => idx !== i) }));
  };

  const handleSave = () => {
    if (!form.razaoSocial || !form.cnpj) {
      toast.error("Razão Social e CNPJ são obrigatórios.");
      return;
    }
    setParceiros((prev) => [...prev, form]);
    setForm(emptyParceiro());
    setOpen(false);
    toast.success("Parceiro salvo com sucesso!");
  };

  const filtered = parceiros.filter(
    (p) =>
      p.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cnpj.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Parcerias</h1>
          <p className="text-muted-foreground">Gestão de empresas parceiras</p>
        </div>
        <Button onClick={() => { setForm(emptyParceiro()); setOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Novo Parceiro
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por razão social, fantasia ou CNPJ..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex border border-border rounded-lg overflow-hidden">
          <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          Nenhum parceiro cadastrado.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-5 space-y-1">
              <p className="font-semibold text-foreground">{p.razaoSocial}</p>
              {p.nomeFantasia && <p className="text-sm text-muted-foreground">{p.nomeFantasia}</p>}
              <p className="text-xs text-muted-foreground font-mono">{p.cnpj}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`h-2 w-2 rounded-full ${p.status === "Ativo" ? "bg-green-500" : "bg-muted-foreground/40"}`} />
                <span className="text-xs text-muted-foreground">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog Novo Parceiro */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Parceiro</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="empresa">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="empresa">🏢 Empresa</TabsTrigger>
              <TabsTrigger value="documentos">📄 Documentos</TabsTrigger>
              <TabsTrigger value="veiculos">🚗 Veículos</TabsTrigger>
              <TabsTrigger value="subparceiros">👥 Subparceiros</TabsTrigger>
            </TabsList>

            {/* ABA EMPRESA */}
            <TabsContent value="empresa" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Razão Social *</Label>
                  <Input placeholder="Razão social da empresa" value={form.razaoSocial} onChange={(e) => update("razaoSocial", e.target.value)} />
                </div>
                <div>
                  <Label>Nome Fantasia</Label>
                  <Input placeholder="Nome fantasia" value={form.nomeFantasia} onChange={(e) => update("nomeFantasia", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CNPJ *</Label>
                  <Input placeholder="00.000.000/0000-00" value={form.cnpj} onChange={(e) => update("cnpj", e.target.value)} />
                </div>
                <div>
                  <Label>Inscrição Estadual</Label>
                  <Input value={form.inscricaoEstadual} onChange={(e) => update("inscricaoEstadual", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>E-mail</Label>
                  <Input value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input value={form.telefone} onChange={(e) => update("telefone", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>WhatsApp</Label>
                  <Input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => update("status", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-2">
                <Label className="font-semibold">Endereço</Label>
                <Input placeholder="Rua, número, complemento, bairro" className="mt-2" value={form.endereco} onChange={(e) => update("endereco", e.target.value)} />
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <Input placeholder="Cidade" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} />
                  <Select value={form.uf} onValueChange={(v) => update("uf", v)}>
                    <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                    <SelectContent>
                      {UF_LIST.map((uf) => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input placeholder="00000-000" value={form.cep} onChange={(e) => update("cep", e.target.value)} />
                </div>
              </div>

              <div className="pt-2">
                <Label className="font-semibold">Responsável</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <Input placeholder="Nome" value={form.responsavelNome} onChange={(e) => update("responsavelNome", e.target.value)} />
                  <Input placeholder="Telefone" value={form.responsavelTelefone} onChange={(e) => update("responsavelTelefone", e.target.value)} />
                  <Input placeholder="E-mail" value={form.responsavelEmail} onChange={(e) => update("responsavelEmail", e.target.value)} />
                </div>
              </div>

              <div>
                <Label className="font-semibold">Observações</Label>
                <Textarea className="mt-2" rows={3} value={form.observacoes} onChange={(e) => update("observacoes", e.target.value)} />
              </div>
            </TabsContent>

            {/* ABA DOCUMENTOS */}
            <TabsContent value="documentos" className="space-y-4 mt-4">
              <div>
                <Label>Logo da Empresa</Label>
                <div className="mt-2 flex items-center gap-2 border border-border rounded-lg p-3 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" /> Selecionar arquivo (máx 5MB)
                </div>
              </div>
              <div>
                <Label>Contrato</Label>
                <div className="mt-2 flex items-center gap-2 border border-border rounded-lg p-3 text-sm text-muted-foreground">
                  <Upload className="h-4 w-4" /> Selecionar arquivo (máx 5MB)
                </div>
              </div>
            </TabsContent>

            {/* ABA VEÍCULOS */}
            <TabsContent value="veiculos" className="space-y-4 mt-4">
              {form.veiculos.map((v, i) => (
                <div key={i} className="rounded-lg border border-border p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Veículo</Label>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeVeiculo(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <div><Label className="text-xs">Marca *</Label><Input value={v.marca} onChange={(e) => updateVeiculo(i, "marca", e.target.value)} /></div>
                    <div><Label className="text-xs">Modelo *</Label><Input value={v.modelo} onChange={(e) => updateVeiculo(i, "modelo", e.target.value)} /></div>
                    <div><Label className="text-xs">Ano</Label><Input value={v.ano} onChange={(e) => updateVeiculo(i, "ano", e.target.value)} /></div>
                    <div><Label className="text-xs">Placa *</Label><Input value={v.placa} onChange={(e) => updateVeiculo(i, "placa", e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <div><Label className="text-xs">Cor</Label><Input value={v.cor} onChange={(e) => updateVeiculo(i, "cor", e.target.value)} /></div>
                    <div>
                      <Label className="text-xs">Combustível</Label>
                      <Select value={v.combustivel} onValueChange={(val) => updateVeiculo(i, "combustivel", val)}>
                        <SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gasolina">Gasolina</SelectItem>
                          <SelectItem value="Etanol">Etanol</SelectItem>
                          <SelectItem value="Flex">Flex</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Elétrico">Elétrico</SelectItem>
                          <SelectItem value="Híbrido">Híbrido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label className="text-xs">Renavam</Label><Input value={v.renavam} onChange={(e) => updateVeiculo(i, "renavam", e.target.value)} /></div>
                    <div>
                      <Label className="text-xs">Status</Label>
                      <Select value={v.status} onValueChange={(val) => updateVeiculo(i, "status", val)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">CRLV</Label>
                      <div className="mt-1 flex items-center gap-2 border border-border rounded-lg p-2.5 text-xs text-muted-foreground">
                        <Upload className="h-3.5 w-3.5" /> Selecionar arquivo (máx 5MB)
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Seguro</Label>
                      <div className="mt-1 flex items-center gap-2 border border-border rounded-lg p-2.5 text-xs text-muted-foreground">
                        <Upload className="h-3.5 w-3.5" /> Selecionar arquivo (máx 5MB)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={addVeiculo}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar Veículo
              </Button>
            </TabsContent>

            {/* ABA SUBPARCEIROS */}
            <TabsContent value="subparceiros" className="space-y-4 mt-4">
              {form.subparceiros.map((s, i) => (
                <div key={i} className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold">Subparceiro #{i + 1}</Label>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeSubparceiro(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div><Label className="text-xs">Nome *</Label><Input value={s.nome} onChange={(e) => updateSubparceiro(i, "nome", e.target.value)} /></div>
                    <div><Label className="text-xs">CPF/CNPJ</Label><Input value={s.cpfCnpj} onChange={(e) => updateSubparceiro(i, "cpfCnpj", e.target.value)} /></div>
                    <div><Label className="text-xs">Função</Label><Input value={s.funcao} onChange={(e) => updateSubparceiro(i, "funcao", e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs">Telefone</Label><Input value={s.telefone} onChange={(e) => updateSubparceiro(i, "telefone", e.target.value)} /></div>
                    <div><Label className="text-xs">E-mail</Label><Input value={s.email} onChange={(e) => updateSubparceiro(i, "email", e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">CNH (PDF)</Label>
                      <div className="mt-1 flex items-center gap-2 border border-border rounded-lg p-2.5 text-xs text-muted-foreground">
                        <Upload className="h-3.5 w-3.5" /> Selecionar arquivo (máx 5MB)
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">CRLV (PDF)</Label>
                      <div className="mt-1 flex items-center gap-2 border border-border rounded-lg p-2.5 text-xs text-muted-foreground">
                        <Upload className="h-3.5 w-3.5" /> Selecionar arquivo (máx 5MB)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={addSubparceiro}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar Subparceiro
              </Button>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-1.5" /> Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
