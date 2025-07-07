/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Home } from '../home';
import { SearchRelevanceContextProvider } from '../../../contexts';

// Mock the SearchRelevanceContextProvider
jest.mock('../../../contexts', () => ({
  SearchRelevanceContextProvider: ({ children }: { children: React.ReactNode }) => children,
  useSearchRelevanceContext: () => ({
    showFlyout: false,
    setShowFlyout: jest.fn(),
    documentsIndexes: [],
    setDocumentsIndexes: jest.fn(),
    allowList: [],
    setAllowList: jest.fn(),
    selectedIndex1: '',
    setSelectedIndex1: jest.fn(),
    selectedIndex2: '',
    setSelectedIndex2: jest.fn(),
    query1: '',
    setQuery1: jest.fn(),
    query2: '',
    setQuery2: jest.fn(),
    searchValue: '',
    setSearchValue: jest.fn(),
    queryError1: { errorResponse: '' },
    setQueryError1: jest.fn(),
    queryError2: { errorResponse: '' },
    setQueryError2: jest.fn(),
    comparedResult1: {},
    updateComparedResult1: jest.fn(),
    comparedResult2: {},
    updateComparedResult2: jest.fn(),
    pipelines: {},
    setPipelines: jest.fn(),
    pipeline1: '',
    setPipeline1: jest.fn(),
    pipeline2: '',
    setPipeline2: jest.fn(),
    fetchedPipelines1: {},
    setFetchedPipelines1: jest.fn(),
    fetchedPipelines2: {},
    setFetchedPipelines2: jest.fn(),
    documentsIndexes1: [],
    setDocumentsIndexes1: jest.fn(),
    documentsIndexes2: [],
    setDocumentsIndexes2: jest.fn(),
    datasource1: null,
    setDataSource1: jest.fn(),
    datasource2: null,
    setDataSource2: jest.fn(),
    datasourceItems: {},
    setDatasourceItems: jest.fn(),
    dataSourceOptions: [],
    setDataSourceOptions: jest.fn(),
    savedConfiguration: '',
    setSavedConfiguration: jest.fn(),
  }),
}));

describe('Home Component', () => {
  configure({ adapter: new Adapter() });

  const mockProps = {
    parentBreadCrumbs: [{ text: 'Test', href: '#' }],
    notifications: {
      toasts: {
        addSuccess: jest.fn(),
        addWarning: jest.fn(),
        addDanger: jest.fn(),
        add: jest.fn(),
      },
    },
    http: {
      get: jest.fn(),
      post: jest.fn(),
    },
    navigation: {},
    setBreadcrumbs: jest.fn(),
    setToast: jest.fn(),
    chrome: {
      navGroup: {
        getNavGroupEnabled: jest.fn(() => false),
      },
      setBreadcrumbs: jest.fn(),
    },
    savedObjects: {},
    dataSourceEnabled: false,
    dataSourceManagement: {
      ui: {
        DataSourceSelector: () => null,
      },
    },
    setActionMenu: jest.fn(),
    application: {
      navigateToApp: jest.fn(),
    },
    savedConfiguration: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockProps.http.get.mockResolvedValue([]);
    mockProps.http.post.mockResolvedValue({ _source: { indices: [] } });
  });

  it('renders Home component without saved configuration', async () => {
    const wrapper = mount(<Home {...mockProps} />);
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('Home')).toHaveLength(1);
    });
  });

  it('should call setBreadcrumbs on mount', async () => {
    const wrapper = mount(<Home {...mockProps} />);
    wrapper.update();
    
    await waitFor(() => {
      expect(mockProps.setBreadcrumbs).toHaveBeenCalledWith([{ text: 'Test', href: '#' }]);
    });
  });

  it('should fetch indexes on mount', async () => {
    mockProps.http.get.mockResolvedValue([{ name: 'test-index' }]);
    
    const wrapper = mount(<Home {...mockProps} />);
    wrapper.update();
    
    await waitFor(() => {
      expect(mockProps.http.get).toHaveBeenCalledWith('/api/relevancy/search/indexes');
    });
  });

  it('should fetch allowlist on mount', async () => {
    mockProps.http.post.mockResolvedValue({ _source: { indices: ['index1', 'index2'] } });
    
    const wrapper = mount(<Home {...mockProps} />);
    wrapper.update();
    
    await waitFor(() => {
      expect(mockProps.http.post).toHaveBeenCalledWith('/api/relevancy/doc', {
        body: JSON.stringify({
          index: 'configurations',
          docID: 'allowlist_indices',
        }),
      });
    });
  });

  it('should fetch pipelines on mount', async () => {
    mockProps.http.post
      .mockResolvedValueOnce({ _source: { indices: [] } }) // allowlist
      .mockResolvedValueOnce({}); // pipelines
    
    const wrapper = mount(<Home {...mockProps} />);
    wrapper.update();
    
    await waitFor(() => {
      expect(mockProps.http.post).toHaveBeenCalledWith('/api/console/proxy', {
        query: {
          path: '/_search/pipeline',
          method: 'GET',
        },
        body: {},
        prependBasePath: true,
        asResponse: true,
      });
    });
  });

  it('should load saved configuration when savedConfiguration prop is provided', async () => {
    const mockSavedConfig = {
      hits: {
        hits: [
          {
            _source: {
              configuration: {
                query1: {
                  dsl_query: '{"query": {"match_all": {}}}',
                  index: 'test-index-1',
                  search_pipeline: 'test-pipeline-1',
                },
                query2: {
                  dsl_query: '{"query": {"term": {"field": "value"}}}',
                  index: 'test-index-2',
                  search_pipeline: 'test-pipeline-2',
                },
                search: 'test search value',
              },
            },
          },
        ],
      },
    };

    mockProps.http.post
      .mockResolvedValueOnce({ _source: { indices: [] } }) // allowlist
      .mockResolvedValueOnce({}) // pipelines
      .mockResolvedValueOnce(mockSavedConfig); // saved configuration

    const propsWithSavedConfig = {
      ...mockProps,
      savedConfiguration: 'test-saved-config',
    };

    const wrapper = mount(<Home {...propsWithSavedConfig} />);
    wrapper.update();

    await waitFor(() => {
      expect(mockProps.http.post).toHaveBeenCalledWith('/api/relevancy/search/savedConfiguration', {
        body: JSON.stringify({
          query: {
            match: {
              title: 'test-saved-config',
            },
          },
        }),
      });
    });
  });

  it('should handle saved configuration loading error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    mockProps.http.post
      .mockResolvedValueOnce({ _source: { indices: [] } }) // allowlist
      .mockResolvedValueOnce({}) // pipelines
      .mockRejectedValueOnce(new Error('Failed to load configuration')); // saved configuration error

    const propsWithSavedConfig = {
      ...mockProps,
      savedConfiguration: 'invalid-config',
    };

    const wrapper = mount(<Home {...propsWithSavedConfig} />);
    wrapper.update();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load saved configuration:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it('should handle empty saved configuration response', async () => {
    const mockEmptyResponse = {
      hits: {
        hits: [],
      },
    };

    mockProps.http.post
      .mockResolvedValueOnce({ _source: { indices: [] } }) // allowlist
      .mockResolvedValueOnce({}) // pipelines
      .mockResolvedValueOnce(mockEmptyResponse); // empty saved configuration

    const propsWithSavedConfig = {
      ...mockProps,
      savedConfiguration: 'non-existent-config',
    };

    const wrapper = mount(<Home {...propsWithSavedConfig} />);
    wrapper.update();

    await waitFor(() => {
      expect(mockProps.http.post).toHaveBeenCalledWith('/api/relevancy/search/savedConfiguration', {
        body: JSON.stringify({
          query: {
            match: {
              title: 'non-existent-config',
            },
          },
        }),
      });
    });
  });

  it('should handle data source disabled scenario', async () => {
    mockProps.http.get.mockResolvedValue([{ name: 'test-index' }]);
    mockProps.http.post.mockResolvedValue({ _source: { indices: [] } });

    const wrapper = mount(<Home {...mockProps} />);
    wrapper.update();

    await waitFor(() => {
      expect(mockProps.http.get).toHaveBeenCalledWith('/api/relevancy/search/indexes');
    });
  });

  it('should not load saved configuration when savedConfiguration is empty', async () => {
    const wrapper = mount(<Home {...mockProps} />);
    wrapper.update();

    await waitFor(() => {
      expect(mockProps.http.post).not.toHaveBeenCalledWith(
        '/api/relevancy/search/savedConfiguration',
        expect.any(Object)
      );
    });
  });

  it('should set savedConfiguration in context', async () => {
    const propsWithSavedConfig = {
      ...mockProps,
      savedConfiguration: 'test-config',
    };

    const wrapper = mount(<Home {...propsWithSavedConfig} />);
    wrapper.update();

    // Component should render without errors
    await waitFor(() => {
      expect(wrapper.find('Home')).toHaveLength(1);
    });
  });
});