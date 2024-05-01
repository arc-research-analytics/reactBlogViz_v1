import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../App.utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown.js";

// initialize drilldown module
drilldown(Highcharts);

const HMDAColumnDrilldown = () => {
  // get the correct data by looking at the URL query parameters;
  // example URL: column-drilldown?collectionName=HMDA&id=HMDA_DRates_County
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const collectionName = searchParams.get("collectionName");
  const id = searchParams.get("id");

  // state variables
  const [options, setOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null); // clear any previous error

    fetchData(collectionName, id)
      .then((data) => {
        // Assuming fetchData returns the options object directly
        const options = data[0].options; // extract options object from the Mongo document
        setOptions(options);
        options.chart.events = {
          drilldown: function (e) {
            this.setTitle({ text: e.seriesOptions.title });
            if (e.point.drilldown) {
              this.yAxis[0].addPlotLine({
                value: e.seriesOptions.plotLineValue,
                color: "#000000",
                width: 2,
                dashStyle: "Solid",
                label: {
                  text: e.seriesOptions.plotLineName,
                  align: "left",
                  style: {
                    color: "#000000",
                    fontWeight: "bold",
                  },
                },
                zIndex: 5,
                id: "drilldownPlotLine",
              });
            }
          },
          drillup: function () {
            this.setTitle({ text: options.title.text });
            this.yAxis[0].removePlotLine("drilldownPlotLine");
          },
        };
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []); // empty dependency array; fetch only on mount

  return (
    <div>
      {isLoading && <p style={{ color: "black" }}>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && options ? (
        <div style={{ height: "100vh", width: "100vw" }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      ) : null}
    </div>
  );
};

export default HMDAColumnDrilldown;
