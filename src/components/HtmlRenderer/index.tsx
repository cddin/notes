import React from 'react';
import styled from 'styled-components';

type HtmlClampProps = {
  html: string;
  lines?: number;
};

const ClampContainer = styled.div<{ lines: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  white-space: normal;
  width: 100%;
  flex:1;
  color:black;

  -webkit-line-clamp: ${(props) => props.lines};
`;

const HtmlClamp: React.FC<HtmlClampProps> = ({ html, lines = 3 }) => {
  return (
    <ClampContainer
      lines={lines}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlClamp;