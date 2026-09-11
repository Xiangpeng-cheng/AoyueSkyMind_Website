/* =============================================================
   data/content.js  站点文案与数据
   - 所有面向用户的内容统一在此维护，便于内容审核与版本管理
   - 已清理过时/未经核实信息：删除具体客户名 / 奖项 / 投产日期等
   ============================================================= */

export const company = {
  name: '武汉翱越智控科技有限公司',
  shortName: '武汉翱越智控',
  brand: 'Aoyue SkyMind',
  tagline: '智能飞行 · 精准控制 · 为低空生产力而生',
  email: 'contact@aoyue-uav.com',
  hours: '周一至周五 09:00 - 18:00',
  // 资质表述口径：仅说明已通过质量管理体系认证，
  // 具体资质以登记机关与官网公示为准
  qualification: '公司具备质量管理体系认证及行业相关资质（具体资质以官网公示与登记机关信息为准）',
};

export const partners = [
  '电力能源行业用户',
  '地理信息与测绘单位',
  '应急管理领域客户',
  '现代化农业生产企业',
  '林业与生态保护机构',
  '城市治理与园区运营方',
  '高校与科研院所',
  '系统集成与生态合作伙伴',
];

export const products = [
  { name: 'Aoyue M500 长续航多旋翼', tag: '面向巡检、应急、测绘的旗舰六旋翼平台', cat: '工业无人机' },
  { name: 'Aoyue X12 复合翼',         tag: '融合多旋翼起降与固定翼长航时', cat: '工业无人机' },
  { name: 'Aoyue T70 重载平台',        tag: '面向植保与中短途物流的大载重平台', cat: '工业无人机' },
  { name: 'SkyMind FC-X 飞控',         tag: '双冗余 IMU 与 AI 协处理', cat: '飞控载荷' },
  { name: 'Aoyue G200 地面站',         tag: '便携三防一体式任务控制站', cat: '地面站' },
  { name: 'Aoyue Link Pro 链路',       tag: '远距离图数一体 OFDM 链路', cat: '链路通信' },
];

export const shoton = [
  { title: '电力廊道精细化巡检',  tag: '多旋翼 · 可见光 + 红外' },
  { title: '灾后态势快速建模',    tag: '复合翼 · 倾斜摄影' },
  { title: '城市低空数字化巡查',  tag: '多机协同 · AI 识别' },
  { title: '农田变量喷洒作业',    tag: '重载平台 · 处方图' },
];

export const solutions = [
  { title: '电力巡检',   cat: '能源', summary: '杆塔、金具与绝缘子的常态化精细巡检' },
  { title: '测绘建模',   cat: '测绘', summary: '免相控倾斜摄影与机载 LiDAR 一体化建模' },
  { title: '应急救援',   cat: '应急', summary: '侦查、中继、喊话与物资投送协同作业' },
  { title: '智慧农业',   cat: '农业', summary: '从变量喷洒到长势评估的全周期作业' },
  { title: '林业防护',   cat: '林业', summary: '红外烟火识别与网格化巡逻航线' },
  { title: '智慧城市',   cat: '城市', summary: '违建识别、交通监测与市容事件主动上报' },
];

export const payloads = [
  { title: '飞控系统', desc: '双冗余 IMU、AI 协处理与毫秒级故障切换' },
  { title: '吊舱与载荷', desc: '可见光、红外、多光谱、激光雷达多模态' },
  { title: '图数链路', desc: '自研 OFDM 远距图数一体，端到端加密' },
  { title: '地面站', desc: '便携三防与机柜指挥席多形态' },
  { title: '动力能源', desc: '高能量密度智能电池与混合动力系统' },
  { title: '数据平台', desc: '航线规划、数据治理与 AI 识别服务' },
];

export const navSections = ['home', 'products', 'solutions', 'payloads', 'about', 'contact'];

export const navLinks = [
  { id: 'home',     label: '首页' },
  { id: 'products', label: '产品中心' },
  { id: 'solutions', label: '行业方案' },
  { id: 'payloads', label: '飞控与载荷' },
  { id: 'about',    label: '关于我们' },
  { id: 'contact',  label: '联系我们' },
];
