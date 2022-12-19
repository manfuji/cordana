let initialUser
let profile
if (typeof window !== 'undefined') {
  initialUser = JSON.parse(localStorage.getItem('user')) || null
  profile = JSON.parse(localStorage.getItem('profile')) || null
}
export const initialState = {
  user: initialUser,
  stateProfile: profile,
  post: [],
}
