'use client';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const goBack = ()=>{
        router.back()
    }
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={goBack}>返回</Button>}
            />
        </div>
    )
}