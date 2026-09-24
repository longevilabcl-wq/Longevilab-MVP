import { LongevityResponses, SavedState } from '../types';

const STORAGE_KEY = 'longevilab_progress_v1';

export function loadSavedProgress(): SavedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: SavedState = JSON.parse(raw);
    if (parsed && typeof parsed.currentStep === 'number' && parsed.responses) {
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load saved progress:', error);
  }
  return null;
}

export function saveProgress(currentStep: number, responses: LongevityResponses, isComplete: boolean = false): void {
  if (typeof window === 'undefined') return;
  try {
    const state: SavedState = {
      currentStep,
      responses,
      updatedAt: new Date().toISOString(),
      isComplete,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
}
