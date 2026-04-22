/**
 * 全局常量配置
 * 交互阈值、动画时长等统一在此管理
 */

export const SCROLL = {
  /** 导航栏隐藏阈值：滚动超过此值开始隐藏 */
  navHideThreshold: 100,
  /** 导航栏显示阈值：向上回滚超过此距离才重新显示 */
  navShowThreshold: 60,
  /** 回到顶部按钮触发阈值：页面高度的百分比 */
  scrollToTopRatio: 0.6,
  /** 阅读位置保存最小值 */
  readingPosMin: 100,
} as const;

export const NAV = {
  /** 导航栏顶部始终显示的安全区 */
  topSafeZone: 50,
} as const;
