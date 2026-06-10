import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

const Dashboard = lazy(() =>
  import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })),
)
const Pipeline = lazy(() =>
  import('@/pages/Pipeline').then((m) => ({ default: m.Pipeline })),
)
const Properties = lazy(() =>
  import('@/pages/Properties').then((m) => ({ default: m.Properties })),
)
const Visits = lazy(() =>
  import('@/pages/Visits').then((m) => ({ default: m.Visits })),
)
const Leads = lazy(() =>
  import('@/pages/Leads').then((m) => ({ default: m.Leads })),
)
const Settings = lazy(() =>
  import('@/pages/Settings').then((m) => ({ default: m.Settings })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'funil', element: <Pipeline /> },
      { path: 'imoveis', element: <Properties /> },
      { path: 'visitas', element: <Visits /> },
      { path: 'leads', element: <Leads /> },
      { path: 'configuracoes', element: <Settings /> },
    ],
  },
])
