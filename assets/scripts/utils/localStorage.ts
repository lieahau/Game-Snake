import { game } from "cc";
import { GAME_EVENT } from "../enum/events/GameEvent";
import { LOCAL_STORAGE_KEY } from "../enum/LocalStorageEnum";

export function getHighscoreFromLocalStorage() {
  return Number(localStorage.getItem(LOCAL_STORAGE_KEY.HIGHSCORE)) || 0;
}

export function updateLocalStorageHighscore(highscore: number) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY.HIGHSCORE, 
    Math.round(highscore).toString()
  );
}

export function getSoundStateFromLocalStorage() {
  const state = localStorage.getItem(LOCAL_STORAGE_KEY.SOUND_STATE);

  if (state === undefined || state === null) {
    return true;
  }

  return Boolean(Number(state));
}

export function updateLocalStorageSoundState(state: boolean) {
  const value = (state) ? 1 : 0;
  localStorage.setItem(
    LOCAL_STORAGE_KEY.SOUND_STATE,
    value.toString()
  );

  game?.emit(GAME_EVENT.SOUND_STATE_CHANGE, state);
}