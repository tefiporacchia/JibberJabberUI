import * as React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { DataContainer, DataContext } from '../data/dataContext'
import { MainRouter } from './mainRouter'
import { createDataContainer } from './dataContainerInitializer'

export const App = () => {
  const [dataContainer, setDataContainer] = useState<DataContainer | undefined>()

  useEffect(() => {
    createDataContainer()
      .then(container => setDataContainer(container))
  }, [])

  if (dataContainer === undefined)
    return (<div>Loading ...</div>)

  return (
    <DataContext.Provider value={dataContainer}>
      <BrowserRouter>
        <MainRouter/>
      </BrowserRouter>
    </DataContext.Provider>
  )
}
