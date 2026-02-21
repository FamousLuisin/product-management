import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/app.tsx'
import Layout from './components/layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Product from './routes/products.tsx'
import Materials from './routes/materials.tsx'
import Productions from './routes/production.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="overflow-x-hidden">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider> 
  </StrictMode>
)
