import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button, Wrap, Input, InputGroup, InputLeftAddon, Center } from "@chakra-ui/react";
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from "../components/Property";
import rome from "../assets/images/rome.jpg"
import { BiSearchAlt2 } from 'react-icons/bi';


export const SearchBar = () => {

  return (
    <Box justifyContent="center" backgroundImage="\houseAnimi.jpg" height="450px" width="100%" backgroundSize="97%" backgroundRepeat="no-repeat" backgroundAttachment="fixed" backgroundPosition="center"  >
      <Box >
        <Input width='50%' height='8' marginLeft='25%' marginTop='8%' textAlign='center' background='gray.100' color='tomato' variant='outline' placeholder="Looking For Properties" _placeholder={{ color: 'inherit' }} padding="10px" onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Looking For Properties'} />
        <Button width='8%' height='8' marginTop='-0.5%' marginLeft='3%' colorScheme='orange' variant='outline' leftIcon={<BiSearchAlt2 />} background='gray.100'>
          Search
        </Button>
      </Box>
    </Box >
  );
}

export const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button colorScheme='teal' variant='solid'>
        <Link href={linkName}>
          <a>{buttonText}</a>
        </Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesForSale, propertiesForRent }) {
  console.log(propertiesForRent)
  //console.log(marvelMovies);
  return (
    <Box>
      <SearchBar />
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1=' Explore from Apartments, builder floors, villas'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4' />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner
        purpose='BUY A HOME'
        title1=' Find, Buy & Own Your'
        title2='Dream Home'
        desc1=' Explore from Apartments, land, builder floors,'
        desc2=' villas and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008' />
      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  );
}

export async function getStaticProps(context) {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
