import { z } from 'zod';
import type { ServicePlugin } from '@wabs/plugin-sdk/service-plugin';
import { configSchema, manifest } from './manifest';

const request = z.object({ feature: z.enum(['externalAccess', 'browserLinks', 'websiteNotices']) }).strict();
const archive: ServicePlugin = {
  manifest,
  registerServices(context) {
    return [{
      serviceId: 'official.chat-archive.access.v1',
      methods: [{
        name: 'resolve', access: 'read', timeoutMs: 30000, inputSchema: request,
        outputSchema: z.object({ allowed: z.boolean(), noticeTemplate: z.string().optional() }),
        async handler(raw, call) {
          const { feature } = request.parse(raw);
          const config = configSchema.parse(await context.configFor(call.scopeId));
          const allowed = config.externalAccess && config[feature];
          return { allowed, ...(allowed && feature === 'websiteNotices' ? { noticeTemplate: config.noticeTemplate } : {}) };
        }
      }]
    }];
  }
};
export default archive;
