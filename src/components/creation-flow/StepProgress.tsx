import { CREATION_STEPS } from "@/lib/constants/creation-steps";

type StepProgressProps = {
  currentStep: number;
};

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {CREATION_STEPS.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step.id}
              className={[
                "h-2 flex-1 rounded-full transition-colors",
                isComplete || isCurrent ? "bg-red-800" : "bg-zinc-300",
                isCurrent ? "ring-2 ring-red-300" : "",
              ].join(" ")}
              aria-label={`Passo ${index + 1}: ${step.title}`}
            />
          );
        })}
      </div>
      <p className="text-sm text-zinc-500">
        Passo {currentStep + 1} de {CREATION_STEPS.length}
      </p>
    </div>
  );
}
