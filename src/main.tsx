
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './pages/routes'
import { Toaster } from './components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Set up QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

console.log('🚀 Application starting...')
console.log('📁 Creating root element')

// Create the root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('❌ Root element not found! Check the index.html file')
} else {
  console.log('✅ Root element found, rendering application')
  
  const root = ReactDOM.createRoot(rootElement)
  
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </React.StrictMode>,
  )
  
  console.log('✅ Application rendered successfully')
}
