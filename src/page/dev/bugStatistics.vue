<template>
  <div class="dev_page">
    <div>
      <div ref="currentBugWarn" style="width: 100%;height: 25rem;"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import * as services from './services'

	export default {
		name: "bugStatistics",
    mounted() {
      this.getBugList()
    },
    methods: {
		  getBugList() {
        services.queryBugList.call(this, {}, {}).then((res) => {
          this.initEcharts(res.data)
        })
      },
		  initEcharts(list) {
		    // 一个月可产生bug
		    const preBug = 18
        // 已产生bug
        let hasBug = list.length
        // 剩余可用bug数
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs['currentBugWarn']);

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '',
            subtext: '月度bug剩余统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'center',
            bottom: 0,
            data: ['已产生bug数', '可bug数']
          },
          series: [
            {
              name: '个人bug统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: hasBug,
                  name: '已产生bug数',
                  label: {
                    formatter: '已产生bug数: ' + hasBug
                  }
                },
                {
                  value: preBug-hasBug,
                  name: '可bug数',
                  label: {
                    formatter: preBug-hasBug > 0?'可bug数:15' + preBug-hasBug: '可bug数: 0'
                  }
                }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  .dev_page{
    padding: 5px;
    height: 100%;
    background-color: #f2f2f2;
    overflow: hidden;
  }
</style>
