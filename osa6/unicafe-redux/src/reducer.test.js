import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'
import { createStore } from 'redux'

describe('unicafe', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const actionGood = {
    type: 'GOOD'
  }

  const actionNeutral = {
    type: 'OK'
  }

  const actionBad = {
    type: 'BAD'
  }

  test('should return a proper initial state when called with undefined state', () => {

    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('storing multiple values and getting them from the store works properly', () => {
    
    const store = createStore(counterReducer)
    store.dispatch(actionGood)
    store.dispatch(actionGood)
    store.dispatch(actionGood)
    store.dispatch(actionNeutral)
    store.dispatch(actionBad)
    store.dispatch(actionBad)
    expect(store.getState()).toEqual({
      good: 3,
      ok: 1,
      bad: 2
    })
  })

  test('reducer function is pure', () => {

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, actionBad)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
})