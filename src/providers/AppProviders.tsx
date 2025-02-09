import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PicturesProvider } from './PicturesProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {

    const queryClient = new QueryClient();

    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <PicturesProvider>{children}</PicturesProvider>
            </QueryClientProvider>
        </StrictMode>
    )
}