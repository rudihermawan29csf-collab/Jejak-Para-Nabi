
export interface PlayerStats {
  iman: number;
  akhlak: number;
  keberanian: number;
}

export interface Choice {
  text: string;
  effect: {
    iman: number;
    akhlak: number;
    keberanian: number;
  };
  feedback: string; // Immediate text response after clicking
  nextSceneId: string | 'NEXT_CHAPTER' | 'GAME_OVER';
}

export interface Scene {
  id: string;
  text: string;
  bgDesc: string; // Description for AI context or Alt text
  choices: Choice[];
  imagePlaceholder: string; // URL keyword for picsum
}

export interface Chapter {
  id: number;
  title: string;
  prophetName: string;
  introText: string;
  worldDesc: string; // Detailed description for context
  scenes: Record<string, Scene>;
  startingSceneId: string;
  hikmah: string; // Quote at the end
}

export enum GamePhase {
  START,
  LOGIN,
  CHAPTER_INTRO,
  PLAYING,
  CHAPTER_END,
  EVALUATION
}
