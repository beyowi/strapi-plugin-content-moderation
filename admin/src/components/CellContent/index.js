import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@strapi/design-system/Typography';
import CellValue from './CellValue';
import hasContent from './utils/hasContent';

const TypographyMaxWidth = styled(Typography)`
  max-width: 300px;
`;

const CellContent = ({ content, type }) => {
  if (!hasContent(type, content)) {
    return <Typography textColor='neutral800'>-</Typography>;
  }

  return (
    <TypographyMaxWidth ellipsis textColor='neutral800'>
      <CellValue type={type} value={content} />
    </TypographyMaxWidth>
  );
};

CellContent.defaultProps = {
  content: undefined,
};

CellContent.propTypes = {
  content: PropTypes.any,
  type: PropTypes.string.isRequired,
};

export default CellContent;
