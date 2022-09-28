import styled from "@emotion/styled";
import React, { useState } from "react";

import { ColorKey, getColor, GRAY_RANGE } from "../colors";
import { FoodCard, PriceRating } from "../components/foodCard";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexCol, H1, Page } from "../stylePrimitives";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  padding-top: 80px;
`;

const Frame = styled(FlexCol)`
  align-items: center;
  gap: 1em;
`;

const maxPageWidth = "1440px";

export const Index = () => {
  useBackgroundColor(getColor(ColorKey.BACKGROUND));
  useTextColor(GRAY_RANGE[0]);

  return (
    <Page maxWidth={maxPageWidth}>
      <Frame>
        <H1>Food Recs</H1>
        <FoodCard price={PriceRating.FOUR} />
      </Frame>
    </Page>
  );
};
