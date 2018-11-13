<style>
  .text{
    text-shadow: 0.08em 0.08em 0.08em #999999;
    font-family: "Microsoft YaHei","iconfont","FontAwesome";
    font-size: 30px;
  }
</style>
<template>
  <div>
    <p :class="className" :style="{textAlign: 'center', color: color, fontSize: countSize, fontWeight: countWeight}">
      <span class="text" v-cloak :id="idName">{{ startVal }}</span>
      <span>{{ unit }}</span>
      <slot name="intro"></slot>
    </p>
    
  </div>
</template>
<script>
  import CountUp from 'countup';

  function transformValue(val) {
    let endVal = 0;
    let unit = '';
    /*if (val < 10000) {
      endVal = val;
    }
    else if (val >= 1000 && val < 10000) {
       endVal = parseInt(val / 1000);
       unit = '千+';
     }
     else if (val >= 10000 && val < 100000000) {
      endVal = parseInt(val / 10000);
      unit = '万+';
      } else {
        endVal = parseInt(val / 100000000);
        unit = '亿+';
      }*/
      return {
        val: val,
        unit: unit
      };
    }

        export default {
          data() {
            return {
              unit: '',
              demo: {}
            };
          },
          name: 'countUp',
          props: {
            idName: String,
            className: String,
            startVal: {
              type: Number,
              default: 0
            },
            endVal: {
              type: Number,
              default: 0
            },
            decimals: {
              type: Number,
              default: 0
            },
            duration: {
              type: Number,
              default: 2
            },
            delay: {
              type: Number,
              default: 500
            },
            options: {
              type: Object,
              default: () => {
                return {
                  useEasing: true,
                  useGrouping: true,
                  separator: ',',
                  decimal: '.'
                };
              }
            },
            color: String,
            countSize: {
              type: String,
              default: '30px'
            },
            countWeight: {
              type: Number,
              default: 700
            },
            introText: [String, Number]
          },
          mounted() {
            this.$nextTick(() => {
              setTimeout(() => {
                let res = transformValue(this.endVal);
                let endVal = res.val;
                this.unit = res.unit;
                let demo = {};
                this.demo = demo = new CountUp(this.idName, this.startVal, endVal, this.decimals, this.duration, this.options);
                if (!demo.error) {
                  demo.start();
                }
              }, this.delay);
            });
          },
          watch: {
          /*endVal (val) {
              let res = transformValue(val);
              let endVal = res.val;
              this.unit = res.unit;
              this.demo.update(endVal);
            }*/
          }
        };
      </script>
      
