import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {

    const queryClient = new QueryClient();

    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </StrictMode>
    )
}