import { useContext } from 'react';
import { AuthContext } from './authContext';
import { fetchUser } from './api';
import Header from './Header';


function App() {
  const { auth } = useContext(AuthContext)

  const submit = () => {
    fetchUser ({ auth })
  };

  return (
    <>
      <div className='p-5'>
        <h1></h1>
      </div>
    </>
  )
}

export default App
