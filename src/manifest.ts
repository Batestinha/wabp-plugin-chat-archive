import { z } from 'zod';
import type { PluginManifest } from '@wabs/plugin-sdk/manifest';

const metadata = require('../wa-plugin.json');
export const configSchema = z.object({
  externalAccess: z.boolean().default(true),
  browserLinks: z.boolean().default(true),
  websiteNotices: z.boolean().default(true),
  noticeTemplate: z.string().max(4000).default('')
});
export const manifest: PluginManifest = {
  ...metadata, configSchema, defaultMessages: require('../locales/en/official.chat-archive.json')
};
