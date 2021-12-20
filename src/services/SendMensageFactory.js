const { comments } = require("../external/comments.js");
const fs = require('fs');
const Instagram = require("instagram-web-api");

module.exports = class SendMensageFactory {
  async execute(client, mediaId) {
    const text = this._getRandomComment();
    try {
      await client.addComment({
        mediaId,
        text,
      });

      console.log(`Comentando: ${text}`);
    } catch (err) {
      await client.logout();
      console.log('deu problema ao enviar a mensagem')
    }
  }

  _getRandomComment() {
    return comments[this._generateNumberRandom()];
  }

  _generateNumberRandom() {
    const min = Math.ceil(0);
    const max = Math.floor(comments.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
