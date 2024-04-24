const { Client, Intents, MessageActionRow, MessageButton, Collection, DiscordAPIError, MessageSelectMenu, MessageSelectMenuBuilder, WebhookClient } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGES] });
const wait = require('util').promisify(setTimeout);
const cron = require('node-cron');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const token = 'TOKEN HERE' // Replace with existing Discord Bot Token
const rest = new REST().setToken(token);
let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// --------------------------------------------------------------------------------------------
//
//
//
//                               Method Gaming: Nations of War
//                                            v1
//
//
//
//
// --------------------------------------------------------------------------------------------
// SOME CODE MAY BE MISSING OR REMOVED FOR USE IN FUTURE PROJECTS
// TO BE USED WITH MINECRAFT: JAVA

// rest.put(Routes.applicationCommands('767145964212977695'), { body: [] })
// .then(() => console.log('Successfully deleted all application commands.'))
// .catch(console.error);

const { createClient } = require('minecraft-protocol');
const Rcon = require('rcon-client').Rcon;

client.on('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'rcon',
    description: 'Remote control panel via NonayAPI',
    options: [
      {
        name: 'rcon_command',
        type: 'STRING',
        description: 'The RCON command to execute',
        required: true,
      }
    ]
  });

  console.log(`Loaded RCON Command!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'rcon') {
    const commandSpec = options.getString('rcon_command');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('905945029435093082');
    if (!role) {
      return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
    }
    await interaction.deferReply();

    const rconClient = await Rcon.connect({
      host: 'IP HERE',
      port: 25564,
      password: 'PASSWORD HERE',
      username: 'Nonay'
    });

    try {
      const response = await rconClient.send(commandSpec);

      const embed = new MessageEmbed()
        .setTitle('RCON Execution Successful')
        .setColor('#313338')
        .setDescription(`Command executed via **NonayAPI** to **MinecraftRCON**:\n\`\`\`${commandSpec}\`\`\``);

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(`Error sending command to Minecraft API: ${error.message}`);
      interaction.followUp('Error sending command to the Minecraft API');
    } finally {
      rconClient.end();
    }
  }
});

client.on('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'menu',
    description: 'Send menu screen to player in-game',
    options: [
      {
        name: 'username',
        type: 'STRING',
        description: 'The username of the recipient',
        required: true,
      }
    ]
  });

  console.log(`Loaded menu Command!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'menu') {
    const usernameSpec = options.getString('username');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('871949534794760256');
    if (!role) {
      return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
    }
    await interaction.deferReply();

    const rconClient = await Rcon.connect({
      host: 'IP HERE',
      port: 25564,
      password: 'PASSWORD HERE',
      username: 'Nonay'
    });

    try {
      const response = await rconClient.send(`commandpanel warn ${usernameSpec}`);

      const embed = new MessageEmbed()
        .setTitle('Menu Sent Successfully')
        .setColor('#313338')
        .setDescription(`Menu sent to **${usernameSpec}**`);

      interaction.editReply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(`Error sending command to Minecraft API: ${error.message}`);
      interaction.followUp('Error sending command to the Minecraft API');
    } finally {
      rconClient.end();
    }
  }
});

client.on('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'notice-rcon',
    description: 'Send notice to the server',
    options: [
      {
        name: 'notice_message',
        type: 'STRING',
        description: 'The notice message to send to the console',
        required: true,
      }
    ]
  });

  console.log(`Loaded NoticeRCON Command!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'notice-rcon') {
    const commandSpec = options.getString('notice_message');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('905945029435093082');
    if (!role) {
      return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
    }
    await interaction.deferReply();

    const rconClient = await Rcon.connect({
      host: 'IP HERE',
      port: 25564,
      password: 'PASSWORD HERE',
      username: 'Nonay'
    });

    try {
      const response = await rconClient.send(`say §l§2[METHOD GAMING]§6 ${commandSpec}`);

      const embed = new MessageEmbed()
        .setTitle('Notice Sent Successfully')
        .setColor('#313338')
        .setDescription(`Notice Sent to Server:\n\`\`\`${commandSpec}\`\`\``);

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(`Error sending command to Minecraft API: ${error.message}`);
      interaction.followUp('Error sending command to the Minecraft API');
    } finally {
      rconClient.end();
    }
  }
});

client.on('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'notice-event',
    description: 'Send an event notice to everyone in the server',
    options: [
      {
        name: 'notice_subtitle',
        type: 'STRING',
        description: 'The notice title to send to the console',
        required: true,
      }
    ]
  });

  console.log(`Loaded NoticeEvent Command!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'notice-event') {
    const commandSpec = options.getString('notice_subtitle');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1072900753619964034');
    if (!role) {
      return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
    }
    await interaction.deferReply();

    const rconClient = await Rcon.connect({
      host: 'IP HERE',
      port: 25564,
      password: 'PASSWORD HERE',
      username: 'Nonay'
    });

    try {
      const response = await rconClient.send(`title @a title "§d§lEVENT"`);
      const response2 = await rconClient.send(`title @a subtitle "§6§l${commandSpec}"`);

      const embed = new MessageEmbed()
        .setTitle('Notice Sent Successfully')
        .setColor('#313338')
        .setDescription(`Notice Subtitle Sent to Server:\n\`\`\`${commandSpec}\`\`\``);

      interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(`Error sending command to Minecraft API: ${error.message}`);
      interaction.followUp('Error sending command to the Minecraft API');
    } finally {
      rconClient.end();
    }
  }
});

  client.once('ready', async () => {
    const command = await client.application?.commands.create({
      name: 'help',
      description: 'Help for Method Gaming',
    });
  
    console.log(`Loaded Main Files!`);
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'help') {

      const embed = new MessageEmbed()
        .setTitle('Method Gaming Bot')
        .setDescription('Method Gaming\'s Official Command Help Page!\n\n# :books: General Commands\n/help\n> Allows you to view helpful commands!\n\n/laws\n> View the laws of a nation\n\n/client\n> Check advanced client stats!\n\n/nations\n> Inspect a selected nation\n\n/parties\n> Find a party that looks appealing to vote for!\n\n/map\n> Check the nations map!\n\n/ideologies\n> Check what pros and cons some ideologies carry\n\n/news\n> Get the latest and hottest news stories from around the MG universe!\n\n# ⛳ Country Management\n/co-owner\n> Add or remove a co-owner to your nation so they have permissions to make changes as they please!\n\n/nickname\n> Change the nickname of the selected type in your nation\n\n/name\n> Change the name of your nation or corporation\n\n/loan\n> Take out a loan for your country\n\n/add-law\n> Add a law to your nation\n\n/remove-law\n> Remove a law from your nation\n\n/purchase\n> Purchase items that your nation needs to prosper!\n\n/forge\n> Use your forges to produce items!\n\n/storage\n> Check a nation\'s storage for items fresh off the production line!\n\n/withdraw\n> Take an item out of your storage\n\n/research\n> Research a new technology for your nation!\n\n/war\n> Declare war on a nation\n\n/peace\n> Ask for peace\n\n/inspect\n> Request an inspection of your nation\n\n/trade\n> Trade with a nation\n\n/stats\n> View a nation\'s income stats\n\n/flag\n> Set a flag to your nation\'s territory on the map!\n\n/colour\n> Set the colour of your nation\'s info embed\n\n# :people_holding_hands: Party Management\n/party\n> Create a party!\n\n/parties\n> Check the list of parties to vote for\n\n/hire\n> Hire ministers for your party!\n\n# 👥 Nonay Commands\n/account\n> Manage your Nonay account\n\n/register\n> Create a Nonay account\n\n/matchmake\n> Matchmake into a ranked session\n\n/reward-sync\n> Sync a Method Gaming giftcard key to your account\n\n/marketplace\n> View the item marketplace\n\n/update\n> Update your discord files to match the most recent version of Nonay or Method Gaming')
        .setColor('#313338');

      interaction.reply({ embeds: [embed] });
  }
  });

  client.once('ready', async () => {
    const command = await client.application?.commands.create({
      name: 'leaderboard',
      description: 'Ranked leaderboard',
    });
  
    console.log(`Loaded Leaderboard Files!`);
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'leaderboard') {
      const embed = new MessageEmbed()
        .setTitle('Method Gaming: RANKED')
        .setDescription('Best RANKED K/Ds & W/L (Highest K/Ds, not live)')
        .setColor('#313338')
        .addFields(
          { name: '__hubert__#0', value: '<:champion:1172257614499938324> Champion (#1)\nKD: 17.69\nWL: 27.11' },
          { name: 'rishi_sucknuts#0', value: '<:champion:1172257614499938324> Champion (#23)\nKD: 14.02\nWL: 24.06' },
          { name: 'nagata2732#0', value: '<:champion:1172257614499938324> Champion (#21)\nKD: 3.30\nWL: nil' },
          { name: 'redmitsubishi#0', value: '<:champion:1172257614499938324> Champion (#3)\nKD: 3.25\nWL: nil' },
          { name: 'toart#0', value: '<:elite:1172257609609379922> Elite II\nKD: 3.17\nWL: 10.02' },
          { name: 'iii_coke_iii#0', value: '<:emerald:1172257606383976489> Emerald I\nKD: 3.02\nWL: 3.40' },
          { name: 'clorophyte#0', value: '<:lapis:1172257605209554965> Lapis III\nKD: 3.76\nWL: 4.59' },
          { name: 'emperz#0', value: '<:emerald:1172257606383976489> Emerald II\nKD: 2.11\nWL: 6.21' },
          { name: 'subrelevent#0', value: '<:gold:1172257608548220958> Gold IV\nKD: 2.08\nWL: 2.17' },
          { name: 'whyaretheyalltaken#0', value: '<:gold:1172257608548220958> Gold V\nKD: 2.05\nWL: 1.22' },
          { name: `Your Rank`, value: `<:rank:1125562018036973608> ${interaction.user.username} You are currently not ranked! To get ranked, enter a ranked session and finish the game to receive your rank! Leaving the game will result in a penalty and possibly the loss of your rank!` },
        );
    
      await interaction.reply({ embeds: [embed] });
  }
  });

  client.on('guildMemberAdd', member => {
    const embed = new MessageEmbed()
        .setTitle(`${member.displayName} has joined Method Gaming!`)
        .setDescription(`**${member.guild.memberCount}** members are now in Method Gaming Hub!\n\n**__Helpful Commands:__**\n/help\n> Help with MG:NW\n/news\n> View the latest news stories on MG:NW\n/map\n> View the current (LIVE) Nations of War map!\n/nations\n> View the current nations of MG:NW\n/corporations\n> View the corporations of MG:NW!`)
        .setColor('#00ff00');
    const channel = client.channels.cache.get('871949535105142804');
    if (!channel) return;
    channel.send({ embeds:[embed] });
});

  client.once('ready', async () => {
    const command = await client.application?.commands.create({
        name: 'map',
        description: 'Select which Method Gaming map you want to view!',
        options: [
            {
                name: 'mapname',
                type: 'STRING',
                description: 'Server map type',
                required: true,
                choices: [
                    {
                        name: 'NationsRP (Base)',
                        value: 'NationsRP_base'
                    }
                ]
            }
        ]
    });

    console.log(`Loaded Map Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'map') {
  const member = interaction.guild.members.cache.get(interaction.user.id);
  const role = member.roles.cache.get('1193603041128108142');
  if (!role) {
    return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
  }

  const role1 = member.roles.cache.get('1195150178655686688');
  if (!role1) {
    return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
  }
  
      const mapName = interaction.options.getString('mapname');
      let embed;
      if (mapName === 'NationsRP_base') {
          embed = new MessageEmbed()
              .setTitle('Map Image (NationsRP Base)')
              .setColor('#313338')
              .setDescription(':1234: - Capture Point\n> "Capture Points" are displayed as numbers, it takes 10 minutes to capture a single point and before capturing that point, you must make sure you capture every point in numerical order, always start at 1 and work your way up! Your enemies can re-capture the first capture point to completely stop your advances!\n🏰 - Defended\n> This icon indicates that a defending army has defended an attack on a capture point, [this gives the capture point a buff that makes it impossible to capture that point](https://discord.com/channels/871949534794760252/1154076420054724679)\n 🥊 - Attacked\n> This icon indicates that an enemy recently captured this point, [it gives the point a buff that makes impossible for the point to be captured](https://discord.com/channels/871949534794760252/1154076420054724679)\n🏠 - Capital\n> This indicates that a capital city is at this point!\n📦 - High Supply\n> This indicates that this area has high amounts of supplies leaving or entering the area\n\n## How to Display Flags\nTo equip a custom flag, you need to have the Citizen Pass! [Click here for more details!](https://www.patreon.com/nonay). Once you have the Citizen Pass or Corporation Pass, you can equip a custom flag via /flag!')
              .setImage('https://cdn.discordapp.com/attachments/871949535688130633/1201993311133368400/image.png?ex=65cbd681&is=65b96181&hm=01bf6557fb4c6c7b7c4f8bd5d44de5c30ec1602f9bf4cdfd566fffce698fd8ef&');
      }
      await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'claim-land',
    description: 'Claim land for your nation!',
    options: [
      {
        name: 'image_url',
        type: 'STRING',
        description: 'The URL of the land claim image',
        required: true,
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of your nation',
        required: true,
        choices: nationChoices
      },
    ]
  });
  console.log(`Loaded Claim-Land Files!`);
});

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName, options, user, guild } = interaction;
  
    if (commandName === 'claim-land') {
      const imageUrl = options.getString('image_url');
      const nationName = options.getString('nation');
      let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
  
      const entity = nations.find((ent) => ent.name === nationName);

      if (!entity || interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
        return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
      }
  
      const channel = guild.channels.cache.get('1201235661081038929');
  
      const embed = new MessageEmbed()
        .setTitle('New Land Claim')
        .setColor('#313338')
        .setDescription(`Nation: **${nationName}**`)
        .setImage(imageUrl);

      channel.send({ embeds: [embed] });

      const doneembed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`You will be charged accordingly, if this is your country's first time claiming land, you will not receive a charge but you will be limited on how much land you can claim. The map will update in around 5 hours`)
      .setImage(imageUrl);
  
      await interaction.reply({ embeds: [doneembed] });
    }
  });

  client.once('ready', async () => {
    const command = await client.application?.commands.create({
      name: 'client',
      description: 'Check on your client version so staff can help you',
    });
  
    console.log(`Loaded Client Files!`);
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'client') {
  const ping = Math.round(client.ws.ping);

  let serviceStatus;
  if (ping <= 25) {
    serviceStatus = 'Smooth';
  } else if (ping <= 50) {
    serviceStatus = 'Slow Performance';
  } else if (ping <= 100) {
    serviceStatus = 'Performance Issues';
  } else if (ping <= 150) {
    serviceStatus = 'Slight Performance Issues';
  } else if (ping <= 200) {
    serviceStatus = 'Feature Loss';
  } else {
    serviceStatus = 'Major Performance Issues';
  }
      const embed = new MessageEmbed()
        .setTitle('Method Gaming Client')
        .setColor('#313338')
        .addFields(
          { name: 'MG:NW Version', value: 'v0.829' },
          { name: 'Last Client Update', value: '<t:1706540280:R>' },
          { name: 'Last Nonay Update', value: '<t:1705015680:R>' },
          { name: 'Server Host', value: '``Nonay Hosting``' },
          { name: 'Ping', value: `${ping} ms` },
          { name: 'Traffic Status', value: `${ping} ms - ${serviceStatus}` },
          { name: 'Server Location', value: '``London, United Kingdom``' },
        );
    
      await interaction.reply({ embeds: [embed] });
  }
  });

let bankData = JSON.parse(fs.readFileSync('bank.json', 'utf8'));

client.once('ready', async () => {
  const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
  const command = await client.application?.commands.create({
    name: 'invest',
    description: 'Invest money in another corporation!',
    options: [
      {
        name: 'sending_corporation',
        type: 'STRING',
        description: 'The name of the investing corporation',
        required: true
      },
      {
        name: 'recipient_corporation',
        type: 'STRING',
        description: 'The name of the receiving corporation',
        required: true
      },
      {
        name: 'amount',
        type: 'NUMBER',
        description: 'The amount of money to invest',
        required: true,
      },
    ],
  });
  console.log('Loaded Invest Files!')
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'invest') {
    const senderCorporationName = options.getString('sending_corporation');
    const recipientCorporationName = options.getString('recipient_corporation');
    const amount = parseFloat(options.getNumber('amount'));
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));

    const senderCorporation = corporations.find(corp => corp.name === senderCorporationName);
    const recipientCorporation = corporations.find(corp => corp.name === recipientCorporationName);

    if (!senderCorporation || !recipientCorporation) {
      return interaction.reply({ content: 'One or more specified corporations do not exist!', ephemeral: true });
    }

    const userCorporation = corporations.find(corp => corp.ownerId === interaction.user.id && corp.name === senderCorporationName);

    if (!userCorporation) {
      return interaction.reply({ content: 'You are not the owner of the specified corporation or the corporation does not exist!' });
    }

    if (amount <= 0 || isNaN(amount)) {
      return interaction.reply({ content: 'Invalid investment amount!', ephemeral: true });
    }

    if (senderCorporation.balance < amount) {
      return interaction.reply({ content: 'Not enough funds in your corporation to make this investment!', ephemeral: true });
    }

    senderCorporation.balance -= amount;
    recipientCorporation.balance += amount;

    const announcement = new MessageEmbed()
    .setColor('#313338')
    .setDescription(`**${senderCorporation.name}** invested £${amount.toLocaleString()} in **${recipientCorporation.name}**!`);
   
    const hangout = client.channels.cache.get('871949535105142804');
    hangout.send({ embeds: [announcement] });

    fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));

    const embed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`**${senderCorporation.name}** invested £${amount.toLocaleString()} in **${recipientCorporation.name}**!`);

    return interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const bankCommand = await client.application?.commands.create({
    name: 'bank',
    description: 'Inspect your bank account',
    options: [
      {
        name: 'account',
        type: 'STRING',
        description: 'The account to inspect',
        required: true,
        choices: [
          {
            name: 'Savings',
            value: 'savings'
          },
        ]
      }
    ]
  });

const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
const payCommand = await client.application?.commands.create({
  name: 'pay',
  description: 'Pay another user',
  options: [
    {
      name: 'amount',
      type: 'INTEGER',
      description: 'The amount to pay',
      required: true
    },
    {
      name: 'account',
      type: 'STRING',
      description: 'The account number of the user you want to pay',
      required: false
    },
    {
      name: 'corporation',
      type: 'STRING',
      description: 'The name of the corporation you want to pay',
      required: false
    }
  ]
});

  console.log('Loaded Bank Commands!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'bank') {
    let accountName = interaction.options.getString('account');
    let userData = bankData[interaction.user.id];
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    if (!userData) {
      let embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('You do not have a bank account.');
      await interaction.reply({ embeds: [embed] });
      return;
    }
  
    let account = userData[accountName];

    if (!account) {
      let embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('You don\'t have an account with this name');
      await interaction.reply({ embeds: [embed] });
    } else {
      let embed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle(account.Name.toString() + `'s Bank`)
      .addField('Balance', '£' + account.balance.toString())
      .addField('Bank', account.bank.toString())
      .addField('Account Number', account.accountNumber.toString())
      .addField('Account Name', account.Name.toString())
      .addField('Interest Rate', account.interestRate.toString() + '%')
      .addField('Card Status', account.isFrozen ? 'Frozen' : 'Unfrozen')
      if (account.recentTransactions.length > 0) {
        let recentTransactions = account.recentTransactions.slice(-5);
        embed.addField('Recent Transactions', recentTransactions.join('\n'));
      } else {
        embed.addField('Recent Transactions', 'None');
      }
    await interaction.reply({ embeds: [embed] });    
    }
  }
});
  
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'pay') {
    const amount = options.getInteger('amount');
    const corporationOption = options.getString('corporation');
    const accountOption = options.getString('account');
    let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    if (corporationOption && accountOption) {
      let embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please provide either a corporation or an account, not both!');
      await interaction.reply({ embeds: [embed] });
      return;
    }

    if (amount <= 0) {
      let embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please provide a positive amount to pay!');
      await interaction.reply({ embeds: [embed] });
      return;
    }

    if (corporationOption) {
      const corporation = corporations.find(corp => corp.name === corporationOption);
      console.log('Corporation Option:', corporationOption);

      if (!corporation) {
        let embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription(`Could not find a corporation with the name ${corporationOption}!`);
        await interaction.reply({ embeds: [embed] });
        return;
      }

      if (bankData[interaction.user.id].savings.balance < amount) {
        let embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription(`You do not have enough money to make this payment!`);
        await interaction.reply({ embeds: [embed] });
        return;
      }

      corporation.balance += amount;
      bankData[interaction.user.id].savings.balance -= amount;
      bankData[interaction.user.id].savings.recentTransactions = bankData[interaction.user.id].savings.recentTransactions.slice(-5);
      
      fs.writeFileSync('bank.json', JSON.stringify(bankData, null, 2));
      fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));

      let embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Payment Successful')
        .setDescription(`You have paid £${amount} to the corporation ${corporationOption}.`);
      await interaction.reply({ embeds: [embed] });
    } else if (accountOption) {
      let recipientID = Object.keys(bankData).find(id => bankData[id].savings.accountNumber === accountOption);

      if (!recipientID) {
        let embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription('Could not find a user with that account number!');
        await interaction.reply({ embeds: [embed] });
      } else if (bankData[interaction.user.id].savings.balance < amount) {
        let embed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription(`You do not have enough money to make this payment!`);
        await interaction.reply({ embeds: [embed] });
      } else {

        if (amount <= 0) {
          let embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Error')
            .setDescription('Please provide a positive amount to pay!');
          await interaction.reply({ embeds: [embed] });
          return;
        }

        bankData[interaction.user.id].savings.balance -= amount;
        bankData[recipientID].savings.balance += amount;

        bankData[interaction.user.id].savings.recentTransactions.push(`OUT **£${amount}** TO **${recipientID}**`);
        bankData[recipientID].savings.recentTransactions.push(`IN **£${amount}** FROM **${interaction.user.id}**`);

        bankData[interaction.user.id].savings.recentTransactions = bankData[interaction.user.id].savings.recentTransactions.slice(-5);
        bankData[recipientID].savings.recentTransactions = bankData[recipientID].savings.recentTransactions.slice(-5);

        fs.writeFileSync('bank.json', JSON.stringify(bankData, null, 2));

        let embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Payment Successful')
          .setDescription(`You have paid £${amount} to account number ${accountOption}.`);
        await interaction.reply({ embeds: [embed] });

        let recipient = await client.users.fetch(recipientID);
        if (recipient) recipient.send(`You have received a payment of £${amount} from ${interaction.user.id}.`);
      }
    } else {
      let embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('Please provide either a corporation or an account.');
      await interaction.reply({ embeds: [embed] });
    }
  }
});

client.once('ready', async () => {
const choices = nations.map(nation => ({ name: nation.currencyName, value: nation.currencyName }));
const bankingCorporations = corporations.filter(corp => corp.category === 'Banking Sector');
const bankingCorporationChoices = bankingCorporations.map(corp => ({ name: corp.name, value: corp.name }));
const payCommand = await client.application?.commands.create({
    name: 'bank-register',
    description: 'Register a bank account!',
    options: [
      {
        name: 'legal_name',
        type: 'STRING',
        description: 'Your RP name in Unturned',
        required: true,
      },
      {
        name: 'bank',
        type: 'STRING',
        description: 'Your bank name',
        required: true,
        choices: bankingCorporationChoices
      },
      {
        name: 'currency',
        type: 'STRING',
        description: 'Select the currency for your bank account.',
        required: true,
        choices
      },
    ],
});
console.log('Loaded Register Commands!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'bank-register') {
    const name = options.getString('legal_name');
    const bank = options.getString('bank');
    const selectedCurrency = options.getString('currency');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    if (bankData[interaction.user.id]) {
      let embed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('You already have a bank account!');
      await interaction.reply({ embeds: [embed] });
      return;
    }

    const accountNumber = generateAccountNumber();
    const accountData = {
      balance: 0,
      interestRate: 0.6,
      isFrozen: false,
      recentTransactions: [],
      bank: bank,
      accountNumber: accountNumber,
      Name: name,
      Currency: selectedCurrency,
    };

    bankData[interaction.user.id] = { savings: accountData };

    const logEmbed = new MessageEmbed()
    .setColor('#313338')
    .setTitle('Bank Account Registered')
    .setDescription(`Name: **${name}**\nBanking Corporation: **${bank}**\nCurrency Name: **${selectedCurrency}**\nAccount Number: **${accountNumber}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('bank.json', JSON.stringify(bankData, null, 2));

    let embed = new MessageEmbed()
      .setColor('#00FF00')
      .setTitle('Account Registered')
      .setDescription(`Your bank account has been successfully registered!\nAccount Number: **${accountNumber}**\nBank: **${bank}**\nCurrency: **${selectedCurrency}**`);
    await interaction.reply({ embeds: [embed] });
  }
});

function generateAccountNumber() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

client.once('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'ideologies',
    description: 'The ideologies of Method Gaming',
  });

  console.log(`Loaded Ideology Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ideologies') {
    const embed = new MessageEmbed()
      .setTitle('Ideologies')
      .setColor('#19F05E')
      .addFields(
        { name: 'Democracy', value: '> +/ Economic Defences\n> -/ Stability Goes Down Without Elections\n> +/ Economy Performs Well Under Sanctions\n>  +/ Economy Is In Easy Mode\n> +/ Defence Goes Up\n> +/ Supply Camps More Effective\n> -/ Production Time Goes Up\n> -/ All wartime effects are doubled in effectiveness' },
        { name: 'Communism', value: '> -/ No Economic Defences\n> -/ Stability Constantly Goes Down\n> -/ Economy Performs Bad Under Sanctions\n> -/+ Economy Is In Normal Mode\n> +/ Production Time Goes Down\n> +/ All wartime effects are halved in effectiveness' },
        { name: 'Fascism', value: '> -/ Gain 3 Negative Effects\n> -/ Economy Performs Bad Under Sanctions\n> -/ Stability Constantly Goes Down\n> -/ No Economic Defences\n> -/ Economy Is In Hard Mode\n> +/ Defence Goes Up\n> +/ Production Time Goes Down\n> +/ All wartime effects are halved in effectiveness' },
        { name: 'Monarchism (UNLOCKABLE ONLY)', value: '> -/ Coups are cheaper to conduct against you\n> -/ Economy Performs Bad Under Sanctions\n> -/ Tricky Decisions Occur More Often\n> +/ Economic Defences\n> +/ Economy Is In Easy Mode\n> +/ Defence Goes Up\n> +/ Production Time Goes Down\n> +/ All wartime effects are halved in effectiveness' },
      );

  await interaction.reply({ embeds: [embed] });
  }
});
const channelId = '871949535105142804';
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 5 && minutes === 0) {
      const embed = {
        title: 'Peak Inactivity Hours',
        description: 'The server is now approaching peak inactivity hours! This means the server might experience a decrease in players within the next couple of hours',
        color: 0x313338,
      };

      sendEmbedToChannel(channelId, embed);
    }

    if (hours === 20 && minutes === 0) {
      const embed = {
        title: 'Peak Activity Hours',
        description: 'The server is now approaching peak Activity hours! This means the server might experience an increase in players within the next couple of hours!',
        color: 0xff9900,
      };

      sendEmbedToChannel(channelId, embed);
    }
  }, 60000);
  
function sendEmbedToChannel(channelId, embed) {
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    channel.send({ embeds: [embed] })
      .then(() => console.log('Embed sent successfully'))
      .catch(error => console.error('Error sending embed:', error));
  }
}

  client.once('ready', async () => {
    const command = await client.application?.commands.create({
      name: 'admin-help',
      description: 'Help for Method Gaming',
    });
  
    console.log(`Loaded Main Files!`);
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'admin-help') {
      const embed = new MessageEmbed()
        .setTitle('Method Gaming Bot (ADMIN)')
        .setDescription('Method Gaming\'s Official Admin Command Help Page!')
        .setColor('#313338')
        .addFields(
          { name: '/admin-help', value: 'The command you are using right now! This command helps you understand the admin bot and what admin commands do' },
          { name: '/add-country', value: 'Add a country to the world of Method Gaming' },
          { name: '/add-deed', value: 'Assign a deed to a country' },
          { name: '/remove-deed', value: 'Remove a deed from a country' },
          { name: '/set-treasury', value: 'Set a Country\'s Balance' },
          { name: '/add-treasury', value: 'Add to a Country\'s Balance' },
          { name: '/remove-treasury', value: 'Remove from a Country\'s Balance' },
          { name: '/set-currencyvalue', value: 'Set a Country\'s Currency Value (cannot be above £1.20)' },
          { name: '/inspected', value: 'Confirm that you have inspected a user\'s nation' },
        );
    
      await interaction.reply({ embeds: [embed] });
  }
  }); 
  
  const nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
  client.once('ready', async () => {
      const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
      const command = await client.application?.commands.create({
          name: 'nations',
          description: 'Get information about a nation',
          options: [{
              name: 'nation',
              type: 'STRING',
              description: 'The nation to get information about',
              required: true,
              choices
          }]
      });
  
      console.log(`Loaded Nations Files!`);
  });

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'nations') {
    const selectedNation = options.getString('nation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    const nation = nations.find(nation => nation.name === selectedNation);
    const flagUrl = nation.flag ? nation.flag : null;
    let currencyValue = parseFloat(nation.currencyValue);
    nation.activeEffects = [];

    if (nation.pmi > 50) {
      nation.activeEffects.push(" Growing Economic Sector");
    }

    if (nation.currencyValue < 0.70) {
      nation.activeEffects.push(" Inflated Currency");
    }

    if (nation.currencyValue > 0.71 && nation.currencyValue < 0.89) {
      nation.activeEffects.push(" Weakened Currency");
    }
    
    if (nation.currencyValue > 0.90 && nation.currencyValue < 1.00) {
      nation.activeEffects.push(" Growing Currency Strength");
    }

    if (nation.currencyValue > 1.01 && nation.currencyValue < 1.20) {
      nation.activeEffects.push(" Strong Currency");
    }

    if (nation.currencyValue > 1.21) {
      nation.activeEffects.push(" [**⭐ Very Strong Currency ⭐**](https://discord.com/channels/871949534794760252/1179949386214670336)");
    }

    if (nation.stability < 25) {
      nation.activeEffects.push(" Rampant Corruption");
    }

    if (nation.stability < 50) {
      nation.activeEffects.push(" Resistance");
    }

    if (nation.investmentcampaign > 0) {
      nation.activeEffects.push(" Investment Campaigns");
    }

    if (nation.debt > 100000 && nation.debt < 499999) {
      nation.activeEffects.push(" Low Debt Crisis");
    }

    if (nation.debt > 500000 && nation.debt < 1000000) {
      nation.activeEffects.push(" Medium Debt Crisis");
    }

    if (nation.debt > 1000000 && nation.debt < 5000000) {
      nation.activeEffects.push(" High Debt Crisis");
    }

    if (nation.sanction > 0) {
      nation.activeEffects.push(" [**❗ Admin Sanction ❗**](https://discord.com/channels/871949534794760252/1179949386214670336)");
    }

    if (nation.debt > 5000000) {
      nation.activeEffects.push(" [**❗ Extreme Debt Crisis ❗**](https://discord.com/channels/871949534794760252/1179949386214670336)");
    }

    if (nation.fractured > 0) {
      nation.activeEffects.push(" [**❗ Fractured Government ❗**](https://discord.com/channels/871949534794760252/1179949386214670336)");
    }

    if(nation.activeEffects.length === 0) {
        nation.activeEffects.push('None');
    }

      if(currencyValue < nation.currencyValueLowest || !nation.currencyValueLowest) {
        nation.currencyValueLowest = currencyValue;
    }
    
    if(currencyValue > nation.currencyValueHighest || !nation.currencyValueHighest) {
        nation.currencyValueHighest = currencyValue;
    }

    const balanceValue = nation.balance ? nation.balance.toLocaleString() : '0';
    let index = nations.findIndex(n => n.name === selectedNation);
    nations[index] = nation;

      const embed = new MessageEmbed()
          .setTitle(`${nation.name}'s Statistics`)
          .setColor(nation.color)
          .addFields(
              { name: '<:Ideology:962873539919224852> Government', value: `Ideology: **${nation.ideology}${nation.nickname ? ` ${nation.nickname}` : ''}**\nLeader: <@${nation.countryOwner.id}>` },
              { name: '🤼 Population', value: `${nation.population.toLocaleString()}` },
              { name: '🧪 Science Info', value: `Points: **${nation.researchPoints}**\nLabs: **${nation.labs}**\nEnriched Uranium (kg): **${nation.uraniumEnriched} kg**\nUranium (kg): **${nation.uranium} kg**` },
              { name: '<:currency:1016661611244687374> Currency', value: `Name: **${nation.currencyName}**\nRate: **${nation.currencySymbol}${nation.currencyValue}** = **£1.00** \nLow: **£${nation.currencyValueLowest}**\nHigh: **£${nation.currencyValueHighest}**` },
              { name: '👨‍💼 Investor(s)', value: `${nation.investors}` },
              { name: '🏧 Taxes', value: `${(nation.taxes && nation.taxes.length > 0) ? nation.taxes.map(tax => `${tax.tax}: **${tax.amount}%**`).join('\n') : 'No taxes set'}` },
              { name: ':scales: Stability', value: `${nation.stability}%` },
              { name: '<:balance:1016661614809849866> Treasury', value: `${nation.currencySymbol}${balanceValue}` },
              { name: ':credit_card: Debt Amount', value: `${nation.currencySymbol}${nation.debt.toLocaleString()}` },
              { name: '💱 Economic Data', value: `Gross Domestic Product\n> ${nation.currencySymbol}${nation.gdp.toLocaleString()}\n> (Per Year)\n> [HELP](https://discord.com/channels/871949534794760252/1184549955751391272)\n\nPurchasing Managers Index\n> ${nation.pmi}\n> (Per Month)\n> [HELP](https://discord.com/channels/871949534794760252/1184961084810088498)\n\nHuman Development Index\n> ${nation.humanDevelopmentIndex}\n> (LIVE)\n\nEconomic Growth Percentage\n> ${nation.growth}%\n> (Per Month)` },
              { name: '✊ Annexed Nations', value: `${nation.annexed || 'None'}` },
              { name: ':alarm_clock: Active Effects', value: `${nation.activeEffects}` },
          )
          .setFooter('Method Gaming: Nations of War')
          .setThumbnail(flagUrl);

      await interaction.reply({ embeds: [embed] });
      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
  }
});

client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'supply-camp',
    description: 'Add a forge drop-off location on the map so you can collect your forge resources when needed!',
    options: [
      {
        name: 'image_url',
        type: 'STRING',
        description: 'The URL of the forge location (on the map)',
        required: true,
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of your nation',
        required: true,
        choices: nationChoices
      },
    ]
  });
  console.log(`Loaded Flag Files!`);
});

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName, options, user, guild } = interaction;
  
    if (commandName === 'supply-camp') {
      const imageUrl = options.getString('image_url');
      const nationName = options.getString('nation');
      let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const role = member.roles.cache.get('1193603041128108142');
      if (!role) {
        return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
      }
  
      const role1 = member.roles.cache.get('1195150178655686688');
      if (!role1) {
        return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
      }
  
      const entity = nations.find((ent) => ent.name === nationName);

      if (!entity || interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
        return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
      }
  
      const channel = guild.channels.cache.get('1201235661081038929');
  
      const embed = new MessageEmbed()
        .setTitle('New Supply Camp Location Request')
        .setColor('#313338')
        .setDescription(`Nation: **${nationName}**`)
        .setImage(imageUrl);

      channel.send({ embeds: [embed] });

      const doneembed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`Your supply camp will be registered shortly, to ensure that your supply camp gets added on the map and an admin can correctly drop off your loot, make sure you have actually placed down a supply camp or else it will not be added!`)
      .setImage(imageUrl);
  
      await interaction.reply({ embeds: [doneembed] });
    }
  });

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.currencyName, value: nation.currencyName }));
  
  const command = await client.application?.commands.create({
    name: 'conversion-rate',
    description: 'Calculate the conversion rate between two currencies',
    options: [
      {
        name: 'from_currency',
        type: 'STRING',
        description: 'Select the source currency!',
        required: true,
        choices,
      },
      {
        name: 'to_currency',
        type: 'STRING',
        description: 'Select the target currency!',
        required: true,
        choices,
      },
      {
        name: 'amount',
        type: 'INTEGER',
        description: 'Enter the amount to convert!',
        required: true,
      },
    ],
  });

  console.log('Loaded Conversion Rate Files!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'conversion-rate') {
    const fromCurrency = options.getString('from_currency');
    const toCurrency = options.getString('to_currency');
    const amount = options.getInteger('amount');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    const fromNation = nations.find(nation => nation.currencyName === fromCurrency);
    const toNation = nations.find(nation => nation.currencyName === toCurrency);

    if (!fromNation || !toNation) {
      return interaction.reply({ content: 'Invalid currencies selected.', ephemeral: true });
    }

    const fromCurrencyValue = parseFloat(fromNation.currencyValue);
    const toCurrencyValue = parseFloat(toNation.currencyValue);

    if (fromCurrencyValue === 0 || toCurrencyValue === 0) {
      return interaction.reply({ content: 'Invalid currency values. Cannot divide by zero!', ephemeral: true });
    }

    const conversionRate = fromCurrencyValue / toCurrencyValue;
    const convertedAmount = amount * conversionRate;
    
    const embed = new MessageEmbed()
      .setTitle('Currency Conversion Rate')
      .setColor('#313338')
      .setDescription(`1 **${fromCurrency}(s)** to **${toCurrency}(s)** = ${conversionRate.toFixed(4)}\n${amount} **${fromCurrency}(s)** = **${convertedAmount.toFixed(2)}** **${toCurrency}(s)**`);    

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'nickname',
    description: 'Set a nickname for a certain type',
    options: [
      {
        name: 'type',
        type: 'STRING',
        description: 'Type of nickname',
        required: true,
        choices: [
          { name: 'Ideology', value: 'ideology' },
        ],
      },
      {
        name: 'name',
        type: 'STRING',
        description: 'A new name for your selected category',
        required: true,
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The nation to get information about',
        required: true,
        choices
      }
    ],
  });

  console.log(`Loaded Nickname Files!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'nickname') {
    const type = options.getString('type');
    const name = options.getString('name');
    const selectedNationName = options.getString('nation');
    const nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing `/register` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    const role2 = member.roles.cache.get('871949534794760253');
    if (!role2) {
      return interaction.reply({ content: 'You must have [Citizen Pass](https://patreon.com/nonay) and/or the [Corporation Pass](https://patreon.com/nonay) to access the item marketplace!', ephemeral: true });
    }

    const nationIndex = nations.findIndex(nation => nation.name === selectedNationName);

    const selectedNation = nations[nationIndex];

    if (!selectedNation || interaction.user.id !== selectedNation.countryOwner.id && !(selectedNation.coOwners && selectedNation.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (type === 'ideology') {
      selectedNation.nickname = `(${name})`;
    }

    nations[nationIndex] = selectedNation;

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`Nickname updated successfully for **${type}** to **${name}**!`)

    return interaction.reply({
      embeds: [embed],
    });
  }
}); 

client.once('ready', async () => {
  const command = await client.application?.commands.create({
      name: 'add-country',
      description: 'Add a new country',
      options: [
          {
              name: 'country_name',
              type: 'STRING',
              description: 'The name of the country',
              required: true
          },
          {
              name: 'ideology',
              type: 'STRING',
              description: 'The ideology of the country',
              required: true,
              choices: [
                  { name: 'Fascist', value: 'Fascist' },
                  { name: 'Communist', value: 'Communist' },
                  { name: 'Democratic', value: 'Democratic' }
              ]
          },
          {
              name: 'currency_name',
              type: 'STRING',
              description: 'The name of the country\'s currency',
              required: true
          },
          {
              name: 'currency_symbol',
              type: 'STRING',
              description: 'The symbol of the country\'s currency',
              required: true
          }
      ]
  });

  console.log(`Loaded AddCountry Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'add-country') {
    const blacklist = ['247209774960082945', '720770329575817277', '1191084098492563476', '779120709565546546'];
    const countryName = options.getString('country_name');
    const ideology = options.getString('ideology');
    const currencyName = options.getString('currency_name');
    const currencySymbol = options.getString('currency_symbol');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing `/register` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

    if (blacklist.includes(interaction.user.id)) {
      return interaction.reply({ content: 'You are unable to use this command! If you make "troll" nations or your nation recently capitulated, you can receive a temporary blacklist!', ephemeral: true });
    }

    const userCountry = nations.find(nation => nation.countryOwner.id === interaction.user.id);
    if (userCountry) {
      return interaction.reply({ content: 'You can only have one country per person!', ephemeral: true });
    }

    if (nations.length >= 25) {
      return interaction.reply({ content: 'The maximum limit of 25 countries has been reached. No more countries can be added at the moment!', ephemeral: true });
    }

    nations.push({
      name: countryName,
      population: 0,
      ideology: ideology,
      requestActive: false,
      gdp: 0,
      forgeAmount: 0,
      stability: 100,
      color: "#313338",
      balance: 0,
      debt: 0,
      pmi: 0.00,
      growth: 0.00,
      additionalIncome: 0,
      investors: 0,
      currencyValue: 1.00,
      currencyValueLowest: '1.00',
      currencyValueHighest: '1.00',
      humanDevelopmentIndex: '0.001',
      currencyName: currencyName,
      currencySymbol: currencySymbol,
      countryOwner: member.user,
      researchPoints: 0,
      researched: [],
      uraniumPlant: 0,
      uraniumMine: 0,
      uraniumEnriched: 0,
      uranium: 0,
      labs: 0,
      power: 0,
      powerType: 'None',
      enemies: [],
      allies: [],
      peaceReq: [],
      largestIncome: 'None',
      tradeReq: [],
      activeEffects: [
        "A New Beginning"
      ],
      activeDeeds: 'None'
    });

    const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Country Added!')
      .setDescription(`Name: **${countryName}**\nIdeology: **${ideology}**\nCurrency Name: **${currencyName}**\nCurrency Symbol: **${currencySymbol}**\nLeader: **${member.user.username}**\nAdministrator: **${interaction.user.username}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`${countryName} Created!`)
      .setColor('#313338')
      .setDescription(`Country ${countryName} has been added successfully!`);

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'add-law',
    description: 'Add a new law to your nation',
    options: [
      {
        name: 'name',
        type: 'STRING',
        description: 'The name of the law',
        required: true,
      },
      {
        name: 'description',
        type: 'STRING',
        description: 'The description of the law',
        required: true,
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of your nation',
        required: true,
        choices: nationChoices,
      },
    ],
  });
  console.log(`Loaded Add-Law Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'add-law') {
    const lawName = options.getString('name');
    const lawDescription = options.getString('description');
    const selectedNation = options.getString('nation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing `/register` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    const nation = nations.find(n => n.name === selectedNation);

    if (!nation || interaction.user.id !== nation.countryOwner.id && !(nation.coOwners && nation.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (!nation.laws) {
      nation.laws = [];
    }

    const totalChars = nation.laws.reduce((acc, law) => acc + law.name.length + law.description.length, 0);
    const newLawChars = lawName.length + lawDescription.length;

    if (totalChars + newLawChars > 3999) {
      return interaction.reply({ content: 'The total characters of all laws combined cannot exceed 4000 characters!', ephemeral: true });
    }

    nation.laws.push({
      name: lawName,
      description: lawDescription,
    });

    const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Law Added')
      .setDescription(`Owner: **${interaction.user.username}**\nNation: **${selectedNation}**\nLaw Name: **${lawName}**\nLaw Description: **${lawDescription}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const successMessage = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Law Added Successfully')
      .setDescription(`The law **${lawName}** has been added to **${selectedNation}**!`);

    await interaction.reply({ embeds: [successMessage] });
  }
});

client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'remove-law',
    description: 'Remove a law from a nation',
    options: [
      {
        name: 'name',
        type: 'STRING',
        description: 'The name of the law to remove',
        required: true,
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of the nation',
        required: true,
        choices: nationChoices,
      },
    ],
  });
  console.log(`Loaded Remove Law Command Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'remove-law') {
    const lawName = options.getString('name');
    const selectedNation = options.getString('nation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing `/register` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    const nation = nations.find(n => n.name === selectedNation);

    if (!nation || interaction.user.id !== nation.countryOwner.id && !(nation.coOwners && nation.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (!nation.laws || nation.laws.length === 0) {
      return interaction.reply({ content: 'This nation has no laws to remove!', ephemeral: true });
    }

    const lawIndex = nation.laws.findIndex(law => law.name === lawName);

    if (lawIndex === -1) {
      return interaction.reply({ content: `The law **${lawName}** was not found in **${selectedNation}'s** laws!`, ephemeral: true });
    }

    const removedLaw = nation.laws.splice(lawIndex, 1)[0];

    const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Law Removed')
      .setDescription(`Owner: **${interaction.user.username}**\nNation: **${selectedNation}**\nRemoved Law Name: **${removedLaw.name}**\nRemoved Law Description: **${removedLaw.description}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const successMessage = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Law Removed Successfully')
      .setDescription(`The law **${removedLaw.name}** has been removed from **${selectedNation}'s** laws!`);

    await interaction.reply({ embeds: [successMessage] });
  }
});


client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'laws',
    description: 'View the laws of a nation',
    options: [
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of the nation',
        required: true,
        choices: nationChoices,
      },
    ],
  });
  console.log(`Loaded Laws Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'laws') {
    const selectedNation = options.getString('nation');
    const nation = nations.find(n => n.name === selectedNation);

    if (!nation) {
      return interaction.reply({ content: 'Invalid nation selected!', ephemeral: true });
    }

    const lawEmbed = new MessageEmbed();

    if (nation.laws && nation.laws.length > 0) {
      const lawsString = nation.laws.map(law => `### ${law.name}\n${law.description}`).join('\n\n');
      lawEmbed
        .setColor('#313338')
        .setTitle(`${nation.name}'s Laws`)
        .setDescription(lawsString);
    } else {
      lawEmbed
        .setColor('#ff0000')
        .setTitle(`${nation.name}'s Laws`)
        .setDescription('This country appears to be in a state of anarchy! There are no laws to read!');
    }

    await interaction.reply({ embeds: [lawEmbed] });
  }
});

client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
  const command = await client.application?.commands.create({
    name: 'name',
    description: 'Change the name of a nation or corporation',
    options: [
      {
        name: 'name',
        type: 'STRING',
        description: 'The new name for the nation or corporation',
        required: true,
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of the nation',
        required: false,
        choices: nationChoices,
      },
      {
        name: 'corporation',
        type: 'STRING',
        description: 'The name of the corporation',
        required: false
      },
    ],
  });
  console.log(`Loaded Name Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'name') {
    const newName = options.getString('name');
    const selectedNation = options.getString('nation');
    const selectedCorporation = options.getString('corporation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing `/register` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    let entities, entity;

    if (selectedNation) {
      entities = nations;
      entity = entities.find(e => e.name === selectedNation);
    } else if (selectedCorporation) {
      entities = corporations;
      entity = entities.find(e => e.name === selectedCorporation);
    } else {
      return interaction.reply({ content: 'Please select a nation or corporation to change the name!', ephemeral: true });
    }

    if (!entity) {
      return interaction.reply({ content: 'Entity not found', ephemeral: true });
    }

    if ('countryOwner' in entity && interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner of this entity!', ephemeral: true });
    } else if ('ownerId' in entity && interaction.user.id !== entity.ownerId) {
      return interaction.reply({ content: 'You are not the registered owner of this entity!', ephemeral: true });
    }

    entity.name = newName;

    const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Name Changed')
      .setDescription(`Owner: **${interaction.user.username}**\nOld Name: **${selectedNation || selectedCorporation}**\nNew Name: **${newName}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
    fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));

    const successMessage = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Name Change Successful')
      .setDescription(`The name of your **${selectedNation ? 'nation' : 'corporation'}** (**${selectedNation || selectedCorporation}**) has been changed to **${newName}**`);

    await interaction.reply({ embeds: [successMessage] });
  }
});


client.once('ready', async () => {
  const command = await client.application?.commands.create({
      name: 'marketplace',
      description: 'View the community marketplace',
  });

  console.log(`Loaded Marketplace Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'marketplace') {
    const userData = readUserData();
    const userEntry = userData[interaction.user.id];
    const marketplace = JSON.parse(fs.readFileSync('Marketplace.json', 'utf-8'));
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    const role2 = member.roles.cache.get('871949534794760253');
    if (!role2) {
      return interaction.reply({ content: 'You must have [Citizen Pass](https://patreon.com/nonay) and/or the [Corporation Pass](https://patreon.com/nonay) to access the item marketplace!', ephemeral: true });
    }

    if (marketplace.length === 0) {
      return interaction.reply({ content: 'No items are available in the marketplace!', ephemeral: true });
    }

    const maxItemsPerPage = 25;
    const totalPages = Math.ceil(marketplace.length / maxItemsPerPage);
    const currentPage = parseInt(options.getString('page')) || 1;
    const startIndex = (currentPage - 1) * maxItemsPerPage;
    const endIndex = Math.min(startIndex + maxItemsPerPage, marketplace.length);

    const dropdownItems = marketplace.slice(startIndex, endIndex).map(item => ({
      label: item.name,
      value: item.name,
      description: `${item.description} (Cost: ${item.price})`
    }));

    const dropdown = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('marketplaceDropdown')
        .setPlaceholder('Select an item to purchase')
        .addOptions(dropdownItems)
    );

    const nextPageButton = new MessageButton()
      .setCustomId('nextPageButton')
      .setLabel('Next Page')
      .setStyle('PRIMARY')
      .setDisabled(currentPage === totalPages);

      const embed = new MessageEmbed()
      .setTitle('Marketplace')
      .setColor('#313338')
      .setDescription('Select an item from the marketplace to purchase!\n\nAvailable Items:\n' + dropdownItems.map(item => `### ${item.label}\n${item.description}`).join('\n\n'))
      .addFields(
        { name: 'Wallet Balance', value: `${parseFloat(userEntry.wallet || 0).toFixed(2)} GBP`, inline: true },
        { name: 'Current Page', value: `${currentPage}/${totalPages}`, inline: true }
      );
    
    await interaction.reply({ embeds: [embed], components: [dropdown, new MessageActionRow().addComponents(nextPageButton)] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu() && !interaction.isButton()) return;

  const { customId, values } = interaction;

  if (customId === 'marketplaceDropdown') {
    const userData = readUserData();
    const userEntry = userData[interaction.user.id];
    let users = JSON.parse(fs.readFileSync('Users.json', 'utf-8'));
    const marketplace = JSON.parse(fs.readFileSync('Marketplace.json', 'utf-8'));
    const selectedItemName = values[0];
    const selectedItem = marketplace.find(item => item.name === selectedItemName);

    if (!selectedItem) {
      return interaction.reply({ content: 'Invalid item selected!', ephemeral: true });
    }

    if (users.wallet < selectedItem.price) {
      return interaction.reply({ content: 'Insufficient funds to purchase this item!', ephemeral: true });
    }

    users.wallet -= selectedItem.price;

    const itemIndex = marketplace.findIndex(item => item.name === selectedItemName);
    marketplace.splice(itemIndex, 1);

    fs.writeFileSync('Users.json', JSON.stringify(users, null, 2));
    fs.writeFileSync('Marketplace.json', JSON.stringify(marketplace, null, 2));

    await interaction.reply({ content: `Successfully purchased ${selectedItemName} for £${selectedItem.price.toFixed(2)}!`, ephemeral: true });
  } else if (customId === 'nextPageButton') {
    const marketplace = JSON.parse(fs.readFileSync('Marketplace.json', 'utf-8'));
    const currentPage = parseInt(interaction.message.embeds[0].fields.find(field => field.name === 'Current Page').value.split('/')[0]);
  
    const maxItemsPerPage = 25;
  
    const totalPages = Math.ceil(marketplace.length / maxItemsPerPage);
  
    const nextPage = Math.min(currentPage + 1, totalPages);
  
    const startIndex = (nextPage - 1) * maxItemsPerPage;
    const endIndex = Math.min(startIndex + maxItemsPerPage, marketplace.length);
  
    const dropdownItems = marketplace.slice(startIndex, endIndex).map(item => ({
      label: item.name,
      value: item.name,
      description: `${item.description} (Cost: ${item.price})`
    }));
  
    const nextPageButton = new MessageButton()
      .setCustomId('nextPageButton')
      .setLabel('Next Page')
      .setStyle('PRIMARY')
      .setDisabled(nextPage === totalPages);
  
    const updatedDropdown = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('marketplaceDropdown')
        .setPlaceholder('Select an item to purchase')
        .addOptions(dropdownItems)
    );
  
    await interaction.update({
      embeds: interaction.message.embeds,
      components: [updatedDropdown, new MessageActionRow().addComponents(nextPageButton)],
    });
  }
});

client.once('ready', async () => {
  const nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'colour',
    description: 'Set the color of your nation\'s info embed!',
    options: [
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of your nation',
        required: true,
        choices: nationChoices,
      },
      {
        name: 'color_code',
        type: 'STRING',
        description: 'The color code (hex) for your nation',
        required: true,
      },
    ],
  });
  console.log(`Loaded Colour Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options, user } = interaction;

  if (commandName === 'colour') {
    const nationName = options.getString('nation');
    const colorCode = options.getString('color_code');
    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

    const entity = nations.find((ent) => ent.name === nationName);

    if (!entity || interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (!entity.citizenPass) {
      const embed = new MessageEmbed()
      .setColor('#f86e01')
      .setDescription(`The selected nation does not have an active [Citizen Pass subscription](https://www.patreon.com/nonay)! If this is not the case, try redeeming your [Citizen Pass subscription](https://www.patreon.com/nonay) by executing /reward-sync and entering your [Citizen Pass](https://www.patreon.com/nonay) key`);
      return interaction.reply({ embeds: [embed] });
    }

    if (!isValidHexColor(colorCode)) {
      return interaction.reply({
        content: 'Invalid color code! Please provide a valid hexadecimal color code'
      });
    }

    entity.color = colorCode;

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
    .setColor('#313338')
    .setDescription(`Color of ${nationName} set successfully!`);

    await interaction.reply({ embeds: [embed] });
  }
});

function isValidHexColor(color) {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(color);
}

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'co-owner',
    description: 'Add or remove a co-owner to/from a nation',
    options: [
      {
        name: 'action',
        type: 'STRING',
        description: 'Action to perform (add or remove)',
        required: true,
        choices: [
          { name: 'Add', value: 'add' },
          { name: 'Remove', value: 'remove' },
        ],
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The nation to modify co-owners',
        required: true,
        choices
      },
      {
        name: 'coowner',
        type: 'USER',
        description: 'The co-owner to add or remove',
        required: true,
      },
    ],
  });

  console.log(`Loaded Co-Owner Files!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'co-owner') {
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role1 = member.roles.cache.get('1195150178655686688');
    if (!role1) {
      return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
    }

    const selectedNationName = options.getString('nation');
    const coOwner = options.getUser('coowner');
    const action = options.getString('action');

    const nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    const nationIndex = nations.findIndex(nation => nation.name === selectedNationName);

    if (nationIndex === -1) {
      return interaction.reply({ content: 'Invalid nation name!', ephemeral: true });
    }

    const selectedNation = nations[nationIndex];

    if (interaction.user.id !== selectedNation.countryOwner.id) {
      return interaction.reply({ content: 'You are not the main owner of this nation!', ephemeral: true });
    }

    if (!selectedNation.coOwners) {
      selectedNation.coOwners = [];
    }

    const isOwnerOfAnotherNation = nations.some(nation => nation.countryOwner.id === coOwner.id && nation.name !== selectedNationName);

    if (isOwnerOfAnotherNation) {
      return interaction.reply({ content: `**${coOwner.username}** is already the owner of another nation! You cannot add them as a co-owner.`, ephemeral: true });
    }

    if (action === 'add') {
      if (coOwner.id === selectedNation.countryOwner.id) {
        return interaction.reply({ content: 'You cannot add the country owner as a co-owner!', ephemeral: true });
      }

      if (selectedNation.coOwners.includes(coOwner.id)) {
        return interaction.reply({ content: `**${coOwner.username}** is already a co-owner of **${selectedNationName}**!` });
      }

      selectedNation.coOwners.push(coOwner.id);
      interaction.reply({ content: `**${coOwner.username}** has been added as a co-owner of **${selectedNationName}**!` });
    } else if (action === 'remove') {
      const coOwnerIndex = selectedNation.coOwners.indexOf(coOwner.id);
      if (coOwnerIndex === -1) {
        return interaction.reply({ content: `**${coOwner.username}** is not a co-owner of **${selectedNationName}**!` });
      }

      selectedNation.coOwners.splice(coOwnerIndex, 1);
      interaction.reply({ content: `**${coOwner.username}** has been removed from the co-owners of **${selectedNationName}**!` });
    } else {
      return interaction.reply({ content: 'Invalid action! Please use either "add" or "remove"!', ephemeral: true });
    }

    nations[nationIndex] = selectedNation;
    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
  }
});

client.once('ready', async () => {
    const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
    const command = await client.application?.commands.create({
        name: 'tokens',
        description: 'View your nation\'s forge token wallet',
        options: [{
            name: 'nation',
            type: 'STRING',
            description: 'The nation to view',
            required: true,
            choices
        }]
    });

    console.log(`Loaded Token Files!`);
});

client.on('interactionCreate', async interaction => {
if (!interaction.isCommand()) return;

const { commandName, options } = interaction;

if (commandName === 'tokens') {
  const selectedNation = options.getString('nation');
  const member = interaction.guild.members.cache.get(interaction.user.id);
  const role = member.roles.cache.get('1193603041128108142');
  if (!role) {
    return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
  }

  const role1 = member.roles.cache.get('1195150178655686688');
  if (!role1) {
    return interaction.reply({ content: 'Your client\'s files dont match the latest version released on Nonay Launcher! Update your client\'s files by executing ``/update``!', ephemeral: true });
  }

  const nation = nations.find(nation => nation.name === selectedNation);

  if (!nation.citizenPass) {
    const embed = new MessageEmbed()
    .setColor('#f86e01')
    .setDescription(`The selected nation does not have an active [Citizen Pass subscription](https://www.patreon.com/nonay)! If this is not the case, try redeeming your [Citizen Pass subscription](https://www.patreon.com/nonay) by executing /reward-sync and entering your [Citizen Pass](https://www.patreon.com/nonay) key`);
    return interaction.reply({ embeds: [embed] });
  }

  let index = nations.findIndex(n => n.name === selectedNation);
  nations[index] = nation;

    const embed = new MessageEmbed()
        .setTitle(`${nation.name}'s Token Wallet`)
        .setColor('#313338')
        .addFields(
            { name: '🏭 Forge Tokens', value: `${nation.forgeTokens || '0'}` },
            { name: '🌆 Subscription Status', value: `Active` },
        )
        .setFooter('Method Gaming: Nations of War');

    await interaction.reply({ embeds: [embed] });
    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
}
});

client.once('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'update',
    description: 'Update your Nonay or Method Gaming service files',
  });

  console.log(`Loaded Update Command!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'update') {
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role1 = member.roles.cache.get('1193603041128108142');
    if (!role1) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const role = member.roles.cache.get('1195150178655686688');

    if (role) {
      return interaction.reply({
        content: 'You already have the latest version of ``Method Gaming: Nations of War``',
        ephemeral: true,
      });
    }

    const loadingEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Nonay Launcher')
      .setDescription('Grabbing latest files for ``Method Gaming: Nations of War`` from the Nonay Cloud!')
      .setTimestamp();

    await interaction.reply({ embeds: [loadingEmbed] });

    setTimeout(() => {
      const successEmbed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Installation Complete!')
        .setDescription('Your account was updated to the latest version to match the files on the Nonay Launcher!\n\nVersion: ``MG:NW_LATEST_BUILD``\nSize: 0.52MB')
        .setTimestamp();

      interaction.editReply({ embeds: [successEmbed] });

      member.roles.add('1195150178655686688');
    }, 10000);
  }
});


client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'stats',
    description: 'View a detailed report for a nation',
    options: [
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of the target nation',
        required: true,
        choices,
      },
    ],
  });

  console.log(`Loaded Stats Command!`);
});

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function calculateDeedsCounts(country) {
  const deeds = {
    'House': 0,
    'Mansion': 0,
    'Hangar': 0,
    'Shop': 0,
    'Office': 0,
    'Factory': 0,
  };

  let deedsCounts = deepClone(deeds);

  if (country.activeDeeds !== 'None') {
    for (let deed of country.activeDeeds) {
      if (deedsCounts.hasOwnProperty(deed)) {
        deedsCounts[deed]++;
      }
    }
  }

  return deedsCounts;
}

function calculateDeedsIncome(country, hours) {
  const deeds = {
    'House': 5000,
    'Mansion': 25000,
    'Hangar': 25000,
    'Shop': 50000,
    'Office': 50000,
    'Factory': 100000,
  };

  let deedsIncome = 0;

  if (country.activeDeeds !== 'None') {
    for (let deed of country.activeDeeds) {
      if (deeds[deed]) {
        deedsIncome += deeds[deed] * (8 / hours);
      }
    }
  }

  return deedsIncome;
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'stats') {
    const usercountry = options.getString('nation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

    const yourCountry = nations.find(nation => nation.name === usercountry);

    const uraniumGain = 1 * yourCountry.uraniumMine * (24 / 4);
    
    const additionalIncome = yourCountry.additionalIncome * (24 / 8);

    const totalIncome = calculateDeedsIncome(yourCountry, 8) * 3 + additionalIncome;

    let projectedDebt = yourCountry.debt;
    for (let i = 0; i < 4; i++) {
      projectedDebt *= 1.05;
    }

    const embed = new MessageEmbed()
      .setColor('#313338')
      .setTitle(`${usercountry} Income`)
      .addFields(
        { name: 'Deed Income (8hr)', value: `£${calculateDeedsIncome(yourCountry, 8).toLocaleString()}`, inline: true },
        { name: 'Deed Category Amount', value: Object.entries(calculateDeedsCounts(yourCountry)).map(([deed, count]) => `${deed}: ${count}`).join('\n'), inline: true },
        { name: 'Uranium Gain (24hr)', value: `${uraniumGain} kg`, inline: true },
        { name: 'Tax Income (24hr)', value: `£${additionalIncome.toLocaleString()}`, inline: true },
        { name: 'Projected Debt (24hr)', value: `£${projectedDebt.toLocaleString()}`, inline: true },
        { name: 'Total Income (24hr)', value: `£${totalIncome.toLocaleString()}`, inline: true },
      );

    interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'matchmake',
    description: 'Starts matchmaking for a RANKED session',
    options: [
      {
        name: 'server',
        type: 'STRING',
        description: 'Which server do you want to use to locate a RANKED session?',
        required: true,
        choices: [
          { name: 'Nations of War', value: 'Nations of War' },
        ]
      }
    ]
  });

  console.log(`Loaded Matchmake Command!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'matchmake') {
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }
    function generateRandomServerName() {
      const length = 5;
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
    
      return `Server-${result}`;
    }

    const randomServer = generateRandomServerName();

    let tips = ['TIP: You can buy a lab with /purchase to gain research points', 'TIP: You can research aviation to produce jets and helicopters', 'TIP: You can do /construct to request to construct something', 'TIP: Loot events are very important to look out for! Some loot events may deprive an area of its loot!', 'TIP: It\'s not always a good idea to be reliant on one resource'];
    let currentTipIndex = 0;

    let loadingMessages = [
      'Grabbing Server Details...',
      'Checking User Rank...',
      'Grabbing Queue...',
      'Sorting Queue Position....',
      'Connecting to Nonay Servers...',
      'Connecting to Method Gaming: Nations of War...',
      'Connecting to RANKED Session...'
    ];
    let currentLoadingIndex = 0;

    let embed = new MessageEmbed()
      .setTitle('Matchmaking Started!')
      .setColor('#00FF00')
      .setDescription(loadingMessages[currentLoadingIndex])
      .setFooter(tips[currentTipIndex]);

    let message = await interaction.reply({ embeds: [embed], fetchReply: true });

    let task = cron.schedule('*/1 * * * *', async () => {
      currentTipIndex = (currentTipIndex + 1) % tips.length;
      embed.setFooter(tips[currentTipIndex]);

      if (currentLoadingIndex < loadingMessages.length - 1) {
        currentLoadingIndex++;
        embed.setDescription(loadingMessages[currentLoadingIndex]);
      }

      await interaction.editReply({ embeds: [embed] });
    });

    const logEmbed = new MessageEmbed()
    .setColor('#313338')
    .setTitle('RANKED Session Connection')
    .setDescription(`**${interaction.user.username}** attempted to connect to **${randomServer}**\n\nConnection ID: **${interaction.user.id}**\nServer Type: **Method Gaming: Nations of War**\nServer Access: **PUBLIC**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    setTimeout(() => {
      task.stop();
      embed.setDescription('Failed to find a server!\n\nReason: **Failed to locate server**\nError Code: **0**\nBan Active: **0**\nNonay Anti-Cheat Integrity: **1**');
      embed.setColor('#FF0000');
      interaction.editReply({ embeds: [embed] });
    }, 10 * 60 * 1000);
  }
});

const readUserData = () => {
  try {
    const userData = fs.readFileSync('Users.json', 'utf8');
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error reading Users.json:', error.message);
    return {};
  }
};

const writeUserData = (userData) => {
  try {
    fs.writeFileSync('Users.json', JSON.stringify(userData, null, 2));
  } catch (error) {
    console.error('Error writing Users.json:', error.message);
  }
};

client.once('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'webhook-connect',
    description: 'Connect to a webhook for updates',
    options: [
      {
        name: 'type',
        type: 'STRING',
        description: 'Type of updates (military or economic)',
        required: true,
        choices: [
          { name: 'Military', value: 'military' },
          { name: 'Ideal Alliances Leaderboard', value: 'economic' },
          { name: 'Community News', value: 'breaking news' },
        ],
      },
      {
        name: 'webhook_url',
        type: 'STRING',
        description: 'The URL of the webhook',
        required: true,
      },
    ],
  });

  console.log(`Loaded Webhook-Connect Command!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'webhook-connect') {
    const type = options.getString('type');
    const webhookURL = options.getString('webhook_url');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }
    
    try {
      new URL(webhookURL);
    } catch (error) {
      return interaction.reply({ content: 'Invalid webhook URL provided!', ephemeral: true });
    }

    const userId = interaction.user.id;
    const users = readUserData();
    const userData = users[userId] || { id: userId, webhooks: {} };

    if (!userData.webhooks) {
      userData.webhooks = {};
    }

    if (userData.webhooks[type]) {
      return interaction.reply({
        content: `You already have a **${type}** webhook connected! Contact a member of staff if you no longer have access to this webhook!`,
        ephemeral: true,
      });
    }

    userData.webhooks[type] = webhookURL;
    users[userId] = userData;

    fs.writeFileSync('Users.json', JSON.stringify(users, null, 2));

    return interaction.reply({ content: `Webhook connected successfully for **${type}** updates!`, ephemeral: true });
  }
});

client.once('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'webhook-update',
    description: 'Update economic or military statistics and send updates to connected webhooks',
    options: [
      {
        name: 'type',
        type: 'STRING',
        description: 'Type of updates (military or economic)',
        required: true,
        choices: [
          { name: 'Military', value: 'military' },
          { name: 'Ideal Alliances Leaderboard', value: 'economic' },
          { name: 'Community News', value: 'breaking news' },
        ],
      },
    ],
  });

  console.log(`Loaded Webhook-Update Command!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'webhook-update') {
    const type = options.getString('type');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('871949534794760256');
    if (!role) {
      return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
    }

    const economicEmbedData = new MessageEmbed()
    .setTitle('Ideal Alliance Leaderboard Updated')
    .setColor('#313338')
    .setDescription("## Last Updated: <t:1705929840:R>\n## Type: **Alliances**\n\n1. Northern Union\n> Despite having a rocky beginning, the Northern Union has really shown its potential, recently having an assembly where all members agreed on implementing Article 2 & 3 as well as making transactions public. The Northern Union is the perfect alliance for inspiring economic growth within your nation\'s economy.\n2.ROVLUNS\n> Whilst the alliance prefers to lay low in the shadows, ROVLUNS is incredibly active and does regular exercises with member states, ensuring that ROVLUNS remains ready for a military invasion. However, the alliance has been involved in some controversies recently over it\'s handling of the invasion of the BRS, where the alliance refused to help.\n3. The Washington Pact\n> Despite having a terrible history of losing streaks, the Washington Pact has bounced back recently with New Baghdad at the helm. New Baghdad has single handedly raised TWP\'s wins by 4, gaining massive amounts of territories in the Southern region of MG:E 1.5.")
    .setTimestamp();

    const breakingnewsData = new MessageEmbed()
    .setTitle('Community News')
    .setColor('#313338')
    .setDescription("## METHOD GAMING RELEASES STATISTICS THAT SHOWS SIGNS OF RECOVERY AFTER BETTER CORPORATIONS UPDATE\n\nMethod Gaming: Nations of War has just released it's first statistic report since the Better Corporations Update, Nonay has even recorded a sharp increase in player activity as well as unique connections since the Better Corporation update was released (which was an utter disaster for Method Gaming). But finally, Method Gaming: Nations of War has officially recovered from the B.C.U which could mean more major updates to come")
    .setTimestamp();

    const militaryEmbedData = new MessageEmbed()
    .setTitle('Manpower/Military Leaderboard Updated')
    .setColor('#313338')
    .setDescription("## Last Updated: <t:1705929180:R>\n## Type: **Manpower**\n\n1. New Baghdad (-0.05% 🔻)\n2. Aiseref (+1.14% <:goingup:1014136455259488326>)\n3. Pacifidian Empire (-2.02% 🔻)\n4. Roman Empire (-3.20% 🔻)\n5. Kingdom of Prussia (-1.15% 🔻)\n6. Roman Empire (+2.58% <:goingup:1014136455259488326>)\n7. Vladmyria (+0.58% <:goingup:1014136455259488326>)\n8. Feresian Empire (-8.04% 🔻)\n9. Foehn (-0.59% 🔻)\n10. France (-12.55% 🔻)")
    .setTimestamp();

    const embedData = type === 'economic' ? economicEmbedData : type === 'breaking news' ? breakingnewsData : militaryEmbedData;

    const users = readUserData();

    for (const userId in users) {
      const userData = users[userId];

      if (userData && userData.webhooks && userData.webhooks[type]) {
        const webhookURL = userData.webhooks[type];
        const webhookClient = new WebhookClient({ url: webhookURL });

        try {
          await webhookClient.send({ embeds: [embedData] });
        } catch (error) {
          console.error(`Failed to update webhooks for user ${userId}:`, error);
        }
      }
    }

    return interaction.reply({ content: `Webhooks updated successfully for ${type} statistics!`, ephemeral: true });
  }
});

client.once('ready', () => {
  client.application?.commands.create({
    name: 'connections',
    description: 'Manage your Nonay profile connections',
    options: [
      {
        name: 'discord',
        type: 'STRING',
        description: 'Your Discord username',
        required: false,
      },
      {
        name: 'paypal',
        type: 'STRING',
        description: 'Your PayPal account',
        required: false,
      },
      {
        name: 'steam',
        type: 'STRING',
        description: 'Your Steam profile',
        required: false,
      },
    ],
  });

  console.log('Loaded Connection Files!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options, user } = interaction;

  if (commandName === 'connections') {
    const discord = options.getString('discord');
    const paypal = options.getString('paypal');
    const steam = options.getString('steam');

    const userData = readUserData();

    if (!userData[user.id]) {
      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Error')
        .setDescription('You do not have an account. Use `/register` to create one.');

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    userData[user.id].connections = {
      discord: discord || null,
      paypal: paypal || null,
      steam: steam || null,
    };

    writeUserData(userData);

    const embed = new MessageEmbed()
      .setColor('#00ff00')
      .setTitle('Connections Updated')
      .setDescription('Your connections have been successfully updated.')
      .addField('Discord', discord || 'Not specified')
      .addField('PayPal', paypal || 'Not specified')
      .addField('Steam', steam || 'Not specified');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', () => {
  client.application?.commands.create({
    name: 'account',
    description: 'View your account information!',
  });

  client.application?.commands.create({
    name: 'register',
    description: 'Create a Nonay account!',
    options: [
      {
        name: 'username',
        type: 'STRING',
        description: 'Your desired username',
        required: true,
      },
    ],
  });

  console.log('Loaded NonayAccount Files!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options, user } = interaction;

  if (commandName === 'account') {
    const userData = readUserData();
    const userEntry = userData[user.id];

    if (userEntry) {
      const verifiedEmoji = userEntry.verified ? '<:verified:999757395016298647>' : '';

      const embed = new MessageEmbed()
        .setColor('#313338')
        .setTitle(`${verifiedEmoji} ${userEntry.username}'s Account`)
        .setFooter(`https://nonayhub.com/accounts/${userEntry.username}`)
        .addField('👥 Username', `${verifiedEmoji} ${userEntry.username || 'N/A'}\nAccount Type: **${userEntry.type || 'Standard'}**`)
        .addField('🆔 NonayID', userEntry.nonayid || 'N/A')
        .addField('💳 Wallet', userEntry.wallet + ' GBP' || '0 GBP')
        .addField('📚 Library', userEntry.library ? '* ' + userEntry.library.join('\n* ') : 'None')
        .addField('🏆 Achievements', userEntry.achievements ? userEntry.achievements.join('\n') : 'None')
        .addField('💻 Launcher Version', `\`\`${userEntry.ver|| 'LATEST_BUILD'}\`\``);

      if (userEntry.connections) {
        const connectionsList = Object.entries(userEntry.connections)
          .map(([platform, username]) => `**${platform.charAt(0).toUpperCase() + platform.slice(1)}:** ${username || 'Not specified'}`)
          .join('\n');
        embed.addField('🔗 Connections', connectionsList);
      } else {
        embed.addField('🔗 Connections', 'None');
      }

      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Error')
        .setDescription('You do not have an account. Use ``/register`` to create one!');

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }

  if (commandName === 'register') {
    const username = options.getString('username');
    const nonayID = '04' + Math.floor(1000000000 + Math.random() * 9000000000);
    const guild = interaction.guild;
    const roleID = '1193603041128108142';
    const member = guild.members.cache.get(interaction.user.id);

    const userData = readUserData();

    const embed = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Account Created')
    .setAuthor('Nonay Launcher')
    .setDescription('Your account has been successfully created!')
    .addField('Username', username)
    .addField('NonayID', nonayID)
    .addField('Wallet', '0');

    if (userData[user.id]) {
      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Error')
        .setDescription('You already have an account!');

      await interaction.reply({ embeds: [embed] });
    } else {
      userData[user.id] = {
        wallet: 0,
        nonayid: nonayID,
        username: username,
        library: [
          "Method Gaming: Nations of War"
        ],
        achievements: [
          "Beginner!\n> Register a Nonay account (1/1)"
        ]
      };
      member.roles.add(roleID)
      member.roles.add("1195150178655686688")
      writeUserData(userData);
      await interaction.reply({ embeds: [embed] });
    }
  }
});

client.once('ready', async () => {
  const command = await client.application?.commands.create({
    name: 'admin',
    description: 'Send an embed to a user via DM or to a channel',
    options: [
      {
        name: 'alert',
        type: 'STRING',
        description: 'The alert to send',
        required: true,
        choices: [
          { name: 'Suspicious Activity', value: 'suspicious' },
          { name: 'Policy Change', value: 'policychange' },
          { name: 'Admin Sanction', value: 'sanction' },
          { name: 'Capitulation', value: 'capitulation' },
          { name: 'Trade', value: 'trade' },
          { name: 'Suspension', value: 'suspension' },
          { name: 'Admin Interference', value: 'admininter' }
        ]
      },
      {
        name: 'user',
        type: 'USER',
        description: 'The user to send the embed to',
        required: false
      },
      {
        name: 'channel',
        type: 'CHANNEL',
        description: 'The channel to send the embed to',
        required: false
      }
    ]
  });
  console.log(`Loaded admin Files!`);
});

client.on('interactionCreate', async interaction => {
  const loggingChannel = client.channels.cache.get('871949535688130632');

  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'admin') {
    if (interaction.user.id !== '540508809341304842') {
      await interaction.reply({ content: 'You are not authorized to use this command.', ephemeral: true });
      return;
    }
    
    const selectedUser = interaction.options.getUser('user');
    const selectedChannel = interaction.options.getChannel('channel');
    const selectedEmbed = interaction.options.getString('alert');
  
    const embeds = {
      suspicious: new MessageEmbed()
        .setDescription('# Suspicious Activity\nYour account is displaying signs of suspicious command executions in-game! Please contact a staff member immediately as you might lose your admin in-game temporarily until a super admin resolves the situation!')
        .setColor('#f86e01'),
      policychange: new MessageEmbed()
        .setDescription('# Method Gaming Policy Could Change\n### Topic: Rules\n\nDue to outdated and severe loopholes, we could be changing our rules and other policies to patch loopholes and to implement new rules that prevent these loopholes from existing. The staff team will vote to pass these new rules at 23:30 GMT on the 17th of January. These rule changes will include purposely avoiding activity during wartime, preventing deletable logs, logging admin commands execute and a series of new rules the staff team must follow to prevent corruption. This will also see a new strike system implemented as well as a few new channels for reporting rule breaks, submitting staff complaints and more.')
        .setColor('#f86e01'),
      sanction: new MessageEmbed()
      .setDescription('# Admin Sanction\nYour country has been sanctioned by the Method Gaming staff team, to find out what this prevents find the details below.\n\nSanction Prevents:\n* Trade\n* Declaration of War\n* Media Access\n* Deed Income\n* Additional Income\n* Access to Aiding Other Countries\n* Creating Another Country\n\nReason:\nLoopholing')
        .setColor('#f86e01'),
      suspension: new MessageEmbed()
      .setDescription('# Suspension\nYou received an account suspension from the Method Gaming network. A suspension is temporary and will usually be resolved within 1 day.\n\nDuration: **5 Months**\nReason: **Alting/Offline Raiding Utilizing Alt Accounts (Coke)**\nAppeal: **Appeal via <#1199349791574994994>**')
        .setColor('#f86e01'),
      admininter: new MessageEmbed()
      .setDescription('**Feresian Empire** is contesting **Aiseref, Vladmyria & Pacifidian Union**')
        .setColor('#313338'),
      capitulation: new MessageEmbed()
        .setDescription('**New Baghdad** won the war against **United Seenabakine**')
        .addFields(
          { name: 'Score', value: `New Baghdad - 10,000` },
        )
        .setColor('#313338'),
      trade: new MessageEmbed()
        .setColor('#313338')
        .setDescription(`Trade between **Pacifidian Empire** and **Feresia** has been initiated`),
    };

    try {
      if (selectedChannel) {
        await selectedChannel.send({ embeds: [embeds[selectedEmbed]] });
        await interaction.reply({ content: `Embed sent to ${selectedChannel.name}.`, ephemeral: true });
      } else if (selectedUser) {
        await selectedUser.send({ embeds: [embeds[selectedEmbed]] });
        await interaction.reply({ content: `Embed sent to ${selectedUser.tag}.`, ephemeral: true });
      } else {
        await interaction.reply({ content: 'Please select either a user or a channel.', ephemeral: true });
      }
    } catch (error) {
      console.error('Error:', error);
      await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
    }
  }
});

const broadcasters = {
  'Good Morning Pacifide': ['540508809341304842'],
  'GBC News': ['540508809341304842'],
  'Callout News': ['540508809341304842'],
  'Upday Radio': ['540508809341304842'],
  'TROVE News': ['581459628840452109', '865278672517070858', '745460816026796112'],
  'FeresToday': ['581459628840452109', '865278672517070858', '745460816026796112', '540508809341304842'],
  'World Economy News Paper': ['1171828799176966258']
};

client.once('ready', async () => {
  const command = await client.application?.commands.create({
  name: 'create-news',
  description: 'Create a news item',
  options: [
    {
      name: 'broadcaster',
      type: 'STRING',
      description: 'Your broadcaster name',
      required: true,
      choices: Object.keys(broadcasters).map(name => ({ name, value: name })),
    },
    {
      name: 'title',
      type: 'STRING',
      description: 'Your news title',
      required: true,
    },
    {
      name: 'news_type',
      type: 'STRING',
      description: 'Your news type',
      required: true,
      choices: [
        { name: 'BREAKING NEWS', value: 'BREAKING NEWS' },
        { name: 'DOCUMENTARY', value: 'DOCUMENTARY' },
        { name: 'REGULAR NEWS', value: 'REGULAR NEWS' },
      ],
    },
    {
      name: 'short_description',
      type: 'STRING',
      description: 'Your short news description',
      required: true,
    },
    {
      name: 'image_caption',
      type: 'STRING',
      description: 'An image caption',
      required: true,
    },
    {
      name: 'paragraph_1',
      type: 'STRING',
      description: 'A new paragraph',
      required: true,
    },
    {
      name: 'paragraph_2',
      type: 'STRING',
      description: 'A new paragraph',
      required: false,
    },
    {
      name: 'paragraph_3',
      type: 'STRING',
      description: 'A new paragraph',
      required: false,
    },
    {
      name: 'image',
      type: 'STRING',
      description: 'An image',
      required: false,
    },
  ],
});
console.log(`Loaded Create-News Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'create-news') return;
  const member = interaction.guild.members.cache.get(interaction.user.id);
  const role = member.roles.cache.get('1193603041128108142');
  if (!role) {
    return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
  }
  const broadcaster = interaction.options.getString('broadcaster');
  const userId = interaction.user.id;

  if (!broadcasters[broadcaster].includes(userId)) {
    const errorEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Error!')
      .setDescription(`You are not registered to the broadcaster ${broadcaster}`);

    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }

  const title = interaction.options.getString('title');
  const shortDescription = interaction.options.getString('short_description');
  const paragraph1 = interaction.options.getString('paragraph_1');
  const paragraph2 = interaction.options.getString('paragraph_2');
  const paragraph3 = interaction.options.getString('paragraph_3');
  const newsType = interaction.options.getString('news_type');
  const image = interaction.options.getString('image');
  const imagecaption = interaction.options.getString('image_caption');

  let news = JSON.parse(fs.readFileSync('News.json', 'utf-8'));

  const newsChannel = client.channels.cache.get('871949535105142804');

  let description = `**${newsType}:** ${title}\n\n${paragraph1}`;

  if (paragraph2) {
    description += `\n\n${paragraph2}`;
  }

  if (paragraph3) {
    description += `\n\n${paragraph3}`;
  }

  const newsEmbed = new MessageEmbed()
    .setColor('#313338')
    .setTitle(broadcaster)
    .setDescription(description)
    .setFooter(imagecaption)
    .setImage(image)

    newsChannel.send({ embeds: [newsEmbed] }).then(sentMessage => {
      news.push({
        broadcaster,
        title,
        shortDescription,
        paragraph1,
        paragraph2,
        paragraph3,
        newsType,
        authorId: userId,
        factCheck: 'No fact checkers have commented on this article!',
        messageLink: sentMessage.url,
      });
      fs.writeFileSync('News.json', JSON.stringify(news, null, 2));
    });

  const confirmationEmbed = new MessageEmbed()
    .setColor('#313338')
    .setTitle('News Created!')
    .setDescription(`**${title}** has been published successfully!`);

  await interaction.reply({ embeds: [confirmationEmbed] });
});

client.once('ready', async () => {
  const command = await client.application?.commands.create({
  name: 'news',
  description: 'Get the top 5 latest news stories',
});
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'news') return;

  let news = JSON.parse(fs.readFileSync('News.json', 'utf-8'));

  news = news.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const newsEmbed = new MessageEmbed()
    .setColor('#313338')
    .setTitle('Trending News Stories')
    .setDescription('**Trending Tags (5):**\n#paciexit\n#pacifide\n#LeaveNOW\n#FeresianInTurmoil\n#FeresianDeal');

  news.forEach((item, index) => {
    newsEmbed.addField(`(${index + 1}) ${item.newsType}: ${item.title}`, `${item.shortDescription}\n\n**What are fact checkers saying about this article:**\n${item.factCheck}\n\n[READ MORE HERE](${item.messageLink})`);
  });

  await interaction.reply({ embeds: [newsEmbed] });
});

client.once('ready', async () => {
const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
const command = await client.application?.commands.create({
  name: 'notice',
  description: 'Create a notice for a specific nation',
  options: [
    {
      name: 'alert_type',
      type: 'STRING',
      description: 'Select the type of alert',
      required: true,
      choices: [
        { name: 'Traffic Alert', value: 'Traffic Alert' },
        { name: 'Evacuation Alert', value: 'Evacuation Alert' },
        { name: 'Weather Alert', value: 'Weather Alert' },
        { name: 'Information', value: 'Information' },
      ],
    },
    {
      name: 'details',
      type: 'STRING',
      description: 'Provide details for the alert',
      required: true,
    },
    {
      name: 'nation',
      type: 'STRING',
      description: 'Specify the nation for the alert',
      required: true,
      choices
    }
  ],
});
console.log(`Loaded Notice Files!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'notice') {
    const alertType = options.getString('alert_type', true);
    const nation = options.getString('nation', true);
    const details = options.getString('details', true);
    let nationdef = nations.find(n => n.name === nation);
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    if (!nationdef || interaction.user.id !== nationdef.countryOwner.id && !(nationdef.coOwners && nationdef.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    let alertMessage;

    switch (alertType) {
      case 'Traffic Alert':
        alertMessage = '🚨 Traffic Alert';
        alertColor = '#ff9900';
        break;
      case 'Evacuation Alert':
        alertMessage = '⚠️ Evacuation Alert';
        alertColor = '#ff0000';
        break;
      case 'Weather Alert':
        alertMessage = '☔ Weather Alert';
        alertColor = '#ff9900';
        break;
      case 'Information':
        alertMessage = '📚 Information/Advisory';
        alertColor = '#007aff';
        break;
    }

    const announcement = new MessageEmbed()
    .setColor(alertColor)
    .setDescription(`# ${alertMessage}\n## ${nation}\n\n${details}`);
   
    const hangout = client.channels.cache.get('871949535105142804');
    hangout.send({ embeds: [announcement] });

    await interaction.reply({ content: 'Alert sent!', ephemeral: true });
  }
});

client.once('ready', async () => {
const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
const command = await client.application?.commands.create({
  name: 'add-corporation',
  description: 'Create a new corporation',
  options: [
    {
      name: 'corporation_name',
      type: 'STRING',
      description: 'The name of your corporation',
      required: true,
    },
    {
      name: 'category',
      type: 'STRING',
      description: 'The category of your corporation',
      required: true,
      choices: [
        { name: 'Construction', value: 'Construction' },
        { name: 'Banking Sector', value: 'Banking Sector' },
        { name: 'Arms Manufacturer', value: 'Arms Manufacturer' },
        { name: 'Public Transport', value: 'Public Transport' },
        { name: 'Fast Food', value: 'Fast Food' },
        { name: 'Department Store', value: 'Department Store' },
        { name: 'Investor/Risk Management Firm', value: 'Investor' },
        { name: 'Automobile Manufacturer', value: 'Automobile Manufacturer' },
        { name: 'Charity Organization', value: 'Charity Organization' },
        { name: 'Private Military Corporation', value: 'Private Military Corporation' }
    ]
    },
    {
      name: 'nation',
      type: 'STRING',
      description: 'The nation you pay taxes to',
      required: true,
      choices
    },
    {
      name: 'ownership',
      type: 'STRING',
      description: 'The type of ownership',
      required: true,
      choices: [
        { name: 'Private Corporation', value: 'Private' },
        { name: 'Public Corporation', value: 'Public' }
    ]
    },
    {
      name: 'website',
      type: 'STRING',
      description: 'The website of your corporation',
      required: false,
    },
  ],
});
  console.log(`Loaded AddCorporation Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'add-corporation') {

    const blacklist = ['760635961461440523', '746000006997213267', '251056983593975819', '655788473160302640', '670300828199813150'];

    const userId = interaction.user.id;
    if (blacklist.includes(userId)) {
      const errorEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setDescription('You cannot create a corporation! This may be because your corporation has gone bankrupt recently or you were blacklisted!');

      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }

    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const corporationName = options.getString('corporation_name');
    const category = options.getString('category');
    const website = options.getString('website');
    const public = options.getString('ownership');
    const nation = options.getString('nation');
    const userName = interaction.user.username;

    let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));

    const existingCorporation = corporations.find(corp => corp.ownerId === userId);
    if (existingCorporation) {
      return interaction.reply({ content: 'You already have a corporation!', ephemeral: true });
    }

    corporations.push({
      name: corporationName,
      category: category,
      balance: 0,
      website: website,
      ownerId: userId,
      ownerName: userName,
      status: public,
      debt: 0,
      forgeAmount: 0,
      nation: nation,
      customers: 0,
      effects: [
        " None"
      ],
      inventory: []
    });

    const logEmbed = new MessageEmbed()
    .setColor('#313338')
    .setTitle('Corporation Added!')
    .setDescription(`Name: **${corporationName}**\nCategory: **${category}**\nOwner: **${userName}**\nPublic Status: **${public}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    const embed = new MessageEmbed()
      .setTitle(`${corporationName} Created!`)
      .setColor('#313338')
      .setDescription(`Corporation ${corporationName} has been created successfully! Make sure to look out for it in /corporations`);

    await interaction.reply({ embeds: [embed] });

    fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));
  }
});

client.once('ready', async () => {
  let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));
  const corporationChoices = corporations.map((corp, index) => ({ name: corp.name, value: index.toString() }));
  const command = await client.application?.commands.create({
      name: 'corporations',
      description: 'Inspect a corporation!',
      options: [
          {
              name: 'corporation_name',
              type: 'STRING',
              description: 'The name of the corporation to inspect',
              required: true
          }
      ]
  });

  console.log(`Loaded Corporations Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'corporations') {
    const corporationName = options.getString('corporation_name');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));
    const corporation = corporations.find(corp => corp.name === corporationName);

    if (!corporation) {
      return interaction.reply({ content: `Corporation does not exist!`, ephemeral: true });
    }

    corporation.inventory = corporation.inventory.filter((item) => item.quantity > 0);

    const sortedCorporations = [...corporations];
    sortedCorporations.sort((a, b) => b.customers - a.customers);

    const leaderboardPosition = sortedCorporations.findIndex(corp => corp.name === corporation.name) + 1;

    const inventoryMessage = corporation.inventory.length
      ? corporation.inventory.map((item) => `**(${item.quantity.toLocaleString()}x)** ${item.name}`).join('\n')
      : 'None';

    const embed = new MessageEmbed()
      .setTitle(`${corporation.name}`)
      .setColor('#313338')
      .addFields(
        { name: '📣 Name', value: `${corporation.name}` },
        { name: '💼 Business Statistics', value: `Customers: **${corporation.customers.toLocaleString()}**\nBalance: **£${corporation.balance.toLocaleString()}**\nDebt: **£${corporation.debt.toLocaleString()}**` },
        { name: '🏭 Forges', value: `${corporation.forgeAmount.toLocaleString()}` },
        { name: '🎒 Inventory', value: `${inventoryMessage}` },
        { name: '👨‍💼 Category', value: `${corporation.category}` },
        { name: '🔗 Website', value: `${corporation.website}` },
        { name: '✊ Leaderboard Position', value: `No.${leaderboardPosition}` },
        { name: '🌍 Public/Private Status', value: `${corporation.status}` },
        { name: '⛳ Nation (Registered At)', value: `${corporation.nation}` },
      )
      .setFooter('THIS CORPORATION IS REQUIRED TO MAKE IN-GAME SALES TO AVOID BANKRUPTCY');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  let parties = JSON.parse(fs.readFileSync('Party.json', 'utf-8'));
  const partyChoices = parties.map((party, index) => ({ name: party.name, value: index.toString() }));
  const command = await client.application?.commands.create({
      name: 'parties',
      description: 'Inspect a party!',
      options: [
          {
              name: 'party_name',
              type: 'STRING',
              description: 'The name of the party to inspect',
              required: true,
              choices: partyChoices
          }
      ]
  });

  console.log(`Loaded Parties Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'parties') {
    const partyIndex = parseInt(options.getString('party_name'));
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let parties = JSON.parse(fs.readFileSync('Party.json', 'utf-8'));
    const party = parties[partyIndex];

    if (!party) {
      return interaction.reply({ content: `Party does not exist!`, ephemeral: true });
    }

    const embed = new MessageEmbed()
      .setTitle(`${party.text}`)
      .setDescription(`Ideology: ${party.ideology}\nName: ${party.text}\nLeader: ${party.owner}`)
      .addField('Home Secretary', party.homeSecretary.name ? `${party.homeSecretary.name} (Level ${party.homeSecretary.level}, Skills: ${party.homeSecretary.skills ? party.homeSecretary.skills.join(', ') : 'None'})` : 'None')
      .addField('Defence Minister', party.defenceMinister.name ? `${party.defenceMinister.name} (Level ${party.defenceMinister.level}, Skills: ${party.defenceMinister.skills ? party.defenceMinister.skills.join(', ') : 'None'})` : 'None')
      .addField('Foreign Minister', party.foreignMinister.name ? `${party.foreignMinister.name} (Level ${party.foreignMinister.level}, Skills: ${party.foreignMinister.skills ? party.foreignMinister.skills.join(', ') : 'None'})` : 'None')
      .addField('Chancellor of the Exchequer', party.chancellorExchequer.name ? `${party.chancellorExchequer.name} (Level ${party.chancellorExchequer.level}, Skills: ${party.chancellorExchequer.skills ? party.chancellorExchequer.skills.join(', ') : 'None'})` : 'None')
      .addField('Health Minister', party.healthMinister.name ? `${party.healthMinister.name} (Level ${party.healthMinister.level}, Skills: ${party.healthMinister.skills ? party.healthMinister.skills.join(', ') : 'None'})` : 'None');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'party',
      description: 'Create or manage a party',
      options: [
          {
              name: 'action',
              type: 'STRING',
              description: 'Whether to create a new party or manage an existing one',
              required: true,
              choices: [
                  { name: 'Create', value: 'create' },
                  { name: 'Manage', value: 'manage' }
              ]
          },
          {
            name: 'nation',
            type: 'STRING',
            description: 'What country are you hosting this party within?',
            required: false,
            choices
        },
          {
              name: 'party_name',
              type: 'STRING',
              description: 'The name of the party',
              required: false
          },
          {
              name: 'ideology',
              type: 'STRING',
              description: 'The ideology of the party',
              required: false,
              choices: [
                  { name: 'Fascist', value: 'Fascist' },
                  { name: 'Communist', value: 'Communist' },
                  { name: 'Democratic', value: 'Democratic' }
              ]
          },
      ]
  });

  console.log(`Loaded Party Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'party') {
    const action = options.getString('action');
    const partyName = options.getString('party_name');
    const ideology = options.getString('ideology');
    const nation = options.getString('nation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let parties = JSON.parse(fs.readFileSync('Party.json', 'utf-8'));

    if (action === 'create') {
      if (!partyName || !ideology || !nation) {
        const embed = new MessageEmbed()
          .setTitle('Error')
          .setColor('#ff0000')
          .setDescription('You must provide a party name, ideology, and nation when creating a party.');

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      const userParty = parties.find(party => party.owner === member.id);
      if (userParty) {
        return interaction.reply({ content: 'You already have a party!', ephemeral: true });
      }

      parties.push({
        name: partyName,
        text: partyName,
        ideology: ideology,
        owner: member.id,
        nation: [
          nation
        ],
        homeSecretary: "None",
        foreignMinister: "None",
        chancellorExchequer: "None",
        healthMinister: "None",
        defenceMinister: "None",
      });

      fs.writeFileSync('Party.json', JSON.stringify(parties, null, 2));

      await interaction.reply({ content: `**${partyName}** has been created successfully!`, ephemeral: true });
    } else if (action === 'manage') {
      if (!partyName && !ideology) {
        const embed = new MessageEmbed()
          .setTitle('Error')
          .setColor('#ff0000')
          .setDescription('You must provide a new party name or ideology when managing a party.');

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      const userParty = parties.find(party => party.owner === member.id);
      if (!userParty) {
        return interaction.reply({ content: 'You don\'t have a party to manage!', ephemeral: true });
      }

      userParty.name = partyName || userParty.name;
      userParty.ideology = ideology || userParty.ideology;

      fs.writeFileSync('Party.json', JSON.stringify(parties, null, 2));

      await interaction.reply({ content: `**${partyName}** has been updated successfully!`, ephemeral: true });
    }
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'election',
      description: 'Host an election within a nation',
      options: [
          {
            name: 'country_name',
            type: 'STRING',
            description: 'What country are you calling for an election within?',
            required: false,
            choices
        },
      ]
  });

  console.log(`Loaded Election Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'election') {
    const countryName = options.getString('country_name');

    function readNationsData() {
      const nationsData = fs.readFileSync('Nations.json', 'utf-8');
      return JSON.parse(nationsData);
    }
    
    function readPartyData() {
      const partyData = fs.readFileSync('Party.json', 'utf-8');
      return JSON.parse(partyData);
    }

    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('871949534794760257');
    if (!role) {
      return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
    }
    const nations = readNationsData();
    const country = nations.find(nation => nation.name === countryName);

    if (!country) {
      return interaction.reply({ content: `Country "${countryName}" not found!`, ephemeral: true });
    }

    const parties = readPartyData().filter(party => party.nation.includes(countryName));

    if (parties.length === 0) {
      return interaction.reply({ content: 'No parties registered in this country!', ephemeral: true });
    }

    const embed = new MessageEmbed()
      .setColor('#313338')
      .setTitle(`${countryName}\'s General Election`)
      .setDescription('**Election Rules:** Parties can choose to opt-out of elections but countries may not force parties to opt-out.\n**Election Duration:** 24hr');

    parties.forEach((party, index) => {
      embed.addField(`**${index + 1}.** ${party.name}`, `Ideology: **${party.ideology}**\nOwner: **<@${party.owner}>**`);
    });

    const electionChannel = client.channels.cache.get('1107772627013095434');
    const message = await electionChannel.send({ embeds: [embed] });

    for (let i = 0; i < parties.length; i++) {
      await message.react(`${i + 1}️⃣`);
    }

    await interaction.reply('Election has been initiated! Vote by clicking the corresponding reactions.');
  }
});

const ministers = [
  { name: 'John Doe', level: 2, skills: ['Diplomacy', 'Homeland Security'] },
  { name: 'Jacquees Laha', level: 3, skills: ['Diplomacy', 'Crisis Action', 'Economics'] },
  { name: 'Boris Boden', level: 5, skills: ['Diplomacy', 'Foreign Affairs', 'Health & Social Care'] },
  { name: 'Jane Smith', level: 4, skills: ['Crisis Action', 'Defence'] },
  { name: 'Tasha Smith', level: 4, skills: ['Defence', 'Homeland Security'] },
  { name: 'Jared Lancaster', level: 5, skills: ['Offense', 'Counter-Terrorism'] },
  { name: 'Rita Oranya', level: 5, skills: ['Economics', 'Crisis Action', 'Motivational Speaker'] },
  { name: 'Paul Blart', level: 6, skills: ['Homeland Security', 'Defence', 'Crisis Action', 'Motivational Speaker'] },
  { name: 'Latia Lancaster', level: 10, skills: ['Strict Economic Policies', 'Economics', 'Spokeswoman', 'Diplomacy', 'Motivational Speaker'] },
  { name: 'Ryan Lucas', level: 10, skills: ['Defence', 'Homeland Security', 'Offense', 'Counter-Terrorism'] },
];

// { name: 'Armanos Vladmyrium', level: 9, skills: ['Public Figure', 'Compulsive Spending Disorder', 'Narcist'] },
// { name: 'Clorophytus Smightus', level: 2, skills: ['Liked', 'Bi-polar', 'Schizophrenic' ] },

client.once('ready', async () => {
  const ministerChoices = ministers.map((minister, index) => ({ name: `${minister.name} (Level ${minister.level})`, value: index }));

  const command = await client.application?.commands.create({
      name: 'hire',
      description: 'Hire a minister for your party',
      options: [
          {
              name: 'action',
              type: 'STRING',
              description: 'Whether to hire, inspect or fire a minister',
              required: true,
              choices: [
                  { name: 'Hire', value: 'hire' },
                  { name: 'Inspect', value: 'inspect' },
                  { name: 'Fire', value: 'fire' }
              ]
          },
          {
              name: 'position',
              type: 'STRING',
              description: 'The position of the minister',
              required: true,
              choices: [
                  { name: 'Home Secretary', value: 'homeSecretary' },
                  { name: 'Foreign Minister', value: 'foreignMinister' },
                  { name: 'Chancellor of the Exchequer', value: 'chancellorExchequer' },
                  { name: 'Health Minister', value: 'healthMinister' },
                  { name: 'Defence Minister', value: 'defenceMinister' }
              ]
          },
          {
              name: 'minister',
              type: 'INTEGER',
              description: 'The minister to hire for the position',
              required: false,
              choices: ministerChoices
          }
      ]
  });

  console.log(`Loaded Hire command!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'hire') {
    const action = options.getString('action');
    const position = options.getString('position');
    const ministerIndex = options.getInteger('minister');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let parties = JSON.parse(fs.readFileSync('Party.json', 'utf-8'));
    const userParty = parties.find(party => party.owner === member.id);

    if (!userParty) {
      return interaction.reply({ content: 'You don\'t have a party to manage!', ephemeral: true });
    }

    if (action === 'hire') {
      if (ministerIndex === null) {
        return interaction.reply({ content: 'You must specify a minister to hire for the position!', ephemeral: true });
      }

      const minister = ministers[ministerIndex];
      userParty[position] = minister;
      await interaction.reply({ content: `**${minister.name}** has been hired as your **${position}**!`, ephemeral: true });
    } else if (action === 'inspect') {
      const minister = userParty[position];

      if (!minister) {
        return interaction.reply({ content: `You don't have a **${position}** yet!`, ephemeral: true });
      }

      const embed = new MessageEmbed()
        .setTitle(`${minister.name} (Level ${minister.level})`)
        .setDescription(`Skills: ${minister.skills.join(', ')}`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (action === 'fire') {
      userParty[position] = "None";
      await interaction.reply({ content: `You have fired your **${position}**.`, ephemeral: true });
    }

    fs.writeFileSync('Party.json', JSON.stringify(parties, null, 2));
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'inspect',
      description: 'Request to have your country inspected',
      options: [
          {
              name: 'nation',
              type: 'STRING',
              description: 'The country you want to get inspected',
              required: true,
              choices
          },
          {
            name: 'inspection_type',
            type: 'STRING',
            description: 'The type of inspection you want',
            required: true,
            choices: [
              { name: 'Deed Inspection', value: 'Deed Inspection' },
              { name: 'Forge Spawn Point Inspection', value: 'Forge Inspection' },
              { name: 'Human Development Index', value: 'Human Development Index' },
          ]
        },
      ]
  });

  console.log(`Loaded Inspection Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'inspect') {
    const countryName = options.getString('nation');
    const inspectionType = options.getString('inspection_type');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }
    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    let nation = nations.find(n => n.name === countryName);

    if (!nation || interaction.user.id !== nation.countryOwner.id && !(nation.coOwners && nation.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (nation.requestActive) {
      return interaction.reply({ content: 'You have already requested an inspection. Please wait for the current inspection to finish before requesting another one.', ephemeral: true });
    }

    nation.requestActive = true;

    const logEmbed = new MessageEmbed()
    .setColor('#313338')
    .setTitle('Inspection Requested!')
    .setDescription(`Requested Country: **${countryName}**\nRequested by: **${interaction.user.username}**\nInspection Type: **${inspectionType}**`);

    const logChannel = client.channels.cache.get('1201235661081038929');
    logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`Inspection Requested for ${countryName}!`)
      .setColor('#313338')
      .setDescription(`A **${inspectionType}** has been requested for **${countryName}**! An admin will teleport to you in-game shortly! If you are not online or are unavailable, an admin will teleport around your country to inspect it!`);

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'inspected',
      description: 'Confirm that you have inspected a nation',
      options: [
          {
              name: 'nation',
              type: 'STRING',
              description: 'The country you want to get inspected',
              required: true,
              choices
          }
      ]
  });

  console.log(`Loaded Inspected Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'inspected') {
    const countryName = options.getString('nation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
      const role = member.roles.cache.get('871949534794760256');
      if (!role) {
        return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
      }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    let nation = nations.find(n => n.name === countryName);

    nation.requestActive = false;

    const logEmbed = new MessageEmbed()
    .setColor('#313338')
    .setTitle('Inspection Complete!')
    .setDescription(`Requested Country: **${countryName}**\nInspected by: **${interaction.user.username}**`);

      const logChannel = client.channels.cache.get('871949535688130632');
      logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`Inspection Request Complete`)
      .setColor('#313338')
      .setDescription(`An inspection has been marked as complete under **${countryName}**!`);

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'add-deed',
    description: 'Assigns a deed to a country',
    options: [
      {
        name: 'country_name',
        type: 'STRING',
        description: 'The name of the country',
        required: true,
        choices,
      },
      {
        name: 'deed_type',
        type: 'STRING',
        description: 'The type of deed (house, mansion, factory)',
        required: true,
        choices: [
          { name: 'House', value: 'House' },
          { name: 'Mansion', value: 'Mansion' },
          { name: 'Hangar', value: 'Hangar' },
          { name: 'Shop', value: 'Shop' },
          { name: 'Office', value: 'Office' },
          { name: 'Factory', value: 'Factory' },
        ],
      },
      {
        name: 'quantity',
        type: 'INTEGER',
        description: 'The quantity of deeds to add',
        required: false,
      },
    ],
  });

  console.log(`Loaded AddDeed Files!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'add-deed') {
    const countryName = options.getString('country_name');
    const deedType = options.getString('deed_type');
    const quantity = options.getInteger('quantity') || 1;
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('871949534794760256');

    if (!role) {
      return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
    }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    let nation = nations.find((n) => n.name === countryName);

    if (!nation) {
      return interaction.reply({ content: 'The specified country does not exist.', ephemeral: true });
    }

    const deeds = ['House', 'Mansion', 'Shop', 'Factory', 'Hangar', 'Office'];

    if (!deeds.includes(deedType)) {
      return interaction.reply({ content: 'Invalid deed type. Please choose from House, Mansion, or Shop.', ephemeral: true });
    }

    for (let i = 0; i < quantity; i++) {
      if (nation.activeDeeds === 'None') {
        nation.activeDeeds = [deedType];
      } else {
        nation.activeDeeds.push(deedType);
      }
    }

    const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Deed Added!')
      .setDescription(`Assigned to: **${countryName}**\nAssigned by: **${interaction.user.username}**\nDeed Type: **${deedType}**\nQuantity: **${quantity}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`Deed Assigned`)
      .setColor('#313338')
      .setDescription(`Added ${quantity} ${deedType} deed(s) to ${countryName}!`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});


client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'remove-deed',
      description: 'Removes a deed from a country',
      options: [
        {
          name: 'country_name',
          type: 'STRING',
          description: 'The name of the country',
          required: true,
          choices
        },
        {
          name: 'deed_type',
          type: 'STRING',
          description: 'The type of deed (house, mansion, factory)',
          required: true,
          choices: [
            { name: 'House', value: 'House' },
            { name: 'Mansion', value: 'Mansion' },
            { name: 'Hangar', value: 'Hangar' },
            { name: 'Shop', value: 'Shop' },
            { name: 'Office', value: 'Office' },
            { name: 'Factory', value: 'Factory' }
        ]
        }
      ]
  });

  console.log(`Loaded RemoveDeed Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'remove-deed') {
    const countryName = options.getString('country_name');
    const deedType = options.getString('deed_type');
    const member = interaction.guild.members.cache.get(interaction.user.id);
      const role = member.roles.cache.get('871949534794760256');
      if (!role) {
        return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
      }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    let nation = nations.find(n => n.name === countryName);

    if (!nation) {
      return interaction.reply({ content: 'The specified country does not exist.', ephemeral: true });
    }

    const deeds = ['House', 'Mansion', 'Shop', 'Factory', 'Hangar', 'Office'];

    if (!deeds.includes(deedType)) {
      return interaction.reply({ content: 'Invalid deed type!', ephemeral: true });
    }

    if (nation.activeDeeds === 'None' || !nation.activeDeeds.includes(deedType)) {
      return interaction.reply({ content: `No ${deedType} deed exists within ${countryName}!`, ephemeral: true });
    } else {
      const index = nation.activeDeeds.indexOf(deedType);
      nation.activeDeeds.splice(index, 1);
    }

    const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Deed Removed!')
      .setDescription(`Removed from: **${countryName}**\nRemoved by: **${interaction.user.username}**\nDeed Type: **${deedType}**`);

      const logChannel = client.channels.cache.get('871949535688130632');
      logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`Deed Removed`)
      .setColor('#313338')
      .setDescription(`A ${deedType} deed has been removed from ${countryName}!`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'set-treasury',
      description: 'Set\'s a country\'s treasury to a certain amount',
      options: [
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: true,
          choices
        },
        {
          name: 'balance',
          type: 'NUMBER',
          description: 'Amount you want the treasury to be set to',
          required: true,
        }
      ]
  });

  console.log(`Loaded SetTreasury Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'set-treasury') {
      const selectedNation = options.getString('nation');
      const newBalance = options.getNumber('balance');
      const member = interaction.guild.members.cache.get(interaction.user.id);
        const role = member.roles.cache.get('905945029435093082');
        if (!role) {
          return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
        }

      const nation = nations.find(nation => nation.name === selectedNation);
      if (!nation) {
          return interaction.reply(`Nation ${selectedNation} not found`);
      }

      nation.balance = newBalance;

      let index = nations.findIndex(n => n.name === selectedNation);
      nations[index] = nation;

      const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Treasury Set!')
      .setDescription(`Set by: **${interaction.user.username}**\nAmount: **${newBalance}**\nNation: **${selectedNation}**`);

      const logChannel = client.channels.cache.get('871949535688130632');
      logChannel.send({ embeds: [logEmbed] });

      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

      const embed = new MessageEmbed()
      .setTitle(`Treasury Set`)
      .setColor('#313338')
      .setDescription(`The treasury for ${selectedNation} has been set to ${newBalance}`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'add-treasury',
      description: 'Adds a certain amount to a country\'s treasury',
      options: [
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: true,
          choices
        },
        {
          name: 'balance',
          type: 'NUMBER',
          description: 'Amount you want to add to the treasury',
          required: true,
        }
      ]
  });

  console.log(`Loaded AddTreasury Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'add-treasury') {
      const selectedNation = options.getString('nation');
      const addBalance = options.getNumber('balance');
      const member = interaction.guild.members.cache.get(interaction.user.id);
        const role = member.roles.cache.get('871949534794760255');
        if (!role) {
          return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
        }

      const nation = nations.find(nation => nation.name === selectedNation);
      if (!nation) {
          return interaction.reply(`Nation ${selectedNation} not found`);
      }

      nation.balance += addBalance;

      let index = nations.findIndex(n => n.name === selectedNation);
      nations[index] = nation;

      const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Treasury Added!')
      .setDescription(`Added by: **${interaction.user.username}**\nAmount: **${addBalance.toLocaleString()}**\nNation: **${selectedNation}**`);

      const logChannel = client.channels.cache.get('871949535688130632');
      logChannel.send({ embeds: [logEmbed] });

      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

      const embed = new MessageEmbed()
      .setTitle(`Treasury Added`)
      .setColor('#313338')
      .setDescription(`The treasury for ${selectedNation} has been increased by ${addBalance.toLocaleString()}`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'remove-treasury',
      description: 'Removes a certain amount from a country\'s treasury',
      options: [
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: true,
          choices
        },
        {
          name: 'balance',
          type: 'NUMBER',
          description: 'Amount you want to remove from the treasury',
          required: true,
        }
      ]
  });

  console.log(`Loaded RemoveTreasury Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'remove-treasury') {
      const selectedNation = options.getString('nation');
      const removeBalance = options.getNumber('balance');
      const member = interaction.guild.members.cache.get(interaction.user.id);
        const role = member.roles.cache.get('905945029435093082');
        if (!role) {
          return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
        }

      const nation = nations.find(nation => nation.name === selectedNation);
      if (!nation) {
          return interaction.reply(`Nation ${selectedNation} not found`);
      }

      if (nation.balance < removeBalance) {
          nation.debt += (removeBalance - nation.balance);
          nation.balance = 0;
      } else {
          nation.balance -= removeBalance;
      }

      let index = nations.findIndex(n => n.name === selectedNation);
      nations[index] = nation;

      const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Treasury Removed!')
      .setDescription(`Removed by: **${interaction.user.username}**\nAmount: **${removeBalance.toLocaleString()}**\nNation: **${selectedNation}**`);

      const logChannel = client.channels.cache.get('871949535688130632');
      logChannel.send({ embeds: [logEmbed] });

      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

      const embed = new MessageEmbed()
      .setTitle(`Treasury Removed`)
      .setColor('#313338')
      .setDescription(`The treasury for ${selectedNation} has been decreased by ${removeBalance.toLocaleString()}`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'set-currencyvalue',
      description: 'Set\'s a country\'s currency value',
      options: [
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: true,
          choices
        },
        {
          name: 'value',
          type: 'NUMBER',
          description: 'Value you want to set the currency to',
          required: true,
        }
      ]
  });

  console.log(`Loaded SetCurrencyValue Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'set-currencyvalue') {
      const selectedNation = options.getString('nation');
      let newValue = options.getNumber('value');
      const member = interaction.guild.members.cache.get(interaction.user.id);
        const role = member.roles.cache.get('905945029435093082');
        if (!role) {
          return interaction.reply({ content: 'At least you tried! You don\'t have the correct permissions to execute this command!', ephemeral: true });
        }

      if (newValue > 1.20) {
          return interaction.reply({ content: 'The currency value cannot be set above 1.20!', ephemeral: true });
      }

      if (Number.isInteger(newValue)) {
        return interaction.reply({ content: 'The currency value must have a decimal value in it!', ephemeral: true });
    }

      const nation = nations.find(nation => nation.name === selectedNation);
      if (!nation) {
          return interaction.reply(`Nation ${selectedNation} not found`);
      }

      nation.currencyValue = newValue;

      let index = nations.findIndex(n => n.name === selectedNation);
      nations[index] = nation;

      const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Currency Value Set!')
      .setDescription(`Set by: **${interaction.user.username}**\nSet to: **${newValue}**`);

      const logChannel = client.channels.cache.get('871949535688130632');
      logChannel.send({ embeds: [logEmbed] });

      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

      const embed = new MessageEmbed()
      .setTitle(`Currency Value Set`)
      .setColor('#313338')
      .setDescription(`The currency value for ${selectedNation} has been set to ${newValue}`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));
  const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'debt',
      description: 'Pay off your country\'s debt',
      options: [
        {
          name: 'amount',
          type: 'STRING',
          description: 'Amount you want to pay off from the debt',
          required: true,
        },
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: false,
          choices
        },
        {
          name: 'corporation',
          type: 'STRING',
          description: 'The name of the corporation',
          required: false
        }
      ]
  });

  console.log(`Loaded Debt Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'debt') {
    const selectedNation = options.getString('nation');
    const selectedCorporation = options.getString('corporation');
    const amountInput = options.getString('amount').toLowerCase();

    let entity, entities, filePath, isOwner;

    if (selectedNation) {
      entities = nations;
      entity = entities.find(ent => ent.name === selectedNation);
      filePath = 'Nations.json';
      isOwner = interaction.user.id === entity.countryOwner.id || (entity.coOwners && entity.coOwners.includes(interaction.user.id));
    } else if (selectedCorporation) {
      entities = corporations;
      entity = entities.find(ent => ent.name === selectedCorporation);
      filePath = 'Corporations.json';
      isOwner = interaction.user.id === entity.ownerId;
    }

    if (!/^[0-9*]+$/.test(amountInput)) {
      return interaction.reply({ content: 'Invalid characters, debt only accepts numbers and asterisks (*)!', ephemeral: true });
    }

    let amount;
    if (amountInput.includes('*')) {
      amount = Math.min(entity.debt, entity.balance);
    } else {
      amount = parseFloat(amountInput);

      if (isNaN(amount) || amount <= 0) {
        return interaction.reply({ content: 'Amount must be a positive number!', ephemeral: true });
      }
    }

    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');

    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    if (!entity) {
      return interaction.reply({ content: 'Entity not found', ephemeral: true });
    }

    if (!isOwner) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this entity!', ephemeral: true });
    }

    if (amount <= 0) {
      return interaction.reply({ content: 'Amount must be greater than zero!', ephemeral: true });
    }

    if (entity.balance < amount) {
      return interaction.reply({ content: 'Not enough funds in the entity to pay off this amount of debt!', ephemeral: true });
    }

    if (entity.debt < amount) {
      return interaction.reply({ content: 'The amount you want to pay off is more than the current debt!', ephemeral: true });
    }

    entity.balance -= amount;
    entity.debt -= amount;

    let index = entities.findIndex(ent => ent.name === entity.name);
    entities[index] = entity;

    const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Debt Paid')
      .setDescription(`Paid by: **${interaction.user.username}**\nAmount: **${amount.toLocaleString()}**\nEntity: **${entity.name}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    fs.writeFileSync(filePath, JSON.stringify(entities, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`Debt Paid Off`)
      .setColor('#313338')
      .setDescription(`The debt for ${entity.name} has been decreased by ${amount.toLocaleString()}`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));
  const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'loan',
      description: 'Take out a loan for your country',
      options: [
        {
          name: 'amount',
          type: 'NUMBER',
          description: 'Amount you want to loan',
          required: true,
        },
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: false,
          choices
        },
        {
          name: 'corporation',
          type: 'STRING',
          description: 'The name of the corporation',
          required: false
        }
      ]
  });

  console.log(`Loaded Loan Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'loan') {
    const selectedNation = options.getString('nation');
    const selectedCorporation = options.getString('corporation');
    let amount = options.getNumber('amount');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    if (amount > 1000000) {
      return interaction.reply({ content: 'The maximum loan amount from **SERVER** is 1,000,000!', ephemeral: true });
    }

    let entity, entities;
    if (selectedNation) {
      entities = nations;
      entity = entities.find(entity => entity.name === selectedNation);
    } else if (selectedCorporation) {
      entities = corporations;
      entity = entities.find(entity => entity.name === selectedCorporation);
    }

    if (!entity) {
      return interaction.reply(`Entity not found`);
    }

    if ('countryOwner' in entity && interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    } else if ('ownerId' in entity && interaction.user.id !== entity.ownerId) {
      return interaction.reply({ content: 'You are not the registered owner of this entity!', ephemeral: true });
    }

    if (entity.balance + amount > 1000000) {
      return interaction.reply({ content: 'Your treasury/corporation balance cannot exceed 1,000,000 before taking out a loan!', ephemeral: true });
    }

    if (entity.debt + amount > 1000000) {
      return interaction.reply({ content: 'Your debt is too high to take out a loan!', ephemeral: true });
    }

    entity.balance += amount;
    entity.debt += amount;

    let index = entities.findIndex(n => n.name === entity.name);
    entities[index] = entity;

    const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Loan Received')
      .setDescription(`Taken out by: **${interaction.user.username}**\nAmount: **${amount.toLocaleString()}**\nEntity: **${selectedNation || selectedCorporation}**`);

    const logChannel = client.channels.cache.get('871949535688130632');
    logChannel.send({ embeds: [logEmbed] });

    if (selectedNation) {
      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
    } else if (selectedCorporation) {
      fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));
    }

    const embed = new MessageEmbed()
      .setTitle(`Loan Taken`)
      .setColor('#313338')
      .setDescription(`A loan of ${amount.toLocaleString()} has been added to the treasury/debt of ${selectedNation || selectedCorporation}`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));
const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
const itemVehicleChoices = [{ name: 'Item', value: 'item' }, { name: 'Vehicle', value: 'vehicle' }];
const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
const categoryChoices = [{ name: 'Civilian (Items)', value: 'civilian' }, { name: 'Civilian (Land)', value: 'civilian_land' }, { name: 'Civilian (Air)', value: 'civilian_air' }, { name: 'Civilian (Food)', value: 'civilian_food' }, { name: 'Civilian (Marine)', value: 'civilian_marine' }, { name: 'Military (Land)', value: 'military_land' }, { name: 'Military (Air)', value: 'military_air' }, { name: 'Military (Weapon)', value: 'military_weapon' }, { name: 'Military (Marine)', value: 'military_marine' }, { name: 'Nuclear', value: 'nuclear' }, { name: 'Ammunition', value: 'ammunition' }, { name: 'Sentries', value: 'sentries' }];
const command = await client.application?.commands.create({
    name: 'forge',
    description: 'Forge an item or vehicle for your country',
    options: [
      {
        name: 'id',
        type: 'STRING',
        description: 'The id of the item or vehicle',
        required: true,
      },
      {
        name: 'type',
        type: 'STRING',
        description: 'Are you making an item or vehicle?',
        required: true,
        choices: itemVehicleChoices
      },
      {
        name: 'category',
        type: 'STRING',
        description: 'Is it civilian, military or nuclear?',
        required: true,
        choices: categoryChoices
      },
      {
        name: 'quantity',
        type: 'NUMBER',
        description: 'The quantity of the item you want',
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of the country',
        required: false,
        choices
      },
      {
        name: 'corporation',
        type: 'STRING',
        description: 'The name of the corporation',
        required: false
      }
    ]
});
console.log(`Loaded Forge Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'forge') {
    const researchPrerequisites = {
      'civilian': 'civilian goods',
      'civilian_air': 'aviation',
      'military_land': 'military equipment',
      'military_air': 'aviation',
      'military_weapon': 'military equipment',
      'sentries': 'automated security',
      'ammunition': 'ammunition',
      'nuclear': 'uranium enrichment',
      'military_marine': 'marine warfare',
      'civilian_land': 'civilian goods'
    };
    const selectedNation = options.getString('nation');
    const selectedCorporation = options.getString('corporation');
    const id = options.getString('id');
    const type = options.getString('type');
    const category = options.getString('category');
    const quantity = options.getNumber('quantity') || 1;
    const cost = category === 'civilian' ? 250000 : category === 'civilian_air' ? 1000000 : category === 'civilian_land' ? 250000 : category === 'civilian_food' ? 5000 : category === 'military_land' ? 500000 : category === 'military_air' ? 5000000 : category === 'military_weapon' ? 25000 : category === 'military_marine' ? 500000 : category === 'sentries' ? 25000 : category === 'civilian_marine' ? 500000 : category === 'ammunition' ? 10000 : 10000000;
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let entity, entities;
    if (selectedNation) {
      entities = nations;
      entity = entities.find(entity => entity.name === selectedNation);
    } else if (selectedCorporation) {
      entities = corporations;
      entity = entities.find(entity => entity.name === selectedCorporation);
    }

    const allowedCategoriesByCorporationCategory = {
      'Construction': ['civilian'],
      'Arms Manufacturer': ['military_land', 'military_air', 'military_weapon', 'military_marine'],
      'Fast Food': ['civilian_food'],
      'Automobile Manufacturer': ['civilian_land', 'civilian_air'],
      'Department Store': ['civilian'],
      'Banking Sector': ['civilian'],
      'International Delivery': ['civilian'],
      'Investor': ['civilian'],
      'Private Military Corporation': ['military_land'],
    };

    if (selectedCorporation) {
      const corporation = corporations.find(corp => corp.name === selectedCorporation);
      const allowedCategories = allowedCategoriesByCorporationCategory[corporation.category] || [];
      
      if (!allowedCategories.includes(category)) {
        return interaction.reply({ content: `Your corporation\'s category **(${corporation.category})** is not allowed to produce **${category}** technology!`, ephemeral: true });
      }
    }

    if (!selectedCorporation) {
      const allowedCategoriesByIdeology = {
        'Democracy': ['military_land', 'military_air', 'military_weapon', 'military_marine'],
        'Fascism': ['none'],
        'Communism': ['ammunition'],
      };

      if (entity && allowedCategoriesByIdeology[entity.ideology]?.includes(category)) {
        return interaction.reply({ content: `Your ideology **(${entity.ideology})** does not allow production of **${category}** technology! You will most likely need to contract a company to make this item/vehicle!`, ephemeral: true });
      }
    }

    if (selectedCorporation && category === 'nuclear') {
      return interaction.reply({ content: 'Corporations are not allowed to produce nuclear technology!', ephemeral: true });
    }

    if (!entity) {
      return interaction.reply(`Entity not found`);
    }

    if ('countryOwner' in entity && interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    } else if ('ownerId' in entity && interaction.user.id !== entity.ownerId) {
      return interaction.reply({ content: 'You are not the registered owner of this entity!', ephemeral: true });
    }

    if (selectedNation) {
      const prerequisite = researchPrerequisites[category];
      if (!entity.researched.includes(prerequisite)) {
        return interaction.reply({ content: `You must research ${prerequisite} before you can produce any ${category} technology!`, ephemeral: true });
      }
    }

    if (category !== 'ammunition' && entity.forgeAmount < quantity) {
      return interaction.reply({ content: `Your entity is currently producing too much at once! If you think this isn't the case and the item has finished production already, enter /storage <entity>, and see if it is finished!`, ephemeral: true });
    } else if (category === 'ammunition' && entity.forgeAmount < 1) {
      return interaction.reply({ content: `Your entity is currently producing too much at once! If you think this isn't the case and the item has finished production already, enter /storage <entity>, and see if it is finished!`, ephemeral: true });
    } else if (category === 'sentries' && entity.forgeAmount < 1) {
      return interaction.reply({ content: `Your entity is currently producing too many items at once! If you think this isn't the case and the item has finished production already, enter /storage <entity>, and see if it is finished!`, ephemeral: true });
    }

    const totalCost = cost * quantity;

    if (entity.balance < totalCost) {
      entity.debt += totalCost - entity.balance;
      entity.balance = 0;
    } else {
      entity.balance -= totalCost;
    }

    entity.forgeAmount -= (category === 'ammunition' || category === 'sentries') ? 1 : quantity;

    let forgeData = require('../Forge.json');
    let endDate = new Date();
    endDate.setHours(endDate.getHours() + 2);

    forgeData.push({
      entityName: entity.name,
      itemIdOrVehicleId: id,
      type,
      category,
      itemQuantity: quantity,
      endDate: endDate.getTime()
    });

    const completionTimestamp = new Date(endDate).toLocaleString('en-GB', { timeZone: 'GMT' });

    fs.writeFileSync('Forge.json', JSON.stringify(forgeData, null, 2));

    let index = entities.findIndex(n => n.name === entity.name);
    entities[index] = entity;
    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
    fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`Production Line Activated`)
      .setColor('#313338')
      .setDescription(`Started forging **${type}** with the id **${id}** for **${entity.name}** (Quantity: ${quantity})`)
      .setFooter(`Completion Time: ${completionTimestamp}`);

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
  const command = await client.application?.commands.create({
      name: 'storage',
      description: 'Check the storage of a country or corporation (attached to forge)',
      options: [
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: false,
          choices: nationChoices
        },
        {
          name: 'corporation',
          type: 'STRING',
          description: 'The name of the corporation',
          required: false
        },
      ]
  });
  console.log(`Loaded Storage Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'storage') {
    let forgeData = require('../Forge.json');
    const selectedNation = options.getString('nation');
    const selectedCorporation = options.getString('corporation');
    const selectedEntity = selectedNation || selectedCorporation;
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let completedItems = forgeData.filter(item => item.entityName === selectedEntity && Date.now() >= item.endDate);

    if (completedItems.length > 0) {
      let embed = new MessageEmbed()
        .setTitle(`${selectedEntity}'s Inventory`)
        .setColor('#313338');

      completedItems.forEach((item, index) => {
        embed.addField(`Item ${index + 1}`, `Type: **${item.type}**\nID: **${item.itemIdOrVehicleId}**\nQuantity: **${item.itemQuantity}**`);
      });

      await interaction.reply({ embeds: [embed] });
    } else {
      await interaction.reply(`No completed production lines for **${selectedEntity}**!`);
    }
  }
});

client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
  const command = await client.application?.commands.create({
      name: 'withdraw',
      description: 'Withdraw a completed item from your country or corporation\'s forge',
      options: [
        {
          name: 'id',
          type: 'STRING',
          description: 'The minecraft id of the item, ore, food etc',
          required: true,
        },
        {
          name: 'username',
          type: 'STRING',
          description: 'The username of the recipient',
          required: true,
        },
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: false,
          choices: nationChoices
        },
        {
          name: 'corporation',
          type: 'STRING',
          description: 'The name of the corporation',
          required: false
        }
      ]
  });
  console.log(`Loaded Withdraw Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'withdraw') {
    let forgeData = require('../Forge.json');
    const selectedNation = options.getString('nation');
    const username = options.getString('username');
    const selectedCorporation = options.getString('corporation');
    const id = options.getString('id');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let entity, entities;
    if (selectedNation) {
      entities = nations;
      entity = entities.find(e => e.name === selectedNation);
    } else if (selectedCorporation) {
      entities = corporations;
      entity = entities.find(e => e.name === selectedCorporation);
    }

    if (!entity) {
      return interaction.reply(`Entity not found`);
    }

    if ('countryOwner' in entity && interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    } else if ('ownerId' in entity && interaction.user.id !== entity.ownerId) {
      return interaction.reply({ content: 'You are not the registered owner of this entity!', ephemeral: true });
    }

    let index = forgeData.findIndex(item => item.entityName === entity.name && item.itemIdOrVehicleId === id && Date.now() >= item.endDate);
    
    if (index !== -1) {
      let item = forgeData.splice(index, 1)[0];

      let entityIndex = entities.findIndex(e => e.name === entity.name);
      entities[entityIndex].forgeAmount += item.itemQuantity;
    
//      const logEmbed = new MessageEmbed()
//        .setColor('#313338')
//        .setTitle('Item/Vehicle Request')
//        .setDescription(`Owner: **${interaction.user.username}**\nID: **${item.itemIdOrVehicleId}**\nType: **${item.type}**\nEntity: **${entity.name}**\nQuantity: **${item.itemQuantity}**\nCategory (REMEMBER TO CHECK TO SEE IF THIS IS CORRECT): **${item.category}**`);

//      const logChannel = client.channels.cache.get('1201235661081038929');
//      logChannel.send({ embeds: [logEmbed] });

    const rconClient = await Rcon.connect({
      host: 'IP HERE',
      port: 25564,
      password: 'PASSWORD HERE',
      username: 'Nonay'
    });

    const response = await rconClient.send(`give ${username} ${item.itemIdOrVehicleId} ${item.itemQuantity}`);

      fs.writeFileSync('Forge.json', JSON.stringify(forgeData, null, 2));
      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
      fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));

      const withdrew = new MessageEmbed()
        .setColor('#313338')
        .setTitle('Item Withdrawn')
        .setDescription(`You withdrew **${item.itemIdOrVehicleId}** (${item.itemQuantity}x) from **${entity.name}**. Make sure you are online so you can receive the specified items automatically!`);

      await interaction.reply({ embeds: [withdrew] });
    
    } else {
      await interaction.reply(`No completed ${id} found for ${entity.name}`);
    }
  }
});

client.once('ready', async () => {
  const nationChoices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'flag',
    description: 'Update your flag on the nations map!',
    options: [
      {
        name: 'image_url',
        type: 'STRING',
        description: 'The URL of the flag image',
        required: true,
      },
      {
        name: 'nation',
        type: 'STRING',
        description: 'The name of your nation',
        required: true,
        choices: nationChoices
      },
    ]
  });
  console.log(`Loaded Flag Files!`);
});

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName, options, user, guild } = interaction;
  
    if (commandName === 'flag') {
      const imageUrl = options.getString('image_url');
      const nationName = options.getString('nation');
      let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
  
      const entity = nations.find((ent) => ent.name === nationName);

      if (!entity || interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
        return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
      }

      if (!entity.citizenPass) {
        const embed = new MessageEmbed()
        .setColor('#f86e01')
        .setDescription(`The selected nation does not have an active [Citizen Pass subscription](https://www.patreon.com/nonay)! If this is not the case, try redeeming your [Citizen Pass subscription](https://www.patreon.com/nonay) by executing /reward-sync and entering your [Citizen Pass](https://www.patreon.com/nonay) key`);
        return interaction.reply({ embeds: [embed] });
      }
  
      const channel = guild.channels.cache.get('1201235661081038929');
  
      const embed = new MessageEmbed()
        .setTitle('New Flag Submission')
        .setColor('#313338')
        .setDescription(`Nation: **${nationName}**`)
        .setImage(imageUrl);

      channel.send({ embeds: [embed] });

      const doneembed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`Flag updated successfully! You should see your custom flag show up on the map shortly! If you cancel your [Citizen Pass subscription](https://www.patreon.com/nonay), you could lose this custom flag on the map!`)
      .setImage(imageUrl);
  
      await interaction.reply({ embeds: [doneembed] });
    }
  });

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
  const command = await client.application?.commands.create({
      name: 'purchase',
      description: 'Purchase a items for your country',
      options: [
        {
          name: 'item',
          type: 'STRING',
          description: 'Item you want to purchase',
          required: true,
          choices: [
            {
              name: 'Forge',
              value: 'Forge'
            },
            {
              name: 'Laboratory',
              value: 'Laboratory'
            },
            {
              name: 'Uranium Enrichment Plant',
              value: 'Uranium_Enrichment_Plant'
            },
            {
              name: 'Uranium Mine',
              value: 'Uranium_Mine'
            },
            {
              name: 'Hospital Equipment',
              value: 'Advanced_Hospital_Equipment'
            },
            {
              name: 'Investment Campaign',
              value: 'Investment_Campaign'
            }
          ]
        },
        {
          name: 'nation',
          type: 'STRING',
          description: 'The name of the country',
          required: false,
          choices
        },
        {
          name: 'corporation',
          type: 'STRING',
          description: 'The name of the corporation',
          required: false
        }
      ]
  });

  console.log(`Loaded Purchase Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'purchase') {
    const selectedNation = options.getString('nation');
    const selectedCorporation = options.getString('corporation');
    const item = options.getString('item');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');

    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let entity, entities, filePath, isOwner;

    if (selectedNation) {
      entities = nations;
      entity = entities.find(ent => ent.name === selectedNation);
      filePath = 'Nations.json';
      isOwner = interaction.user.id === entity.countryOwner.id || (entity.coOwners && entity.coOwners.includes(interaction.user.id));
    } else if (selectedCorporation) {
      entities = corporations;
      entity = entities.find(ent => ent.name === selectedCorporation);
      filePath = 'Corporations.json';
      isOwner = interaction.user.id === entity.ownerId;
    }

    if (!entity) {
      return interaction.reply({ content: 'Entity not found', ephemeral: true });
    }

    if (!isOwner) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this entity!', ephemeral: true });
    }
    let cost;
    if (item === 'Forge') {
      if (entity.forgeAmount >= 10) {
        return interaction.reply({ content: `You have reached the maximum forge amount of 10!`, ephemeral: true });
      }

      cost = 250000 * Math.pow(2, entity.forgeAmount);
    } else if (item === 'Laboratory') {
      cost = 250000 * Math.pow(2, entity.labs);
    } else if (item === 'Uranium_Enrichment_Plant') {
      if (entity.uraniumPlant >= 5) {
        return interaction.reply({ content: `You have reached the maximum uranium enrichment plant amount of 5!`, ephemeral: true });
      }

      if (!entity.researched.includes('uranium enrichment')) {
        return interaction.reply({ content: `You must research uranium enrichment before you can purchase a uranium enrichment plant!`, ephemeral: true });
      }

      cost = 5000000;
    } else if (item === 'Uranium_Mine') {
      if (entity.uraniumPlant >= 1) {
        return interaction.reply({ content: `You have reached the maximum number of Uranium Mines!`, ephemeral: true });
      }

      cost = 500000;
    } else if (item === 'Advanced_Hospital_Equipment') {
      if (entity.stability > 100) {
        return interaction.reply({ content: `You have reached the max number of Hospital Equipment!`, ephemeral: true });
      }

      if (!entity.researched.includes('advanced healthcare')) {
        return interaction.reply({ content: `You must research advanced healthcare before you can purchase advanced hospital equipment!`, ephemeral: true });
      }

      cost = 500000;
    } else if (item === 'Investment_Campaign') {
      if (!entity.researched.includes('investment')) {
        return interaction.reply({ content: `You must research investment before you can pay for investment campaigns!`, ephemeral: true });
      }

      cost = 250000;
    }

    if (entity.balance < cost) {
      return interaction.reply({ content: `You don't have enough balance to purchase ${item}! You need **£${cost.toLocaleString()}**!`, ephemeral: true });
    }

    entity.balance -= cost;

    if (item === 'Forge') {
      entity.forgeAmount += 1;
    } else if (item === 'Laboratory') {
      entity.labs += 1;
    } else if (item === 'Uranium_Enrichment_Plant') {
      entity.uraniumPlant += 1;
    } else if (item === 'Uranium_Mine') {
      entity.uraniumMine += 1;
    } else if (item === 'Advanced_Hospital_Equipment') {
      entity.stability += 1;
    } else if (item === 'Investment_Campaign') {
      entity.stability += 1;
    }

    let index = entities.findIndex(ent => ent.name === entity.name);
    entities[index] = entity;

    if (selectedNation) {
      fs.writeFileSync('Nations.json', JSON.stringify(entities, null, 2));
    } else if (selectedCorporation) {
      fs.writeFileSync('Corporations.json', JSON.stringify(entities, null, 2));
    }

    const embed = new MessageEmbed()
      .setTitle(`Purchase Successful`)
      .setColor('#313338')
      .setDescription(`You have successfully purchased a ${item} for ${entity.name}. Your current balance is ${entity.balance}.`)
      .setFooter('Method Gaming Admin Panel');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map((nation) => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'tax',
    description: 'Change tax rates for your country',
    options: [
      {
        name: 'nation',
        type: 'STRING',
        description: 'Select the name of your nation',
        required: true,
        choices,
      },
      {
        name: 'tax',
        type: 'STRING',
        description: 'Select the type of tax',
        required: true,
        choices: [
          { name: 'Corporate', value: 'Corporate' },
          { name: 'Sales', value: 'Sales' },
        ],
      },
      {
        name: 'amount',
        type: 'NUMBER',
        description: 'Enter the new tax amount (percentage)',
        required: true,
      },
    ],
  });

  console.log(`Loaded Tax Command!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'tax') {
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

    const selectedNation = options.getString('nation');

    const entity = nations.find((ent) => ent.name === selectedNation);

    if (!entity || interaction.user.id !== entity.countryOwner.id && !(entity.coOwners && entity.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    const taxType = options.getString('tax');
    const taxAmount = options.getNumber('amount');

    if (isNaN(taxAmount) || taxAmount < 0 || taxAmount > 100) {
      return interaction.reply({
        content: 'Invalid tax amount! Please enter a percentage between 0 and 100!',
        ephemeral: true,
      });
    }

    if (!entity.taxes) {
      entity.taxes = [];
    }

    const taxIndex = entity.taxes.findIndex((t) => t.tax === taxType);
    if (taxIndex !== -1) {
      entity.taxes[taxIndex].amount = taxAmount;
    } else {
      entity.taxes.push({ tax: taxType, amount: taxAmount });
    }

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`Tax Rate Updated`)
      .setDescription(`The **${taxType}** tax rate for **${selectedNation}** has been set to **${taxAmount}**%!`)
      .setColor('#313338');

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  function getValidProductsForCorporation(category) {
    const categoryToProducts = {
      'Arms Manufacturer': ['AK47', 'Glock 19', 'Beretta', 'Springfield 1903', 'AR15', 'Low Caliber Ammo'],
      'Construction': ['Bricks', 'Cement'],
      'Private Military Corporation': ['Soldier'],
      'Banking Sector': ['Government Bonds'],
      'Department Store': ['Sofas', 'Tables', 'Televisions', 'Kitchen Sets'],
      'Fast Food': ['Burgers', 'Fries', 'Milkshakes', 'Hot Drinks', 'Yum Yums', 'Sausage Rolls'],
      'Automobile Manufacturer': ['Petrol Car', 'Diesel Car', 'Eco Car', 'Hydrogen Car']
    };

    return categoryToProducts[category] || [];
  }

  let corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));
  const corporationChoices = corporations.map((corp) => ({ name: corp.name, value: corp.name }));
  const addedProducts = new Set();
  const productChoices = corporations.flatMap(corp => {
    const products = getValidProductsForCorporation(corp.category);
    const uniqueProducts = products.filter(product => !addedProducts.has(product));
    uniqueProducts.forEach(product => addedProducts.add(product));
    return uniqueProducts.map(product => ({ name: product, value: product }));
  });

  const command = await client.application?.commands.create({
    name: 'products',
    description: 'Buy products for your corporation, so customers can buy them!',
    options: [
      {
        name: 'corporation',
        type: 'STRING',
        description: 'The name of your corporation',
        required: true
      },
      {
        name: 'product_name',
        type: 'STRING',
        description: 'The name of the products you want to buy',
        required: true,
        choices: [
          {
            name: 'AK47',
            value: 'AK47'
          },
          {
            name: 'Glock 19',
            value: 'Glock 19'
          },
          {
            name: 'Beretta',
            value: 'Beretta'
          },
          {
            name: 'Springfield 1903',
            value: 'Springfield 1903'
          },
          {
            name: 'Low Caliber Ammo',
            value: 'Low Caliber Ammo'
          },
          {
            name: 'Bricks',
            value: 'Bricks'
          },
          {
            name: 'Cement',
            value: 'Cement'
          },
          {
            name: 'Government Bonds',
            value: 'Government Bonds'
          },
          {
            name: 'Sofas',
            value: 'Sofas'
          },
          {
            name: 'Tables',
            value: 'Tables'
          },
          {
            name: 'Televisions',
            value: 'Televisions'
          },
          {
            name: 'Kitchen Sets',
            value: 'Kitchen Sets'
          },
          {
            name: 'Burgers',
            value: 'Burgers'
          },
          {
            name: 'Fries',
            value: 'Fries'
          },
          {
            name: 'Milkshakes',
            value: 'Milkshakes'
          },
          {
            name: 'Hot Drinks',
            value: 'Hot Drinks'
          },
          {
            name: 'Yum Yums',
            value: 'Yum Yums'
          },
          {
            name: 'Sausage Rolls',
            value: 'Sausage Rolls'
          },
          {
            name: 'Petrol Car',
            value: 'Petrol Car'
          },
          {
            name: 'Diesel Car',
            value: 'Diesel Car'
          },
          {
            name: 'Eco Car',
            value: 'Eco Car'
          },
          {
            name: 'Hydrogen Car',
            value: 'Hydrogen Car'
          },
          {
            name: 'Soldier (LVL 1)',
            value: 'Soldier'
          },
        ]
      },
      {
        name: 'quantity',
        type: 'STRING',
        description: 'The quantity of products you want to buy',
        required: true,
      }
    ]
  });

  console.log(`Loaded Products Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'products') {
    const productName = options.getString('product_name');
    const quantity = parseInt(options.getString('quantity'));
    const corporationName = options.getString('corporation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    if (quantity < 0) {
      return interaction.reply({ content: 'You cannot buy a negative amount of products!', ephemeral: true });
    }

    function getValidProductsForCorporation(category) {
      const categoryToProducts = {
        'Arms Manufacturer': ['AK47', 'Glock 19', 'Beretta', 'Springfield 1903', 'AR15', 'Low Caliber Ammo'],
        'Construction': ['Bricks', 'Cement'],
        'Private Military Corporation': ['Soldier'],
        'Banking Sector': ['Government Bonds'],
        'Private Military Corporation': ['Soldier'],
        'Department Store': ['Sofas', 'Tables', 'Televisions', 'Kitchen Sets'],
        'Fast Food': ['Burgers', 'Fries', 'Milkshakes', 'Hot Drinks', 'Yum Yums', 'Sausage Rolls'],
        'Automobile Manufacturer': ['Petrol Car', 'Diesel Car', 'Eco Car', 'Hydrogen Car']
      };
    
      return categoryToProducts[category] || [];
    }
    
    function getProductCost(productName) {
      const productToCost = {
        'Sofas': 100,
        'Tables': 50,
        'Televisions': 250,
        'Kitchen Sets': 200,
        'Burgers': 25,
        'Fries': 50,
        'Milkshakes': 25,
        'Hot Drinks': 50,
        'Yum Yums': 75,
        'Sausage Rolls': 25,
        'AK47': 750,
        'Glock 19': 500,
        'Beretta': 550,
        'Springfield 1903': 950,
        'AR15': 550,
        'Low Caliber Ammo': 500,
        'Bricks': 150,
        'Cement': 200,
        'Petrol Car': 500,
        'Diesel Car': 650,
        'Eco Car': 750,
        'Government Bonds': 2500,
        'Hydrogen Car': 950,
        'Soldier': 1000
      };
    
      return productToCost[productName] || 0;
    }

    const corporations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));
    const userCorporation = corporations.find(corp => corp.ownerId === interaction.user.id && corp.name === corporationName);

    if (!userCorporation) {
      return interaction.reply({ content: 'You are not the owner of the specified corporation or the corporation does not exist!' });
    }

    const validProducts = getValidProductsForCorporation(userCorporation.category);

    if (!validProducts.includes(productName)) {
      return interaction.reply({ content: 'You cannot buy this product for your corporation!' });
    }

    const productCost = getProductCost(productName);
    const totalCost = productCost * quantity;

    if (userCorporation.balance < totalCost) {
      return interaction.reply({ content: 'Not enough funds in your corporation to make this purchase!' });
    }

    userCorporation.balance -= totalCost;

    const inventoryIndex = userCorporation.inventory.findIndex(item => item.name === productName);
    if (inventoryIndex !== -1) {
      userCorporation.inventory[inventoryIndex].quantity += quantity;
    } else {
      userCorporation.inventory.push({
        name: productName,
        quantity: quantity
      });
    }

    fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));
    const embed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`**${quantity}** **${productName}**(s) were successfully purchased!`);

    return interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'war',
      description: 'Declare war on a nation',
      options: [
        {
          name: 'attackers',
          type: 'STRING',
          description: 'The name of the attacking country',
          required: true,
          choices
        },
        {
          name: 'defenders',
          type: 'STRING',
          description: 'The name of the defending country',
          required: true,
          choices
        },
      ]
  });

  console.log(`Loaded War Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'war') {
    const yourCountryName = options.getString('attackers');
    const targetCountryName = options.getString('defenders');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

    const yourCountry = nations.find(nation => nation.name === yourCountryName);
    const targetCountry = nations.find(nation => nation.name === targetCountryName);

    if (!yourCountry || !targetCountry) {
      return interaction.reply({ content: 'One or both of the countries do not exist!', ephemeral: true });
    }

    if (!yourCountry || interaction.user.id !== yourCountry.countryOwner.id && !(yourCountry.coOwners && yourCountry.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (yourCountry.enemies.includes(targetCountryName)) {
      return interaction.reply({ content: 'You are already at war with this country!', ephemeral: true });
    }

    yourCountry.enemies.push(targetCountryName);
    targetCountry.enemies.push(yourCountryName);

    const rconClient = await Rcon.connect({
      host: 'IP HERE',
      port: 25564,
      password: 'PASSWORD HERE',
      username: 'Nonay'
    });

    const response = await rconClient.send(`title @a actionbar "§c§l${yourCountryName} declared war on ${targetCountryName}!"`);

    const announcement = new MessageEmbed()
    .setColor('#313338')
    .setDescription(`**${yourCountryName}** declared war on **${targetCountryName}**!`);
   
    const hangout = client.channels.cache.get('871949535105142804');
    hangout.send({ embeds: [announcement] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`**${yourCountryName}** declared war on **${targetCountryName}**!`);

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'peace',
      description: 'Announce peace upon a nation',
      options: [
        {
          name: 'you',
          type: 'STRING',
          description: 'The name of your country',
          required: true,
          choices
        },
        {
          name: 'target',
          type: 'STRING',
          description: 'The name of the target country',
          required: true,
          choices
        },
      ]
  });

  console.log(`Loaded Peace Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'peace') {
    const yourCountryName = options.getString('you');
    const targetCountryName = options.getString('target');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

    const yourCountry = nations.find(nation => nation.name === yourCountryName);
    const targetCountry = nations.find(nation => nation.name === targetCountryName);

    if (!yourCountry || !targetCountry) {
      return interaction.reply({ content: 'One or both of the countries do not exist!', ephemeral: true });
    }

    if (!yourCountry || interaction.user.id !== yourCountry.countryOwner.id && !(yourCountry.coOwners && yourCountry.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (!yourCountry.enemies.includes(targetCountryName)) {
      return interaction.reply({ content: 'You are not at war with this country!', ephemeral: true });
    }

    if (!yourCountry.peaceReq.includes(targetCountryName)) {
      yourCountry.peaceReq.push(targetCountryName);
    }

    if (yourCountry.peaceReq.includes(targetCountryName) && targetCountry.peaceReq.includes(yourCountryName)) {
      yourCountry.enemies = yourCountry.enemies.filter(enemy => enemy !== targetCountryName);
      targetCountry.enemies = targetCountry.enemies.filter(enemy => enemy !== yourCountryName);
      yourCountry.peaceReq = yourCountry.peaceReq.filter(req => req !== targetCountryName);
      targetCountry.peaceReq = targetCountry.peaceReq.filter(req => req !== yourCountryName);

      const rconClient = await Rcon.connect({
        host: 'IP HERE',
        port: 25564,
        password: 'PASSWORD HERE',
        username: 'Nonay'
      });

      const announcement = new MessageEmbed()
        .setColor('#313338')
        .setDescription(`**${yourCountryName}** and **${targetCountryName}** have made peace!`);

       const hangout = client.channels.cache.get('871949535105142804');
       hangout.send({ embeds: [announcement] });

      const embed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`**${yourCountryName}** and **${targetCountryName}** have made peace!`);

      const response = await rconClient.send(`title @a actionbar "§3§l${yourCountryName} made peace with ${targetCountryName}!"`);
      await interaction.reply({ embeds: [embed] });
    } else {
      const announcement = new MessageEmbed()
        .setColor('#313338')
        .setDescription(`**${yourCountryName}** has sent a peace request to **${targetCountryName}**!`);
        const response = await rconClient.send(`title @a actionbar "§3§l${yourCountryName} sent a peace request to ${targetCountryName}!"`);

      const hangout = client.channels.cache.get('871949535105142804');
      hangout.send({ embeds: [announcement] });

      const embed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`**${yourCountryName}** has sent a peace request to **${targetCountryName}**!`);

      const response2 = await rconClient.send(`title @a actionbar "§3§l${yourCountryName} sent a peace request to ${targetCountryName}!"`);
      await interaction.reply({ embeds: [embed] });
    }

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'trade',
      description: 'Trade with any nation',
      options: [
        {
          name: 'your_nation',
          type: 'STRING',
          description: 'The nation sending the item/vehicle',
          required: true,
          choices
        },
        {
          name: 'target_nation',
          type: 'STRING',
          description: 'The nation receiving the item/vehicle',
          required: true,
          choices
        },
        {
          name: 'value',
          type: 'STRING',
          description: 'The value of one item/vehicle within this trade',
          required: true,
        },
        {
          name: 'quantity',
          type: 'STRING',
          description: 'The quantity of the item(s)/vehicle(s) you are trading',
          required: true,
        },
        {
          name: 'location',
          type: 'STRING',
          description: 'Location of the traded item (checked by staff)',
          required: true,
        },
        {
          name: 'item',
          type: 'STRING',
          description: 'The item name',
          required: true,
        },
        {
          name: 'incoming_request',
          type: 'STRING',
          description: 'Are you accepting an incoming request?',
          required: true,
          choices: [
            {
              name: 'True',
              value: 'True'
            },
            {
              name: 'False',
              value: 'False'
            }
          ]
        },
      ]
  });

  console.log(`Loaded Trade Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'trade') {
    const itemValue = parseFloat(options.getString('value'));
    const itemQuantity = parseInt(options.getString('quantity'));
    const tradeProof = options.getString('location');
    const item = options.getString('item');
    const targetNationName = options.getString('target_nation');
    const yourNationName = options.getString('your_nation');
    const incomingRequest = options.getString('incoming_request');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    const yourNation = nations.find(nation => nation.name === yourNationName);
    const targetNation = nations.find(nation => nation.name === targetNationName);

    if (yourNationName === targetNationName) {
      return interaction.reply({ content: 'You cannot engage in trade with yourself!', ephemeral: true });
    }

    if (itemQuantity > 999) {
      return interaction.reply({ content: 'Trade quantity cannot be above **999**!', ephemeral: true });
    }

    if (itemValue > 1000000) {
      return interaction.reply({ content: 'Trade value cannot be above **1,000,000**!', ephemeral: true });
    }

    if (itemValue < 1) {
      return interaction.reply({ content: 'Trade value cannot be below **1**!', ephemeral: true });
    }

    if (itemQuantity < 1) {
      return interaction.reply({ content: 'Trade quantity cannot be below **1**!', ephemeral: true });
    }

    if (!yourNation || !targetNation) {
      return interaction.reply({ content: 'One or both of the nations do not exist!', ephemeral: true });
    }

    if (!yourNation || interaction.user.id !== yourNation.countryOwner.id && !(yourNation.coOwners && yourNation.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (incomingRequest === 'True') {
      const incomingTradeRequest = targetNation.tradeReq && targetNation.tradeReq.find(req => req.targetNation === yourNationName && req.item === item);

      if (!incomingTradeRequest) {
        return interaction.reply({ content: `There is no incoming trade request from ${yourNationName} for ${item}!`, ephemeral: true });
      }

      const numericItemValue = parseFloat(incomingTradeRequest.value);
      const numericItemQuantity = parseInt(incomingTradeRequest.quantity);
      const totalTradeValue = numericItemValue * numericItemQuantity;

      const rconClient = await Rcon.connect({
        host: 'IP HERE',
        port: 25564,
        password: 'PASSWORD HERE',
        username: 'Nonay'
      });

      const logEmbed = new MessageEmbed()
      .setColor('#313338')
      .setTitle('Trade Accepted')
      .setDescription(`Action By: **${interaction.user.username}**\nNation Receiving ${incomingTradeRequest.item}: **${yourNationName}**\nNation Sending ${incomingTradeRequest.item}: **${targetNationName}**\nValue: **${incomingTradeRequest.value}**\nQuantity: **${incomingTradeRequest.quantity}**\nItem: **${incomingTradeRequest.item}**\nLocation: **${incomingTradeRequest.location}**`);
    
      const response = await rconClient.send(`title @a actionbar "§6§l${yourNationName} accepted trade with ${targetNationName}!"`);

      const publicEmbed = new MessageEmbed()
        .setColor('#313338')
        .setDescription(`Trade between **${yourNationName}** and **${targetNationName}** for ${item} has been initiated`);

      const logChannel = client.channels.cache.get('1201235661081038929');
      const announcementChannel = client.channels.cache.get('871949535105142804');
      logChannel.send({ embeds: [logEmbed] });
      announcementChannel.send({ embeds: [publicEmbed] });

      targetNation.balance += totalTradeValue;
      targetNation.gdp += totalTradeValue;
      targetNation.investors += itemQuantity;
      targetNation.tradeReq = targetNation.tradeReq.filter(req => req !== incomingTradeRequest);

      if (yourNation.balance >= totalTradeValue) {
        yourNation.balance -= totalTradeValue;
      } else {
        const deficit = totalTradeValue - yourNation.balance;
        yourNation.debt += deficit;
        yourNation.gdp += deficit;
        yourNation.investors += itemQuantity;
        yourNation.balance = 0;
      }
      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
      await interaction.reply({ content: `Trade for ${item} has been accepted!\n\n# NOTE\nStaff will ensure that this transaction has taken place by checking logs, checking the location, and checking storage containers. If this activity is fraudulent, you could be charged!`, ephemeral: true });
    }

    if (incomingRequest === 'False') {
      if (yourNation.tradeReq && yourNation.tradeReq.some(req => req.targetNation === targetNationName && req.item === item)) {
        return interaction.reply({ content: `You have already sent a trade request to ${targetNationName} for ${item}!`, ephemeral: true });
      }

      const tradeRequest = {
        targetNation: targetNationName,
        item: item,
        value: itemValue,
        quantity: itemQuantity,
        location: tradeProof,
        status: 'pending'
      };

      if (!yourNation.tradeReq) {
        yourNation.tradeReq = [];
      }
      yourNation.tradeReq.push(tradeRequest);

      const publicEmbed = new MessageEmbed()
        .setColor('#313338')
        .setDescription(`**${yourNationName}** has requested to trade ${item} with **${targetNationName}**`)
        .addFields(
          { name: 'Item Name', value: `${item}` },
          { name: `1 ${item} Value`, value: `£${itemValue.toLocaleString()} (per)` },
          { name: `${item} Quantity`, value: `${itemQuantity.toLocaleString()}` }
        );

        const rconClient = await Rcon.connect({
          host: 'IP HERE',
          port: 25564,
          password: 'PASSWORD HERE',
          username: 'Nonay'
        });  

      const response = await rconClient.send(`title @a actionbar "§6§l${yourNationName} sent a trade request to ${targetNationName}!"`);
      const announcementChannel = client.channels.cache.get('871949535105142804');
      announcementChannel.send({ embeds: [publicEmbed] });
    
      const privateEmbed = new MessageEmbed()
        .setColor('#313338')
        .setDescription(`Trade request for ${item} sent!\n\n# NOTE\nStaff will ensure that this transaction has taken place by checking logs, checking the location, and checking storage containers. If this activity is fraudulent, you could be charged!`)
        .addFields(
          { name: 'Item Name', value: `${item}` },
          { name: `1 ${item} Value`, value: `£${itemValue.toLocaleString()} (per)` },
          { name: `${item} Quantity`, value: `${itemQuantity.toLocaleString()}` }
        );

      fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
      await interaction.reply({ embeds: [privateEmbed], ephemeral: true });
    }
  }
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
      name: 'aid',
      description: 'Send aid to a nation',
      options: [
        {
          name: 'your_nation',
          type: 'STRING',
          description: 'The name of your country',
          required: true,
          choices
        },
        {
          name: 'target_nation',
          type: 'STRING',
          description: 'The name of the target country',
          required: true,
          choices
        },
        {
          name: 'value',
          type: 'STRING',
          description: 'The amount you are sending to the target nation',
          required: true,
        },
      ]
  });

  console.log(`Loaded Aid Files!`);
});

const aidCooldowns = new Map();

function isOnCooldown(userId) {
  return aidCooldowns.has(userId);
}

function setCooldown(userId) {
  aidCooldowns.set(userId, true);
  setTimeout(() => {
    aidCooldowns.delete(userId);
  }, 24 * 60 * 60 * 1000);
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'aid') {
    const aidValue = parseFloat(options.getString('value'));
    const targetNationName = options.getString('target_nation');
    const yourNationName = options.getString('your_nation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    if (isOnCooldown(interaction.user.id)) {
      return interaction.reply({ content: 'You can only send aid once every 24 hours!', ephemeral: true });
    }

    if (aidValue < 0) {
      return interaction.reply({ content: 'You cannot send a negative amount of aid!', ephemeral: true });
    }

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    const yourNation = nations.find(nation => nation.name === yourNationName);
    const targetNation = nations.find(nation => nation.name === targetNationName);

    if (yourNationName === targetNationName) {
      return interaction.reply({ content: 'You cannot send aid to yourself!', ephemeral: true });
    }

    if (!yourNation || !targetNation) {
      return interaction.reply({ content: 'One or both of the nations do not exist!', ephemeral: true });
    }

    if (!yourNation || interaction.user.id !== yourNation.countryOwner.id && !(yourNation.coOwners && yourNation.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }

    if (aidValue > 5000000) {
      return interaction.reply({ content: 'You cannot send more than £5,000,000 in aid!', ephemeral: true });
    }

    const totalAidValue = Math.min(aidValue, yourNation.balance);

    yourNation.balance -= totalAidValue;
    targetNation.balance += totalAidValue;
    setCooldown(interaction.user.id);

    const publicEmbed = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`**${yourNationName}** has sent **£${totalAidValue.toLocaleString()}** in economic aid to **${targetNationName}**`);

    const announcementChannel = client.channels.cache.get('871949535105142804');
    announcementChannel.send({ embeds: [publicEmbed] });

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    await interaction.reply({ content: `You sent ${totalAidValue.toLocaleString()} to the target country!`, ephemeral: true });
  }
});

const researchOptions = [
  { name: 'Nuclear Weaponry', value: 'nuclear weaponry', cost: 5000 },
  { name: 'Nuclear Energy', value: 'nuclear energy', cost: 2500 },
  { name: 'Uranium Enrichment', value: 'uranium enrichment', cost: 250 },
  { name: 'Advanced Healthcare', value: 'advanced healthcare', cost: 150 },
  { name: 'Military Equipment', value: 'military equipment', cost: 100 },
  { name: 'Naval Warfare', value: 'marine warfare', cost: 100 },
  { name: 'Automated Security', value: 'automated security', cost: 100 },
  { name: 'Aviation', value: 'aviation', cost: 250 },
  { name: 'Skyscrapers', value: 'skyscrapers', cost: 25 },
  { name: 'Improved Roads', value: 'improved roads', cost: 50 },
  { name: 'Investment Interests', value: 'investment', cost: 10 },
  { name: 'Ammunition', value: 'ammunition', cost: 5 },
  { name: 'Civilian Goods', value: 'civilian goods', cost: 2 },
];

client.once('ready', async () => {
const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
client.application?.commands.create({
  name: 'research',
  description: 'Research a new technology for your country',
  options: [
    {
      name: 'nation',
      type: 'STRING',
      description: 'The name of your nation',
      required: true,
      choices
    },
    {
      name: 'technology',
      type: 'STRING',
      description: 'The technology you want to research',
      required: true,
      choices: researchOptions.map(option => ({ name: option.name, value: option.value })),
    },
  ],
});
console.log(`Loaded Research Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'research') return;

  const selectedNation = interaction.options.getString('nation');
  const selectedTechnology = interaction.options.getString('technology');
  const researchOption = researchOptions.find(option => option.value === selectedTechnology);
  const member = interaction.guild.members.cache.get(interaction.user.id);
  const role = member.roles.cache.get('1193603041128108142');
  if (!role) {
    return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
  }

  const nation = nations.find(nation => nation.name === selectedNation);
  if (!nation) {
    return interaction.reply(`Nation ${selectedNation} not found`);
  }

  if (!nation || interaction.user.id !== nation.countryOwner.id && !(nation.coOwners && nation.coOwners.includes(interaction.user.id))) {
    return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
  }

  if (nation.researched.includes(selectedTechnology)) {
    return interaction.reply({ content: `You have already researched ${selectedTechnology}!`, ephemeral: true });
  }

  if (nation.researchPoints < researchOption.cost) {
    return interaction.reply({ content: `You don't have enough research points to research ${selectedTechnology}, you need at least ${researchOption.cost.toLocaleString()} research points!`, ephemeral: true });
  }

  nation.researchPoints -= researchOption.cost;
  nation.researched.push(selectedTechnology);

  const logEmbed = new MessageEmbed()
  .setColor('#313338')
  .setTitle(`Researched New Technology`)
  .setDescription(`Action By: **${interaction.user.username}**\nResearched Item: **${selectedTechnology}**`);

  const logChannel = client.channels.cache.get('871949535688130632');
  logChannel.send({ embeds: [logEmbed] });

 const announcement = new MessageEmbed()
 .setColor('#313338')
 .setDescription(`**${selectedNation}** has researched **${selectedTechnology}**!`);

 const hangout = client.channels.cache.get('871949535105142804');
 hangout.send({ embeds: [announcement] });

  let index = nations.findIndex(n => n.name === selectedNation);
  nations[index] = nation;
  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

  const embed = new MessageEmbed()
  .setTitle(`Researched New Technology`)
  .setColor('#313338')
  .setDescription(`You have successfully researched **${selectedTechnology}**!`);

await interaction.reply({ embeds: [embed] });
});

client.once('ready', async () => {
  const choices = nations.map(nation => ({ name: nation.name, value: nation.name }));
  const command = await client.application?.commands.create({
    name: 'construct',
    description: 'Submit a construction request for a specific nation',
    options: [
      {
        name: 'nation',
        type: 'STRING',
        description: 'Specify the nation for the construction project',
        required: true,
        choices
      },
      {
        name: 'project_name',
        type: 'STRING',
        description: 'Name your project',
        required: true,
      },
      {
        name: 'category',
        type: 'STRING',
        description: 'What is the category of this project?',
        required: true,
        choices: [
          { name: 'Military', value: 'military' },
          { name: 'Education', value: 'education' },
          { name: 'Transport', value: 'transport' },
          { name: 'Commercial', value: 'commercial' },
          { name: 'Residential', value: 'residential' },
          { name: 'Industrial', value: 'industrial' },
          { name: 'Zombies/Items Spawns', value: 'zombieitemspawns' },
        ],
      },
      {
        name: 'image_url',
        type: 'STRING',
        description: 'Provide a link to a plan of the structures',
        required: true,
      }
    ],
  });

  console.log(`Loaded Construct Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'construct') {
    const projectName = options.getString('project_name');
    const projectCategory = options.getString('category');
    const projectImage = options.getString('image_url');
    const nationName = options.getString('nation');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = member.roles.cache.get('1193603041128108142');
    if (!role) {
      return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
    }

    const buildingCosts = {
      'residential': 1000000,
      'commercial': 2000000,
      'industrial': 3000000,
      'military': 5000000,
      'education': 2500000,
      'transport': 2000000,
      'zombieitemspawns': 25000,
    };

    let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));
    let nation = nations.find(n => n.name === nationName);

    if (!nation) {
      return interaction.reply({ content: 'Nation not found!', ephemeral: true });
    }

    if (!nation || interaction.user.id !== nation.countryOwner.id && !(nation.coOwners && nation.coOwners.includes(interaction.user.id))) {
      return interaction.reply({ content: 'You are not the registered owner or a co-owner of this nation!', ephemeral: true });
    }
    const cost = buildingCosts[projectCategory];

    if (nation.balance < cost) {
      return interaction.reply({ content: `Insufficient funds! You need **${cost.toLocaleString()}** to construct this project!`, ephemeral: true });
    }

    nation.balance -= cost;

    fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));

    const embed = new MessageEmbed()
      .setTitle(`Project Construction Started`)
      .setColor('#313338')
      .setDescription(`**${nationName}** has started a **${projectCategory}** project named **${projectName}**`)
      .setFooter(`Total Charge: ${cost.toLocaleString()}`);

      const embed1 = new MessageEmbed()
      .setColor('#313338')
      .setDescription(`**${nationName}** has started a **${projectCategory}** construction project named **${projectName}**, worth **${cost.toLocaleString()}**`);

      const embed2 = new MessageEmbed()
      .setColor('#313338')
      .setTitle(`Project Construction Requested`)
      .setDescription(`Nation: **${nationName}**\nProject Category: **${projectCategory}**\n Project Name: **${projectName}**\nProject Image Link: **${projectImage}**\nTotal Charge: **${cost.toLocaleString()}**`);

      const logChannel = client.channels.cache.get('1201235661081038929');
      const announcement = client.channels.cache.get('871949535105142804');
      logChannel.send({ embeds: [embed2] });
      announcement.send({ embeds: [embed1] });
    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  client.application?.commands.create({
    name: 'website',
    description: 'Search for a website (based on search results)!',
    options: [
      {
        name: 'query',
        type: 'STRING',
        description: 'Enter your search query',
        required: true
      }
    ]
  });
  console.log(`Loaded Website Search Files!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName, options } = interaction;

  if (commandName === 'website') {
    let query = options.getString('query');
    let websites = {
      'www.hsbc.com': {
        title: 'HSBC',
        description: 'Together we thrive\n\n**NOTICE**\nDue to the cost of living crisis, our interest rates on loans are lower than ever!\n\n[Contact Us](https://discord.gg/FUvEgjtsrd)\n\n[Open an Account](https://discord.gg/FUvEgjtsrd)',
      },
    };

    let results = Object.keys(websites).filter(website =>
      website.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
      for (let result of results) {
        let embed = new MessageEmbed()
          .setTitle(websites[result].title)
          .setDescription(websites[result].description);

        await interaction.reply({ embeds: [embed] });
      }
    } else {
      await interaction.reply('No results found.');
    }
  }
});

client.once('ready', async () => {
client.application?.commands.create({
  name: 'terminal',
  description: 'Your very own computer terminal for all your computer needs!',
  options: [
    {
      name: 'console',
      type: 'STRING',
      description: 'Enter your command',
      required: true
    }
  ]
});
console.log(`Loaded Terminal Files!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'terminal') {
    let input = interaction.options.getString('console');
    let embed;

    switch (input) {
      case 'entry.0a':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('TRANSCRIPT')
          .setDescription('<t:-761425200:F>\n```Is this thing on? Is it on?\n\nYeah\n\nSo it can hear me?\n\nYeah! And to stop it just click this button\n\n[CONNECTION ENDED]```');
        break;
      case 'entry.0b':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('TRANSCRIPT')
          .setDescription('<t:-761423100:F>\n```So the time is 5:35 AM, 15th of November, 1945. Me and my grandson, Tyler, are going to leave the house tonight to track down the weird noises we have been hearing late at night.\n\nAnything else?\n\nOh and it is most definitely a pack of coyotes\n\nPaps I have told you, coyotes don\'t make that screaming noise.\n\n[CONNECTION ENDED]```');
        break;
      case 'entry.0c':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('TRANSCRIPT')
          .setDescription('<t:-761408040:F>\n```TYLER WHAT EVER THAT WAS, IT WAS NO HUMAN. IT WAS A MONSTER TYLER. A MONSTER!\n\nPaps we can\'t afford-\n\nWE ARE LEAVING TONIGHT I DONT CARE HOW MUCH IT MAY COST US.\n\n[CONNECTION ENDED]```');
        break;
      case 'entry.0d':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('TRANSCRIPT')
          .setDescription('<t:-761405940:F>\n```Paps?? Paps? WHAT HAVE I DONE.\n\nI was only trying to help.\n\n[POLICE SIREN]\n\n[CONNECTION ENDED]```');
        break;
      case 'entry.0e_she_made_me_do_it':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('TRANSCRIPT')
          .setDescription('<t:-761405580:F>\n```OPEN THE DOOR\n\nI wont. I can\'t. Not after what I\'ve done.\n\nOPEN THE DOOR OR WE WILL COME IN BY FOR-\n\n[GUN SHOTS]\n\nShe made me do it.\n\n[CONNECTION ENDED]```');
        break;
      case 'news.murder_in_oskars_farm':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('VBC NEWS - TRANSCRIPT')
          .setDescription('<t:-761369400:F>\n```Breaking news, 2 police officers and 1 elderly man have been found dead inside the family owned farm house belonging to the elderly man, Michael Oskar, a world-renowned farmer, best known for his amazing quality berries in the area. Much to the locals surprise, police have not released any further details of the incident, which locals in the area have described as "unusual".\n\n[CONNECTION ENDED]```');
        break;
      case 'case.michael_oskar':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('CASE FILE')
          .setDescription('<t:-761318700:F>\n```- Investigation Name: Murder of Michael Oskar\n- Date and Time of Arrival: 16/11/1945, 10:35:42 GMT\n- Location: Oskar\'s Farm, Germany, Peacia\n- Initial Observations: All three corpses had 666 gun shot wounds in total, some shot beyond recognition, two of the officers appear to be pointing at the woods.\n- Autopsy: Autopsy shows heart and lungs missing from the three bodies recovered, Michael Oskar had his face swapped and sowed onto an officer\'s face (ill intent, not self defence, no signs of guilt)\n\nUPDATE: THE C.U.B.E FOUNDATION HAS TAKEN THE CASE OVER FROM HERE```');
        break;
      case 'www.cube.gov':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('WEBSITE (www.cube.gov)')
          .setDescription('Here at C.U.B.E we prioritise the safety of our citizens over cost and income, ensuring civilians stay safe. We are the Contain, Uniform, Breach and Evacuate foundation.\n\n**Home**\n**About Us**\n**Contact**\n**Public Information Act**');
        break;
      case 'entry.0f_tyler_oskar_interview':
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('TRANSCRIPT')
          .setDescription('<t:-761318700:F>\n```Let\'s just get into it because both you and I know who did it. Why did you do it Tye.\n\nShe made me do it.\n\nWho made you do it Tye\n\nit.\n\nWho is it? You killed your grandpa over this. Do you not even have the tiniest bit of remorse? Great to know I\'m speaking to myself. Are you going to answer me or are you going to keep staring at that corner.\n\nShhh she wants to tell me something.\n\nScrew this we will try again in the evening.\n\n[CONNECTION ENDED]```');
        break;
      default:
        embed = new MessageEmbed()
          .setColor('#313338')
          .setTitle('Error')
          .setDescription('Command invalid or corrupted.');
    }

    await interaction.reply({ embeds: [embed] });
  }
});

client.once('ready', async () => {
  client.application?.commands.create({
    name: 'reward-sync',
    description: 'Enter a valid key to redeem a reward!',
    options: [
      {
        name: 'key',
        type: 'STRING',
        description: 'Enter a valid giftcard key!',
        required: true
      }
    ]
  });
  console.log(`Loaded Reward-Sync Files!`);
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
  
    const { commandName, options } = interaction;
  
    if (commandName === 'reward-sync') {
      let input = interaction.options.getString('key');
      let embed;
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const role = member.roles.cache.get('1193603041128108142');
      if (!role) {
        return interaction.reply({ content: 'You must create a Nonay account to use this command! Register by executing ``/register`` and creating your account in <#871949535348396092>!', ephemeral: true });
      }
      const guild = interaction.guild;
      const roleID = '871949534794760253';

      switch (input) {
            case 'FAF0-NAM1-R871':

            member.roles.add(roleID)
              embed = new MessageEmbed()
                .setColor('#313338')
                .setTitle('Premium Reward Redeemed!')
                .setDescription('You redeemed a reward for **Citizen Pass**, your rewards have been activated on your account and you will begin to see them take effect in 24 hours\n\n# Details\nType: **Citizen Pass**\nSubscription Time: **1 Month**\nCost: **2.99 GBP**');
              break;
        default:
          embed = new MessageEmbed()
            .setColor('#f86e01')
            .setTitle('Error')
            .setDescription('Key invalid or expired');
      }
  
      await interaction.reply({ embeds: [embed] });
    }
  });

const deeds = {
  'House': 5000,
  'Mansion': 25000,
  'Hangar': 25000,
  'Shop': 50000,
  'Office': 50000,
  'Factory': 100000,
  'Additional': 150000
};

// Deed Money Received
cron.schedule('0 */8 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

  for (let nation of nations) {
    if (nation.activeDeeds !== 'None') {
      for (let deed of nation.activeDeeds) {
        if (deeds[deed]) {
          nation.balance += deeds[deed];
        }
      }
    }
  }

  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
});

// Currency Value Inactivity Inflation
cron.schedule('0 */4 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

  for (let nation of nations) {
    let currencyValue = parseFloat(nation.currencyValue);
    currencyValue -= 0.01;
    nation.currencyValue = currencyValue.toFixed(2);
  }

  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
});

// Debt Interest Rates
cron.schedule('0 */4 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

  for (let nation of nations) {
    if (nation.debt > 0) {
      nation.debt *= 1.05;
    }
  }

  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
});

// Debt Interest Rates (Corporation)
cron.schedule('0 */2 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Corporations.json', 'utf-8'));

  for (let nation of nations) {
    if (nation.debt > 0) {
      nation.debt *= 1.05;
    }
  }

  fs.writeFileSync('Corporations.json', JSON.stringify(nations, null, 2));
});

// GDP Inactivity Ticks
cron.schedule('0 */8 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

  for (let nation of nations) {
    if (nation.gdp > 0) {
      nation.gdp -= 100492;
    }
  }

  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
});

// Currency Value <1.00 Then Tick the Stabiliy Down by 1% Every Given Time
cron.schedule('0 */4 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

  for (let nation of nations) {
    if (nation.currencyValue < 1.00) {
      nation.stability *= 0.99;
    }
  }

  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
});

// Decrease Investors Every 4 Hours and Add Currency Value
cron.schedule('0 */4 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

  for (let nation of nations) {
    const investorsToRemove = Math.min(nation.investors, 100);
    nation.investors -= investorsToRemove;

    if (nation.investors > 0) {
    switch (nation.ideology) {
      case 'Fascist':
        nation.currencyValue += (nation.investors >= 100) ? 0.01 : 0.01;
        break;
      case 'Communist':
        nation.currencyValue += (nation.investors >= 100) ? 0.02 : 0.01;
        break;
      case 'Democratic':
        nation.currencyValue += (nation.investors >= 100) ? 0.05 : 0.01;
        break;
      default:
        nation.currencyValue += 0.01;
        break;
    }
  }
  }
  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
});

// Lab Adding Research Points Every 1 Hours
cron.schedule('0 */1 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

  for (let nation of nations) {
    if (nation.labs > 0) {
      nation.researchPoints += nation.labs;
    }
  }

  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
});

// Uranium Mine Adding 1 Uranium Every 5 Hours
cron.schedule('0 */6 * * *', () => {
  let nations = JSON.parse(fs.readFileSync('Nations.json', 'utf-8'));

  for (let nation of nations) {
    if (nation.labs > 0) {
      nation.uranium += 1 * nation.uraniumMine;
    }
  }

  fs.writeFileSync('Nations.json', JSON.stringify(nations, null, 2));
});

cron.schedule('0 * * * *', () => {
  console.log('Cron job started');

  const maxHourlyIncome = 250000;

  corporations.forEach((corporation) => {
    console.log('Processing corporation:', corporation.name);

    const additionalConsumption = 0.5;

    if (corporation.customers === 0 && corporation.inventory.length > 0) {
      corporation.customers = 1;
    } else if (corporation.inventory.length === 0) {
      console.log('No inventory for', corporation.name);
      corporation.customers = Math.ceil(corporation.customers * 1.25);
    } else {
      corporation.customers = Math.ceil(corporation.customers * 1.01);

      for (let i = corporation.inventory.length - 1; i >= 0; i--) {
        const product = corporation.inventory[i];

        if (product.quantity > 0) {
          product.quantity -= additionalConsumption;

          if (product.quantity <= 0) {
            console.log('Removing item:', product.name);
            corporation.inventory.splice(i, 1);
          }

          const productName = product.name;
          const productCost = getProductCost(productName);

          let totalProductIncome = 0.0001 * corporation.customers * productCost;

          if (totalProductIncome > maxHourlyIncome) {
            console.log('Income exceeds maximum, adding 250k to balance');
            totalProductIncome = maxHourlyIncome;
          }

          corporation.balance += totalProductIncome;
        }
      }
    }
  });

  fs.writeFileSync('Corporations.json', JSON.stringify(corporations, null, 2));
});

function getProductCost(productName) {
  const productToCost = {
    'Sofas': 100,
    'Tables': 50,
    'Televisions': 250,
    'Kitchen Sets': 200,
    'Burgers': 25,
    'Fries': 50,
    'Milkshakes': 25,
    'Hot Drinks': 50,
    'Yum Yums': 75,
    'Sausage Rolls': 25,
    'AK47': 750,
    'Glock 19': 500,
    'Beretta': 550,
    'Springfield 1903': 950,
    'AR15': 550,
    'Low Caliber Ammo': 500,
    'Bricks': 150,
    'Cement': 200,
    'Petrol Car': 500,
    'Diesel Car': 650,
    'Eco Car': 750,
    'Government Bonds': 2500,
    'Hydrogen Car': 950,
    'Soldier': 1000
  };

  return productToCost[productName] || 0;
}

client.on('ready', () => {
    client.user.setActivity('Method Gaming', { type: 'PLAYING' });
  });

client.login(token);