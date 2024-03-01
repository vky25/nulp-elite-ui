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
        setCategories(data[0].terms);
        setSubCategories(data[1].terms);
        setTopics(data[2].terms);
        setLanguages(data[3].terms);
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
    if (selectedLanguages.length === languages.length) {
      setSelectedLanguages([]);
    } else {
      setSelectedLanguages(languages.map((language) => language.name));
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your preferences</ModalHeader>
          <CloseButton onClick={onClose} />
          <ModalBody>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select category" borderRadius={"12px"}>
                {categories.map((category) => (
                  <option key={category.index} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Sub-Category</FormLabel>
              <Select placeholder="Select sub-category" borderRadius={"12px"}>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.index} value={subCategory.value}>
                    {subCategory.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Stack direction="column" spacing={2}>
              <Box>
                <FormLabel>Language</FormLabel>
              </Box>
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
              >
                <Box flex="1" pl={2}>
                  {selectedLanguages.map((language, index) => (
                    <Box
                      key={index}
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
                    isChecked={selectedLanguages.length === languages.length}
                    onChange={handleSelectAll}
                  >
                    Select All
                  </Checkbox>
                  {languages.map((language) => (
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
              <FormLabel>Topic</FormLabel>
              <Select placeholder="Select topic" borderRadius={"12px"}>
                {topics.map((topic) => (
                  <option key={topic.index} value={topic.value}>
                    {topic.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
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
