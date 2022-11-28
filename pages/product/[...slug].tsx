import { Box, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import DetailedTee from '../../components/DetailedTee';
import { TeesData } from '../../constant';

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const tee = TeesData.find((obj) => {
    return obj.id == router.query.slug;
  });

  return (
    <Box
      bg={'#1F1F1F'}
      width={'100vw'}
      height={['auto', 'auto', '100vh', '100vh']}
    >
      {' '}
      <DetailedTee
        id={tee?.id as string}
        image={tee?.image as string}
        name={tee?.name as string}
        price={tee?.price as number}
        description={tee?.description as string}
        weight={tee?.weight as number}
      />
    </Box>
  );
};

export default ProductDetails;
