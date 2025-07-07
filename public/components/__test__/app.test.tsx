/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { SearchRelevanceApp } from '../app';

describe('SearchRelevanceApp', () => {
  configure({ adapter: new Adapter() });

  const mockProps = {
    notifications: {
      toasts: {
        addSuccess: jest.fn(),
        addWarning: jest.fn(),
        addDanger: jest.fn(),
        add: jest.fn(),
        get$: jest.fn(),
        remove: jest.fn(),
        addError: jest.fn(),
        addInfo: jest.fn(),
      },
    },
    http: {
      get: jest.fn().mockResolvedValue([]),
      post: jest.fn().mockResolvedValue({ _source: { indices: [] } }),
    },
    navigation: {},
    chrome: {
      navGroup: {
        getNavGroupEnabled: jest.fn(() => false),
      },
      setBreadcrumbs: jest.fn(),
    },
    savedObjects: {},
    dataSourceEnabled: false,
    setActionMenu: jest.fn(),
    dataSourceManagement: {},
    application: {
      navigateToApp: jest.fn(),
    },
    uiSettings: {
      get: jest.fn(() => false),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SearchRelevanceApp with old experience', async () => {
    const wrapper = mount(<SearchRelevanceApp {...mockProps} />);
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('HashRouter')).toHaveLength(1);
      expect(wrapper.find('SearchRelevanceContextProvider')).toHaveLength(1);
      expect(wrapper.find('EuiGlobalToastList')).toHaveLength(1);
    });
  });

  it('renders SearchRelevanceApp with new experience when enabled', async () => {
    const propsWithNewExperience = {
      ...mockProps,
      uiSettings: {
        get: jest.fn(() => true),
      },
    };

    const wrapper = mount(<SearchRelevanceApp {...propsWithNewExperience} />);
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('HashRouter')).toHaveLength(1);
      expect(wrapper.find('SearchRelevanceContextProvider')).toHaveLength(1);
      // New experience doesn't have EuiGlobalToastList in the old location
      expect(wrapper.find('SearchRelevancePageWithRouter')).toHaveLength(1);
    });
  });

  it('should have correct route structure', () => {
    const wrapper = mount(<SearchRelevanceApp {...mockProps} />);
    
    // Find the Route component that renders QueryCompareHome
    const route = wrapper.find('Route[path="/"]');
    expect(route).toHaveLength(1);
    
    // Test that route has render prop
    expect(route.prop('render')).toBeDefined();
  });

  it('should handle navigation group configuration', () => {
    const mockNavGroupEnabled = jest.fn(() => true);
    const propsWithNavGroup = {
      ...mockProps,
      chrome: {
        ...mockProps.chrome,
        navGroup: {
          getNavGroupEnabled: mockNavGroupEnabled,
        },
      },
    };

    mount(<SearchRelevanceApp {...propsWithNavGroup} />);
    expect(mockNavGroupEnabled).toHaveBeenCalled();
  });

  it('should call uiSettings.get to check experience flag', () => {
    const mockUiSettingsGet = jest.fn(() => false);
    const propsWithMockUiSettings = {
      ...mockProps,
      uiSettings: {
        get: mockUiSettingsGet,
      },
    };

    mount(<SearchRelevanceApp {...propsWithMockUiSettings} />);
    expect(mockUiSettingsGet).toHaveBeenCalled();
  });

  it('should render toast list in old experience', () => {
    const wrapper = mount(<SearchRelevanceApp {...mockProps} />);
    
    // Should have EuiGlobalToastList in old experience
    const toastList = wrapper.find('EuiGlobalToastList');
    expect(toastList).toHaveLength(1);
    expect(toastList.prop('side')).toBe('right');
  });
});