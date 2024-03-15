import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import URLSConfig from "../configs/urlConfig.json";
import APPConfig from "../configs/appConfig.json";
import {
  getCourseSection,
  getCourseSectionDetails,
  getQRCodeFile,
  getEnrolledCourses,
} from "../services/courseService";
import * as _ from "lodash-es";

const Coursetest = () => {
  const [data, setData] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [showExtContentMsg, setShowExtContentMsg] = useState(false);
  useEffect(() => {
    getCourseSectionPage();
    getQRCodeFilePage();

    getEnrolledCoursesPage();
  }, []);
  const headers = {
    "content-type": "Application/json",
  };

  const getCourseSectionPage = async () => {
    try {
      const url =
        "http://localhost:3000/learner/" +
        URLSConfig.URLS.SYSTEM_SETTING.SSO_COURSE_SECTION;
      const response = await getCourseSection(url, headers);
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCourseSectionDetails = () => {
    if (sectionId) {
      return of(sectionId);
    }

    return getCourseSection().pipe(
      map((sectionId) => {
        setSectionId(sectionId);
        return sectionId;
      })
    );
  };

  const getQRCodeFilePage = async () => {
    try {
      const url =
        "http://localhost:3000/learner/" +
        URLSConfig.URLS.COURSE.GET_QR_CODE_FILE;
      const data = {
        request: {
          filter: {
            userIds: "5d757783-a86a-40cd-a814-1b6a16d37cb6",
          },
        },
      };
      const response = await getQRCodeFile(url, data, headers);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCourseProgressPage = (courseId, batchId, Progress) => {
    const updatedCourses = _.cloneDeep(enrolledCourses);
    const index = _.findIndex(updatedCourses, {
      courseId: courseId,
      batchId: batchId,
    });
    if (index !== -1) {
      updatedCourses[index].progress = Progress;
      setEnrolledCourses(updatedCourses);
    }
  };

  const setExtContentMsg = (isExtContent) => {
    setShowExtContentMsg(isExtContent ? isExtContent : false);
  };
  const findEnrolledCourses = (enrolledCourses, courseId) => {
    const enrInfo = _.reduce(
      enrolledCourses,
      (acc, cur) => {
        if (cur.courseId !== courseId) {
          return acc;
        }
        if (_.get(cur, "batch.enrollmentType") === "invite-only") {
          if (_.get(cur, "batch.status") === 2) {
            acc.inviteOnlyBatch.expired.push(cur);
            acc.expiredBatchCount++;
          } else {
            acc.onGoingBatchCount++;
            acc.inviteOnlyBatch.ongoing.push(cur);
          }
        } else {
          if (_.get(cur, "batch.status") === 2) {
            acc.expiredBatchCount++;
            acc.openBatch.expired.push(cur);
          } else {
            acc.onGoingBatchCount++;
            acc.openBatch.ongoing.push(cur);
          }
        }
        return acc;
      },
      {
        onGoingBatchCount: 0,
        expiredBatchCount: 0,
        openBatch: { ongoing: [], expired: [] },
        inviteOnlyBatch: { ongoing: [], expired: [] },
      }
    );
    return enrInfo;
  };

  const getEnrolledCoursesPage = async () => {
    try {
      setIsLoading(true);
      const params1 = APPConfig.Course.contentApiQueryParams.orgdetails;
      const params2 = APPConfig.Course.contentApiQueryParams.licenseDetails;
      const params3 = URLSConfig.params.enrolledCourses.fields;
      const params4 = URLSConfig.params.enrolledCourses.batchDetails;

      const baseUrl =
        "http://localhost:3000/learner/" +
        URLSConfig.URLS.COURSE.GET_ENROLLED_COURSES;
      const url = `${baseUrl}/5d757783-a86a-40cd-a814-1b6a16d37cb6?orgdetails=${params1}&licenseDetails=${params2}&fields=${params3}&batchDetails=${params4}`;
      console.log(url);
      const response = await getEnrolledCourses(url, headers);
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
      <Button colorScheme="blue" size="lg" onClick={getEnrolledCourses}>
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

export default Coursetest;
