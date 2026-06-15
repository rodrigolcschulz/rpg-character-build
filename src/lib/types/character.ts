export type AbilityKey = "str" | "dex" | "con" | "int" | "wis" | "cha";

export type Abilities = Record<AbilityKey, number>;

export type SkillKey =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

export type CharacterDraft = {
  id: string;
  step: number;
  updatedAt: string;
  name: string;
  raceId: string | null;
  classId: string | null;
  backgroundId: string | null;
  abilities: Abilities;
  skillProficiencies: SkillKey[];
  equipmentIds: string[];
};

export type Character = CharacterDraft & {
  createdAt: string;
  level: number;
  proficiencyBonus: number;
  maxHp: number;
  currentHp: number;
  ac: number;
  speed: number;
};

export const DEFAULT_ABILITIES: Abilities = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
};

export function createEmptyDraft(id: string): CharacterDraft {
  return {
    id,
    step: 0,
    updatedAt: new Date().toISOString(),
    name: "",
    raceId: null,
    classId: null,
    backgroundId: null,
    abilities: { ...DEFAULT_ABILITIES },
    skillProficiencies: [],
    equipmentIds: [],
  };
}
