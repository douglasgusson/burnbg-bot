'use strict';

const getUserSession = require('../scripts/getUserSession');
const replyWithError = require('../scripts/replyWithError');

module.exports = () => async (ctx) => {
    try {
        const user = await getUserSession(ctx);
        ctx.i18n.locale(user.language);

        ctx.session.user.sent_text = ctx.session.user.sent_text === undefined ? 1 : ctx.session.user.sent_text + 1 ;

        if (ctx.session.user.sent_text === 20) {
            ctx.session.user.sent_text = 0;
            ctx.replyWithHTML(ctx.i18n.t('error.no_text_messages_egg')).catch(() => replyWithError(ctx, 15));
        } else {
            ctx.replyWithHTML(ctx.i18n.t('error.no_text_messages')).catch(() => replyWithError(ctx, 15));
        }
    } catch (err) {
        replyWithError(ctx, 0);
        console.error(err);
    }
};