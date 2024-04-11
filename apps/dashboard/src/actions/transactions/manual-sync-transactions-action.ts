"use server";

import { action } from "@/actions/safe-action";
import { manualSyncTransactionsSchema } from "@/actions/schema";
import { LogEvents } from "@midday/events/events";
import { setupLogSnag } from "@midday/events/server";
import { Events, client } from "@midday/jobs";
import { getUser } from "@midday/supabase/cached-queries";

export const manualSyncTransactionsAction = action(
  manualSyncTransactionsSchema,
  async ({ accountId }) => {
    const user = await getUser();

    const logsnag = await setupLogSnag({
      userId: user.data.id,
      fullName: user.data.full_name,
    });

    logsnag.track({
      event: LogEvents.TransactionsManualSync.name,
      icon: LogEvents.TransactionsManualSync.icon,
      channel: LogEvents.TransactionsManualSync.channel,
    });

    const event = await client.sendEvent({
      name: Events.TRANSACTIONS_MANUAL_SYNC,
      payload: {
        accountId,
      },
    });

    return event;
  }
);
