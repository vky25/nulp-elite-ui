// Profile.js

import React, { useState, useEffect } from "react";
// import { Box, Heading, Text, Button } from '@chakra-ui/react';
import {
  Layout,
  IconByName,
  SearchLayout,
  FilterButton,
  overrideColorTheme,
} from "@shiksha/common-lib";
import {
  NativeBaseProvider,
  Box,
  Stack,
  VStack,
  Text,
  HStack,
  Button,
  extendTheme,
  Actionsheet,
  ScrollView,
  Heading,
  useDisclose,
  Menu,
  Image,
} from "native-base";
import { Link, useParams } from "react-router-dom";
import {
  endSession,
  getOrganizationDetails,
  acceptTermsAndConditions,
  getUserByKey,
  registerUser,
  userMigrate,
  getUserData,
  getFeedData,
  getIsUserExistsUserByKey,
  updateGuestUser,
  createGuestUser,
  updateAnonymousUserDetails,
  createAnonymousUser,
  getGuestUser,
  getAnonymousUserPreference,
  updateUserData,
} from "../services/userService";
import URLSConfig from "../configs/urlConfig.json";

const Profile = () => {
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  // const userId = document.getElementById('userId').value;
  useEffect(() => {   
    getUserDataPage();
  }, []);
  const headers = {
    "content-type": "Application/json",
  };
  const getUserDataPage = async () => {
    try {
      // setIsLoading(true);
      const params = URLSConfig.params.userReadParam.fields;
      const baseUrl =
        "http://localhost:3000/learner/" + URLSConfig.URLS.USER.GET_PROFILE; // Assuming this does not contain /modules/nulp_elite
      const url = `${baseUrl}5d757783-a86a-40cd-a814-1b6a16d37cb6?fields=${params}`;
      console.log("now", url);
      const response = await getUserData(url, headers);
      console.log(response);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      // setIsLoading(false);
    }
  };


  return (
    <Layout
      isDisabledAppBar={true}
      _header={{
        rightIcon: (
          <HStack paddingBottom={"25px"}>
            <IconByName name="CloseCircleFillIcon" />
          </HStack>
        ),
        customeComponent: (
          <Box flex={1} minH={"40px"}>
            <HStack>
              <VStack position={"relative"} padding="10px" top={"10px"}>
                <Menu
                  w="160"
                  trigger={(triggerProps) => {
                    return (
                      <Button
                        alignSelf="center"
                        variant="solid"
                        {...triggerProps}
                      >
                        <IconByName size="20px" name="MenuFillIcon" />
                      </Button>
                    );
                  }}
                >
                  <Menu.Item>Help</Menu.Item>
                  <Menu.Item>Logout</Menu.Item>
                </Menu>
              </VStack>

              <VStack>
                <Image
                  source={require("../assets/nulp_logo.jpeg")}
                  alt=""
                  size="sm"
                />
              </VStack>
            </HStack>

            {/* <Right> */}
            <Box position={"absolute"} right={"20px"} top={"10px"}>
              <Menu
                w="160"
                trigger={(triggerProps) => {
                  return (
                    <Button
                      alignSelf="center"
                      variant="solid"
                      {...triggerProps}
                    >
                      Language
                    </Button>
                  );
                  // }}>
                }}
              >
                <Menu.Item>English</Menu.Item>
                <Menu.Item> Hindi</Menu.Item>
              </Menu>
            </Box>
            {/* </Right> */}

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

        // ),
      }}
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
              ></SearchLayout>
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
            title: "Connections",
            icon: "TeamLineIcon",
            route: "/home",
          },
          {
            title: "Profie",
            icon: "AccountCircleLineIcon",
            route: "/profile",
          },
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
    </Layout>
  );
};

export default Profile;
