import React, { useState } from "react";
import {
	Box,
	Button,
	Heading,
	Grommet,
	Collapsible,
	ResponsiveContext
} from "grommet";
import { Notification } from "grommet-icons";
import { theme } from "./theme";
import { AppBarUI } from "./ui/AppBarUI";

const App = () => {
	const [showSidebar, toggleSidebar] = useState(false);

	return (
		<Grommet theme={theme} full>
			<ResponsiveContext.Consumer>
				{size => (
					<Box fill>
						<AppBarUI>
							<Heading level="3" margin="none">
								My App
							</Heading>
							<Button
								icon={<Notification />}
								onClick={() => {
									toggleSidebar(!showSidebar);
								}}
							/>
						</AppBarUI>
						<Box direction="row" flex overflow={{ horizontal: "hidden" }}>
							<Box flex align="center" justify="center">
								app body
							</Box>
							{size !== "small" && (
								<Collapsible direction="horizontal" open={showSidebar}>
									<Box
										flex
										width="medium"
										background="light-2"
										elevation="small"
										align="center"
										justify="center"
									>
										sidebar
									</Box>
								</Collapsible>
							)}
						</Box>
					</Box>
				)}
			</ResponsiveContext.Consumer>
		</Grommet>
	);
};

export default App;
