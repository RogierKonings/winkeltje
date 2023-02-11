import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from 'src/utils/firebase/firebase.utils'
import {signInFailed, signInSuccess, signUpFailed, signUpSuccess} from './user.action'
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

export function* signUp({payload: {email, password, displayName}}: any) {
  try {
    const {user} = yield call(createAuthUserWithEmailAndPassword, email, password)
    yield put(signUpSuccess(user, {displayName}))
  } catch (error: any) {
    yield put(signUpFailed(error))
  }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}: any) {
  yield call(getSnapshopFromUserAuth, user, additionalDetails)
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

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ])
}
