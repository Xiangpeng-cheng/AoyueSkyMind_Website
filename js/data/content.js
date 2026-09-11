/* =============================================================
   data/content.js  站点文案与数据
   ============================================================= */

export const company = {
  name: '武汉翱越智控科技有限公司',
  shortName: '武汉翱越智控',
  brand: 'Aoyue SkyMind',
  tagline: '以弹射四旋翼为作业平台，为行业提供可落地的低空解决方案',
  email: 'contact@aoyue-uav.com',
  hours: '周一至周五 09:00 - 18:00',
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
  {
    name: '弹射四旋翼',
    tag: '弹射起飞、四旋翼机动，面向巡检、侦察与应急快速部署',
    cat: '工业无人机',
    scene: 'catapult',
  },
];

export const shoton = [
  { title: '走廊与杆塔快速巡检', tag: '弹射部署 · 可见光 / 红外', scene: 'power' },
  { title: '应急现场抵近侦察', tag: '快速到位 · 实时回传', scene: 'rescue' },
  { title: '复杂地形空中勘察', tag: '无跑道起降 · 定点悬停', scene: 'city' },
  { title: '农林区域巡查作业', tag: '网格航线 · 态势感知', scene: 'farm' },
];

export const solutions = [
  {
    title: '电力巡检方案',
    cat: '能源',
    summary: '针对廊道、杆塔与金具巡视，提供弹射快速起飞、抵近拍摄与缺陷复核的作业闭环。',
    offer: ['弹射部署，山地与狭窄场地可作业', '可见光 / 红外载荷巡视', '航线规划与成果整理支持'],
    scene: 'power',
  },
  {
    title: '应急侦察方案',
    cat: '应急',
    summary: '灾害或突发事件现场，以弹射四旋翼快速升空，完成态势侦察与画面回传。',
    offer: ['分钟级展开，无需跑道', '悬停观察与绕飞勘察', '现场指挥协同作业建议'],
    scene: 'rescue',
  },
  {
    title: '测绘勘察方案',
    cat: '测绘',
    summary: '面向区域勘察与补测，提供空中取证、影像采集与后续建模衔接能力。',
    offer: ['无跑道场地灵活起飞', '定点、航带采集', '数据导出与建模流程对接'],
    scene: 'city',
  },
  {
    title: '农林巡查方案',
    cat: '农林',
    summary: '用于林区、农田与保护区的常态巡查，发现火情、病虫害或边界异常。',
    offer: ['网格化航线巡查', '红外辅助识别', '巡查记录可追溯'],
    scene: 'forest',
  },
  {
    title: '城市治理方案',
    cat: '城市',
    summary: '服务园区、工地与市政巡查，完成高处观察、违建线索与现场取证。',
    offer: ['快速抵近观察', '画面取证与回传', '与现有指挥流程衔接'],
    scene: 'urban',
  },
  {
    title: '定制行业方案',
    cat: '集成',
    summary: '按您的场地、载荷与指挥流程，把弹射四旋翼嵌入现有作业体系。',
    offer: ['场景调研与方案设计', '载荷与流程适配', '培训、演练与售后支持'],
    scene: 'link',
  },
];

export const payloads = [
  { title: '弹射起飞', desc: '无需跑道，在山地、岸边、车载等受限场地快速升空。' },
  { title: '四旋翼机动', desc: '具备悬停、绕飞与精准抵近能力，适合巡检与侦察。' },
  { title: '行业载荷', desc: '可按任务挂载可见光、红外等侦察巡视载荷。' },
  { title: '方案交付', desc: '从航线、作业规范到培训售后，按场景整包落地。' },
];

export const navSections = ['home', 'solutions', 'products', 'about', 'contact'];

export const navLinks = [
  { id: 'home', label: '首页' },
  { id: 'solutions', label: '解决方案' },
  { id: 'products', label: '产品' },
  { id: 'about', label: '关于我们' },
  { id: 'contact', label: '联系我们' },
];
