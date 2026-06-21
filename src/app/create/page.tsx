"use client";

import { useState } from "react";

import { CreationShell } from "@/components/creation-flow/CreationShell";
import { loadDraft, startNewDraft } from "@/lib/storage/characters";
import type { CharacterDraft } from "@/lib/types/character";

export default function CreatePage() {
  const [draft] = useState<CharacterDraft | null>(() => {
    if (typeof window === "undefined") return null;

    const existing = loadDraft();
    return existing ?? startNewDraft();
  });

  if (!draft) {
    return (
      <div className="flex min-h-full items-center justify-center text-sm text-zinc-500">
        Carregando rascunho...
      </div>
    );
  }

  return <CreationShell initialDraft={draft} />;
}
