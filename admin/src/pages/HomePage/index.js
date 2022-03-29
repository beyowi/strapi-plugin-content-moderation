/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';

import { Layout } from '@strapi/design-system/Layout';
import { Box } from '@strapi/design-system/Box';
import ContentNav from '../../components/ContentNav';
import ContentViewer from '../../components/ContentViewer';

const HomePage = () => {
  return (
    <Box background='neutral100'>
      <Layout sideNav={<ContentNav />}>
        <ContentViewer />
      </Layout>
    </Box>
  );
};

export default memo(HomePage);
