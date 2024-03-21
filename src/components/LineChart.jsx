import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ data, yAxisLegend }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[900],
            },
          },
          legends: {
            text: {
              fill: colors.grey[900],
              fontSize: "20px",
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[900],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[900],
              fontSize: "15px",
            },
            text: {
              fill: colors.grey[900],
              fontSize: "15px",
            },
          },
        },
        legends: {
          text: {
            fill: colors.primary[900],
            fontSize: "14px",
          },
        },
        tooltip: {
          container: {
            color: colors.primary[900],
          },
        },
      }}
      colors={{ datum: "color" }} // added
      margin={{ top: 40, right: 160, bottom: 50, left: 80 }}
      xScale={{ 
        type: "point" 
      }}
      yScale={{
        type: "linear",
        min: "0",
        max: "auto",
        stacked: false, // set to true to prevent overlap of points
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Time", // added
        legendOffset: 36,
        legendPosition: "middle",
        padding: 2,
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: yAxisLegend, // added
        legendOffset: -50,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={({ point }) => {
        return (
          <div style={{ padding: '10px', color: 'black', background: 'white' }}>
            <strong>{point.serieId}</strong>
            <br />
            {`--  ${point.data.yFormatted}`}
          </div>
        );
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: -350,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 30,
          itemOpacity: 0.75,
          symbolSize: 20,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
