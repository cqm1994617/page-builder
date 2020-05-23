import React, { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'antd'

const _getList = () => {
  const appStorage = localStorage.getItem('appList')

  try {
    if (appStorage) {
      const appList = JSON.parse(appStorage)
      return appList
    } else {
      return []
    }
  } catch (err) {
    localStorage.removeItem('appList')
    return []
  }
}

function useAppList() {

  const [appList, setAppList] = useState([])

  useEffect(() => {
    setAppList(_getList())
  }, [])

  const _setAppList = (list) => {
    setAppList(list || [])
    if (list) {
      localStorage.setItem('appList', JSON.stringify(list))
    } else {
      localStorage.removeItem('appList')
    }
  }

  const _checkName = (name) => {
    const list = _getList()
    return list.map(item => item.name).includes(name)
  }

  const getAppDetail = useCallback((appId) => {
    const list = _getList()
    const app = list.filter(item => item.id === appId)[0] || null
    
    return app
  }, [])

  const addApp = useCallback((app) => {
    if (!_checkName(app.name)) {
      const list = _getList()
      const id = uuidv4()
      list.push({
        ...app,
        id
      })
      _setAppList(list)

      return id
    }
    message.warn('应用名重复，请更改')
    return false
  }, [])

  const editAppInfo = useCallback((app) => {
    if (!_checkName(app.name)) {
      const list = _getList()
      const newList = list.map(item => {
        if (app.id === item.id) {
          return {
            ...item,
            name: app.name,
            desc: app.desc
          }
        }
        return item
      })
      _setAppList(newList)

      return true
    }
    message.warn('应用名重复，请更改')
    return false
  }, [])

  const saveAppLayout = useCallback((appId, layout) => {
    const list = _getList()
    const newList = list.map(item => {
      if (appId === item.id) {
        return {
          ...item,
          layout
        }
      }
      return item
    })
    _setAppList(newList)
  }, [])

  const removeApp = useCallback((appId) => {
    const list = _getList()
    const newList = list.filter(item => {
      return item.id !== appId
    })
    _setAppList(newList)
  }, [])

  const clearApp = useCallback(() => {
    _setAppList()
  }, [])

  return {
    appList,
    getAppDetail,
    addApp,
    editAppInfo,
    saveAppLayout,
    removeApp,
    clearApp
  }

}

export default useAppList
