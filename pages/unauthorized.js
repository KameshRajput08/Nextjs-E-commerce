import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {

    const router = useRouter();
    const { message } = router.query;

    return (
        <Layout title="Unauthorized Page">
            <div className='min-h-[80vh] flex items-center justify-center gap-4'>
                <h1 className="text-xl">Access Denied</h1>
                <Link href={`/login`}>{message && <div className="text-red-500">{message}</div>}</Link>
            </div>

        </Layout>
    );
}
