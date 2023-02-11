import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from 'src/utils/firebase/firebase.utils'
import {signInFailed, signInSuccess} from './user.action'
import {USER_ACTION_TYPES} from './user.types'

export function* getSnapshopFromUserAuth(userAuth: any, additionalDetails: any) {
  try {
    const userSnapshot: Record<string, unknown> = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
    yield put(signInSuccess({id: userSnapshot.id, ...(userSnapshot as any).data()}))
  } catch (error: any) {
    yield put(signInFailed(error))
  }
}

export function* signInWithGoogle() {
  try {
    const {user} = yield call(signInWithGooglePopup)
    yield call(getSnapshopFromUserAuth, user, null)
  } catch (error: any) {
    yield put(signInFailed(error))
  }
}

export function* signInWithEmail({payload: {email, password}}: any) {
  try {
    const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password)
    yield call(getSnapshopFromUserAuth, user, null)
  } catch (error: any) {
    yield put(signInFailed(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth: Record<string, unknown> = yield call(getCurrentUser)
    if (!userAuth) {
      return
    }
    yield call(getSnapshopFromUserAuth, userAuth, null)
  } catch (error: any) {
    yield put(signInFailed(error))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
  yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart)])
}
