import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Flex, Box, Text, Button, Wrap, Input, InputGroup, InputLeftAddon, Center } from "@chakra-ui/react";
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from "../components/Property";
import { BiSearchAlt2 } from 'react-icons/bi';
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";

import { filterData, getFilterValues } from "../utils/filterData";

export const SearchBar = () => {

  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("bla bla");
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showLocationSetter = (value) => {
    setSearchTerm(value)
    if (value !== "") {
      setShowLocations(true);
    }
    else { setShowLocations(false); }
  }

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        const data = await fetchApi(
          `${baseUrl}/auto-complete?hitsPerPage=10&query=${searchTerm}`
        );
        setLocationData(data?.hits);
      }
      fetchData();
    }
  }, [searchTerm]);


  return (

    <Box justifyContent="center" overflow='hidden' backgroundImage="\houseAnimi.jpg" height="450px" width="100%" backgroundSize="97%" backgroundRepeat="no-repeat" backgroundAttachment="fixed" backgroundPosition="center"  >
      {console.log(searchTerm)}
      <Box width='45%' height='18%' backgroundColor={"gray.200"} borderRadius='25px' marginLeft='25%' marginTop='8%'>
        <Box>
          <Input width='65%' height='8' marginLeft='5%' marginTop='5%' textAlign='center' fontWeight={1} fontSize={18} background='gray.100' color='tomato' variant='outline' placeholder="Looking For Properties" _placeholder={{ color: 'inherit' }} padding="10px" onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = 'Looking For Properties'}
            onChange={(e) => showLocationSetter(e.target.value)} />

          <Button width='18%' height='8' marginTop='-1.2%' marginLeft='3%' color='gray.200' fontWeight={1} fontSize={18} variant='outline' leftIcon={<BiSearchAlt2 />} background='orange.400' >
            Search
          </Button>
        </Box>
        {showLocations &&
          <Box height="100px" >
            {locationData?.map((location) => (
              <Flex key={location.id} flexDirection='column' border='none' height='30px' width='65%' marginLeft='5%' marginTop='-1%' overflow='visible' textAlign='center' fontWeight={1} fontSize={18} background='gray.100' color='tomato'>

                <Text>{location.name}</Text>

              </Flex>
            ))}
          </Box>
        }
      </Box>
    </Box>

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
