import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorKey, getColor } from "../colors";
import { downloadFoodCards } from "../components/dataGetter";
import { FoodCard, FoodInfo } from "../components/foodCard";
import { Backdrop, FullScreenModal, Help } from "../components/helpModal";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexCol, FlexColC, FlexRow, H1, Page } from "../stylePrimitives";

const Frame = styled(FlexCol)`
  align-items: center;
  gap: 1em;
`;

const maxPageWidth = "1440px";
const FoodCards = styled(FlexCol)``;

const FoodCardBG = styled.div`
  background-color: ${getColor(ColorKey.BACKGROUND2)};
  padding: 0.75rem;
`;

function getFoodCardView(foodCardData: FoodInfo[], toIndex: number) {
  const stuff = foodCardData.slice(0, toIndex).map((f) => (
    <FoodCardBG>
      <FoodCard foodInfo={f} key={f.placeId} />
    </FoodCardBG>
  ));
  return <>{stuff}</>;
}

const EndMessage = styled(FlexColC)`
  margin: 1rem;
`;

export const Index = () => {
  useBackgroundColor(getColor(ColorKey.BACKGROUND));
  useTextColor(getColor(ColorKey.PRIMARY));
  const [foodCardData, setFoodCardData] = useState<FoodInfo[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [currentFoodCardIdx, setCurrentFoodCardIdx] = useState(5);
  const [foodCards, setFoodCards] = useState(<></>);
  const [hasMore, setHasMore] = useState(true);

  // declare the async data fetching function
  const fetchData = useCallback(async () => {
    const d = await downloadFoodCards();
    setFoodCardData(d);
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setFoodCards(getFoodCardView(foodCardData, currentFoodCardIdx));
  }, [foodCardData, currentFoodCardIdx]);

  const [showHelpModal, setShowHelpModal] = useState(false);
  const onHelpClick = () => {
    setShowHelpModal(true);
  };

  const renderBackdrop = (props: any) => <Backdrop {...props} />;

  const paginateFoodCards = () => {
    const PAGE_SIZE = 3;
    var nIdx = currentFoodCardIdx + PAGE_SIZE;
    if (nIdx > foodCardData.length) {
      nIdx = foodCardData.length;
      setHasMore(false);
    }

    setFoodCards(getFoodCardView(foodCardData, nIdx));
    setCurrentFoodCardIdx(nIdx);
  };

  return (
    <Page maxWidth={maxPageWidth}>
      <FullScreenModal show={showHelpModal} onHide={() => setShowHelpModal(false)} renderBackdrop={renderBackdrop}>
        <Help />
      </FullScreenModal>
      <Frame>
        <H1>
          <FlexRow gap={"1rem"}>
            <span>food recs | ethangoh</span>{" "}
            <div onClick={onHelpClick}>
              <BsQuestionCircleFill />
            </div>
          </FlexRow>
        </H1>
        {dataLoaded ? (
          <InfiniteScroll
            dataLength={currentFoodCardIdx} //This is important field to render the next data
            next={paginateFoodCards}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <EndMessage>
                <b>You've seen all the recommendations!</b>
              </EndMessage>
            }
            style={{ overflow: "hidden" }}
          >
            <FoodCards gap={"1rem"}>{foodCards}</FoodCards>
          </InfiniteScroll>
        ) : null}
      </Frame>
    </Page>
  );
};
