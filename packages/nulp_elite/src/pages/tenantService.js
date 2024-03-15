import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import URLSConfig from "../configs/urlConfig.json";
import { post, get } from "@shiksha/common-lib";
import _ from "lodash";

function Tenant() {
  const [frameWork, setFrameWork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTenantInfo();
    getTenantConfig();
  }, []);

  async function getTenantInfo(slug) {
    try {
      const url =
        "http://localhost:3000/learner" +
        URLSConfig.URLS.TENANT.INFO +
        "/" +
        (slug ? slug : "");
      const response = await get(url);
      console.log(response.data.result);
      setFrameWork(response.data.result);
    } catch (error) {
      setError(error.message);
    }
  }

  async function getTenantConfig(slug) {
    try {
      slug = slug ? slug : "";
      const url =
        "http://localhost:3000/learner/" +
        URLSConfig.URLS.SYSTEM_SETTING.TENANT_CONFIG +
        "/" +
        slug;
      const response = await get(url);
      if (response && response.result && response.result.response) {
        const configResponse = JSON.parse(response.result.response.value);
        return configResponse;
      } else {
        return {};
      }
    } catch (error) {
      setError(error.message);
      return {};
    }
  }

  async function getSlugDefaultTenantInfo(slug) {
    try {
      const url =
        "http://localhost:3000/learner/" +
        URLSConfig.URLS.SYSTEM_SETTING.TENANT_CONFIG +
        "/" +
        slug;
      const response = await get(url);
      const data = response.result.response
        ? JSON.parse(response.result.response.value)
        : {};
      setTenantSettings(data);
    } catch (error) {
      console.error(error);
    }
  }

  function setTenantSettings(settingsResponse) {
    const data = _.get(settingsResponse.result, "response");
    if (data) {
      setFrameWork(JSON.parse(settingsResponse.result.response.value));
    }
  }

  return (
    <Box textAlign="center" padding="10">
      <Heading as="h1" size="2xl" marginBottom="4">
        Welcome to Our Learning Portal Content
      </Heading>
      <Text fontSize="xl" marginBottom="8">
        Enhance your knowledge and skills with our diverse range of courses and
        content.
      </Text>
      <Button colorScheme="blue" size="lg">
        Explore Courses
      </Button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {frameWork && (
        <div>
          <p>FrameWork: {JSON.stringify(getTenantConfig)}</p>
        </div>
      )}
    </Box>
  );
}

export default Tenant;
