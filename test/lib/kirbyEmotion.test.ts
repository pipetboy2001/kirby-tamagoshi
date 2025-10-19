import { describe, it, expect } from 'vitest';
import { getKirbyEmotion } from '../../src/lib/kirbyEmotion';
import type { TamagotchiState } from '../../src/types/tamagotchi';

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
      hunger: 50, happiness: 40, energy: 40, health: 40,
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
