import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import URLSConfig from "../configs/urlConfig.json";
// import { userService } from "@shiksha/common-lib";
import { userService } from "@shiksha/common-lib";
import { logDOM } from "@testing-library/react";
import * as _ from "lodash-es";
import { post, get } from "@shiksha/common-lib";

const Search = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestParam, setRequestParam] = useState({
    filters: {},
    offset: 0,
    pageNumber: 1,
    limit: 10,
    // Add other properties with default values if needed
  });

  useEffect(() => {
    batchSearch();
    getUserList();
    globalUserSearch();
    getSubOrganisationDetails();
    courseSearch();
    userSearch();
    orgSearch();
    contentSearch();
  }, []);

  const headers = {
    "content-type": "Application/json",
  };

  const batchSearch = async () => {
    try {
      const offset =
        requestParam.offset === 0 || requestParam.offset
          ? requestParam.offset
          : (requestParam.pageNumber - 1) * requestParam.limit;
      const url =
        "http://localhost:3000/learner/" + URLSConfig.URLS.BATCH.GET_BATCHS;
      const data = {
        request: {
          filters: requestParam.filters,
          offset,
          limit: requestParam.limit,
          sort_by: requestParam.sort_by,
        },
      };
      const response = await post(url, data, headers);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserList = async () => {
    try {
      const offset =
        requestParam.offset === 0 || requestParam.offset
          ? requestParam.offset
          : (requestParam.pageNumber - 1) * requestParam.limit;
      const url =
        "http://localhost:3000/learner/" + URLSConfig.URLS.ADMIN.USER_SEARCH;
      const data = {
        request: {
          filters: requestParam.filters,
          offset,
          limit: requestParam.limit,
          sort_by: requestParam.sort_by,
        },
      };
      const response = await post(url, data, headers);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const globalUserSearch = async () => {
    try {
      const offset =
        requestParam.offset === 0 || requestParam.offset
          ? requestParam.offset
          : (requestParam.pageNumber - 1) * requestParam.limit;
      const url =
        "http://localhost:3000/learner/" + URLSConfig.URLS.ADMIN.USER_SEARCH;
      const data = {
        request: {
          filters: requestParam.filters,
        },
      };
      const response = await post(url, data, headers);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubOrganisationDetails = async () => {
    try {
      const url =
        "http://localhost:3000/api/" + URLSConfig.URLS.ADMIN.ORG_EXT_SEARCH;
      const data = {
        request: {
          filters: {
            rootOrgId: requestParam.rootOrgId,
          },
        },
      };
      const response = await post(url, data, headers);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const userSearch = async () => {
    try {
      const url =
        "http://localhost:3000/learner/" + URLSConfig.URLS.ADMIN.USER_SEARCH;
      const data = {
        request: {
          filters: requestParam.filters,
          limit: requestParam.limit,
          offset: (requestParam.pageNumber - 1) * requestParam.limit,
          query: requestParam.query,
          softConstraints: { badgeAssertions: 1 },
        },
      };
      const response = await post(url, data, headers);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const orgSearch = async () => {
    try {
      const url =
        "http://localhost:3000/api/" + URLSConfig.URLS.ADMIN.ORG_EXT_SEARCH;
      const data = {
        request: {
          filters: requestParam.filters,
          limit: requestParam.limit,
          offset: (requestParam.pageNumber - 1) * requestParam.limit,
          query: requestParam.query,
          ...(requestParam.fields && { fields: requestParam.fields }),
        },
      };
      const response = await post(url, data, headers);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const courseSearch = async () => {
    try {
      const url = "http://localhost:3000/api/" + URLSConfig.URLS.COURSE.SEARCH;
      const data = {
        request: {
          filters: requestParam.filters,
          fields: requestParam.fields || [],
          offset: (requestParam.pageNumber - 1) * requestParam.limit,
          limit: requestParam.limit,
          query: requestParam.query,
          sort_by: requestParam.sort_by,
          facets: requestParam.facets,
        },
      };
      const response = await post(url, data, headers);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const contentSearch = async () => {
    try {
      const option = {
        url: "http://localhost:3000/learner/" + URLSConfig.URLS.CONTENT.SEARCH,
        data: {
          request: {
            filters: requestParam.filters,
            limit: requestParam.limit,
            query: requestParam.query,
            sort_by: requestParam.sort_by,
            exists: requestParam.exists,
            fields: requestParam.fields,
            softConstraints: requestParam.softConstraints,
            mode: requestParam.mode,
            facets: requestParam.facets && requestParam.facets,
          },
        },
      };
      option["data"] = await updateOption(option);
      if (requestParam["pageNumber"] && requestParam["limit"]) {
        option.data.request["offset"] =
          (requestParam.pageNumber - 1) * requestParam.limit;
      }
      const response = await post(option);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOption = (option) => {
    if (_.get(option, "data.request.filters.board")) {
      option.data.request.filters["se_boards"] =
        option.data.request.filters.board;
      delete option.data.request.filters.board;
    }
    if (_.get(option, "data.request.filters.gradeLevel")) {
      option.data.request.filters["se_gradeLevels"] =
        option.data.request.filters.gradeLevel;
      delete option.data.request.filters.gradeLevel;
    }
    if (_.get(option, "data.request.filters.medium")) {
      option.data.request.filters["se_mediums"] =
        option.data.request.filters.medium;
      delete option.data.request.filters.medium;
    }

    return option.data;
  };

  const handleFilterChange = (field, value) => {};

  return (
    <Box textAlign="center" padding="10">
      <Heading as="h1" size="2xl" marginBottom="4">
        Welcome to Our Learning Portal Content
      </Heading>
      <Text fontSize="xl" marginBottom="8">
        Enhance your knowledge and skills with our diverse range of courses and
        content.
      </Text>
      <Button colorScheme="blue" size="lg" onClick={batchSearch}>
        Get User Data
      </Button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {Object.keys(data).map((key) => (
        <div key={key}>
          <p>
            {key}: {JSON.stringify(data[key])}
          </p>
        </div>
      ))}
    </Box>
  );
};

export default Search;
