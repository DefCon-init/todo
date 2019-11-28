/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import * as Types from './action-types'

const getAll = todos => ({
  type: Types.GET_ALL_TODO,
  payload: { todos },
})

const addCall = todo => ({
  type: Types.ADD_TODO,
  payload: { todo },
})

const deleteCall = id => ({
  type: Types.DELETE_TODO,
  payload: { id },
})

const toggleStatus = id => ({
  type: Types.TOGGLE_TODO_STATUS,
  payload: { id },
})

const completeAllTodo = date => ({
  type: Types.COMPLETE_ALL_TODOS,
  payload: { date },
})

const deleteAllTodo = date => ({
  type: Types.DELETE_ALL_TODOS,
  payload: { date },
})

export const updateStatusFilter = status => ({
  type: Types.UPDATE_TODO_STATUS_FILTER,
  payload: { status },
})

export const updateDateFilter = ({ key, value }) => ({
  type: Types.UPDATE_TODO_DATE_FILTER,
  payload: {
    key,
    value,
  },
})

export const getAllTodos = (date) => {
  return dispatch => {
    fetch(`http://localhost:5000/todos/getAll`, {
      method: 'POST',
      body: JSON.stringify({ date }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((body) => {
        body.map(todo  => {
          return {
            ...todo,
            id: todo._id,
            date: new Date(todo.date)
          }
        })
        console.log(body)
        dispatch(getAll(body))
      })
      .catch(err => console.error(err))
  }
}

export const addTodo = todo => {
  return dispatch => {
    fetch('http://localhost:5000/todos/add', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((body) => {
        console.log(body)
        const { todo: resTodo } = body
        dispatch(addCall({ ...resTodo, id: resTodo._id, date: new Date(resTodo.date) }))
      })
      .catch(err => console.error(err))
  }
}

export const deleteTodo = id => {
  return dispatch => {
    fetch(`http://localhost:5000/todos/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((body) => {
        console.log(body)
        dispatch(deleteCall(id))
      })
      .catch(err => console.error(err))
  }
}

export const toggleTodoStatus = id => {
  return dispatch => {
    fetch(`http://localhost:5000/todos/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((body) => {
        console.log(body)
        dispatch(toggleStatus(id))
      })
      .catch(err => console.error(err))
  }
}

export const completeAll = date => {
  return dispatch => {
    fetch(`http://localhost:5000/todos/completeAll`, {
      method: 'POST',
      body: JSON.stringify({ date }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((body) => {
        console.log(body)
        dispatch(completeAllTodo(date))
      })
      .catch(err => console.error(err))
  }
}

export const deleteAll = date => {
  return dispatch => {
    fetch(`http://localhost:5000/todos/deleteAll`, {
      method: 'POST',
      body: JSON.stringify({ date }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((body) => {
        console.log(body)
        dispatch(deleteAllTodo(date))
      })
      .catch(err => console.error(err))
  }
}