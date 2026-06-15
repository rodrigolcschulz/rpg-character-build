export const CREATION_STEPS = [
  { id: "race", title: "Raça", description: "Escolha a raça do personagem" },
  { id: "class", title: "Classe", description: "Escolha a classe" },
  {
    id: "background",
    title: "Background",
    description: "Escolha o antecedente",
  },
  {
    id: "abilities",
    title: "Atributos",
    description: "Defina STR, DEX, CON, INT, WIS e CHA",
  },
  {
    id: "skills",
    title: "Perícias",
    description: "Escolha proficiências em perícias",
  },
  {
    id: "equipment",
    title: "Equipamento",
    description: "Selecione o equipamento inicial",
  },
  {
    id: "review",
    title: "Revisão",
    description: "Confira tudo antes de concluir",
  },
] as const;

export type CreationStepId = (typeof CREATION_STEPS)[number]["id"];
