import React from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';
import { TooltipCss } from './tooltip.styles';

const TooltipWrap = ({ children, message }) => {
	return (
		<>
			<TooltipCss />
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
					<Tooltip.Portal>
						<Tooltip.Content className="TooltipContent" sideOffset={5}>
							{message}
							<Tooltip.Arrow className="TooltipArrow" />
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			</Tooltip.Provider>
		</>
	);
};

export default TooltipWrap;
