import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Input,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";
import { BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import noresult from "../assets/images/noresult.jpg";

import { filterData, getFilterValues } from "../utils/filterData";

const SearchBar = () => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationId, setLocationId] = useState("");
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query: query });
  };

  const showLocationSetter = (value) => {
    setSearchTerm(value);
    if (value !== "") {
      setLoading(true);
      setShowLocations(true);
    } else {
      setLoading(false);
      setShowLocations(false);
    }
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        const data = await fetchApi(
          `${baseUrl}/auto-complete?hitsPerPage=10&query=${searchTerm}`
        );
        setLocationData(data?.hits);
        setLoading(false);
      };
      fetchData();
    }
  }, [searchTerm]);

  return (
    <Box
      justifyContent="center"
      overflow="hidden"
      backgroundImage="\houseAnimi.jpg"
      height="450px"
      width="100%"
      backgroundSize="97%"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      backgroundPosition="center"
    >
      {console.log(searchTerm)}
      <Box
        width="45%"
        height="18%"
        backgroundColor={"gray.200"}
        borderRadius="25px"
        marginLeft="25%"
        marginTop="8%"
      >
        <Box>
          <Input
            width="65%"
            height="8"
            marginLeft="5%"
            marginTop="5%"
            value={searchTerm}
            textAlign="center"
            fontWeight={1}
            fontSize={18}
            background="gray.100"
            color="tomato"
            variant="outline"
            placeholder="Looking For Properties"
            _placeholder={{ color: "inherit" }}
            padding="10px"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Looking For Properties")}
            onChange={(e) => {
              showLocationSetter(e.target.value);
            }}
          />
          <Link href={`/search?locationExternalIDs=${locationId}`} passHref>
            <Button
              width="18%"
              height="8"
              marginTop="-1.2%"
              marginLeft="3%"
              color="gray.200"
              fontWeight={1}
              fontSize={18}
              variant="outline"
              leftIcon={<BiSearchAlt2 />}
              background="orange.400"
            >
              Search
            </Button>
          </Link>
        </Box>
        {showLocations && (
          <Box>
            {locationData?.map((location) => (
              <Flex
                key={location.id}
                flexDirection="column"
                cursor="pointer"
                border="none"
                height="30px"
                width="65%"
                marginLeft="5%"
                marginTop="-1%"
                overflow="visible"
                textAlign="center"
                fontWeight={1}
                fontSize={18}
                background="gray.100"
                color="tomato"
                onClick={(e) => {
                  setShowLocations(false);
                  setSearchTerm(location.name);
                  setLocationId(location.externalID);
                }}
              >
                <Text>{location.name}</Text>
              </Flex>
            ))}
            {!loading && !locationData?.length && (
              <Flex
                background="gray.100"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                marginTop="1"
                marginLeft="5%"
                height="10%"
                width="40%"
                overflow="visible"
              >
                <Text fontSize="xl" marginTop="3" color="blue.300">
                  No Result Found
                </Text>
              </Flex>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default SearchBar;
