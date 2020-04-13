import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import SearchPresenter from './SearchPresenter';
import { SEARCH } from './SearchQueries';

export default withRouter(({ location: { search }}) => {
	const term = search.split('=')[1];
	const { data, loading } = useQuery(SEARCH, {
		/**
		 * skip === true 이면 query는 실행되지 않는다
		 * skip에 조건을 줄 수 있다.
		 */
		skip: !term,
		variables: { term },
	});
	return (
		<SearchPresenter
			searchTerm={ term }
			loading={ loading }
			data={ data }
		/>
	);
});