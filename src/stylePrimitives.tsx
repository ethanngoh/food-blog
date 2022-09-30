import styled from "@emotion/styled";
import { breakpoint } from "./breakpoints";

export const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

export const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
`;

export const H3 = styled.h3`
  font-size: 1.25rem;
  font-weight: 300;
`;

type FlexProps = {
  gap?: string;
  wrap?: boolean;
};

export const FlexRow = styled.div<FlexProps>`
  display: flex;
  gap: ${(props) => (props.gap ? props.gap : "0")};
`;

export const RespRow = styled.div<FlexProps>`
  display: flex;
  @media ${breakpoint.xs} {
    flex-direction: column;
  }
  gap: ${(props) => (props.gap ? props.gap : "0")};
`;

type DivRProps = {
  order?: number;
};

export const DivR = styled.div<DivRProps>``;

export const FlexCol = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.gap ? props.gap : "0")};
`;

export const FlexColC = styled(FlexCol)`
  align-items: center;
`;

type ColorProps = {
  color: string;
};

export const HR = styled.hr<ColorProps>`
  border: 0;
  border-bottom: 0.75rem solid ${(props) => props.color};
  width: 5rem;
  margin-bottom: 2rem;
`;

type PageProps = {
  maxWidth: string;
};

export const PageBox = styled.div<PageProps>`
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  margin: 1em 1em 0 1em;
`;

export const Page = ({ maxWidth, children }: { maxWidth: string; children: React.ReactNode }) => {
  return (
    <PageFlow>
      <PageBox maxWidth={maxWidth}>{children}</PageBox>
    </PageFlow>
  );
};

export const PageFlow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
