import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Grommet, ResponsiveContext } from "grommet";
import { Notification } from "grommet-icons";
import { theme } from "./theme";
import { AppBarUI } from "./components/ui/AppBarUI";
import { DistributionUI } from "./components/ui/DistributionUI";
import { GoogleLogin } from "react-google-login";
import { createCookie, readCookie } from "./utils/cookie";
import { getLastRecords } from "./utils/getSheet";

const App = () => {
	const [showSidebar, toggleSidebar] = useState(false);
	const [sheetData, setSheetData] = useState([]);
	const accessCookie = readCookie("accessToken");
	const [accessToken, setAccessToken] = useState(accessCookie);

	useEffect(() => {
		if ((accessToken && !sheetData) || !sheetData.length) {
			getLastRecords(accessToken, "BodyParameters", 3).then(response =>
				setSheetData(response)
			);
		}
	}, [accessToken, sheetData]);

	console.log(sheetData);

	const responseGoogle = response => {
		setAccessToken(response.accessToken);
		createCookie("accessToken", response.accessToken, 7);
	};

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
						<Box gap="medium" pad="medium">
							{sheetData && sheetData.length && (
								<Box align="stretch" justify="center">
									<DistributionUI sheetData={sheetData} />
								</Box>
							)}

							<Box flex align="center" justify="center">
								<GoogleLogin
									clientId="871571427144-0uiijqg05i1u8h8o8hrmpcu41gk5m0md.apps.googleusercontent.com"
									buttonText="Login"
									onSuccess={responseGoogle}
									onFailure={responseGoogle}
									cookiePolicy={"single_host_origin"}
									scope="https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets  https://www.googleapis.com/auth/spreadsheets.readonly"
								/>
							</Box>
						</Box>
					</Box>
				)}
			</ResponsiveContext.Consumer>
		</Grommet>
	);
};

export default App;
