<template>
  <div>
    <RegularNav/>
    <!-- <div class="container">
      <form class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        <button type="submit" hidden></button>
      </form>
    </div> -->
    <div class="container">
      <div class="filter">
        <div class="table">
          <el-row>
            <el-col :span="3" class="type">品牌</el-col>
            <el-col :span="21">
              <div class="option">三只松鼠</div>
              <div class="option">百草味</div>
              <div class="option">良品铺子</div>
              <div class="option">周黑鸭</div>
              <div class="option">乐事</div>
              <div class="option">奥利奥</div>
              <div class="option">卫龙</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="type">分类</el-col>
            <el-col :span="21">
              <div class="option">膨化食品</div>
              <div class="option">传统糕点</div>
              <div class="option">肉类即食</div>
              <div class="option">饼干</div>
              <div class="option">豆干零食</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="type">包装方式</el-col>
            <el-col :span="21">
              <div class="option">包装</div>
              <div class="option">散装</div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="bar">
            <div class="group">
              <el-button-group>
                <el-button size="mini">综合</el-button>
                <el-button size="mini">价格</el-button>
                <el-button size="mini">销量</el-button>
                <el-button size="mini">新品</el-button>
              </el-button-group>
            </div>
            <div class="group price-limit">
              <el-row>
                <el-col :span="12">
                  <el-input size="mini" placeholder="最高价格"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input size="mini" placeholder="最低价格"></el-input>
                </el-col>
              </el-row>
            </div>
            <div class="group">
              <el-checkbox-group>
                <el-checkbox label="包邮"></el-checkbox>
                <el-checkbox label="折扣"></el-checkbox>
                <el-checkbox label="货到付款"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="result">
        <el-row class="card-list" :gutter="5">
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row class="card-list" :gutter="5">
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row class="card-list" :gutter="5">
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row class="card-list" :gutter="5">
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://dummyimage.com/500x500/22c3e3/fff" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time"></time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination layout="prev, pager, next" :total="1000" class="text-center"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import RegularNav from "../components/RegularNav";
export default {
  components: {
    RegularNav
  }
}
</script>

<style scoped>
.search {
  margin: 0.8em 0;
}

.filter .table > * {
  border: 1px solid #bbb;
  border-top-width: 0;
  font-size: 0.8em;
}

.filter .table > *:first-child {
  border-top-width: 1px;
}

.filter .type,
.filter .option {
  display: inline-block;
  padding: 1em;
  cursor: pointer;
}

.filter .type {
  color: #666;
  font-size: 0.9em;
}

.bar {
  margin-top: 0.5em;
}

.bar > * {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5em;
}

.bar .price-limit {
  width: 120px;
}

.bar .el-checkbox {
  margin-right: 10px;
}

.result {
  margin-top: 0.8em;
}
</style>
