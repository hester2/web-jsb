<template>
  <div>
    <div class="gd-home-main">
      <div class="gd-home-block">
        <el-carousel height="350px">
          <el-carousel-item>
            <img src="../../assets/img/banner-001.png" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/banner-002.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/banner-003.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/banner-004.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
        <div v-if="loginShow" class="gd-home-login">
          <login-content @afterLogin="afterLogin" />
        </div>
        <div v-if="Object.keys(userInfo).length>0" class="gd-home-login gd-home-login-comp">
          <p>金塑宝欢迎您 ！</p>
          <img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3621869950,2480486393&fm=26&gp=0.jpg" alt="">
          <p>{{ userInfo.nickname }}</p>
        </div>

      </div>
     <div class="w">
        <div class="gd-home-mro"><img src="../../assets/img/icon-home-006.png" alt=""> <span>最新行情</span></div>
        <div class=" gd-home-market">
          <div class="gd-home-market-left">
            <div class="gd-home-mark-ti">
              <p><span /><span>原料行情</span></p>
              <p>04-21 10：01</p>
            </div>
            <div class="gd-home-mark-tm">
              <el-carousel height="350px">
                <el-carousel-item>
                  <div class="gd-home-mark-tl">
                    <p><span>WTI</span><span>-37.63</span></p>
                    <p><span>美元/桶</span><span>-55.9</span></p>
                  </div>
                  <div class="gd-home-mark-tl">
                    <p><span>WTI</span><span>-37.63</span></p>
                    <p><span>美元/桶</span><span>-55.9</span></p>
                  </div>
                  <div class="gd-home-mark-tl">
                    <p><span>WTI</span><span>-37.63</span></p>
                    <p><span>美元/桶</span><span>-55.9</span></p>
                  </div>
                  <div class="gd-home-mark-tl">
                    <p><span>WTI</span><span>-37.63</span></p>
                    <p><span>美元/桶</span><span>-55.9</span></p>
                  </div>
                </el-carousel-item>
                <el-carousel-item>
                  <div class="gd-home-mark-tl">
                    <p><span>WTI</span><span>-37.63</span></p>
                    <p><span>美元/桶</span><span>-55.9</span></p>
                  </div>
                  <div class="gd-home-mark-tl">
                    <p><span>WTI</span><span>-37.63</span></p>
                    <p><span>美元/桶</span><span>-55.9</span></p>
                  </div>
                  <div class="gd-home-mark-tl">
                    <p><span>WTI</span><span>-37.63</span></p>
                    <p><span>美元/桶</span><span>-55.9</span></p>
                  </div>
                  <div class="gd-home-mark-tl">
                    <p><span>WTI</span><span>-37.63</span></p>
                    <p><span>美元/桶</span><span>-55.9</span></p>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="gd-home-market-cr">
            <div class="gd-home-mark-ti">
              <p><span /><span>国际市场价</span></p>
              <p />
            </div>
            <div class="gd-home-mark-tcm">
              <el-carousel height="350px">
                <el-carousel-item class="gd-home-mark-rm">
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span>¥31950元/吨</span></p>
                      <p><span>福建天原</span><span>-55.9</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span>¥31950元/吨</span></p>
                      <p><span>福建天原</span><span>-55.9</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="txtColor">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtColor">-55.9</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="txtColor">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtColor">-55.9</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="texFlat">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtcolorFlat">持平</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="texFlat">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtcolorFlat">持平</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="texFlat">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtcolorFlat">持平</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="texFlat">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtcolorFlat">持平</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                </el-carousel-item>
                <el-carousel-item class="gd-home-mark-rm">
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span>¥31950元/吨</span></p>
                      <p><span>福建天原</span><span>-55.9</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span>¥31950元/吨</span></p>
                      <p><span>福建天原</span><span>-55.9</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="txtColor">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtColor">-55.9</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="txtColor">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtColor">-55.9</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="texFlat">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtcolorFlat">持平</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="texFlat">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtcolorFlat">持平</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="texFlat">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtcolorFlat">持平</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                  <div class="gd-home-mark-tl">
                    <div style="flex: 11;">
                      <p><span>GPPS TY655N</span><span class="texFlat">¥31950元/吨</span></p>
                      <p><span>福建天原</span><span class="txtcolorFlat">持平</span></p>
                    </div>
                    <div style="flex: 1;border-right: 1px solid #E6E6E6;height: 50px;" />
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="gd-home-market-rl">
            <div class="gd-home-mark-ti">
              <p><span /><span>国际市场行情</span></p>
              <p>更多>></p>
            </div>
            <div class="gd-home-market-br">
              <ve-line :data="chartData" />
            </div>
          </div>
        </div>
      </div>
      <div class="w">
        <div class="gd-home-mro gd-home-offer"><img src="../../assets/img/icon-home-007.png" alt=""> <span>最新报价</span></div>
        <div class="gd-home-market">
          <div class="gd-home-offer-cl">
            <div class="gd-home-mark-ti">
              <p><span /><span>最新报价</span></p>
              <p>更多报价>></p>
            </div>
            <div class="gd-home-mark-tcx">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="PP" name="first">
                  <template>
                    <el-table :data="tableData" border style="width: 100%">
                      <el-table-column prop="date" label="材质" width="80" />
                      <el-table-column prop="name" label="牌号" width="100" />
                      <el-table-column prop="province" label="厂家" width="120" />
                      <el-table-column prop="city" label="当前报价(元/吨）" width="115" />
                      <el-table-column label="操作" width="70">
                        <template slot-scope="scope">
                          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-tab-pane>
                <el-tab-pane label="PC" name="second">2</el-tab-pane>
                <el-tab-pane label="ABS" name="third">3</el-tab-pane>
                <el-tab-pane label="其它" name="fourth">4</el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="gd-home-offer-cr">
            <div class="gd-home-mark-ti">
              <p><span /><span>报价供应商</span></p>
              <p />
            </div>
            <div class="gd-home-offer-company">
              <div class="gd-home-offer-row"><span>供应商</span><span>更新时间</span></div>
              <div class="gd-home-offer-col">
                <ul>
                  <li><span>东完市鑫塑旺塑胶有限公司</span><span>7小时前</span></li>
                  <li><span>东完市鑫塑旺塑胶有限公司</span><span>7小时前</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div style="" />
          <div class="gd-home-offer-cr">
            <div class="gd-home-mark-ti">
              <p><span /><span>报价供应商</span></p>
              <p />
            </div>
            <div class="gd-home-offer-company">
              <div class="gd-home-offer-row"><span>供应商</span><span>更新时间</span></div>
              <div class="gd-home-offer-col">
                <ul>
                  <li><span>东完市鑫塑旺塑胶有限公司</span><span>7小时前</span></li>
                  <li><span>东完市鑫塑旺塑胶有限公司</span><span>7小时前</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="gd-home-offer-right">
						<div class="gd-home-mark-ti">
							<p><span /><span>快速竞拍</span></p>
							<p />
						</div>
						<div class="gd-home-offer-right-col">
							<div class="gd-home-offer-right-row">
								<div class="gd-home-offer-bid">
									<p>LLOPEDFDA-7042/中海壳牌 216.0吨</p>
									<p>最高中标价: <span class="colorRed">6540.0元/吨</span></p>
									<p>最低中标价： <span class="colorOrage">6530.0元/吨</span></p>
									<p>标的来源：中海壳牌石油化有限公司</p>
									<p>结束时间：2020-04-30 11:17</p>
								</div>
								<div class="gd-home-offer-bid-cr">
									<p>城市：惠州</p>
									<p>惠州中海壳牌厂</p>
									<p>
										<router-link to="/shop/auction">参与竞拍</router-link>
									</p>
								</div>
							</div>
							<div class="gd-home-offer-right-row">
								<div class="gd-home-offer-bid">
									<p>LLOPEDFDA-7042/中海壳牌 216.0吨</p>
									<p>最高中标价: <span class="colorRed">6540.0元/吨</span></p>
									<p>最低中标价： <span class="colorOrage">6530.0元/吨</span></p>
									<p>标的来源：中海壳牌石油化有限公司</p>
									<p>结束时间：2020-04-30 11:17</p>
								</div>
								<div class="gd-home-offer-bid-cr">
									<p>城市：惠州</p>
									<p>惠州中海壳牌厂</p>
									<p>
										<router-link to="/shop/auction">参与竞拍</router-link>
									</p>
								</div>
							</div>
							<div class="gd-home-offer-right-row">
								<div class="gd-home-offer-bid">
									<p>LLOPEDFDA-7042/中海壳牌 216.0吨</p>
									<p>最高中标价: <span class="colorRed">6540.0元/吨</span></p>
									<p>最低中标价： <span class="colorOrage">6530.0元/吨</span></p>
									<p>标的来源：中海壳牌石油化有限公司</p>
									<p>结束时间：2020-04-30 11:17</p>
								</div>
								<div class="gd-home-offer-bid-cr">
									<p>城市：惠州</p>
									<p>惠州中海壳牌厂</p>
									<p>
										<router-link to="/shop/auction">参与竞拍</router-link>
									</p>
								</div>
							</div>
						</div>
					</div>
        </div>
      </div>
      <div class="w">
        <div class="gd-home-mro gd-home-offer" style="background-color: #6BB3D3;"><img
          src="../../assets/img/icon-home-007.png"
          alt=""
        > <span>优质供应商</span></div>
        <div class="gd-home-market">
          <div class="gd-home-supplier">
            <img src="../../assets/img/icon-home-009.png" alt="">
            <p>天津大故化工股份有限 公司</p>
            <p>主营材质：ABS、PS</p>
            <p>
              <el-rate v-model="value" disabled text-color="#EE7C51" />
            </p>
          </div>
          <div class="gd-home-supplier">
            <img src="../../assets/img/icon-home-009.png" alt="">
            <p>天津大故化工股份有限 公司</p>
            <p>主营材质：ABS、PS</p>
            <p>
              <el-rate v-model="value" disabled text-color="#EE7C51" />
            </p>
          </div>
          <div class="gd-home-supplier">
            <img src="../../assets/img/icon-home-009.png" alt="">
            <p>天津大故化工股份有限 公司</p>
            <p>主营材质：ABS、PS</p>
            <p>
              <el-rate v-model="value" disabled text-color="#EE7C51" />
            </p>
          </div>
          <div class="gd-home-supplier">
            <img src="../../assets/img/icon-home-009.png" alt="">
            <p>天津大故化工股份有限 公司</p>
            <p>主营材质：ABS、PS</p>
            <p>
              <el-rate v-model="value" disabled text-color="#EE7C51" />
            </p>
          </div>
          <div class="gd-home-supplier">
            <img src="../../assets/img/icon-home-009.png" alt="">
            <p>天津大故化工股份有限 公司</p>
            <p>主营材质：ABS、PS</p>
            <p>
              <el-rate v-model="value" disabled text-color="#EE7C51" />
            </p>
          </div>
        </div>
      </div>

      <!-- 时间线 -->
      <div class="w gd-home-market-line">
        <div class="gd-home-mro gd-home-offer" style="background-color: #ED7B51;"><img
          src="../../assets/img/icon-home-007.png"
          alt=""
        > <span>行情中心</span></div>
        <div class="gd-home-market">
          <div class="gd-home-market-lines gd-home-market">
            <div class="gd-home-mark-ti">
              <p><span /><span>市场快讯</span></p>
              <p class="gd-home-live">进入快播室</p>
            </div>
            <div class="gd-home-mark-bt">
              <div class="gd-home-market-line-points">
                <ul>
                  <li v-for="(item,index) in point" :class="{active:index==current}" @click="handlePoint(index,item)">{{ item }}</li>
                </ul>
              </div>
              <div class="gd-home-market-line-br">
                <el-timeline>
                  <el-timeline-item v-for="(activity, index) in activities" :key="index">
                    {{ activity.content }}
                    <div class="gd-home-market-line-left">
                      {{ activity.timestamp }}
                      <p>PC</p>
                    </div>
                  </el-timeline-item>
                  <li class="el-timeline-item">
                    <div class="el-timeline-item__tail" />
                  </li>
                </el-timeline>
              </div>
            </div>

          </div>
          <div class="gd-home-mark-ce ">
            <div class="gd-home-mark-ti" />
            <div class="gd-home-mark-analysis">
              <div class="gd-home-mark-title">
                <img src="../../assets/img/bg-home-001.png" alt="">
                <ul>
                  <li>聚美产业链市场早间提示<span>（2020.4.30）</span></li>
                  <li>聚美产业链市场早间提示 拷贝</li>
                  <li>4月30日PA66市场早间提示</li>
                </ul>
              </div>
              <div class="gd-home-mark-analysis-to">
                <div class="gd-home-mark-analysis-pe">
                  <span />
                  分析报告
                </div>
                <div>
                  <el-tabs v-model="analysis" @tab-click="handleClick">
                    <el-tab-pane label="PE" name="first">1</el-tab-pane>
                    <el-tab-pane label="PP" name="second">
                      <p>金塑宝PE 市场周报(2017。11.10-11.16) 拷贝</p>
                      <p>本周市场偏弱整理，石化价格调整涨跌互现，对市场指引作用有限，期贷走势向下， 市场交投气氛偏冷清，刚需成交为主，线性、高压产品小 拷贝</p>
                      <div class="gd-home-mark-analysis-time">
                        <p>11-12 标签：PE</p>
                        <p>游览：2352</p>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="PVC" name="third">3</el-tab-pane>
                    <el-tab-pane label="PS" name="fourth">4</el-tab-pane>
                    <el-tab-pane label="ABS" name="five">5</el-tab-pane>
                    <el-tab-pane label="PC" name="six">6</el-tab-pane>
                  </el-tabs>
                </div>
              </div>
              <div class="gd-home-mark-analysis-mation">
                <el-tabs v-model="dynamic" @tab-click="handleClick">
                  <el-tab-pane label="新闻资讯" name="first">1</el-tab-pane>
                  <el-tab-pane label="上游动态" name="second">
                    <div class="gd-mation-col">
                      <p><span>金塑宝PE 市场周报(2017。11.10-11.16)</span><span>04-30</span></p>
                      <p>本周市场偏弱整理，石化价格调整涨跌互现，对市场指引作用有限，期贷走势市场交 投气氛偏冷清，刚需成交为主，线性、高压产品小幅让利</p>
                    </div>
                    <div class="gd-mation-col">
                      <p><span>金塑宝PE 市场周报(2017。11.10-11.16)</span><span>04-30</span></p>
                      <p>本周市场偏弱整理，石化价格调整涨跌互现，对市场指引作用有限，期贷走势市场交 投气氛偏冷清，刚需成交为主，线性、高压产品小幅让利</p>
                    </div>
                    <div class="gd-mation-col">
                      <p><span>金塑宝PE 市场周报(2017。11.10-11.16)</span><span>04-30</span></p>
                      <p>本周市场偏弱整理，石化价格调整涨跌互现，对市场指引作用有限，期贷走势市场交 投气氛偏冷清，刚需成交为主，线性、高压产品小幅让利</p>
                    </div>
                    <div class="gd-mation-col">
                      <p><span>金塑宝PE 市场周报(2017。11.10-11.16)</span><span>04-30</span></p>
                      <p>本周市场偏弱整理，石化价格调整涨跌互现，对市场指引作用有限，期贷走势市场交 投气氛偏冷清，刚需成交为主，线性、高压产品小幅让利</p>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="外盘快讯" name="third">3</el-tab-pane>
                  <el-tab-pane label="进出口数据" name="fourth">4</el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
          <div class="gd-home-brand-co">
            <div class="gd-home-mark-ti">
              <p><span /><span>品牌专区</span></p>

            </div>
            <div class="gd-home-brand-br">
              <div class="gd-home-brand-col">
                <p>2017年汽车非金属材料 技术与应用高峰 论坛</p>
                <p><img src="../../assets/img/bg-home-002.png" alt=""><span>10月13日，由找塑料， 新材料，盖世汽车联合 主办的2019</span></p>
              </div>
              <div class="gd-home-brand-col">
                <p>2017年汽车非金属材料 技术与应用高峰 论坛</p>
                <p><img src="../../assets/img/bg-home-002.png" alt=""><span>10月13日，由找塑料， 新材料，盖世汽车联合 主办的2019</span></p>
              </div>
            </div>
            <div class="gd-home-mark-ti" style="height: 40px;">
              <p><span /><span>产能地图</span></p>
            </div>
            <img width="240" src="../../assets/img/bg-home-003.png" alt="" style="margin-top: 20px;" @click="handleMap">
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LoginContent from '@/views/user/components/LoginContent'
import {
  mapGetters
} from 'vuex'
import {
  Message
} from 'element-ui'
import {
  loginCode
} from '@/api/user.js'
import {
  getShop
} from '@/api/table.js'
// 导入api

export default {
  name: 'Home',
  components: {
    LoginContent
  },
  data() {
    return {
      loginShow: true,
      uriComponent: 'http://' + window.location.host,
      dialogVisible: false,
      dialogWeChat: false,
      dialogSoft: false,
      redirect_uri: 'http://127.0.0.1:8089/',
      appid: 'wxe4cd6faf73a4952f',
      scope: 'snsapi_login',
      value: 3.7,
      activeName: 'first',
      analysis: 'second',
      dynamic: 'second',
      // 报价
      tableData: [{
        date: 'PC',
        name: '940A-116',
        province: 'SABIC(南沙)',
        city: '¥18800.00'
      }, {
        date: 'PC',
        name: '940A-116',
        province: 'SABIC(南沙)',
        city: '¥18800.00'
      }, {
        date: 'PC',
        name: '940A-116',
        province: 'SABIC(南沙)',
        city: '¥18800.00'
      }, {
        date: 'PC',
        name: '940A-116',
        province: 'SABIC(南沙)',
        city: '¥18800.00'
      }],
      // 图表
      chartData: {
        columns: ['日期', 'ABS', 'PP', 'HIPS', 'GPPS'],
        rows: [{
          '日期': '1/1',
          'ABS': 1393,
          'PP': 1093,
          'HIPS': 0.32,
          'GPPS': 1000
        },
        {
          '日期': '1/2',
          'ABS': 3530,
          'PP': 3230,
          'HIPS': 0.26,
          'GPPS': 6
        },
        {
          '日期': '1/3',
          'ABS': 2923,
          'PP': 2623,
          'HIPS': 0.76,
          'GPPS': 8
        },
        {
          '日期': '1/4',
          'ABS': 1723,
          'PP': 1423,
          'HIPS': 0.49,
          'GPPS': 400
        },
        {
          '日期': '1/5',
          'ABS': 3792,
          'PP': 3492,
          'HIPS': 0.323,
          'GPPS': 600
        },
        {
          '日期': '1/6',
          'ABS': 4593,
          'PP': 4293,
          'HIPS': 0.78,
          'GPPS': 800
        }
        ]
      },
      chartShow: false,
      // 登录表单
      ruleForm: {
        code: '',
        name: '',
        weburl: this.$WebUrl
      },
      // 绑定手机号表单
      wxruleForm: {
        code: '',
        name: '',
        nickname: ''
      },
      headAddr: '', // 头像
      wxUnionId: '', // 微信unionid
      sendAuthCode: true,
      sendWxAuthCode: true,
      auth_time: 0, // 验证码倒计时
      wx_auth_time: 0, // 验证码倒计时
      rules: {
        name: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          min: 0,
          max: 11,
          message: '您输入的账号有误',
          trigger: 'blur'
        }
        ],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }]
      },
      // 时间线
      point: ['最新', 'PE', 'PP', 'PVC', 'PS'],
      activities: [{
        content: '华南地区PC市场变强震荡，下游按需采购， 成交灵活商谈。',
        timestamp: '2018-04-15'
      }, {
        content: '华南地区PC市场变强震荡，下游按需采购， 成交灵活商谈。',
        timestamp: '2020-06-28'
      }, {
        content: '华南地区PC市场变强震荡，下游按需采购， 成交灵活商谈。',
        timestamp: '2018-04-11'
      }, {
        content: '华南地区PC市场变强震荡，下游按需采购， 成交灵活商谈。',
        timestamp: '2018-04-11'
      }],
      current: 0,
      hiCode: false
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    if (this.userInfo.userId) {
      getShop(this.userInfo.userId).then(res => {
        if (res.result) {
          var shopStatus = res.result.shopStatus
          var shopInfo = res.result
          console.log(shopStatus)
          if (shopStatus == 1) {
            this.$store.dispatch('user/UpdateUserInfo',shopInfo)
          }
        }
      })
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    afterLogin() {
      this.$router.go(0)
    },
    // 跳转地图
    handleMap() {
      this.$router.push('/home/map')
    },
    // 最新报价
    handleClick(row) {
      console.log(row)
    },

    submitCodeWx() {
      loginCode({
        phone: this.wxruleForm.name
      }).then(response => {
        Message({
          message: response.message,
          type: 'success',
          duration: 800
        })
        this.sendWxAuthCode = false
        // 设置倒计时秒
        this.wx_auth_time = 60
        var auth_timetimer = setInterval(() => {
          this.wx_auth_time--
          if (this.wx_auth_time <= 0) {
            this.sendWxAuthCode = true
            clearInterval(auth_timetimer)
          }
        }, 1000)
      })
    },

    handleShow(o) {
      switch (o) {
        case 0:
          this.dialogSoft = true
          break
        case 1:
          this.dialogSoft = false
          break
        case 2:
          this.dialogWeChat = false
          break
        case 3:
          this.dialogWeChat = true
          break
      }
    },
    // 时间轴 如果o==对应的tab的item就重新请求一次接口赋值对应
    handlePoint(idx, o) {
      console.log(o)
      this.current = idx
    }
  }
}
</script>
<style lang="less">
	.gd-home-main {
		position: relative;

		.w {
			width: 1200px;
			margin: 0px auto;
		}

		.active {
			color: #EE7C51;
			border: 1px solid #EE7C51 !important;
		}

		.el-carousel__item img {
			width: 100%;
			height: 350px;
		}

		.gd-home-block {
			height: 350px;
		}

		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}

		.el-carousel__item:nth-child(2n+1) {
			background-color: #d3dce6;
		}

		.el-main {
			padding: 0px;
		}

		.gd-home-block {
			position: relative;
		}

		.gd-home-login {
			position: absolute;
			right: 400px;
			top: 6px;
			height: 335px;
			width: 250px;
			background-color: #fff;
			z-index: 999;
			box-shadow: 0px 1px 6px 0px rgba(25, 8, 15, 0.17);
		}

		.gd-home-login-comp {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			p:nth-of-type(1) {
				margin-bottom: 20px;
			}

			img {
				width: 85px;
				height: 85px;
				border-radius: 50%;
				margin-top: 20px;
			}

			p {
				font-size: 16px;
				margin-top: 10px;
			}
		}

		.gd-home-login-to {
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			box-sizing: border-box;
			padding: 0px 20px;
			margin-top: 9px;
			color: #333333;
			display: flex;
			justify-content: flex-end;

			span {
				border: 1px solid #ff5722;
				font-size: 12px;
				color: #ff5722;
				height: 24px;
				line-height: 24px;
				border-radius: 8px;
				box-sizing: border-box;
				padding: 0px 5px;
			}

			img {
				display: block;
				width: 28px;
				height: 28px;
			}
		}

		.gd-home-login-to:nth-of-type(2) {
			margin-top: 0px;
			display: flex;
			justify-content: flex-start;
			font-size: 14px;
		}

		.gd-home-login-bo {
			display: flex;
			justify-content: space-between;
			margin: 17px 0px;
			width: 100%;

			span:nth-of-type(1) {
				display: block;
				color: #ADADAD;
				font-size: 12px;
			}

			span:nth-of-type(2) {
				display: block;
				color: #FF7444;
				font-size: 12px;
			}
		}

		.gd-home-login-third {
			display: flex;
			justify-content: center;

			img {
				display: block;
				width: 15px;
				height: 14px;
			}

			img:nth-of-type(1) {
				margin-right: 6px;
			}

			img:nth-of-type(2) {
				margin-left: 6px;
			}
		}

		.gd-home-login-mr {
			font-size: 12px;
			margin: 0px;
			height: 19px;
		}

		.el-divider--horizontal {
			margin: 0px;
		}

		.el-divider__text {
			font-size: 12px;
			color: #666666;
		}

		.gd-home-btn {
			background-color: #FF5E2A !important;
			border: none;
			margin-top: 15px !important;
		}

		.el-form {
			width: 250px;
			height: auto;
			box-sizing: border-box;
			padding: 0px 20px;
			position: relative;

			.gd-home-login-code {
				height: 244px;
				width: 100%;
				position: absolute;
				top: -28px;
				left: 0px;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				img {
					width: 80px;
					height: 80px;
					display: block;
				}

				p:nth-of-type(1) {
					font-size: 15px;
				}

				p:nth-of-type(2) {
					font-size: 14px;
				}
			}

			.gd-login-wchat {
				background-color: #fff;
				height: 335px;
				width: 250px;
				position: absolute;
				z-index: 999;
				top: -69px;
				left: 0px;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				align-items: center;

				.gd-login-wchat-top {
					width: 200px;
					height: 200px;
					position: absolute;
					top: 44px;
					left: -24px;
				}

				p {
					position: absolute;
					bottom: 41px;
					left: 50%;
					transform: translateX(-50%);
					font-size: 15px;
				}

				img {
					display: block;
					margin-left: 200px;
					margin-top: 10px;
				}
			}

			.el-form-item__content {
				margin-left: 0px !important;
				border-bottom: 1px solid #DBDBDB;
				margin-top: 15px;
				display: flex;

				.el-input__inner {
					padding: 0px;
				}

				.el-button {
					width: 130px;
					height: 22px;
					line-height: 22px;
					margin: 0px !important;
					background: rgba(235, 235, 235, 1);
					border: none;

					span {
						display: block;
						width: 100%;
						height: 22px;
						line-height: 22px;
						color: #FF6735;
						text-align: center;
						font-size: 12px !important;
					}
				}
			}

			.el-form-item {
				margin-bottom: 10px;
			}

			.el-input {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}

			.el-icon-s-custom {
				color: #999;
			}

			.el-input__inner {
				border: none;
				height: 28px;
				line-height: 28px;
			}

			.el-button--primary {
				width: 100%;
				height: 35px;
				padding: 0px;
				margin-top: 10px;
			}

			.el-input__icon {
				line-height: 30px;
			}

			.el-form-item__error {
				line-height: 16px;
			}
		}

		.gd-home-login-btm {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0px 20px;
		}

		.gd-home-market {
			display: flex;
			height: auto;
			background-color: #fff;
		}

		.gd-home-mark-ti {
			width: 100%;
			height: 58px;
			border-bottom: 1px solid #E6E6E6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0px 15px;

			p:nth-of-type(1) {
				display: flex;

				span:nth-of-type(1) {
					height: 18px;
					width: 3px;
					display: block;
					background: rgba(238, 124, 81, 1);
					margin-right: 9px;
				}

				span:nth-of-type(2) {
					font-size: 18px;
					font-weight: 400;
					height: 18px;
					line-height: 18px;
					color: rgba(51, 51, 51, 1);
				}
			}

			p:nth-of-type(2) {
				font-size: 12px;
				color: #999999;
			}

			.gd-home-live {
				border: 1px solid rgba(238, 124, 81, 1);
				border-radius: 4px;
				color: #ee7c51 !important;
				padding: 0px 8px;
			}
		}

		.gd-home-market-left {
			width: 282px;
			height: 409px;

			.gd-home-mark-tm {
				height: 350px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				border-right: 1px solid #E6E6E6;

				.el-carousel__item {
					background-color: transparent !important;
				}

				.gd-home-mark-tl {
					border-bottom: 1px solid #E6E6E6;
					margin: 0px 15px;

					&:last-of-type {
						border: none
					}

					p {
						box-sizing: border-box;
						padding: 9px 0px;
						display: flex;
						justify-content: space-between;

						span {
							display: block;
						}
					}

					p:nth-of-type(1) {
						span:nth-of-type(1) {
							font-size: 15px;
							color: #000;
						}

						span:nth-of-type(2) {
							color: rgba(75, 162, 46, 1);
							font-size: 24px;
						}
					}

					p:nth-of-type(2) {
						span:nth-of-type(1) {
							font-size: 12px;
							color: rgba(153, 153, 153, 1);
						}

						span:nth-of-type(2) {
							color: rgba(74, 162, 45, 1);
							font-size: 12px;
						}
					}
				}
			}
		}

		.gd-home-market-cr {
			width: 530px;
			height: 409px;

			.gd-home-mark-tcm {
				height: 350px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				border-right: 1px solid #E6E6E6;
			}

			.el-carousel__item {
				background-color: transparent;
			}

			.gd-home-mark-rm {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: flex-start;
				align-content: flex-start;

				.gd-home-mark-tl:nth-of-type(7) {
					border: none !important;
				}

				.gd-home-mark-tl:nth-of-type(8) {
					border: none !important;
				}

				.gd-home-mark-tl:nth-of-type(15) {
					border: none !important;
				}

				.gd-home-mark-tl:nth-of-type(16) {
					border: none !important;
				}

				.gd-home-mark-tl {
					border-bottom: 1px solid #ccc !important;
					margin: 0px 15px;
					display: flex;
					align-items: center;
					width: 44%;
					height: 84px;

					&:nth-child(even) {
						div:nth-of-type(2) {
							border: none !important;
						}
					}

					p {
						box-sizing: border-box;
						padding: 9px 0px;
						display: flex;
						justify-content: space-between;

						span {
							display: block;
						}
					}

					p:nth-of-type(1) {
						span:nth-of-type(1) {
							font-size: 12px;
							color: #000;
						}

						span:nth-of-type(2) {
							color: rgba(75, 162, 46, 1);
							font-size: 15px;
						}
					}

					p:nth-of-type(2) {
						span:nth-of-type(1) {
							font-size: 12px;
							color: rgba(153, 153, 153, 1);
						}

						span:nth-of-type(2) {
							color: rgba(74, 162, 45, 1);
							font-size: 12px;
						}
					}

					.txtColor {
						color: #E32525 !important;
					}

					.txtcolorFlat {
						color: #999999 !important;
					}

					.texFlat {
						color: #333333 !important;
					}
				}
			}
		}

		.gd-home-market-rl {
			width: 385px;
			height: 409px;
		}

		.gd-home-market-br {
			height: 250px;
			width: 350px;
		}

		.gd-home-market-lines {
			width: 388px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		.gd-home-market-line-br {
			margin-left: 73px;
			margin-top: 20px;
		}

		.gd-home-market-line-left {
			position: absolute;
			left: -75px;
			top: 0px;
			width: 64px;
			font-size: 12px;
			color: #EE7C51;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
		}

		.el-timeline-item__content {
			text-align: left;
		}

		.gd-home-market-line-left p {
			border: 1px solid #EE7C51;
			width: 30px;
			font-size: 12px;
			height: 18px;
			line-height: 18px;
			text-align: center;
		}

		.gd-home-mark-bt {
			width: 388px;
			height: 791px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			box-sizing: border-box;
			padding: 10px 15px;
			border-right: 1px solid #E6E6E6;
		}

		.gd-home-market-line-points {
			width: 388px;

			ul {
				display: flex;
				width: 300px;
				font-size: 14px;

				li {
					width: 50px;
					border: 1px solid #eee;
					margin-right: 3px;
					cursor: pointer;
				}
			}
		}

		.gd-home-market-line-tr {
			width: 300px;
			display: flex;
			justify-content: space-between;
			font-size: 14px;
		}

		.auth_text {
			display: flex;
		}

		.gd-home-mro {
			width: 1200px;
			height: 80px;
			display: flex;
			align-items: center;
			border-radius: 10px 10px 0px 0px;
			color: #fff;
			background: rgba(231, 80, 100, 1);
			margin-top: 30px;

			img {
				width: 28px;
				height: 28px;
				display: block;
				margin-left: 20px;
				margin-right: 10px;
			}

			span {
				font-size: 28px;
				display: block;
			}
		}

		.gd-home-offer {
			background: rgba(233, 186, 94, 1);
		}

		.gd-home-offer-cl {
			position: relative;
			width: 486px;
			height: 494px;
			border-left: 1px solid #E6E6E6;

			.el-tabs__header {
				position: absolute;
				top: 9px;
				width: 300px;
				left: 140px;
			}

			.el-tabs__nav-wrap::after {
				background-color: transparent !important;
			}

			.el-tabs__item {
				height: 48px !important;
			}

			.is-active {
				color: rgba(238, 124, 81, 1) !important;
			}

			.el-tabs__active-bar {
				background: rgba(238, 124, 81, 1);
			}

			.el-table .cell {
				padding: 0px;
			}

			.el-tabs__item:hover {
				color: #EE7C51;
			}
		}

		.gd-home-mark-tcx {
			width: 100%;
			height: 436px;
			border-right: 1px solid #E6E6E6;

			.el-table th {
				text-align: center;
				color: #000 !important;
				background-color: #F8F8F8;
			}

			.el-table td,
			.el-table th.is-leaf {
				border: none;
			}

			.el-table--border,
			.el-table--group {
				border: none;
			}

			.el-table--border:after,
			.el-table--group:after,
			.el-table:before {
				background-color: transparent;
			}

			.el-table--border td {
				text-align: center;
				border: none;
				color: #000;
			}

			.el-table--border td:nth-of-type(4) {
				color: red
			}

			.el-button--text {
				color: #EE7C51;
			}
		}

		.gd-home-offer-cr {
			width: 335px;
			height: 494px;

			.gd-home-offer-company {
				height: 436px;

			}

			.gd-home-offer-row {
				height: 49px;
				background-color: #F8F8F8;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #000;
				box-sizing: border-box;
				padding: 0px 15px;
				font-size: 14px;

				span {
					display: block;
					font-weight: bold;
				}

			}

			.gd-home-offer-col {
				height: 436px;
				height: 387px;
				box-sizing: border-box;
				padding: 0px 15px;

				ul {
					height: 436px;

					li {
						display: flex;
						justify-content: space-between;
						font-size: 13px;
						height: 40px;
						line-height: 40px;

						span {
							display: block;
							height: 40px;
							line-height: 40px;
						}
					}
				}

			}

		}

		.gd-home-offer-right-col {
			width: 377px;
			height: 436px;
			box-sizing: border-box;
			padding-bottom: 10px;
			border: 1px solid #E6E6E6;
			border-top: none;
			display: flex;
			flex-direction: column;
			align-items: center;

			.gd-home-offer-right-row {
				width: 350px;
				height: 132px;
				border: 1px solid #E6E6E6;
				margin-top: 15px;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px 0px;
				display: flex;
				justify-content: center;
				align-items: flex-start;

			}

			.gd-home-offer-bid {
				width: 229px;
				border-right: 1px solid rgba(204, 204, 204, 1);
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				box-sizing: border-box;
				padding: 0px 10px;

				p:nth-of-type(1) {
					font-size: 12px;
					color: #000;
				}

				p {
					font-size: 10px;
					color: #999999;
					height: 22px;
					line-height: 22px;
				}

				.colorRed {
					color: #E54B4B;
				}

				.colorOrage {
					color: #ED7B51;
				}

			}

			.gd-home-offer-bid-cr {
				width: 120px;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				p {
					font-size: 12px;
				}

				p:nth-of-type(1) {
					font-size: 13px;
					color: #000;
				}

				p:nth-of-type(2) {
					color: #999999;
					font-size: 12px;
					margin: 5px 0px;
				}

				p:nth-of-type(3) {
					color: #fff;
					font-size: 12px;
					width: 98px;
					height: 28px;
					line-height: 28px;
					background-color: #ED7B51;
					border-radius: 2px;
					text-align: center;

					a {
						color: #fff;
						text-decoration: none;
					}
				}
			}

		}

		.gd-home-supplier {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-right: 1px solid #E6E6E6;
			height: 326px;
			width: 239px;

			img {
				width: 117px;
				height: 117px;
				display: block;
			}

			p {
				font-size: 13px;
				color: #000;
				height: 25px;
				line-height: 25px;
				margin-top: 15px;
			}

			p:nth-of-type(2) {
				display: flex;
				color: #999999;
			}
		}

		.gd-home-mark-ce {
			width: 478px;
			height: 791px;
		}

		.gd-home-mark-analysis {
			height: 780px;
			border-right: 1px solid #E6E6E6;
			border-bottom: 1px solid #E6E6E6;

			.gd-home-mark-title {
				display: flex;
				margin-top: 10px;

				img {
					width: 275px;
					height: 157px;
					margin-right: 31px;
				}

				ul li {
					width: 164px;
					border-bottom: 1px solid #E6E6E6;
					height: 51px;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					font-size: 12px;
					color: #999;

					span {
						display: block;
					}
				}
			}
		}

		.gd-home-mark-analysis-to {
			position: relative;

			.el-tabs__header {
				position: absolute;
				top: 4px;
				left: 100px;
			}

			.el-tabs__nav-wrap:after {
				background-color: transparent;
			}

			.el-tabs__active-bar {
				background-color: transparent;
			}

			.el-tabs__item {
				padding: 0px 14px;
			}

			.el-tabs__item:hover {
				color: #EE7C51;
			}

			.el-tabs__item.is-active {
				color: #EE7C51;
			}

			.el-tab-pane {
				box-sizing: border-box;
				padding: 10px 10px;

				p:nth-of-type(1) {
					font-size: 13px;
					font-weight: bold;
					margin-bottom: 5px;
				}

				p:nth-of-type(2) {
					font-size: 13px;
					color: #999999;
				}
			}

			.gd-home-mark-analysis-time {
				display: flex;
				justify-content: space-between;
				color: #999999;
				margin-top: 7px;

				p {
					font-weight: normal !important;
				}
			}
		}

		.gd-home-mark-analysis-pe {
			height: 46px;
			background-color: #F8F8F8;
			color: #333333;
			font-weight: bold;
			font-size: 14px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			line-height: 18px;
			box-sizing: border-box;
			padding-left: 8px;

			span {
				display: block;
				width: 3px;
				height: 18px;
				background: rgba(238, 124, 81, 1);
				margin-right: 5px;
			}
		}

		.gd-home-mark-analysis-mation {
			.el-tabs__header {
				background-color: #F8F8F8;
				display: flex;
				box-sizing: border-box;
				padding-left: 20px;
			}

			.el-tabs__nav-wrap:after {
				background-color: transparent;
			}

			.el-tabs__item.is-active {
				color: #EE7C51;
			}

			.el-tabs__active-bar {
				background-color: #EE7C51;
			}

			.el-tabs__item:hover {
				color: #EE7C51;
			}

			.gd-mation-col {
				margin: 0px 10px;
				border-bottom: 1px solid #E6E6E6;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: flex-start;
				box-sizing: border-box;
				padding: 10px 0px;

				&:last-of-type {
					border: none;
				}

				p:nth-of-type(1) {
					width: 100%;
					display: flex;
					justify-content: space-between;

					span:nth-of-type(1) {
						color: #000;
						font-size: 13px;
						display: block;
					}

					span:nth-of-type(2) {
						display: block;
						color: #999999;
						font-size: 12px;
					}
				}

				p:nth-of-type(2) {
					text-align: left;
					color: #999999;
				}
			}
		}

		.gd-home-brand-co {
			width: 332px;

			.gd-home-brand-br {
				height: 331px;
				box-sizing: border-box;
				padding: 0px 20px;

				.gd-home-brand-col {
					border-bottom: 1px solid #E6E6E6;
					box-sizing: border-box;
					padding: 20px 0px;

					&:last-of-type {
						border: none;
					}

					p:nth-of-type(1) {
						color: #333333;
						font-size: 12px;
						text-align: left;
						font-weight: bold;
						margin-bottom: 10px;
					}

					p:nth-of-type(2) {
						display: flex;
						justify-content: center;
						align-items: center;

						img {
							width: 176px;
							height: 84px;
							margin-right: 10px;
						}

						span {
							font-size: 12px;
							color: #999999;
							display: block;
							text-align: left;
						}
					}
				}
			}
		}

	}
</style>
