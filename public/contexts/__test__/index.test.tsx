/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { SearchRelevanceContextProvider, useSearchRelevanceContext } from '../index';

describe('SearchRelevanceContext', () => {
  configure({ adapter: new Adapter() });

  // Test component that uses the context
  const TestComponent = () => {
    const {
      showFlyout,
      setShowFlyout,
      selectedIndex1,
      setSelectedIndex1,
      selectedIndex2,
      setSelectedIndex2,
      query1,
      setQuery1,
      query2,
      setQuery2,
      searchValue,
      setSearchValue,
      pipeline1,
      setPipeline1,
      pipeline2,
      setPipeline2,
      savedConfiguration,
      setSavedConfiguration,
      allowList,
      setAllowList,
      documentsIndexes,
      setDocumentsIndexes,
      documentsIndexes1,
      setDocumentsIndexes1,
      documentsIndexes2,
      setDocumentsIndexes2,
      queryError1,
      setQueryError1,
      queryError2,
      setQueryError2,
      comparedResult1,
      updateComparedResult1,
      comparedResult2,
      updateComparedResult2,
    } = useSearchRelevanceContext();

    return (
      <div>
        <button
          data-testid="toggle-flyout"
          onClick={() => setShowFlyout(!showFlyout)}
        >
          {showFlyout ? 'Hide' : 'Show'} Flyout
        </button>
        
        <input
          data-testid="selected-index-1"
          value={selectedIndex1}
          onChange={(e) => setSelectedIndex1(e.target.value)}
        />
        
        <input
          data-testid="selected-index-2"
          value={selectedIndex2}
          onChange={(e) => setSelectedIndex2(e.target.value)}
        />
        
        <input
          data-testid="query-1"
          value={query1}
          onChange={(e) => setQuery1(e.target.value)}
        />
        
        <input
          data-testid="query-2"
          value={query2}
          onChange={(e) => setQuery2(e.target.value)}
        />
        
        <input
          data-testid="search-value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        
        <input
          data-testid="pipeline-1"
          value={pipeline1}
          onChange={(e) => setPipeline1(e.target.value)}
        />
        
        <input
          data-testid="pipeline-2"
          value={pipeline2}
          onChange={(e) => setPipeline2(e.target.value)}
        />
        
        <input
          data-testid="saved-configuration"
          value={savedConfiguration}
          onChange={(e) => setSavedConfiguration(e.target.value)}
        />
        
        <button
          data-testid="set-allow-list"
          onClick={() => setAllowList(['index1', 'index2'])}
        >
          Set Allow List
        </button>
        
        <button
          data-testid="set-documents-indexes"
          onClick={() => setDocumentsIndexes([{ name: 'test-index' }])}
        >
          Set Documents Indexes
        </button>
        
        <button
          data-testid="set-documents-indexes-1"
          onClick={() => setDocumentsIndexes1([{ name: 'test-index-1' }])}
        >
          Set Documents Indexes 1
        </button>
        
        <button
          data-testid="set-documents-indexes-2"
          onClick={() => setDocumentsIndexes2([{ name: 'test-index-2' }])}
        >
          Set Documents Indexes 2
        </button>
        
        <button
          data-testid="set-query-error-1"
          onClick={() => setQueryError1({ errorResponse: 'Test error 1' })}
        >
          Set Query Error 1
        </button>
        
        <button
          data-testid="set-query-error-2"
          onClick={() => setQueryError2({ errorResponse: 'Test error 2' })}
        >
          Set Query Error 2
        </button>
        
        <button
          data-testid="update-compared-result-1"
          onClick={() => updateComparedResult1({ hits: { hits: [{ _id: '1' }] } })}
        >
          Update Compared Result 1
        </button>
        
        <button
          data-testid="update-compared-result-2"
          onClick={() => updateComparedResult2({ hits: { hits: [{ _id: '2' }] } })}
        >
          Update Compared Result 2
        </button>
        
        <div data-testid="context-values">
          <span data-testid="flyout-state">{showFlyout.toString()}</span>
          <span data-testid="selected-index-1-value">{selectedIndex1}</span>
          <span data-testid="selected-index-2-value">{selectedIndex2}</span>
          <span data-testid="query-1-value">{query1}</span>
          <span data-testid="query-2-value">{query2}</span>
          <span data-testid="search-value-value">{searchValue}</span>
          <span data-testid="pipeline-1-value">{pipeline1}</span>
          <span data-testid="pipeline-2-value">{pipeline2}</span>
          <span data-testid="saved-configuration-value">{savedConfiguration}</span>
          <span data-testid="allow-list-value">{JSON.stringify(allowList)}</span>
          <span data-testid="documents-indexes-value">{JSON.stringify(documentsIndexes)}</span>
          <span data-testid="documents-indexes-1-value">{JSON.stringify(documentsIndexes1)}</span>
          <span data-testid="documents-indexes-2-value">{JSON.stringify(documentsIndexes2)}</span>
          <span data-testid="query-error-1-value">{JSON.stringify(queryError1)}</span>
          <span data-testid="query-error-2-value">{JSON.stringify(queryError2)}</span>
          <span data-testid="compared-result-1-value">{JSON.stringify(comparedResult1)}</span>
          <span data-testid="compared-result-2-value">{JSON.stringify(comparedResult2)}</span>
        </div>
      </div>
    );
  };

  it('should provide context values and allow state updates', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Test initial state
    expect(wrapper.find('[data-testid="flyout-state"]').text()).toBe('false');
    expect(wrapper.find('[data-testid="selected-index-1-value"]').text()).toBe('');
    expect(wrapper.find('[data-testid="selected-index-2-value"]').text()).toBe('');
    expect(wrapper.find('[data-testid="query-1-value"]').text()).toBe('');
    expect(wrapper.find('[data-testid="query-2-value"]').text()).toBe('');
    expect(wrapper.find('[data-testid="search-value-value"]').text()).toBe('');
    expect(wrapper.find('[data-testid="pipeline-1-value"]').text()).toBe('');
    expect(wrapper.find('[data-testid="pipeline-2-value"]').text()).toBe('');
    expect(wrapper.find('[data-testid="saved-configuration-value"]').text()).toBe('');
    expect(wrapper.find('[data-testid="allow-list-value"]').text()).toBe('[]');
    expect(wrapper.find('[data-testid="documents-indexes-value"]').text()).toBe('[]');
    expect(wrapper.find('[data-testid="documents-indexes-1-value"]').text()).toBe('[]');
    expect(wrapper.find('[data-testid="documents-indexes-2-value"]').text()).toBe('[]');
  });

  it('should update flyout state', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Toggle flyout
    wrapper.find('[data-testid="toggle-flyout"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="flyout-state"]').text()).toBe('true');
    });
  });

  it('should update index selection values', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update selected index 1
    wrapper.find('[data-testid="selected-index-1"]').simulate('change', {
      target: { value: 'test-index-1' },
    });
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="selected-index-1-value"]').text()).toBe('test-index-1');
    });

    // Update selected index 2
    wrapper.find('[data-testid="selected-index-2"]').simulate('change', {
      target: { value: 'test-index-2' },
    });
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="selected-index-2-value"]').text()).toBe('test-index-2');
    });
  });

  it('should update query values', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update query 1
    wrapper.find('[data-testid="query-1"]').simulate('change', {
      target: { value: '{"query": {"match_all": {}}}' },
    });
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="query-1-value"]').text()).toBe('{"query": {"match_all": {}}}');
    });

    // Update query 2
    wrapper.find('[data-testid="query-2"]').simulate('change', {
      target: { value: '{"query": {"term": {"field": "value"}}}' },
    });
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="query-2-value"]').text()).toBe('{"query": {"term": {"field": "value"}}}');
    });
  });

  it('should update search value', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update search value
    wrapper.find('[data-testid="search-value"]').simulate('change', {
      target: { value: 'test search query' },
    });
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="search-value-value"]').text()).toBe('test search query');
    });
  });

  it('should update pipeline values', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update pipeline 1
    wrapper.find('[data-testid="pipeline-1"]').simulate('change', {
      target: { value: 'test-pipeline-1' },
    });
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="pipeline-1-value"]').text()).toBe('test-pipeline-1');
    });

    // Update pipeline 2
    wrapper.find('[data-testid="pipeline-2"]').simulate('change', {
      target: { value: 'test-pipeline-2' },
    });
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="pipeline-2-value"]').text()).toBe('test-pipeline-2');
    });
  });

  it('should update saved configuration', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update saved configuration
    wrapper.find('[data-testid="saved-configuration"]').simulate('change', {
      target: { value: 'test-saved-config' },
    });
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="saved-configuration-value"]').text()).toBe('test-saved-config');
    });
  });

  it('should update allow list', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update allow list
    wrapper.find('[data-testid="set-allow-list"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="allow-list-value"]').text()).toBe('["index1","index2"]');
    });
  });

  it('should update documents indexes', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update documents indexes
    wrapper.find('[data-testid="set-documents-indexes"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="documents-indexes-value"]').text()).toBe('[{"name":"test-index"}]');
    });

    // Update documents indexes 1
    wrapper.find('[data-testid="set-documents-indexes-1"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="documents-indexes-1-value"]').text()).toBe('[{"name":"test-index-1"}]');
    });

    // Update documents indexes 2
    wrapper.find('[data-testid="set-documents-indexes-2"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="documents-indexes-2-value"]').text()).toBe('[{"name":"test-index-2"}]');
    });
  });

  it('should update query error states', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update query error 1
    wrapper.find('[data-testid="set-query-error-1"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="query-error-1-value"]').text()).toBe('{"errorResponse":"Test error 1"}');
    });

    // Update query error 2
    wrapper.find('[data-testid="set-query-error-2"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="query-error-2-value"]').text()).toBe('{"errorResponse":"Test error 2"}');
    });
  });

  it('should update compared results', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <TestComponent />
      </SearchRelevanceContextProvider>
    );

    // Update compared result 1
    wrapper.find('[data-testid="update-compared-result-1"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="compared-result-1-value"]').text()).toBe('{"1":1}');
    });

    // Update compared result 2
    wrapper.find('[data-testid="update-compared-result-2"]').simulate('click');
    wrapper.update();
    
    await waitFor(() => {
      expect(wrapper.find('[data-testid="compared-result-2-value"]').text()).toBe('{"2":1}');
    });
  });

  it('should throw error when context is used outside provider', () => {
    const ComponentWithoutProvider = () => {
      try {
        useSearchRelevanceContext();
        return <div>Context loaded</div>;
      } catch (error) {
        return <div>Error: {error.message}</div>;
      }
    };

    const wrapper = mount(<ComponentWithoutProvider />);
    expect(wrapper.text()).toBe('Error: No Search Relevance context');
  });

  it('should render context provider with children', async () => {
    const wrapper = mount(
      <SearchRelevanceContextProvider>
        <div data-testid="child-component">Child Content</div>
      </SearchRelevanceContextProvider>
    );

    await waitFor(() => {
      expect(wrapper.find('[data-testid="child-component"]').text()).toBe('Child Content');
    });
  });
});