const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();
const { DISCORD_TOKEN } = require('./config.json');

const prefix = "!";

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Read all files in the commands folder and that ends in .js
const commands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// Loop over the commands, and add all of them to a collection
// If there's no name found, prevent it from returning an error
for (let file of commands) {
    const command = require(`./commands/${file}`);
    // Check if the command has both a name and a description
    if (command.name && command.description) {
        client.commands.set(command.name, command);
    } else {
        console.log("A file is missing something");
        continue;
    }

    // check if there is an alias and if that alias is an array
    if (command.aliases && Array.isArray(command.aliases))
        command.aliases.forEach(alias => client.aliases.set(alias, command.name));
};

client.on('ready',() => {
    console.log("Bot online");
    client.user.setPresence({ activity: { name: "Minecraft" } });
})

client.on('message', message => {
    console.log("message")
    // check if the author is a bot
    if (message.author.bot) return;
    // check if the message comes through a DM
    if (message.guild === null) return;
    // check if the message starts with it
    if (!message.content.startsWith(prefix)) return;
    // slice off the prefix and convert the rest of the message into an array
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    // convert all arguments to lowercase
    const command = args.shift().toLowerCase();
    // check if there is a message after the prefix
    if (command.length === 0) return;
    // look for the specified command in the collection of commands
    let cmd = client.commands.get(command);
    // this checks the alias collection 
    if (!cmd) cmd = client.commands.get(client.aliases.get(command));
    // if there is no command we return with an error message
    if (!cmd) return message.reply(`\`${prefix + command}\` doesn't exist!`);
    // finally run the command
    cmd.execute(client, message, args);
});

client.login(DISCORD_TOKEN);