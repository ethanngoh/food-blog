import styled from "@emotion/styled";
import { breakpoint } from "../breakpoints";
import { ColorKey, getColor } from "../colors";
import { FlexRow } from "../stylePrimitives";
import { ShimmerDiv2 } from "./shimmerText";

type RatingBarSingleProps = {
  widthPercent: string;
  color: string;
  show?: boolean;
};

export const RatingBarSingle = styled.div<RatingBarSingleProps>`
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

export const RatingBar = ({ rating, label }: { rating: number; label: React.ReactNode }) => {
  if (rating > 5 || rating < 0) {
    throw new Error("Rating out of bounds.");
  }
  const w = `25%`;

  return (
    <FlexRow gap={"0.25rem"}>
      <span>{label}</span>
      <RatingRow gap={"3px"}>
        {rating === 5 ? <ShimmerDiv2 /> : null}
        {rating > 0 && rating < 5 ? (
          <>
            <RatingBarSingle widthPercent={w} color={getColor(ColorKey.RATING_1)} show={rating < 1} />
            <RatingBarSingle widthPercent={w} color={getColor(ColorKey.RATING_2)} show={rating < 2} />
            <RatingBarSingle widthPercent={w} color={getColor(ColorKey.RATING_3)} show={rating < 3} />
            <RatingBarSingle widthPercent={w} color={getColor(ColorKey.RATING_4)} show={rating < 4} />
          </>
        ) : null}
        {rating === 0 ? <span>N/A</span> : null}
      </RatingRow>
    </FlexRow>
  );
};
