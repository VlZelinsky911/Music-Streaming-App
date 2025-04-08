'use strict';

const { sanitizeEntity } = require('@strapi/utils');
const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;

module.exports = {
  async register(ctx) {
    const plugin = strapi.plugin('users-permissions');

    const { email, username, password, name, birthday, gender, newsOptIn, marketingOptIn, agreeTerms } = ctx.request.body;

    if (!agreeTerms) {
      throw new ApplicationError('You must accept the terms of service');
    }

    const user = await plugin.services.user.add({
      email,
      username,
      password,
      confirmed: false,
      name,
      birthday,
      gender,
      newsOptIn,
      marketingOptIn,
      agreeTerms,
    });

    const token = await plugin.services.jwt.issue({ id: user.id });

    return ctx.send({
      jwt: token,
      user: sanitizeEntity(user, {
        model: plugin.contentTypes.user,
      }),
    });
  },
};
