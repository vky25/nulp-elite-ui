import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Stack,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { frameworkService } from "@shiksha/common-lib";
import { ChevronDownIcon } from "@chakra-ui/icons";

const UserPrefPopup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showCheckboxOptions, setShowCheckboxOptions] = useState(false);
  const [frameworkCategories, getFrameworkCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const headers = {
        "Content-Type": "application/json",
      };
      const url = `https://nulp.niua.org/api/framework/v1/read/nulp`;
      try {
        const response = await frameworkService.getFrameworkCategories(
          url,
          headers
        );
        const data = response.data.result.framework.categories;
        setCategories(data[0]);
        setSubCategories(data[1]);
        setTopics(data[2]);
        setLanguages(data[3]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleLanguageChange = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const isChecked = (language) => {
    return selectedLanguages.includes(language);
  };

  const handleSelectAll = () => {
    if (selectedLanguages.length === languages?.terms?.length) {
      setSelectedLanguages([]);
    } else {
      setSelectedLanguages(languages?.terms?.map((language) => language.name));
    }
  };

  const updateUserData = async () => {
    setIsLoading(true);
    setError(null);
    const headers = {
      "Content-Type": "application/json",
    };
    const requestBody = {
      framework: {
        board: ["Audit"],
        gradeLevel: [],
        id: "nulp",
        medium: [],
      },
      userId: "5d757783-a86a-40cd-a814-1b6a16d37cb6",
    };
    const url = `https://nulp.niua.org/learner/user/v3/update`;
    try {
      const response = await frameworkService.updateUserData(
        url,
        headers,
        requestBody
      );
      const data = response?.result?.response;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Preferences</ModalHeader>
          <CloseButton
            onClick={onClose}
            position={"absolute"}
            right={"10px"}
            top={"10px"}
          />
          <ModalBody>
            <FormControl>
              <Select
                placeholder={categories.name}
                borderRadius={"12px"}
                margin={"20px"}
              >
                {categories?.terms?.map((category) => (
                  <option key={category.index} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <Select
                placeholder={subCategories.name}
                borderRadius={"12px"}
                margin={"20px"}
              >
                {subCategories?.terms?.map((subCategory) => (
                  <option key={subCategory.index} value={subCategory.value}>
                    {subCategory.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Stack direction="column" spacing={2}>
              <Box
                w={"100%"}
                display={"flex"}
                alignItems="center"
                minHeight={"40px"}
                border={"1px solid"}
                borderColor={"gray.200"}
                borderRadius={"12px"}
                onClick={() => setShowCheckboxOptions(!showCheckboxOptions)}
                cursor="pointer"
                position="relative"
                margin={"20px"}
              >
                <Box flex="1" pl={2}>
                  {selectedLanguages.map((language) => (
                    <Box
                      key={language.id}
                      bg="gray.100"
                      p={1}
                      m={1}
                      borderRadius="md"
                      display="inline-block"
                    >
                      {language}
                    </Box>
                  ))}
                </Box>
                <Icon
                  as={ChevronDownIcon}
                  w={6}
                  h={6}
                  mr={2}
                  color="black.500"
                  position="absolute"
                  right={2}
                  top="50%"
                  transform="translateY(-50%)"
                />
              </Box>
              {showCheckboxOptions && (
                <>
                  <Checkbox
                    isChecked={
                      selectedLanguages.length === languages?.terms?.length
                    }
                    onChange={handleSelectAll}
                  >
                    Select All
                  </Checkbox>
                  {languages?.terms?.map((language) => (
                    <Checkbox
                      key={language.id}
                      isChecked={isChecked(language.name)}
                      onChange={() => handleLanguageChange(language.name)}
                    >
                      {language.name}
                    </Checkbox>
                  ))}
                </>
              )}
            </Stack>
            <FormControl>
              <Select
                placeholder={topics.name}
                borderRadius={"12px"}
                margin={"20px"}
              >
                {topics?.term?.map((topic) => (
                  <option key={topic.index} value={topic.value}>
                    {topic.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateUserData}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserPrefPopup;
