import Dashboard from '../usercomponent/dashboard'
import { BackContext} from '../context/backcontext';
import { AddtaskContext } from '../context/backcontext';
import { edittaskContext } from '../context/backcontext';
import React from 'react';
const User = () => {

  const [back, setBack] = React.useState(false);
  const [taskadd, setTaskadd] = React.useState(false);
  const [edittask, setEdittask] = React.useState(false);


  return (
  
      <BackContext.Provider value={{ back, setBack }}>
        <AddtaskContext.Provider value={{ taskadd, setTaskadd }}>
          <edittaskContext.Provider value={{ edittask, setEdittask }}>
            <div>
              <Dashboard />
            </div>
          </edittaskContext.Provider>
        </AddtaskContext.Provider>
      </BackContext.Provider>
  )
}

export default User
