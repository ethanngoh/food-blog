import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { ColorKey, getColor } from "../colors";
import { downloadFoodCards } from "../components/dataGetter";
import { FoodCard, FoodInfo } from "../components/foodCard";
import { Backdrop, FullScreenModal, Help } from "../components/helpModal";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexCol, FlexRow, H1, Page } from "../stylePrimitives";

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

  const [showHelpModal, setShowHelpModal] = useState(false);
  const onHelpClick = () => {
    setShowHelpModal(true);
  };

  const renderBackdrop = (props: any) => <Backdrop {...props} />;

  return (
    <Page maxWidth={maxPageWidth}>
      <FullScreenModal
        show={showHelpModal}
        onHide={() => setShowHelpModal(false)}
        aria-labelledby="modal-label"
        renderBackdrop={renderBackdrop}
      >
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
          <FoodCards gap={"1rem"}>
            {foodCardData.map((f) => (
              <FoodCardBG>
                <FoodCard foodInfo={f} key={f.placeId} />
              </FoodCardBG>
            ))}
          </FoodCards>
        ) : null}
      </Frame>
    </Page>
  );
};
