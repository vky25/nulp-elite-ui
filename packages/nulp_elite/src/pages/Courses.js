// Courses.js
import React from "react";
import { NativeBaseProvider,Box, Stack, VStack,Text, HStack, Button,  Image,extendTheme,H4,H1,BodyLarge,Avatar,
  Actionsheet,ScrollView,Heading } from "native-base";
import { Layout,IconByName,SearchLayout,FilterButton,overrideColorTheme } from "@shiksha/common-lib";
import { Link , useParams} from "react-router-dom";

const Courses = () => {
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const colors = '';  
  const [sortArray, setSortArray] = React.useState([]);

  return (
    <Layout
    isDisabledAppBar={true}
    _header={
      {
        customeComponent: (
          <Box flex={1}  minH={"40px"}>
            <HStack>
          <Image
          maxH={"140px"}
              rounded="10px"
              w={"100%"}
              h={"100%"}
              source={{
                uri: "../assets/nulp_logo.jpeg",
              }
               }
            />
            </HStack>
          {/* <Avatar
           size="48px"
           borderRadius=""
              source={require("../assets/nulp_logo.jpeg")}
          /> */}
         
          {/* <VStack>
          <Avatar
            size="37px"
            borderRadius="md"
            source={{
              uri: "https://via.placeholder.com/50x50.png",
            }}
          />
          </VStack> */}
          
          </Box>
        ),
        // title: "User Name",
        // // isEnableSearchBtn: true,
        // subHeading: "Hello",
        // iconComponent: (
        //   <Link
        //     to="/Courses"
        //     style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
        //   >
        //      <IconByName size='20px' name='Notification2LineIcon' />
        //   </Link>
        // ),
      }
      // <Link
      //        to="/Courses"
      //        style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
      //      >
      //       <HStack space="50" justifyContent="space-between">
      //    <VStack>
      //         <IconByName size='20px' name='MenuFillIcon' />
              
      //         </VStack>
      //         </HStack>
      //      </Link>
     
    }
   subHeader={
   
     <Link
       to="/"
       style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
     >
       <HStack space="4" justifyContent="space-between">
         <VStack>
         <SearchLayout
     {...{
       search,
       setSearch,
       // minStringLenght: 3,
       notFoundMessage: "TYPE_TO_START_SEARCHING_LEARNING",
       onCloseSearch: setSearchState,
     }}
   >
   </SearchLayout>
         </VStack>
       </HStack>
      </Link>
   }
   _subHeader={{ bg: "rgb(248, 117, 88)" }}
   _footer={{
    menues: [
      {
        title: "Search",
        icon: "SearchLineIcon",
        route: "/contents",
      },
      {
       title: "Contents",
       icon: "BookOpenLineIcon",
       route: "/all",
     },
     {
       title: "AccountCircleLineIcon",
       icon: "TeamLineIcon",
       route: "/home",
     },
      {
        title: "Profie",
        icon: "AccountCircleLineIcon",
        route: "/profile",
      }
      
     
    ],
  }}
 >

<Box textAlign="center" padding="10">
      <Heading as="h1" size="2xl" marginBottom="4">
        Welcome to Our Learning Portal
      </Heading>
      <Text fontSize="xl" marginBottom="8">
        Enhance your knowledge and skills with our diverse range of courses and
        content.
      </Text>
      <Button colorScheme="blue" size="lg">
        Explore Courses
      </Button>
    </Box> 
 </Layout>
   
  );
};

export default Courses;
