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
import Missing from './components/missing'
import PersistLogin from './components/persist_login'
import Register from './components/register'
import RequireAuth from './components/require_auth'
import Unauthorized from './components/unauthorized'

const ROLES = { user: 2001, editor: 1984, admin: 5150 };

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
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.editor]} />}>
            <Route path='editor' element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.editor, ROLES.admin]} />}>
            <Route path='Lounge' element={<Lounge />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
