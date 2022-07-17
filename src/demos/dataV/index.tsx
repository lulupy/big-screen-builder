import { Charts, ActiveRingChart, CapsuleChart, Decoration1, Decoration2 } from '@jiaminghi/data-view-react';


const ChartsDemo = () => {
  const option = {
    title: {
      text: '剩余油量表',
      style: {
        fill: '#fff'
      }
    },
    series: [
      {
        type: 'gauge',
        data: [ { name: 'itemA', value: 55 } ],
        center: ['50%', '55%'],
        axisLabel: {
          formatter: '{value}%',
          style: {
            fill: '#fff'
          }
        },
        axisTick: {
          style: {
            stroke: '#fff'
          }
        },
        animationCurve: 'easeInOutBack'
      }
    ]
  }
  return (
    <Charts option={option} style={{ width: '300px', height: '300px'}} />
  );
}


const ActiveRingChartDemo = () => {
  const config = {
    data: [
      {
        name: '周口',
        value: 55
      },
      {
        name: '南阳',
        value: 120
      },
      {
        name: '西峡',
        value: 78
      },
      {
        name: '驻马店',
        value: 66
      },
      {
        name: '新乡',
        value: 80
      }
    ]
  }
  return (
    <ActiveRingChart config={config} style={{ width: '300px', height: '300px'}} />
  );
}



const CapsuleChartDemo = () => {
  const config = {
    data: [
      {
        name: '周口',
        value: 55
      },
      {
        name: '南阳',
        value: 120
      },
      {
        name: '西峡',
        value: 78
      },
      {
        name: '驻马店',
        value: 66
      },
      {
        name: '新乡',
        value: 80
      }
    ]
  }
  return (
    <CapsuleChart config={config} style={{ width: '300px', height: '300px'}} />
  );
}

const Demo = () => {
  return (
    <div style={{ background: '#111'}} >
      <ChartsDemo/>
      <ActiveRingChartDemo></ActiveRingChartDemo>
      <CapsuleChartDemo></CapsuleChartDemo>
      <Decoration1 style={{width: '200px', height: '50px'}} />
      <Decoration2 style={{width: '200px', height: '5px'}} />

    </div>
  );
}

export default Demo;