"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Database, FolderUp, Server, ShieldCheck } from "lucide-react";
import type { PlatformSnapshot } from "@/lib/platform-types";

type InventorySyncTabProps = {
  data: PlatformSnapshot;
  onUploadComplete: () => Promise<void>;
};

type UploadResult = {
  message: string;
  processedRows: number;
  updatedRows: number;
  createdRows: number;
  rejectedRows: number;
  totalRows: number;
};

function getStatusLabel(status: string): string {
  if (status === "success") return "Sincronização ativa";
  if (status === "running") return "Processando";
  if (status === "warning") return "Atenção";
  if (status === "failed") return "Erro";
  return "Em fila";
}

export function InventorySyncTab({ data, onUploadComplete }: InventorySyncTabProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const latestJob = data.syncJobs[0] ?? null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) {
      setUploadError("Selecione um arquivo CSV ou XLSX antes de enviar.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("uploadedBy", "Operação local");

      const response = await fetch("/api/sync/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as UploadResult & { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Falha ao importar a planilha.");
      }

      setUploadResult(payload);
      setSelectedFile(null);
      await onUploadComplete();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Falha inesperada ao importar a planilha.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-[#1b232b] bg-[#0d1117] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#68ddbd]">Importação de Arquivos</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Carregar planilha</h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#68ddbd]/10 text-[#68ddbd]">
              <FolderUp className="h-5 w-5" />
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Importe arquivos em CSV, XLSX ou TXT para atualizar o estoque sem precisar de integração técnica.
          </p>

          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <div className="flex items-center gap-2 rounded-lg bg-[#111b22] px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-[#68ddbd]" />
              Validação automática de campos
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#111b22] px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-[#68ddbd]" />
              Reconciliação por medicamento e unidade
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#111b22] px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-[#68ddbd]" />
              Registro de histórico da última importação
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <label className="block rounded-xl border border-dashed border-[#2a3640] bg-[#0b1116] px-4 py-4 text-sm text-slate-300 transition hover:border-[#68ddbd]/35 hover:bg-[#0f1519]">
              <span className="mb-1 block font-medium text-white">Arquivo da planilha</span>
              <span className="block text-xs text-slate-400">CSV, XLSX ou TXT com colunas de unidade, medicamento e estoque.</span>
              <input
                type="file"
                accept=".csv,.xlsx,.xls,.txt"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="mt-3 block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-[#68ddbd] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#08110f] hover:file:bg-[#7ae0bc]"
              />
            </label>

            {selectedFile && (
              <p className="text-xs text-slate-400">Selecionado: {selectedFile.name}</p>
            )}

            {uploadError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {uploadError}
              </div>
            )}

            {uploadResult && (
              <div className="rounded-xl border border-[#68ddbd]/20 bg-[#68ddbd]/10 px-4 py-3 text-sm text-[#7ce4c7]">
                {uploadResult.message}
                <div className="mt-1 text-xs text-[#b9f2e0]">
                  {uploadResult.processedRows} processada(s), {uploadResult.updatedRows} atualizada(s), {uploadResult.createdRows} criada(s), {uploadResult.rejectedRows} rejeitada(s).
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#68ddbd] px-4 py-3 text-sm font-semibold text-[#08110f] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? "Enviando..." : "Enviar planilha"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </article>

        <article className="rounded-xl border border-[#1b232b] bg-[#0d1117] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#68ddbd]">Sincronização via SFTP (ERP)</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Conexão segura</h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#68ddbd]/10 text-[#68ddbd]">
              <Server className="h-5 w-5" />
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Conecte o ERP por SFTP para sincronização automática do estoque, com validação de integridade e rastreio de envios.
          </p>

          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <div className="flex items-center gap-2 rounded-lg bg-[#111b22] px-3 py-2">
              <ShieldCheck className="h-4 w-4 text-[#68ddbd]" />
              Comunicação segura e criptografada
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#111b22] px-3 py-2">
              <Database className="h-4 w-4 text-[#68ddbd]" />
              Atualização periódica por ERP
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#111b22] px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-[#68ddbd]" />
              Log de sincronização e alertas automáticos
            </div>
          </div>

          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#68ddbd]/30 bg-[#68ddbd]/10 px-4 py-3 text-sm font-semibold text-[#68ddbd] transition hover:bg-[#68ddbd]/15">
            Conectar ERP
            <ArrowRight className="h-4 w-4" />
          </button>
        </article>
      </div>

      <div className="rounded-xl border border-[#1b232b] bg-[#0d1117] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Status de sincronização</p>
            <h4 className="mt-1 text-lg font-semibold text-white">
              Última atualização em {latestJob ? new Date(latestJob.startedAt).toLocaleString("pt-BR") : "sem registro"}
            </h4>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#68ddbd]/20 bg-[#68ddbd]/10 px-3 py-1.5 text-xs font-medium text-[#68ddbd]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#68ddbd]" />
            {latestJob ? getStatusLabel(latestJob.status) : "Sincronização ativa"}
          </span>
        </div>

        {latestJob && (
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <div className="rounded-xl bg-[#111b22] p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Fonte</p>
              <p className="mt-1 text-sm font-semibold text-white">{latestJob.source}</p>
            </div>
            <div className="rounded-xl bg-[#111b22] p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Tipo</p>
              <p className="mt-1 text-sm font-semibold text-white">{latestJob.kind}</p>
            </div>
            <div className="rounded-xl bg-[#111b22] p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Processados</p>
              <p className="mt-1 text-sm font-semibold text-white">{latestJob.recordsProcessed}</p>
            </div>
            <div className="rounded-xl bg-[#111b22] p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Rejeitados</p>
              <p className="mt-1 text-sm font-semibold text-white">{latestJob.recordsRejected}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
