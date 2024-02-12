import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { H2, Heading, BodyLarge, Widget } from "@shiksha/common-lib";
import { Layout, NameTag } from "@shiksha/common-lib";
import { Box, Stack, VStack,Text, HStack, Avatar, Image, Button } from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import manifest from "../../src/manifest.json";
import "ag-grid-community/styles/ag-grid.css";


export default function Sample() {
  return (
<div>
<Layout
      _header={{
        title: "Sample Module",
        isEnableSearchBtn: true,
        subHeading: "Sub Heading of Sub Module",
        iconComponent: (
          <Link
            to="/"
            style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
          >
          </Link>
        ),
      }}
      subHeader={
        <Link
          to="/"
          style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
        >
          <HStack space="4" justifyContent="space-between">
            <VStack>
              <Text fontSize={"lg"}>preferences</Text>
            </VStack>
          </HStack>
        </Link>
      }
      _subHeader={{ bg: "rgb(248, 117, 88)" }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            route: "/",
          },
          {
            title: "Courses",
            icon: "BookOpenLineIcon",
            route: "/Courses",
          },
          {
            title: "All",
            icon: "GovernmentLineIcon",
            route: "/Contents",
          },
          {
            title: "Discussion Forum",
            icon: "TeamLineIcon",
            route: "/",
          }
        ],
      }}
    >
      <h1>Sample Module</h1>
    </Layout>
</div>

  );
}
