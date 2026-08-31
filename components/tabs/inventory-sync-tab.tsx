"use client";

import { ArrowRight, CheckCircle2, Database, FolderUp, Server, ShieldCheck } from "lucide-react";

export function InventorySyncTab() {
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

          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#68ddbd] px-4 py-3 text-sm font-semibold text-[#08110f] transition hover:brightness-105">
            Selecionar arquivo
            <ArrowRight className="h-4 w-4" />
          </button>
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
            <h4 className="mt-1 text-lg font-semibold text-white">Última atualização em 08/31 às 15:42</h4>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#68ddbd]/20 bg-[#68ddbd]/10 px-3 py-1.5 text-xs font-medium text-[#68ddbd]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#68ddbd]" />
            Sincronização ativa
          </span>
        </div>
      </div>
    </section>
  );
}
