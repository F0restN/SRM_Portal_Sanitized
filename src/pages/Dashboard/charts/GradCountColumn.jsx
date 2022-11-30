/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Column } from '@ant-design/plots';
import { Grid, Typography, Box } from '@mui/material';
import MainCard from '../../../components/MainCard';

function GradCountColumn({ data }) {
  data = data.reduce((result, item) => {
    if (item.type === 'Graduate') {
      result.push(item);
    }
    return result;
  }, []);

  const config = {
    data,
    appendPadding: 10,
    height: 460,
    autoFit: false,
    xField: 'term',
    yField: 'value',
    xAxis: {
      range: [0, 1],
      label: {
        autoRotate: false,
      },
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
    slider: {
      start: 0,
      end: 1,
    },
    legend: {
      offsetX: 30,
      offsetY: -5,
      fontSize: 5,
    },
    tooltip: {
      showTitle: true,
    },
    color: '#5AD8A6',
  };

  return (
    <Grid item xs={12} md={4} lg={4}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Graduate Count</Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Box sx={{ pl: 1, pr: 1, pt: 2 }}>
          <div id="chart">
            <Column {...config} />
          </div>
        </Box>
      </MainCard>
    </Grid>
  );
}

export default GradCountColumn;
