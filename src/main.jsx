import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppProvider>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#1a1a2e',
                            color: '#f1f5f9',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                            fontSize: '0.875rem',
                        },
                        success: {
                            iconTheme: { primary: '#10b981', secondary: '#1a1a2e' },
                        },
                        error: {
                            iconTheme: { primary: '#f43f5e', secondary: '#1a1a2e' },
                        },
                    }}
                />
            </AppProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
