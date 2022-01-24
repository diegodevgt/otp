import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Submissions = React.lazy(() => import('./views/otp/Submissions'));
const NewDevice = React.lazy(() => import('./views/otp/NewDevice'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/submissions', name: 'Submissions', component: Submissions },
  { path: '/new-device', name: 'New Device', component: NewDevice },
];

export default routes;
