import { describe, it, expect } from 'vitest';
import { getKirbyEmotion, getKirbyGif } from '../../src/lib/kirbyEmotion';
import type { TamagotchiState } from '../../src/types/tamagotchi';
import { KIRBY_GIFS } from "../../src/const/kirbyState";

describe('getKirbyEmotion', () => {
  it('debería devolver muy mal si el promedio es < 20 y ninguna estadística crítica está baja', () => {
    const state: TamagotchiState = {
      hunger: 19, happiness: 19, energy: 19, health: 30, // health >= 30, los demás >= 19
    } as TamagotchiState;
    const result = getKirbyEmotion(state);
    expect(result.mood.status).toBe('muy mal');
    expect(result.gifType).toBe('sad');
  });
  it('debería devolver estado durmiendo si state es null', () => {
    const result = getKirbyEmotion(null);
    expect(result.mood.emoji).toBe('😴');
    expect(result.mood.status).toBe('durmiendo');
    expect(result.gifType).toBe('idle');
    expect(result.message).toContain('durmiendo');
  });

  it('debería devolver muy mal si alguna estadística crítica está baja', () => {
    const state: TamagotchiState = {
      hunger: 10, happiness: 50, energy: 50, health: 50,
    } as TamagotchiState;
    const result = getKirbyEmotion(state);
    expect(result.mood.status).toBe('muy mal');
    expect(result.gifType).toBe('sad');
  });

  it('debería devolver muy feliz si el promedio es >= 80', () => {
    const state: TamagotchiState = {
      hunger: 90, happiness: 90, energy: 80, health: 80,
    } as TamagotchiState;
    const result = getKirbyEmotion(state);
    expect(result.mood.status).toBe('muy feliz');
    expect(result.gifType).toBe('happy');
  });

  it('debería devolver contento si el promedio es >= 60', () => {
    const state: TamagotchiState = {
      hunger: 70, happiness: 60, energy: 60, health: 70,
    } as TamagotchiState;
    const result = getKirbyEmotion(state);
    expect(result.mood.status).toBe('contento');
    expect(result.gifType).toBe('happy');
  });

  it('debería devolver normal si el promedio es >= 40', () => {
    const state: TamagotchiState = {
      hunger: 40, happiness: 40, energy: 40, health: 40,
    } as TamagotchiState;
    const result = getKirbyEmotion(state);
    expect(result.mood.status).toBe('normal');
    expect(result.gifType).toBe('idle');
  });

  it('debería devolver triste si el promedio es >= 20', () => {
    const state: TamagotchiState = {
      hunger: 30, happiness: 30, energy: 30, health: 30,
    } as TamagotchiState;
    const result = getKirbyEmotion(state);
    expect(result.mood.status).toBe('triste');
    expect(result.gifType).toBe('sad');
  });

  it('debería devolver muy mal si el promedio es < 20', () => {
    const state: TamagotchiState = {
      hunger: 10, happiness: 10, energy: 10, health: 10,
    } as TamagotchiState;
    const result = getKirbyEmotion(state);
    expect(result.mood.status).toBe('muy mal');
    expect(result.gifType).toBe('sad');
  });
});

describe('getKirbyGif', () => {

  it('debería devolver el gif correcto para la acción playing', () => {
    const state: TamagotchiState = {
      hunger: 60, happiness: 80, energy: 70, health: 70,
    } as TamagotchiState;
    const result = getKirbyGif("playing", getKirbyEmotion(state), 0);
    expect(result).toBe(KIRBY_GIFS.playing[0]);
  });
  it('debería devolver el gif correcto para la acción sleeping', () => {
    const state: TamagotchiState = {
      hunger: 60, happiness: 60, energy: 60, health: 60,
    } as TamagotchiState;
    const result = getKirbyGif("sleeping", getKirbyEmotion(state), 0);
    expect(result).toBe(KIRBY_GIFS.sleeping[0]);
  });
  it('debería devolver el gif correcto para emoción happy', () => {
    const state: TamagotchiState = {
      hunger: 90, happiness: 90, energy: 90, health: 90,
    } as TamagotchiState;
    const emotion = getKirbyEmotion(state);
    const result = getKirbyGif("", emotion, 0);
    expect(result).toBe(KIRBY_GIFS.happy[0]);
  });
  it('debería devolver el gif correcto para emoción sad', () => {
    const state: TamagotchiState = {
      hunger: 10, happiness: 10, energy: 10, health: 10,
    } as TamagotchiState;
    const emotion = getKirbyEmotion(state);
    const result = getKirbyGif("", emotion, 0);
    expect(result).toBe(KIRBY_GIFS.sad[0]);
  });
  it('debería devolver el gif correcto para emoción idle', () => {
    const state: TamagotchiState = {
      hunger: 50, happiness: 50, energy: 50, health: 50,
    } as TamagotchiState;
    const emotion = getKirbyEmotion(state);
    const result = getKirbyGif("", { ...emotion, gifType: "idle" }, 0);
    expect(result).toBe(KIRBY_GIFS.idle[0]);
  });
  it('debería devolver el gif idle si el tipo de emoción no existe', () => {
    const state: TamagotchiState = {
      hunger: 50, happiness: 50, energy: 50, health: 50,
    } as TamagotchiState;
    const emotion = getKirbyEmotion(state);
    const result = getKirbyGif("", { ...emotion, gifType: "noExiste" as any }, 0);
    expect(result).toBe(KIRBY_GIFS.idle[0]);
  });
});
