import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Form',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Submissions',
    to: '/submissions',
    icon: <CIcon name="cil-check" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Register New Device',
    to: '/new-device',
    icon: <CIcon name="cil-pencil" customClasses="c-sidebar-nav-icon"/>,
  },
]

export default _nav
