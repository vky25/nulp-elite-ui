// Courses.js
import React,{useState, useEffect} from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
  Image,
  Heading,
  useDisclose,
  Menu,
} from "native-base";
import { Layout, IconByName, SearchLayout } from "@shiksha/common-lib";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import URLSConfig from "../configs/urlConfig.json";

import {
  batchSearch,
  getUserList,
  globalUserSearch,
  getSubOrganisationDetails,
  userSearch,
  orgSearch,
  courseSearch,
  updateOption,
} from "../services/searchService";
const Courses = () => {
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const [data, setData] = useState({});

  const colors = "";
  const [sortArray, setSortArray] = React.useState([]);
  const [showModalSort, setShowModalSort] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [error, setError] = useState(null);
  const [requestParam, setRequestParam] = useState({
    filters: {
      primaryCategory: [
        "Collection",
        "Resource",
        "Content Playlist",
        "Course",
        "Course Assessment",
        "Digital Textbook",
        "eTextbook",
        "Explanation Content",
        "Learning Resource",
        "Lesson Plan Unit",
        "Practice Question Set",
        "Teacher Resource",
        "Textbook Unit",
        "LessonPlan",
        "FocusSpot",
        "Learning Outcome Definition",
        "Curiosity Questions",
        "MarkingSchemeRubric",
        "ExplanationResource",
        "ExperientialResource",
        "Practice Resource",
        "TVLesson",
        "Course Unit",
        "Exam Question"
    ]},
    offset: 0,
    pageNumber: 1,
    facets: [
  "se_boards",
  "se_gradeLevels",
  "se_subjects",
  "se_mediums",
  "primaryCategory"
],
    limit: 10,
    sort_by: {
      "lastPublishedOn": "desc"
    }
    // Add other properties with default values if needed
  });

  const navigate = useNavigate();
  useEffect(() => { 
    courseSearchPage();   
    batchSearchPage();
  }, []);
  const headers = {
    "content-type": "Application/json",
  };
  const courseSearchPage = async () => {
   try {
      const url = "http://localhost:3000/learner/" + URLSConfig.URLS.COURSE.SEARCH;
      const request = {
       
          filters: { primaryCategory: requestParam.filters.primaryCategory},
          fields: requestParam.fields || [],
          offset: (requestParam.pageNumber - 1) * requestParam.limit,
          limit: requestParam.limit,
          query: requestParam.query,
          sort_by: requestParam.sort_by,
          facets: requestParam.facets
        
      };
      const response = await courseSearch(url, request, headers);
      console.log("courseSearch---",response);
      setData(response);
    } catch (error) {
      console.log("courseSearch error---",error);

      setError(error.message);
    } finally {
      // setIsLoading(false);
    }
  };
  const batchSearchPage = async () => {
   
    try {
      const offset =
        requestParam.offset === 0 || requestParam.offset
          ? requestParam.offset
          : (requestParam.pageNumber - 1) * requestParam.limit;
      const url =
        "http://localhost:3000/learner/" + URLSConfig.URLS.BATCH.GET_BATCHS;
      const request = {       
          filters: requestParam.filters,
          offset,
          limit: requestParam.limit,
          sort_by: requestParam.sort_by,     
      };
      const response = await batchSearch(url, request, headers);
      console.log("batchSearchPage--", response);
      setData(response);
    } catch (error) {
      console.log("batch error---",error);
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
                  <Menu.Item onPress={(item) => navigate("/help")}>
                    Help
                  </Menu.Item>
                  <Menu.Item onPress={(item) => navigate("/logoff")}>
                    Logout
                  </Menu.Item>
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
                }}
              >
                <Menu.Item>English</Menu.Item>
                <Menu.Item> Hindi</Menu.Item>
              </Menu>
            </Box>
          </Box>
        ),
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
        <Text fontSize="xl" marginBottom="8">
          Enhance your knowledge and skills with our diverse range of courses
          and content.
        </Text>
        <Button colorScheme="blue" size="lg">
          Explore Courses
        </Button>
      </Box>
      </Layout> 
  );
};

export default Courses;
