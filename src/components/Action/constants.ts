export enum ButtonActions {
  UPLOAD = 'upload',
  PROCESS = 'process',
  PREVIEW = 'preview'
}

export type ButtonActionsType = 'upload' | 'process' | 'preview';

export interface IButtonActionTypes {
  action: ButtonActions;
}
