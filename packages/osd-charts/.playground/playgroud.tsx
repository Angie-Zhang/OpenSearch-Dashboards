import React from 'react';
import { Chart, Settings, TooltipType, BarSeries } from '../src';
import { KIBANA_METRICS } from '../src/utils/data_samples/test_dataset_kibana';
export class Playground extends React.Component {
  chartRef: React.RefObject<Chart> = React.createRef();
  onSnapshot = () => {
    if (!this.chartRef.current) {
      return;
    }
    const snapshot = this.chartRef.current.getPNGSnapshot({
      backgroundColor: 'white',
      pixelRatio: 1,
    });
    if (!snapshot) {
      return;
    }
    const fileName = 'chart.png';
    switch (snapshot.browser) {
      case 'IE11':
        return navigator.msSaveBlob(snapshot.blobOrDataUrl, fileName);
      default:
        const link = document.createElement('a');
        link.download = fileName;
        link.href = snapshot.blobOrDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };
  render() {
    return (
      <>
        <button onClick={this.onSnapshot}>Snapshot</button>
        <div className="chart">
          <Chart size={[200, 100]}>
            <Settings tooltip={{ type: TooltipType.Crosshairs }} showLegend />
            <BarSeries
              id="lines"
              xAccessor={0}
              yAccessors={[1]}
              data={KIBANA_METRICS.metrics.kibana_os_load[0].data.slice(0, 5)}
            />
            <BarSeries
              id="lines2"
              xAccessor={0}
              yAccessors={[1]}
              data={KIBANA_METRICS.metrics.kibana_os_load[0].data.slice(0, 5)}
            />
          </Chart>
        </div>
        <div className="chart">
          <Chart>
            <Settings tooltip={{ type: TooltipType.Crosshairs }} showLegend />
            <BarSeries
              id="lines"
              xAccessor={0}
              yAccessors={[1]}
              stackAccessors={[0]}
              data={KIBANA_METRICS.metrics.kibana_os_load[0].data.slice(0, 5)}
            />
            <BarSeries
              id="lines2"
              xAccessor={0}
              yAccessors={[1]}
              stackAccessors={[0]}
              data={KIBANA_METRICS.metrics.kibana_os_load[0].data.slice(0, 5)}
            />
          </Chart>
        </div>
      </>
    );
  }
}
