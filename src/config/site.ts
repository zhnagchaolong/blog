/**
 * 站点全局配置
 * 为后台管理预留的统一配置入口
 *
 * 数据层已迁移至 site.json，本文件仅为包装器，保持向后兼容
 */

import siteData from './site.json';

// ─── 站点身份 ───
export const site = siteData.site;

// ─── 导航栏 ───
export const navigation = siteData.navigation;

// ─── 首页配置 ───
export const homepage = siteData.homepage;

// ─── 文章默认配置 ───
export const postConfig = siteData.postConfig;

// ─── 搜索配置 ───
export const searchConfig = siteData.searchConfig;

// ─── 功能开关 ───
export const features = siteData.features;

// ─── 各页面独立 Meta（集中管理）───
export const pageMeta = siteData.pageMeta;

// ─── 社交媒体/联系方式 ───
export const social = siteData.social;

// ─── 无障碍标签文案 ───
export const ariaLabels = siteData.ariaLabels;

// ─── About 页面 Bento Grid 配置 ───
export const aboutConfig = siteData.aboutConfig;

// ─── 项目页面文案 ───
export const projectLabels = siteData.projectLabels;

// ─── SEO 默认配置 ───
export const seo = siteData.seo;

// ─── 原始数据导出（供 Admin 界面直接读写）───
export const rawSiteData = siteData;
