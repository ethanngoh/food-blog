import styled from "@emotion/styled";
import { ColorKey, getColor } from "../colors";
import { FlexCol, FlexRow } from "../stylePrimitives";
import { MdFastfood, MdOutlineFireplace } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { GiHotMeal } from "react-icons/gi";
import { breakpoint } from "../breakpoints";
import { MapView } from "./googleMaps";

export enum PriceRating {
  NONE = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}

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
  if (rating > 4 || rating < 1) {
    throw new Error("Rating out of bounds.");
  }
  const w = `25%`;
  const c = "red";

  return (
    <FlexRow gap={"0.25rem"}>
      <span>{label}</span>
      <RatingRow gap={"3px"}>
        <RatingBarSingle widthPercent={w} color={c} />
        <RatingBarSingle widthPercent={w} color={"orange"} show={rating < 2} />
        <RatingBarSingle widthPercent={w} color={"yellow"} show={rating < 3} />
        <RatingBarSingle widthPercent={w} color={"green"} show={rating < 4} />
      </RatingRow>
    </FlexRow>
  );
};

const Tag = styled.span`
  background-color: red;
  padding: 0.1rem 0.5rem;
  font-size: 1rem;
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

const Content = () => {
  return (
    <FlexCol>
      <span>Description blurb thing</span>
      <span>Prob a picture here</span>
      <span>Links, address, website, googlemaps link</span>
      <MapView
        center={{ lat: 47.7134886, lng: -122.182679 }}
        marker={{ lat: 47.7134886, lng: -122.1804903 }}
        zoom={16}
      />
    </FlexCol>
  );
};

export const FancyFoodCard = ({ price }: { price: PriceRating }) => {
  return (
    <FlexCol gap="1rem">
      <h2>Due' Cucina Italiana (Totem Lake)</h2>
      <FlexCol gap="0.25rem">
        <FlexRow gap="1rem">
          <RatingBar rating={4} label={<MdFastfood />} />
          <RatingBar rating={3} label={<BiDollar />} />
          <RatingBar rating={2} label={<MdOutlineFireplace />} />
          <RatingBar rating={3} label={<GiHotMeal />} />
        </FlexRow>
        <Tags tags={["seattle", "mexican", "tacos", "blah", "balalj", "balalj"]} />
      </FlexCol>
      <FlexCol>
        <Content />
      </FlexCol>
    </FlexCol>
  );
};
