import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './components/admin'
import Editor from './components/editor'
import Home from './components/home'
import Layout from './components/layout'
import LinkPage from './components/linkPage'

import Login from './components/login'
import Lounge from './components/lounge'
import Register from './components/register'
import Unauthorized from './components/unauthorized'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        {/* protected */}
        <Route path='/' element={<Home />} />
        <Route path='editor' element={<Editor />} />
        <Route path='admin' element={<Admin />} />
        <Route path='Lounge' element={<Lounge />} />
        {/* catch all */}
        {/* <Route path='*' element={<Missing />} /> */}
      </Route>
    </Routes>
  )
}

export default App
