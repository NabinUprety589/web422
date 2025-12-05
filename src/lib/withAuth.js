import { isAuthenticated } from './authenticate';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function Protected(props) {
    const router = useRouter();
    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace('/login');
      }
    }, [router]);
    return <Component {...props} />;
  };
}
