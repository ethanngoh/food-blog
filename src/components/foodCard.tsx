import styled from "@emotion/styled";
import { useState } from "react";
import { GiHotMeal } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { MdFastfood, MdOutlineFireplace } from "react-icons/md";
import ImageGallery from "react-image-gallery";
import { ColorKey, getColor } from "../colors";
import { BoundingBox, FlexCol, FlexColC, FlexRow, H2, HR, HR2 } from "../stylePrimitives";
import { BusinessInfo } from "./businessInfo";
import { RatingBar } from "./ratingBar";
import { Tags } from "./tags";

export enum Rating {
  NONE = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}

export interface PicInfo {
  name: string;
  url: string;
  foodGlobal: Rating;
  foodLocal: Rating;
  priceGlobal: Rating;
  priceLocal: Rating;
}

export interface FoodInfo {
  food: Rating;
  price: Rating;
  value: Rating;
  ambiance: Rating;
  service: Rating;
  tags: string[];
  placeId: string;
  pics: PicInfo[];
  notes: string;
}

const PriceSpan = styled.span`
  color: green;
`;

export const FoodCard = ({ foodInfo }: { foodInfo: FoodInfo }) => {
  const [businessName, setBusinessName] = useState("");

  const images = foodInfo.pics.map((x) => {
    return {
      original: `food/${x.url}`,
      originalHeight: 400,
      thumbnail: `food/${x.url}`,
      thumbnailHeight: 60
    };
  });

  return (
    <FlexCol gap="1rem">
      <H2>
        {businessName} (<PriceSpan>{"$".repeat(foodInfo.price)}</PriceSpan>)
      </H2>
      <FlexCol gap="0.25rem">
        <FlexRow gap="1rem">
          <RatingBar rating={foodInfo.food} label={<MdFastfood />} />
          <RatingBar rating={foodInfo.value} label={<IoDiamondOutline />} />
          <RatingBar rating={foodInfo.ambiance} label={<MdOutlineFireplace />} />
          <RatingBar rating={foodInfo.service} label={<GiHotMeal />} />
        </FlexRow>
        <Tags tags={foodInfo.tags} />
      </FlexCol>
      <FlexColC gap="1rem">
        <span>{foodInfo.notes}</span>
        <HR2 color={getColor(ColorKey.HR)} />
        <BoundingBox maxWidth={"41%"}>
          <BusinessInfo placeId={foodInfo.placeId} setBusinessName={setBusinessName} />
        </BoundingBox>
      </FlexColC>
      {images.length > 0 ? (
        <FlexCol>
          <HR2 color={getColor(ColorKey.HR)} />
          <span>Food rating assoc with pic:</span>
          <ImageGallery
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            showIndex={true}
            indexSeparator={" of "}
          />
        </FlexCol>
      ) : null}
    </FlexCol>
  );
};
