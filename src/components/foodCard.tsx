import ImageGallery from "react-image-gallery";
import styled from "@emotion/styled";
import { ColorKey, getColor } from "../colors";
import { FlexCol, FlexColC, FlexRow, H2, HR, HR2, BoundingBox } from "../stylePrimitives";
import { MdFastfood, MdOutlineFireplace } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";
import { breakpoint } from "../breakpoints";
import { BusinessInfo } from "./businessInfo";
import { useState } from "react";

type RatingBarSingleProps = {
  widthPercent: string;
  color: string;
  show?: boolean;
};

const RatingBarSingle = styled.div<RatingBarSingleProps>`
  width: ${(props) => props.widthPercent};
  border-top: 5px solid ${(props) => (props.show ? getColor(ColorKey.BACKGROUND) : props.color)};
`;

const RatingRow = styled(FlexRow)`
  align-items: center;
  width: 5rem;
  @media ${breakpoint.xs} {
    width: 3rem;
  }
`;

const RatingBar = ({ rating, label }: { rating: number; label: React.ReactNode }) => {
  if (rating > 4 || rating < 0) {
    throw new Error("Rating out of bounds.");
  }
  const w = `25%`;

  return (
    <FlexRow gap={"0.25rem"}>
      <span>{label}</span>
      <RatingRow gap={"3px"}>
        {rating > 0 ? (
          <>
            <RatingBarSingle widthPercent={w} color={getColor(ColorKey.RATING_1)} show={rating < 1} />
            <RatingBarSingle widthPercent={w} color={getColor(ColorKey.RATING_2)} show={rating < 2} />
            <RatingBarSingle widthPercent={w} color={getColor(ColorKey.RATING_3)} show={rating < 3} />
            <RatingBarSingle widthPercent={w} color={getColor(ColorKey.RATING_4)} show={rating < 4} />
          </>
        ) : (
          <span>N/A</span>
        )}
      </RatingRow>
    </FlexRow>
  );
};

const Tag = styled.span`
  background-color: ${getColor(ColorKey.HASHTAG_BG)};
  color: ${getColor(ColorKey.HASHTAG_FG)};
  padding: 0.1rem 0.5rem;
  font-size: 1rem;
  border-radius: 1rem;
`;

const TagsContainer = styled(FlexRow)`
  flex-wrap: wrap;
  row-gap: 5px;
  gap: 5px;
`;

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <TagsContainer>
      {tags.map((a) => (
        <Tag>#{a}</Tag>
      ))}
    </TagsContainer>
  );
};

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

export const FancyFoodCard = ({ foodInfo }: { foodInfo: FoodInfo }) => {
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
      <HR color={getColor(ColorKey.HR)} />
    </FlexCol>
  );
};
