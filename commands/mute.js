const Discord = require('discord.js');

module.exports = {
    name: "mute",
    aliases: ["silence"],
    description: "Mute command",
    execute(client, message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            let member = message.mentions.members.first();
            if (!member) {
                message.channel.send("Mention someone to mute!")
            } else {
                member.roles.add("813876389475385394");
                let embed = new Discord.MessageEmbed()
                    .setTitle("Mutes")
                    .setDescription(`${member} got kicked by ${message.author}!`)
                    .setColor("GREEN")
                    .setFooter(`Moderator : ${message.author.username}`)
                    .setTimestamp();

                message.channel.send(embed);
            };
        };
    }
}