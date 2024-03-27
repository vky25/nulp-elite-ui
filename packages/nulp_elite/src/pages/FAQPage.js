import React, { useEffect, useState } from "react";
// import { post, get, update } from "../services/RestClient.ts";
import {
  View,
  Heading,
  Text,
  Box,
  h6,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "native-base";
var data= {};
 fetch('https://nulpstorage1.blob.core.windows.net/public/portal-faq/resources/res/faq-en.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(result => {
     data=  result;
  })

const FAQPage = () => {
  return (
    <View>
      {/* Loop through categories */}
      {data.categories.map((category, index) => (
        <View key={index}>
          <Box>
            {/* Render category name */}
            <Heading fontSize="xl" p="4" pb="3">
              {category.name}
            </Heading>
          </Box>
          {/* Render dropdown for FAQs */}
          {category.faqs.map((faq, faqIndex) => (
            <View key={faqIndex}>
              <h6>{faq.topic}</h6>
              <div dangerouslySetInnerHTML={{ __html: faq.description }}></div>
              {/* Render description (with HTML parsing) */}
              {/* <Text>{faq.description}</Text> */}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default FAQPage;
