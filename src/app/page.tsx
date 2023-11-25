'use client'
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation'

const App = () => {
    const router = useRouter();
    useEffect(() => {
        let token = '11';
        if (token) {
            router.push('/views/dashboard')
        } else {
            router.push('/login')
        }
    }, [router])
}

export default App