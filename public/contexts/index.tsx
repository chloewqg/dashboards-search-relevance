/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';

import { DataSourceOption } from '../../../../src/plugins/data_source_management/public/components/data_source_selector/data_source_selector';
import { DocumentsIndex, SearchResults, QueryError, initialQueryErrorState} from '../types/index';
import { DocumentRank, getDocumentRank } from './utils';

export interface SearchRelevanceContextProps {
  // UI State
  showFlyout: boolean;
  setShowFlyout: React.Dispatch<React.SetStateAction<boolean>>;

  // Document Indexes
  documentsIndexes: DocumentsIndex[];
  setDocumentsIndexes: React.Dispatch<React.SetStateAction<DocumentsIndex[]>>;
  documentsIndexes1: DocumentsIndex[];
  setDocumentsIndexes1: React.Dispatch<React.SetStateAction<DocumentsIndex[]>>;
  documentsIndexes2: DocumentsIndex[];
  setDocumentsIndexes2: React.Dispatch<React.SetStateAction<DocumentsIndex[]>>;

  // Index Selection
  selectedIndex1: string;
  setSelectedIndex1: React.Dispatch<React.SetStateAction<string>>;
  selectedIndex2: string;
  setSelectedIndex2: React.Dispatch<React.SetStateAction<string>>;

  // Search Queries
  query1: string;
  setQuery1: React.Dispatch<React.SetStateAction<string>>;
  query2: string;
  setQuery2: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;

  // Query Error Handling
  queryError1: QueryError;
  setQueryError1: React.Dispatch<React.SetStateAction<QueryError>>;
  queryError2: QueryError;
  setQueryError2: React.Dispatch<React.SetStateAction<QueryError>>;

  // Search Results Comparison
  comparedResult1: DocumentRank;
  updateComparedResult1: (result: SearchResults) => void;
  comparedResult2: DocumentRank;
  updateComparedResult2: (result: SearchResults) => void;

  // Pipelines
  pipelines: {};
  setPipelines: React.Dispatch<React.SetStateAction<{}>>;
  pipeline1: string;
  setPipeline1: React.Dispatch<React.SetStateAction<string>>;
  pipeline2: string;
  setPipeline2: React.Dispatch<React.SetStateAction<string>>;
  fetchedPipelines1: {};
  setFetchedPipelines1: React.Dispatch<React.SetStateAction<{}>>;
  fetchedPipelines2: {};
  setFetchedPipelines2: React.Dispatch<React.SetStateAction<{}>>;

  // Data Sources
  datasource1: string;
  setDataSource1: React.Dispatch<React.SetStateAction<string>>;
  datasource2: string;
  setDataSource2: React.Dispatch<React.SetStateAction<string>>;
  datasourceItems: {};
  setDatasourceItems: React.Dispatch<React.SetStateAction<{}>>;
  dataSourceOptions: DataSourceOption[];
  setDataSourceOptions: React.Dispatch<React.SetStateAction<DataSourceOption[]>>;

  // Configuration Management
  savedConfiguration: string;
  setSavedConfiguration: React.Dispatch<React.SetStateAction<string>>;
  allowList: string[];
  setAllowList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SearchRelevanceContext = createContext<SearchRelevanceContextProps | null>(null);

export const useSearchRelevanceContext = () => {
  const context = useContext(SearchRelevanceContext);

  if (!context) {
    throw Error('No Search Relevance context');
  }

  return context;
};

export const SearchRelevanceContextProvider = ({ children }: { children: React.ReactNode }) => {
  // UI State
  const [showFlyout, setShowFlyout] = useState(false);

  // Document Indexes
  const [documentsIndexes, setDocumentsIndexes] = useState<DocumentsIndex[]>([]);
  const [documentsIndexes1, setDocumentsIndexes1] = useState<DocumentsIndex[]>([]);
  const [documentsIndexes2, setDocumentsIndexes2] = useState<DocumentsIndex[]>([]);

  // Index Selection
  const [selectedIndex1, setSelectedIndex1] = useState('');
  const [selectedIndex2, setSelectedIndex2] = useState('');

  // Search Queries
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Query Error Handling
  const [queryError1, setQueryError1] = useState<QueryError>(initialQueryErrorState);
  const [queryError2, setQueryError2] = useState<QueryError>(initialQueryErrorState);

  // Search Results Comparison
  const [comparedResult1, setComparedResult1] = useState<DocumentRank>({});
  const [comparedResult2, setComparedResult2] = useState<DocumentRank>({});

  // Pipelines
  const [pipelines, setPipelines] = useState<{}>({});
  const [pipeline1, setPipeline1] = useState('');
  const [pipeline2, setPipeline2] = useState('');
  const [fetchedPipelines1, setFetchedPipelines1] = useState<{}>({});
  const [fetchedPipelines2, setFetchedPipelines2] = useState<{}>({});

  // Data Sources
  const [datasource1, setDataSource1] = useState('');
  const [datasource2, setDataSource2] = useState('');
  const [datasourceItems, setDatasourceItems] = useState<{}>({});
  const [dataSourceOptions, setDataSourceOptions] = useState<DataSourceOption[]>([]);

  // Configuration Management
  const [savedConfiguration, setSavedConfiguration] = useState<string>('');
  const [allowList, setAllowList] = useState<string[]>([]);

  const updateComparedResult1 = (result: SearchResults) => {
    setComparedResult1(getDocumentRank(result?.hits?.hits));
  };

  const updateComparedResult2 = (result: SearchResults) => {
    setComparedResult2(getDocumentRank(result?.hits?.hits));
  };

  return (
    <SearchRelevanceContext.Provider
      value={{
        // UI State
        showFlyout,
        setShowFlyout,

        // Document Indexes
        documentsIndexes,
        setDocumentsIndexes,
        documentsIndexes1,
        setDocumentsIndexes1,
        documentsIndexes2,
        setDocumentsIndexes2,

        // Index Selection
        selectedIndex1,
        setSelectedIndex1,
        selectedIndex2,
        setSelectedIndex2,

        // Search Queries
        query1,
        setQuery1,
        query2,
        setQuery2,
        searchValue,
        setSearchValue,

        // Query Error Handling
        queryError1,
        setQueryError1,
        queryError2,
        setQueryError2,

        // Search Results Comparison
        comparedResult1,
        updateComparedResult1,
        comparedResult2,
        updateComparedResult2,

        // Pipelines
        pipelines,
        setPipelines,
        pipeline1,
        setPipeline1,
        pipeline2,
        setPipeline2,
        fetchedPipelines1,
        setFetchedPipelines1,
        fetchedPipelines2,
        setFetchedPipelines2,

        // Data Sources
        datasource1,
        setDataSource1,
        datasource2,
        setDataSource2,
        datasourceItems,
        setDatasourceItems,
        dataSourceOptions,
        setDataSourceOptions,

        // Configuration Management
        savedConfiguration,
        setSavedConfiguration,
        allowList,
        setAllowList,
      }}
    >
      {children}
    </SearchRelevanceContext.Provider>
  );
};
