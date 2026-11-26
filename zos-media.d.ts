// declare this module since for some reason the type declarations are missing

declare module "@zos/media" {
  export interface Player {
    event: { PREPARE: number; COMPLETE: number };
    source: { FILE: number };
    addEventListener(event: number, cb: (result: boolean) => void): void;
    setSource(type: number, opts: { file: string }): void;
    prepare(): void;
    start(): void;
    stop(): void;
    // release(): void;
    // getDuration(): number;
  }
  export const id: { PLAYER: number };
  export function create(type: number): Player;
}
