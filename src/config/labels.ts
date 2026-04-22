/**
 * 全局标签映射表
 * 所有页面共用，避免复制粘贴
 *
 * 数据层已迁移至 labels.json，本文件仅为包装器，保持向后兼容
 */

import labelsData from './labels.json';

export const categoryLabels = labelsData.categoryLabels;

export const asideTypeLabels = labelsData.asideTypeLabels;

export const categoryMeta = labelsData.categoryMeta;

export const statusConfig = labelsData.statusConfig;

export type StatusKey = keyof typeof statusConfig;

// ─── 原始数据导出（供 Admin 界面直接读写）───
export const rawLabelsData = labelsData;
