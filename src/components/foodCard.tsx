import styled from "@emotion/styled";
import { ColorKey, getColor } from "../colors";
import { FlexRow } from "../stylePrimitives";

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
  width: 5em;
`;

const RatingBar = ({ rating, label }: { rating: number; label: string }) => {
  if (rating > 4 || rating < 1) {
    throw new Error("Rating out of bounds.");
  }
  const w = `25%`;
  const c = "red";

  return (
    <FlexRow gap={"1em"}>
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

export const FoodCard = ({ price }: { price: PriceRating }) => {
  return (
    <>
      <RatingBar rating={4} label={"Food"} />
      <RatingBar rating={3} label={"Price"} />
    </>
  );
};

export const FancyFoodCard = (price: PriceRating) => {
  return (
    <>
      <RatingBar rating={4} label={"Food"} />
      <RatingBar rating={3} label={"Price"} />
    </>
  );
};
