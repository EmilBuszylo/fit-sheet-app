import React from "react";
import { Box, Distribution, Text, Heading, DataTable } from "grommet";

const CurrentDataBox = ({ data }) => {
	console.log(data);

	const keysList = Object.keys(data[0]);
	const valuesList = Object.values(data[0]);

	const dataTableData = keysList.map((key, index) => {
		return {
			name: key,
			value: valuesList[index],
		};
	});

	return (
		<Box>
			<Heading margin="small" level={4}>
				{data[0].date}
			</Heading>
			<DataTable
				size="small"
				pad={{ vertical: "xxsmall" }}
				header={false}
				columns={[
					{
						property: "name",
						header: false,
					},
					{
						property: "value",
						header: false,

						render: datum => (
							<Box size="small" resizeable pad={{ vertical: "xxsmall" }}>
								<Text>{datum.value}</Text>
							</Box>
						),
					},
				]}
				data={dataTableData}
			/>
			<Text></Text>
		</Box>
	);
};

const PreviousDataBox = ({ data }) => {
	return <Text>{data[0].date}</Text>;
};

const LastDataBox = ({ data }) => {
	return <Text>{data[0].date}</Text>;
};

export const DistributionUI = props => {
	const keysList = Object.keys(props.sheetData[0]);
	const columnsConf = keysList.map(key => {
		return {
			property: key,
		};
	});
	const valuesList = props.sheetData.map((element, index) =>
		Object.values(element)
	);

	const dataTableData = () => {
		console.log(keysList);
		console.log(valuesList);
	};

	console.log(dataTableData());

	return (
		<Box>
			<DataTable
				size="small"
				pad={{ vertical: "xxsmall" }}
				header={false}
				columns={columnsConf}
				data={props.sheetData}
			/>
			<Distribution
				basis="medium"
				direction="row"
				values={[
					{
						value: 50,
						color: "light-3",
						content: <CurrentDataBox data={props.sheetData} />,
					},
					{
						value: 30,
						color: "brand",
						content: <PreviousDataBox data={props.sheetData} />,
					},
					{
						value: 20,
						color: "accent-1",
						content: <LastDataBox data={props.sheetData} />,
					},
				]}
			>
				{value => (
					<Box pad="xsmall" background={value.color} fill={true}>
						{value.content}
					</Box>
				)}
			</Distribution>
		</Box>
	);
};
