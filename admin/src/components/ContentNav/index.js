import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import isEqual from 'react-fast-compare';

import makeAppView from '../../pages/App/reducer/selectors';
import {
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
} from '@strapi/design-system/SubNav';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { getMessage } from '../../utils';
import { DEFAULT_ROUTE_FILTER_PENDING } from '../../utils/constants';

const ContentNav = ({ contentTypes }) => {
  const [search, setSearch] = useState('');
  return (
    <Flex>
      <Box
        style={{
          height: '100vh',
        }}
        background='neutral200'
      >
        <SubNav ariaLabel={getMessage('nav.header.title')}>
          <SubNavHeader label={getMessage('nav.header.title')} />
          <SubNavSections>
            <SubNavSection
              label={getMessage('nav.header.subtitle')}
              collapsable
              badgeLabel={contentTypes.length.toString()}
            >
              {contentTypes.map((type, index) => (
                <SubNavLink
                  to={`${type.uid}${DEFAULT_ROUTE_FILTER_PENDING}`}
                  key={index}
                >
                  {type.displayName}
                </SubNavLink>
              ))}
            </SubNavSection>
          </SubNavSections>
        </SubNav>
      </Box>
    </Flex>
  );
};

const mapStateToProps = makeAppView();

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(memo(ContentNav, isEqual));
