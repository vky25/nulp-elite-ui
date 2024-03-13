// Profile.js
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Layout
    isDisabledAppBar={true}
   _header={
    <Link
           to="/Courses"
           style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
         >
            <IconByName size='20px' name='MenuFillIcon' />
         </Link>
  //   {
  //    title: "User Name",
  //    // isEnableSearchBtn: true,
  //    subHeading: "Hello",
  //    iconComponent: (
  //      <Link
  //        to="/Courses"
  //        style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
  //      >
  //         <IconByName size='20px' name='Notification2LineIcon' />
  //      </Link>
  //    ),
  //  }
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
      <Button colorScheme="blue" size="lg">
        Log Out
      </Button>
    </Box>
 
 <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Contents" element={<Contents />} />
       <Route path="/Courses" element={<Courses />} />
       <Route path="/Sample" element={<Sample />} />
 </Routes>    
 </Layout>
  
  );
};

export default Profile;