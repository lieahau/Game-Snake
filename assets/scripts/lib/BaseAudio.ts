import {
  _decorator,
  Component,
  Node,
  AudioSource,
  game,
  assetManager,
  AudioClip,
} from "cc";
import { GAME_EVENT } from "../enum/events/GameEvent";
import { getSoundStateFromLocalStorage } from "../utils/localStorage";
const { ccclass, property } = _decorator;

@ccclass("BaseAudio")
export class BaseAudio extends Component {
  private audioSource?: AudioSource | null;

  constructor(
    name: string,
    protected readonly audioKey: string,
    protected loop = false,
    protected volume = 1
  ) {
    super(name);
  }

  onLoad() {
    this.audioSource = this.getComponent(AudioSource);
    game.on(GAME_EVENT.SOUND_STATE_CHANGE, this.onSoundStateChange, this);

    this.node.once(Node.EventType.NODE_DESTROYED, () => {
      game.off(GAME_EVENT.SOUND_STATE_CHANGE, this.onSoundStateChange, this);
    });
  }

  start() {
    
  }

  public play() {
    this.setupAudio();
    this.audioSource?.play();
  }

  public stop() {
    this.audioSource?.stop();
  }

  private onSoundStateChange() {
    this.setVolume(this.volume);
  }

  private isMuted() {
    return !getSoundStateFromLocalStorage();
  }

  private setVolume(volume: number) {
    const { audioSource } = this;

    if (!audioSource) return;

    if (this.isMuted()) {
      audioSource.volume = 0;
    } else {
      audioSource.volume = volume;
    }
  }

  private getAudioClip() {
    return assetManager.assets.get(this.audioKey) as AudioClip;
  }

  private setupAudio() {
    const { audioSource, loop, volume } = this;
    const audioClip = this.getAudioClip();

    if (!audioSource || !audioClip) return;

    audioSource.clip = audioClip;
    audioSource.loop = loop;
    this.setVolume(volume);
  }
}
