import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '@/views/Dashboard'
import NotFound from '@/layout/status/NotFound'
import AppLayout from '@/layout/AppLayout'
import { Tools } from '@/views/tools'
import { Task } from '@/views/task'
import { Hosts } from '@/views/tools/Hosts'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'tools',
                element: <Tools />,
            },
            {
                path: '/task',
                element: <Task />,
            },
            {
                path: '/hosts',
                element: <Hosts />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
])

export default router
