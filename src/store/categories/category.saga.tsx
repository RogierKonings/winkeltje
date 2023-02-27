import {takeLatest, all, call, put} from 'redux-saga/effects'
import {getCategoriesAndDocuments} from 'src/utils/firebase/firebase.utils'
import {fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess} from './category.reducer'

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray: Record<string, unknown> = yield call(getCategoriesAndDocuments, 'categories')
    yield put(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    yield put(fetchCategoriesFailed(error))
  }
}

export function* onFetchCategories() {
  yield takeLatest(fetchCategoriesStart, fetchCategoriesAsync)
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)])
}
