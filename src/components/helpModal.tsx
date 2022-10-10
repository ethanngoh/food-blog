import styled from "@emotion/styled";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GiHotMeal } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { MdFastfood, MdOutlineFireplace } from "react-icons/md";
import Modal from "react-overlays/Modal";
import { breakpoint } from "../breakpoints";
import { ColorKey, getColor } from "../colors";
import { FlexCol, FlexColC, FlexRow, FlexRowC, HR2 } from "../stylePrimitives";
import { RatingBarSingle } from "./ratingBar";
import { ShimmerDiv2 } from "./shimmerText";

export const Backdrop = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

export const FullScreenModal = styled(Modal)`
  position: fixed;
  z-index: 2;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  @media ${breakpoint.xs} {
    width: 75vw;
  }
`;

const TDIcon = styled.td`
  text-align: center;
  vertical-align: middle;
  padding: 0.1rem 0;
  padding-right: 0.5rem;
`;

const TDContent = styled.td`
  text-align: left;
  padding: 0.1rem 0;
  white-space: nowrap;
`;

const RatingExplaner = ({
  one,
  two,
  three,
  four,
  five
}: {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <TDIcon>
            <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_1)} />
          </TDIcon>
          <TDContent>
            <FlexCol>{one}</FlexCol>
          </TDContent>
        </tr>
        <tr>
          <TDIcon>
            <FlexRowC gap={"0.1rem"}>
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_1)} />
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_2)} />
            </FlexRowC>
          </TDIcon>
          <TDContent>{two}</TDContent>
        </tr>
        <tr>
          <TDIcon>
            <FlexRowC gap={"0.1rem"}>
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_1)} />
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_2)} />
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_3)} />
            </FlexRowC>
          </TDIcon>
          <TDContent>{three}</TDContent>
        </tr>
        <tr>
          <TDIcon>
            <FlexRowC gap={"0.1rem"}>
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_1)} />
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_2)} />
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_3)} />
              <RatingBarSingle widthPercent={"1rem"} color={getColor(ColorKey.RATING_4)} />
            </FlexRowC>
          </TDIcon>
          <TDContent>{four}</TDContent>
        </tr>
        <tr>
          <TDIcon>
            <FlexRowC gap={"0.1rem"}>
              <ShimmerDiv2 />
            </FlexRowC>
          </TDIcon>
          <TDContent>{five}</TDContent>
        </tr>
      </tbody>
    </table>
  );
};

const Page1 = () => {
  return (
    <>
      <b>Legend</b>
      <table>
        <tbody>
          <tr>
            <TDIcon>
              <MdFastfood />
            </TDIcon>
            <TDContent>
              <FlexCol>
                <span>Food Quality</span>
              </FlexCol>
            </TDContent>
          </tr>
          <tr>
            <TDIcon>
              <IoDiamondOutline />
            </TDIcon>
            <TDContent>Overall Value</TDContent>
          </tr>
          <tr>
            <TDIcon>
              <MdOutlineFireplace />
            </TDIcon>
            <TDContent>Ambiance</TDContent>
          </tr>
          <tr>
            <TDIcon>
              <GiHotMeal />
            </TDIcon>
            <TDContent>Service</TDContent>
          </tr>
        </tbody>
      </table>
      <HR2 color={getColor(ColorKey.HR)} />
      <RatingExplaner one="Garbage" two="Acceptable" three="Pretty Good" four="Excellent" five="Top-notch" />
    </>
  );
};

const Page2 = () => {
  return (
    <>
      <b>Rating philosophy</b>
      <span>
        <b>Food Quality:</b> If food doesn't taste good, the restaurant sucks. The ratings for this are relative to what
        is locally available in the region.
      </span>
      <RatingExplaner
        one="Never return, vomit worthy"
        two="When I'm out of ideas ig..."
        three="Every now and then is fine"
        four="I'd eat this once a week"
        five="Must have! Don't miss out!"
      />
      <HR2 color={getColor(ColorKey.HR)} />
      <span>
        <b>Overall Value:</b> Food Quality, Availability, Price, along with a bit of gut feeling, factor into this
        metric. Predominant forces are Price/Quality, but sometimes it really hurts to pay 10 USD for a bowl of 滷肉飯
        (30 NTD (~1 USD) in Taiwan).
      </span>
      <RatingExplaner
        one="Just set your money on fire"
        two="Fine, maybe expensive fwiw"
        three="It's good"
        four="You'll walk out happier"
        five="This is REALLY good"
      />
    </>
  );
};

const Page3 = () => {
  return (
    <>
      <b>Rating philosophy (cont.)</b>
      <span>
        <b>Ambiance:</b> If the restaurant has a sit down area, this rates the accomodations for the duration of the
        meal.
      </span>
      <RatingExplaner
        one="Get it to go"
        two="Nothing special"
        three="Plesant"
        four="Super great for dates"
        five='An "experience"'
      />
      <HR2 color={getColor(ColorKey.HR)} />
      <span>
        <b>Service:</b> This rates the quality of service for the restaurant, only if you should expect there to be any.
        Most restaurants wouldn't get penalized in this category unless their operations were unusually slow.
      </span>
      <RatingExplaner
        one="How is this in business?"
        two="Non-existent bit it's fine"
        three="Unnoticable, in a good way!"
        four="They try pretty hard"
        five="3-michelin star pleasantries"
      />
    </>
  );
};

const pages = [<Page1 />, <Page2 />, <Page3 />];

const Controls = ({
  currentPage,
  setCurrentPage
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <br />
      <FlexRow gap={"4rem"}>
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          <FiChevronLeft size={30} />
        </button>
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === pages.length}
        >
          <FiChevronRight size={30} />
        </button>
      </FlexRow>
    </>
  );
};

export const Help = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <FlexColC gap={"1rem"}>
      {pages[currentPage - 1]}
      <Controls currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </FlexColC>
  );
};
