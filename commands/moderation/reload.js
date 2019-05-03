module.exports = {
    config: {
        name: "reload",
        description: "reloads a bot command!",
        usage: "!reload",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["creload"]
    },
    run: async (bot, message, args) => {
        const { readdirSync } = require('fs'); 
        const {join} = require('path'); 
        if(message.author.id !== "youridhere") return message.channel.send("You're not the bot owner!")
        if(!args[0]) return message.channel.send("Please provide a command to reload!")
        readdirSync(join(__dirname, '..')).forEach(f => {
        let files = readdirSync(join(__dirname,'..',f));
        const commandName = args[0].toLowerCase()
        if(!bot.commands.get(commandName)) return message.channel.send('That command doesnt exist. Try again.')
        if(files.includes(commandName + '.js')) {
            try {
                delete require.cache[require.resolve(`../${f}/${commandName}.js`)] // usage !reload <name>
                bot.commands.delete(commandName)
                const pull = require(`../${f}/${commandName}.js`)
                bot.commands.set(commandName, pull)
                return message.channel.send(`Successfully reloaded ${commandName}.js!`)
            } catch(e) {
                return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
            }
        }
    });
    }
}
