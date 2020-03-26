import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Header from '../src/Components/Header'
import Buku from '../src/Pages/Buku'
import Anggota from '../src/Pages/Anggota'
import Peminjaman from '../src/Pages/Peminjaman'

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Header {...this.props} />
        <Switch>
          <Route path="/" exact render={()=>(<Redirect to="/Buku" />)}/>
          <Route path="/Buku" render={(props)=>(<Buku {...props} />)}/>
          <Route path="/Anggota" render={(props)=>(<Anggota {...props} />)}/>
          <Route path="/Peminjaman" render={(props)=>(<Peminjaman {...props} />)}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App