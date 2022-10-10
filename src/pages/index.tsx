import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ColorKey, getColor } from "../colors";
import { downloadFoodCards } from "../components/dataGetter";
import { FoodCard, FoodInfo } from "../components/foodCard";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexCol, H1, Page } from "../stylePrimitives";

const Frame = styled(FlexCol)`
  align-items: center;
  gap: 1em;
`;

const maxPageWidth = "1440px";

const FoodCards = styled(FlexCol)``;

export const Index = () => {
  useBackgroundColor(getColor(ColorKey.BACKGROUND));
  useTextColor(getColor(ColorKey.PRIMARY));
  const [foodCardData, setFoodCardData] = useState<FoodInfo[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const asyncEffect = async () => {
      const d = await downloadFoodCards();
      setFoodCardData(d);
      setDataLoaded(true);
    };

    asyncEffect();
  }, [setDataLoaded]);

  return (
    <Page maxWidth={maxPageWidth}>
      <Frame>
        <H1>food recs | ethangoh</H1>
        {dataLoaded ? (
          <FoodCards gap={"1rem"}>
            {foodCardData.map((f) => (
              <FoodCard foodInfo={f} />
            ))}
          </FoodCards>
        ) : null}
      </Frame>
    </Page>
  );
};
