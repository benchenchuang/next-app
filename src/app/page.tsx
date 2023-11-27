'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

const App = () => {
    const router = useRouter();
    useEffect(() => {
        let token = '11';
        if (token) {
            router.push('/admin/dashboard')
        } else {
            router.push('/login')
        }
    }, [router])
}

export default App