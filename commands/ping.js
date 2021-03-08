

module.exports = {
    name: "ping",
    aliases: ["test"],
    description: "Simple ping/pong command",
    execute(client, message, args) {
        message.reply("pong")
            .then(message => {
                message.react("🏓")
            })
    }
}

