import type { AbilityKey, CharacterDraft, SkillKey } from "@/lib/types/character";

export const RACE_OPTIONS = ["human", "elf", "dwarf", "halfling"] as const;
export const CLASS_OPTIONS = ["barbarian", "fighter", "rogue", "wizard"] as const;
export const BACKGROUND_OPTIONS = ["acolyte", "criminal", "soldier", "sage"] as const;

export type RaceId = (typeof RACE_OPTIONS)[number];
export type ClassId = (typeof CLASS_OPTIONS)[number];
export type BackgroundId = (typeof BACKGROUND_OPTIONS)[number];

export const CLASS_RULES: Record<
  ClassId,
  {
    hitDie: number;
    skillChoices: number;
    skillPool: SkillKey[];
  }
> = {
  barbarian: {
    hitDie: 12,
    skillChoices: 2,
    skillPool: [
      "animalHandling",
      "athletics",
      "intimidation",
      "nature",
      "perception",
      "survival",
    ],
  },
  fighter: {
    hitDie: 10,
    skillChoices: 2,
    skillPool: [
      "acrobatics",
      "animalHandling",
      "athletics",
      "history",
      "insight",
      "intimidation",
      "perception",
      "survival",
    ],
  },
  rogue: {
    hitDie: 8,
    skillChoices: 4,
    skillPool: [
      "acrobatics",
      "athletics",
      "deception",
      "insight",
      "intimidation",
      "investigation",
      "perception",
      "performance",
      "persuasion",
      "sleightOfHand",
      "stealth",
    ],
  },
  wizard: {
    hitDie: 6,
    skillChoices: 2,
    skillPool: [
      "arcana",
      "history",
      "insight",
      "investigation",
      "medicine",
      "religion",
    ],
  },
};

export const RACE_RULES: Record<
  RaceId,
  {
    speed: number;
    abilityBonuses: Partial<Record<AbilityKey, number>>;
  }
> = {
  human: {
    speed: 30,
    abilityBonuses: {
      str: 1,
      dex: 1,
      con: 1,
      int: 1,
      wis: 1,
      cha: 1,
    },
  },
  elf: {
    speed: 30,
    abilityBonuses: {
      dex: 2,
    },
  },
  dwarf: {
    speed: 25,
    abilityBonuses: {
      con: 2,
    },
  },
  halfling: {
    speed: 25,
    abilityBonuses: {
      dex: 2,
    },
  },
};

export const BACKGROUND_RULES: Record<
  BackgroundId,
  { grantedSkills: [SkillKey, SkillKey] }
> = {
  acolyte: {
    grantedSkills: ["insight", "religion"],
  },
  criminal: {
    grantedSkills: ["deception", "stealth"],
  },
  soldier: {
    grantedSkills: ["athletics", "intimidation"],
  },
  sage: {
    grantedSkills: ["arcana", "history"],
  },
};

export const RACE_LABELS: Record<RaceId, string> = {
  human: "human",
  elf: "elf",
  dwarf: "dwarf",
  halfling: "halfling",
};

export const CLASS_LABELS: Record<ClassId, string> = {
  barbarian: "barbarian",
  fighter: "fighter",
  rogue: "rogue",
  wizard: "wizard",
};

export const BACKGROUND_LABELS: Record<BackgroundId, string> = {
  acolyte: "acolyte",
  criminal: "criminal",
  soldier: "soldier",
  sage: "sage",
};

export const ABILITY_LABELS: Record<AbilityKey, string> = {
  str: "STR",
  dex: "DEX",
  con: "CON",
  int: "INT",
  wis: "WIS",
  cha: "CHA",
};

export const SKILL_LABELS: Record<SkillKey, string> = {
  acrobatics: "Acrobatics",
  animalHandling: "Animal Handling",
  arcana: "Arcana",
  athletics: "Athletics",
  deception: "Deception",
  history: "History",
  insight: "Insight",
  intimidation: "Intimidation",
  investigation: "Investigation",
  medicine: "Medicine",
  nature: "Nature",
  perception: "Perception",
  performance: "Performance",
  persuasion: "Persuasion",
  religion: "Religion",
  sleightOfHand: "Sleight of Hand",
  stealth: "Stealth",
  survival: "Survival",
};

const ALL_SKILLS: SkillKey[] = [
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
];

export function applyRacialAbilityBonuses(
  abilities: CharacterDraft["abilities"],
  raceId: string | null,
): CharacterDraft["abilities"] {
  if (!raceId || !(raceId in RACE_RULES)) {
    return abilities;
  }

  const bonuses = RACE_RULES[raceId as RaceId].abilityBonuses;
  const finalAbilities = { ...abilities };

  for (const key of Object.keys(finalAbilities) as AbilityKey[]) {
    finalAbilities[key] += bonuses[key] ?? 0;
  }

  return finalAbilities;
}

export function getFinalSkillProficiencies(
  classSkills: SkillKey[],
  backgroundId: string | null,
): SkillKey[] {
  if (!backgroundId || !(backgroundId in BACKGROUND_RULES)) {
    return classSkills;
  }

  const grantedSkills = BACKGROUND_RULES[backgroundId as BackgroundId].grantedSkills;
  const expectedSize = classSkills.length + grantedSkills.length;
  const uniqueSkills = [...new Set<SkillKey>([...classSkills, ...grantedSkills])];

  if (uniqueSkills.length >= expectedSize) {
    return uniqueSkills;
  }

  const replacements = ALL_SKILLS.filter((skill) => !uniqueSkills.includes(skill));
  const missingCount = expectedSize - uniqueSkills.length;

  return [...uniqueSkills, ...replacements.slice(0, missingCount)];
}
