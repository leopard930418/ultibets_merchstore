import { Box, Flex, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Tees from '../../../components/Tees';
import { TeesData } from '../../../constant';

const MenTshirts = () => {
  const router = useRouter();
  const menTshirts = TeesData.filter((obj) => {
    return obj.code == router.pathname.split('/')[2];
  });

  return (
    <Box
      bg={'#1F1F1F'}
      width={['auto', 'auto', '100vw', '100vw']}
      height={['auto', 'auto', '100vw', '100vw']}
    >
      <Flex
        direction={'column'}
        gap={'10px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(1, 1fr)',
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
          ]}
          mr={'25px'}
          gap='50px'
          mb={'20px'}
        >
          {menTshirts.map((tee) => {
            return (
              <Tees
                key={tee.id}
                id={tee.id}
                name={tee.name}
                price={tee.price}
                image={tee.image}
              />
            );
          })}
        </Grid>
      </Flex>
    </Box>
  );
};
export default MenTshirts;
