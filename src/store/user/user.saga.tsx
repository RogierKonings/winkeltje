import {all, call, put, takeLatest} from 'redux-saga/effects'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser
} from 'src/utils/firebase/firebase.utils'
import {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  signUpFailed,
  signUpStart,
  signUpSuccess
} from './user.reducer'

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
    yield put(signUpSuccess({user, displayName}))
  } catch (error: any) {
    yield put(signUpFailed(error))
  }
}

export function* signOut() {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch (error: any) {
    yield put(signOutFailed(error))
  }
}

export function* signInAfterSignUp({payload: {user, additionalDetails}}: any) {
  yield call(getSnapshopFromUserAuth, user, additionalDetails)
}

export function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart, signInWithGoogle)
}

export function* onCheckUserSession() {
  yield takeLatest(checkUserSession, isUserAuthenticated)
}

export function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart, signInWithEmail)
}

export function* onSignUpStart() {
  yield takeLatest(signUpStart, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(signUpSuccess, signInAfterSignUp)
}

export function* onSignOutStart() {
  yield takeLatest(signOutStart, signOut)
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ])
}
