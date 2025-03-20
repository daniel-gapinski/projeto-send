import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

export const checkScheduledMessages = onSchedule('every 1 minutes', async (event) => {
  const now = new Date();
  const messagesRef = db.collection('messages');
  const snapshot = await messagesRef.where('status', '==', 'agendada').get();

  if (snapshot.empty) {
    logger.log('Nenhuma mensagem agendada encontrada.');
    return;
  }

  snapshot.forEach(async (doc) => {
    const messageData = doc.data();
    const scheduledTime = new Date(messageData.scheduledTime);

    if (scheduledTime <= now) {
      await doc.ref.update({
        status: 'enviada',
        sentAt: now.toISOString(),
      });
      logger.log(`Mensagem ${doc.id} foi enviada!`);
    }
  });

  return;
});
