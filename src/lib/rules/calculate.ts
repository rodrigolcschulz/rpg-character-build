import type { Abilities, AbilityKey } from "@/lib/types/character";

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function calculateProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

export function getAbilityModifier(
  abilities: Abilities,
  key: AbilityKey,
): number {
  return calculateModifier(abilities[key]);
}

export function formatModifier(modifier: number): string {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}
