import { AUTH, COMPANY, PROFILE, RECENT } from './Constants'

export const Reducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.user,
      }
    case PROFILE:
      return {
        ...state,
        stateProfile: action.profile,
      }
    default:
      return state
  }
}
