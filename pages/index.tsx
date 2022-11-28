import { Flex, Spinner } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../components/Header';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/merch-store');
  }, [router]);

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      justifyContent={'center'}
      align={'center'}
    >
      <Spinner color='white' />
    </Flex>
  );
};

export default Home;
