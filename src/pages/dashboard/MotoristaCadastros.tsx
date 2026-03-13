import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, LayoutGrid, List, User, FileText, CreditCard, Car, ArrowLeft, ArrowRight, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TABS = [
  { label: "Pessoal", icon: User },
  { label: "Documentos", icon: FileText },
  { label: "Pagamento", icon: CreditCard },
  { label: "Veículo", icon: Car },
];

function FileUpload({ label }: { label: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted transition-colors mt-1">
        <Upload className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Selecionar arquivo (máx 5MB)</span>
        <input type="file" className="hidden" accept="image/*,.pdf" />
      </label>
    </div>
  );
}

export default function MotoristaCadastrosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [possuiVeiculo, setPossuiVeiculo] = useState(true);

  const isLast = tabIndex === TABS.length - 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cadastros de Motoristas</h1>
          <p className="text-muted-foreground">Gerenciamento completo de motoristas</p>
        </div>
        <Button onClick={() => { setOpen(true); setTabIndex(0); }}>
          <Plus className="h-4 w-4 mr-2" /> Novo Motorista
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou CPF..." className="pl-9" />
        </div>
        <div className="flex border border-border rounded-lg overflow-hidden">
          <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")}><LayoutGrid className="h-4 w-4" /></Button>
          <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Nenhum motorista cadastrado.
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastrar Motorista</DialogTitle>
          </DialogHeader>

          {/* Tab pills */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            {TABS.map((tab, i) => {
              const Icon = tab.icon;
              const active = i === tabIndex;
              return (
                <button
                  key={tab.label}
                  onClick={() => setTabIndex(i)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                    active ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 0 – Pessoal */}
          {tabIndex === 0 && (
            <div className="space-y-4">
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-foreground border-b border-border pb-2 w-full">Dados Básicos</legend>
                <div><Label>Nome Completo *</Label><Input /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>CPF *</Label><Input placeholder="000.000.000-00" /></div>
                  <div><Label>RG</Label><Input /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Data de Nascimento</Label><Input type="date" /></div>
                  <div><Label>Telefone *</Label><Input placeholder="(11) 99999-0000" /></div>
                </div>
                <div><Label>E-mail</Label><Input type="email" /></div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-foreground border-b border-border pb-2 w-full">Endereço</legend>
                <div><Label>Endereço Completo</Label><Input placeholder="Rua, número, complemento, bairro" /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Cidade</Label><Input /></div>
                  <div>
                    <Label>Estado (UF)</Label>
                    <Select><SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger><SelectContent>
                      {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(uf => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent></Select>
                  </div>
                  <div><Label>CEP</Label><Input placeholder="00000-000" /></div>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-foreground border-b border-border pb-2 w-full">CNH</legend>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>Número da CNH</Label><Input /></div>
                  <div>
                    <Label>Categoria</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Cat." /></SelectTrigger><SelectContent>
                      <SelectItem value="A">A</SelectItem><SelectItem value="B">B</SelectItem><SelectItem value="C">C</SelectItem><SelectItem value="D">D</SelectItem><SelectItem value="E">E</SelectItem><SelectItem value="AB">AB</SelectItem>
                    </SelectContent></Select>
                  </div>
                  <div><Label>Validade</Label><Input type="date" /></div>
                </div>
              </fieldset>

              <div>
                <Label>Status</Label>
                <Select defaultValue="ativo"><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ativo">Ativo</SelectItem><SelectItem value="inativo">Inativo</SelectItem></SelectContent></Select>
              </div>

              <div><Label>Observações</Label><Textarea placeholder="Anotações internas..." /></div>
            </div>
          )}

          {/* Tab 1 – Documentos */}
          {tabIndex === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Upload de imagens (máx. 5MB cada)</p>
              <FileUpload label="Foto de Perfil" />
              <FileUpload label="CNH – Frente" />
              <FileUpload label="CNH – Verso" />
              <FileUpload label="Comprovante de Residência" />
            </div>
          )}

          {/* Tab 2 – Pagamento */}
          {tabIndex === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Dados bancários para repasse</p>
              <div>
                <Label>Tipo de Pagamento</Label>
                <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="conta">Conta Bancária</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                </SelectContent></Select>
              </div>
            </div>
          )}

          {/* Tab 3 – Veículo */}
          {tabIndex === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch checked={possuiVeiculo} onCheckedChange={setPossuiVeiculo} />
                <span className="text-sm text-foreground">Este motorista possui veículo próprio</span>
              </div>

              {possuiVeiculo && (
                <>
                  <fieldset className="space-y-4">
                    <legend className="text-sm font-semibold text-foreground border-b border-border pb-2 w-full">Dados do Veículo</legend>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Marca *</Label><Input /></div>
                      <div><Label>Modelo *</Label><Input /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div><Label>Ano *</Label><Input /></div>
                      <div><Label>Cor</Label><Input /></div>
                      <div><Label>Placa *</Label><Input /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Combustível</Label>
                        <Select><SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger><SelectContent>
                          <SelectItem value="flex">Flex</SelectItem><SelectItem value="gasolina">Gasolina</SelectItem><SelectItem value="diesel">Diesel</SelectItem><SelectItem value="eletrico">Elétrico</SelectItem>
                        </SelectContent></Select>
                      </div>
                      <div><Label>RENAVAM</Label><Input /></div>
                      <div><Label>Chassi</Label><Input /></div>
                    </div>
                  </fieldset>

                  <div>
                    <Label>Status do Veículo</Label>
                    <Select defaultValue="ativo"><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ativo">Ativo</SelectItem><SelectItem value="inativo">Inativo</SelectItem></SelectContent></Select>
                  </div>

                  <fieldset className="space-y-4">
                    <legend className="text-sm font-semibold text-foreground border-b border-border pb-2 w-full">Documentos do Veículo</legend>
                    <FileUpload label="CRLV" />
                    <FileUpload label="Seguro" />
                  </fieldset>

                  <FileUpload label="Fotos do Veículo" />
                  <div><Label>Observações do Veículo</Label><Textarea placeholder="Anotações sobre o veículo..." /></div>
                </>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-2">
            {tabIndex > 0 ? (
              <Button variant="outline" onClick={() => setTabIndex((t) => t - 1)}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Anterior
              </Button>
            ) : <div />}
            {isLast ? (
              <Button>Salvar Motorista</Button>
            ) : (
              <Button onClick={() => setTabIndex((t) => t + 1)}>
                Próximo <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
