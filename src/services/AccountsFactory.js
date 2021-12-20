const fs = require("fs");
const { accounts } = require("../external/accounts");
const Instagram = require("instagram-web-api");
const FileCookieStore = require("tough-cookie-filestore2");
const path = require('path');

module.exports = class AccountsFactory {
  _accounts = [];

  constructor() {
    this._accounts = this._getAccounts();

    this._shuffeArray(this._accounts);
    this._generateAccountsAfterOneHour();
  }

  async execute() {
    const { username, password } = this._getOneAccount();

    const client = new Instagram({ username, password });

    try {
      await client.login();
      console.log(`${username} logged in`);
    } catch (err) {
      console.log(`${username} not logged in`);
    }
    return { client };
  }

  _shuffeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  _getOneAccount() {
    const account = this._accounts[0];
    this._accounts.splice(0, 1);

    if (this._accounts.length === 0) {
      this._renewAccounts();
    }

    return account;
  }

  _renewAccounts() {
    const file = this._getAccounts();
    this._accounts = file;
  }

  _getAccounts() {
    const pathFile = path.resolve(__dirname, '../external/accounts.json');
    const file = fs.readFileSync(pathFile);

    return JSON.parse(file);
  }

  _generateAccountsAfterOneHour() {
    const tradeAccount = setInterval(async () => {
      try {
        await this.execute();
      } catch (err) {
        clearInterval(tradeAccount);
        console.log("problema no reset de uma hora");
        this.execute();
      }
    }, 1000 * 60 * 120); // 1 hora
  }
};