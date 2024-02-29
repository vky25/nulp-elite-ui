// import { React, useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   CloseButton,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Box,
//   Select,
// } from "@chakra-ui/react";
// import { useDisclosure } from "@chakra-ui/react";
// import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

// function UserPrefPopup() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   // const initialRef = React.useRef(null);
//   // const finalRef = React.useRef(null);

//   return (
//     <>
//       <Button
//         onClick={onOpen}
//         style={{ padding: "10px" }}
//         position="relative"
//         h="10vh"
//         w="30vh"
//       >
//         Open Modal
//       </Button>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />

//         <ModalContent
//           style={{
//             backgroundColor: "#ffffff",
//             borderRadius: "8px",
//             padding: "20px",
//             width: "400px",
//           }}
//         >
//           <ModalHeader
//             style={{
//               fontSize: "20px",
//               fontWeight: "bold",
//               marginBottom: "15px",
//             }}
//           >
//             Your preferences
//           </ModalHeader>
//           <Box position="relative" h="10vh">
//             <CloseButton onClick={onClose} />
//           </Box>

//           <ModalBody style={{ marginBottom: "15px" }}>
//             <FormControl>
//               <FormLabel style={{ fontSize: "16px", marginBottom: "8px" }}>
//                 Category
//               </FormLabel>

//               <Select
//                 placeholder="Select category"
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   border: "1px solid #cccccc",
//                   borderRadius: "4px",
//                   fontSize: "16px",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <option value="option1">Accessibility</option>
//                 <option value="option2">Accessibility</option>
//                 <option value="option3">Audit</option>
//                 <option value="option3">C Section</option>
//                 <option value="option3">City Transformation Office</option>
//                 <option value="option3">Civil</option>
//                 <option value="option3">Community Leadership</option>
//                 <option value="option3">CSR Cell</option>
//                 <option value="option3">Education</option>
//                 <option value="option3">Electrical</option>
//                 <option value="option3">Nulp</option>
//               </Select>
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel style={{ fontSize: "16px", marginBottom: "8px" }}>
//                 Sub - Category
//               </FormLabel>
//               <Input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   border: "1px solid #cccccc",
//                   borderRadius: "4px",
//                   fontSize: "16px",
//                   marginBottom: "10px",
//                 }}
//                 placeholder="Last name"
//               />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel style={{ fontSize: "16px", marginBottom: "8px" }}>
//                 Language
//               </FormLabel>
//               <Input
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   border: "1px solid #cccccc",
//                   borderRadius: "4px",
//                   fontSize: "16px",
//                   marginBottom: "10px",
//                 }}
//                 placeholder="Last name"
//               />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter style={{ display: "flex", justifyContent: "flex-end" }}>
//             <Button
//               colorScheme="blue"
//               style={{
//                 padding: "10px 20px",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "16px",
//                 backgroundColor: "#007bff",
//                 color: "#ffffff",
//                 marginLeft: "10px",
//               }}
//               mr={3}
//             >
//               Save
//             </Button>
//             <Button
//               onClick={onClose}
//               style={{
//                 padding: "10px 20px",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "16px",
//                 backgroundColor: "#cccccc",
//                 color: "#000000",
//               }}
//             >
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
// export default UserPrefPopup;

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
  Input,
  Box,
  Select,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

function UserPrefPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Example API call to fetch all data
    fetch("your-api-url-for-all-data")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setSubCategories(data.subCategories);
        setLanguages(data.languages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        style={{ padding: "10px" }}
        position="relative"
        h="10vh"
        w="30vh"
      >
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "20px",
            width: "400px",
          }}
        >
          <ModalHeader
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Your preferences
          </ModalHeader>
          <Box position="relative" h="10vh">
            <CloseButton onClick={onClose} />
          </Box>

          <ModalBody style={{ marginBottom: "15px" }}>
            <FormControl>
              <FormLabel style={{ fontSize: "16px", marginBottom: "8px" }}>
                Category
              </FormLabel>

              <Select
                placeholder="Select category"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel style={{ fontSize: "16px", marginBottom: "8px" }}>
                Sub-Category
              </FormLabel>

              <Select
                placeholder="Select sub-category"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                {subCategories.map((subCategory) => (
                  <option key={category.id} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel style={{ fontSize: "16px", marginBottom: "8px" }}>
                Language
              </FormLabel>

              <Select
                placeholder="Select language"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                {languages.map((language) => (
                  <option key={language.id} value={language.value}>
                    {language.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              colorScheme="blue"
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "#ffffff",
                marginLeft: "10px",
              }}
              mr={3}
            >
              Save
            </Button>
            <Button
              onClick={onClose}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                backgroundColor: "#cccccc",
                color: "#000000",
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default UserPrefPopup;
