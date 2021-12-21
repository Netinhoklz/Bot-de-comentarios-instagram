const AccountsFactory = require("./services/AccountsFactory");
const GeneratePostFactory = require("./services/GeneratePostFactory");
const SendMensageFactory = require("./services/SendMensageFactory");

const accountsFactory = new AccountsFactory();
const generatePostFactory = new GeneratePostFactory();
const sendMensageFactory = new SendMensageFactory();

const main = async () => {
  const { client } = await accountsFactory.execute();

  let commentInterval = setInterval(async () => {
    try {
      const { mediaId } = await generatePostFactory.execute(client);
      await sendMensageFactory.execute(client, mediaId);
    } catch (err) {
      clearInterval(commentInterval);
      main();
    }
  }, 1000 * 60 * 25); //  3 minutos
};

main();
