"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { StepProgress } from "@/components/creation-flow/StepProgress";
import { CREATION_STEPS } from "@/lib/constants/creation-steps";
import {
  clearDraft,
  loadDraft,
  saveDraft,
  saveCharacter,
} from "@/lib/storage/characters";
import type { Character, CharacterDraft } from "@/lib/types/character";
import { calculateProficiencyBonus } from "@/lib/rules/calculate";

type CreationShellProps = {
  initialDraft: CharacterDraft;
};

export function CreationShell({ initialDraft }: CreationShellProps) {
  const router = useRouter();
  const [draft, setDraft] = useState<CharacterDraft>(initialDraft);

  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  const step = CREATION_STEPS[draft.step];
  const isFirstStep = draft.step === 0;
  const isLastStep = draft.step === CREATION_STEPS.length - 1;

  function goBack() {
    if (isFirstStep) return;
    setDraft((current) => ({ ...current, step: current.step - 1 }));
  }

  function goNext() {
    if (isLastStep) {
      const character: Character = {
        ...draft,
        createdAt: new Date().toISOString(),
        level: 1,
        proficiencyBonus: calculateProficiencyBonus(1),
        maxHp: 10,
        currentHp: 10,
        ac: 10,
        speed: 30,
      };

      saveCharacter(character);
      clearDraft();
      router.push("/");
      return;
    }

    setDraft((current) => ({ ...current, step: current.step + 1 }));
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col px-4 py-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
          ← Início
        </Link>
        <span className="truncate text-sm text-zinc-600">
          {draft.raceId ?? "Raça"} · {draft.classId ?? "Classe"}
        </span>
      </div>

      <StepProgress currentStep={draft.step} />

      <section className="mt-8 flex flex-1 flex-col">
        <h1 className="text-2xl font-semibold text-zinc-900">{step.title}</h1>
        <p className="mt-2 text-zinc-600">{step.description}</p>

        <div className="mt-8 flex flex-1 flex-col gap-3">
          <PlaceholderStep stepId={step.id} draft={draft} setDraft={setDraft} />
        </div>
      </section>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={isFirstStep}
          className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={goNext}
          className="flex-1 rounded-xl bg-red-800 px-4 py-3 text-sm font-medium text-white hover:bg-red-900"
        >
          {isLastStep ? "Concluir" : "Próximo"}
        </button>
      </div>
    </div>
  );
}

type PlaceholderStepProps = {
  stepId: string;
  draft: CharacterDraft;
  setDraft: React.Dispatch<React.SetStateAction<CharacterDraft>>;
};

function optionButtonClass(selected: boolean): string {
  return [
    "rounded-xl border px-4 py-4 text-left capitalize transition-colors",
    selected
      ? "border-red-900 bg-red-800 font-medium text-white shadow-sm"
      : "border-zinc-300 bg-white text-zinc-900 hover:border-red-400 hover:bg-red-50",
  ].join(" ");
}

function PlaceholderStep({ stepId, draft, setDraft }: PlaceholderStepProps) {
  if (stepId === "race") {
    return (
      <>
        {["human", "elf", "dwarf", "halfling"].map((raceId) => (
          <button
            key={raceId}
            type="button"
            onClick={() => setDraft((current) => ({ ...current, raceId }))}
            className={optionButtonClass(draft.raceId === raceId)}
          >
            {raceId}
          </button>
        ))}
      </>
    );
  }

  if (stepId === "class") {
    return (
      <>
        {["barbarian", "fighter", "rogue", "wizard"].map((classId) => (
          <button
            key={classId}
            type="button"
            onClick={() => setDraft((current) => ({ ...current, classId }))}
            className={optionButtonClass(draft.classId === classId)}
          >
            {classId}
          </button>
        ))}
      </>
    );
  }

  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-8 text-center text-sm text-zinc-600">
      Conteúdo do passo &quot;{stepId}&quot; será implementado com os dados SRD.
    </div>
  );
}
