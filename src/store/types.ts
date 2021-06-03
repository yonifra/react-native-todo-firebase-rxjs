import {Action} from 'redux'
import {Epic} from 'redux-observable'
import {ActionsType} from '@app/domain/states/store'
import {RootState} from '@app/domain/states/reducers'

export interface IEffectPayload<T = any, L = boolean> {
  loading: L
  data?: T
}

export interface IEffectAction<T = any> extends Action {
  type: string
  payload?: IEffectPayload<T>
}

export type StreamType = Epic<ActionsType, ActionsType, RootState>
