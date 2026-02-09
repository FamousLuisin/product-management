import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/app.tsx'
import Layout from './components/layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          path: "/",
          Component: App,
        }
      ]
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
