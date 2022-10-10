import styled from "@emotion/styled";
import { ColorKey, getColor } from "../colors";
import { FlexRow } from "../stylePrimitives";

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

export const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <TagsContainer>
      {tags.map((a) => (
        <Tag key={a}>#{a}</Tag>
      ))}
    </TagsContainer>
  );
};
