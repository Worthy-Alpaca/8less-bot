const Discord = require('discord.js');

module.exports = {
    name: "warn",
    aliases: ["careful"],
    description: "Warn command",
    execute(client, message, args) {
        let victim = message.mentions.users.first();
        if (!victim) return message.reply("mention someone to warn.");

        let embed = new Discord.MessageEmbed()
            .setTitle("Warnings")
            .setDescription(`${victim} got warned by ${message.author}!`)
            .setColor("GREEN")
            .setFooter(`Moderator : ${message.author.username}`)
            .setTimestamp();

        message.channel.send(embed);
    }
}