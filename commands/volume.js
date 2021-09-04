const {GuildMember} = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'set bot volume',
    options: [
        {
          name: 'volume',
          type: 4, //'INTEGER' Type
          description: 'The number of volume',
          required: true,
        },
      ],
    async execute(interaction, player) {
      if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
        return void interaction.reply({
          content: 'You are not in a voice channel!',
          ephemeral: true,
        });
      }
  
      if (
        interaction.guild.me.voice.channelId &&
        interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
      ) {
        return void interaction.reply({
          content: 'You are not in my voice channel!',
          ephemeral: true,
        });
      }

      await interaction.deferReply();
      const queue = player.getQueue(interaction.guildId);
      if (!queue || !queue.playing) return void interaction.followUp({content: '❌ | No music is being played!'});

      const vol = interaction.options.get('volume').value;

      if (!vol) return void interaction.followUp({ content: `🎧 | Current volume is **${queue.volume}**%!` });
      if ((vol) < 0 || (vol) > 100) return void interaction.followUp({ content: "❌ | Volume range must be 0-100" });
      const success = queue.setVolume(vol);
      return void interaction.followUp({
        content: success ? `✅ | Volume set to **${vol}%**!` : "❌ | Something went wrong!"
      });
    },
  };
  