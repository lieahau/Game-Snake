export enum PRELOAD_EVENT {
  /**
   * callback: (key: string, loaderProgress: number) => void;
   */
  LOAD_ASSET_SUCCESS = "load_asset_success",
  /**
   * callback: (key: string) => void;
   */
  LOAD_ASSET_FAILURE = "load_asset_failure",
  /**
   * callback: () => void;
   */
  LOAD_ASSET_COMPLETE = "load_asset_complete",
}
