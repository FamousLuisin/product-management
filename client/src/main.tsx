import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/app.tsx'
import Layout from './components/layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Product from './routes/products.tsx'
import Materials from './routes/materials.tsx'
import Productions from './routes/production.tsx'

const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          path: "/",
          Component: App,
        }, 
        {
          path: "/products",
          Component: Product,
        },
        {
          path: "/materials",
          Component: Materials
        },
        {
          path: "/manufacturing",
          Component: Productions
        }
      ]
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="overflow-x-hidden">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
)
