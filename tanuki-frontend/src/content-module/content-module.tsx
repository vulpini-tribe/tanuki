import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ROUTES from '@routes';
import IndexModule from './index-module';
import { Heading } from '@radix-ui/themes';

const ContentModule = () => {
	return (
		<div>
			<Heading mb="2" size="8" weight="bold">
				Content Module
			</Heading>

			<Routes>
				<Route path={ROUTES.INDEX.ROOT} element={<IndexModule />} />

				<Route path="*" element={<Navigate to={ROUTES.INDEX.ROOT} replace />} />
			</Routes>
		</div>
	);
};

export default ContentModule;
