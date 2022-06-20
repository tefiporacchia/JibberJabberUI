import * as React from 'react'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../Keycloak"
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { DataContainer, DataContext } from '../data/dataContext'
import { MainRouter } from './mainRouter'
import { createDataContainer } from './dataContainerInitializer'
import { UserLoader } from './userLoader'

export const App = () => {
  const [dataContainer, setDataContainer] = useState<DataContainer | undefined>()

  useEffect(() => {
    createDataContainer()
      .then(container => setDataContainer(container))
  }, [])

  if (dataContainer === undefined)
    return (<div>Loading ...</div>)

  return (
      <ReactKeycloakProvider authClient={keycloak}>
        <DataContext.Provider value={dataContainer}>
          <BrowserRouter>
            <UserLoader>
              <MainRouter/>
            </UserLoader>
          </BrowserRouter>
        </DataContext.Provider>
      </ReactKeycloakProvider>

  )
}
