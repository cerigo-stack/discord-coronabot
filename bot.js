let Discord = require('discord.io');
let logger = require('winston');
let auth = require('./auth.json');
const covid = require('novelcovid');
let g_specificCountry;
var bot = new Discord.Client({token: auth.token,autorun: true});


async function corona_stats (message) {
   g_specificCountry = await covid.getCountry({country: message});
};

class message_editing{
	constructor(){
		this.msg="";
	}
	categories = require("./categories.json");
	koreanames=["North Korea","Best Korea","north korea","North korea","north Korea","dprk","DPRK","Best korea","best Korea","best korea"];

	add_space(){
		this.msg+=" ";
	}
	
	insert_flag_emoji(){
		this.msg+= ":flag_um:"	
	}

	end_line(){
		this.msg+="\n";	
	}

	add_cases(){
		this.msg+=this.categories.cases;
		this.add_space();
		this.msg+=g_specificCountry.cases;
		this.end_line();
	}
	add_todayCases(){
		this.msg+=this.categories.todayCases;
		this.add_space();
		this.msg+=g_specificCountry.todayCases;
		this.end_line();
	}
	add_deaths(){
		this.msg+=this.categories.deaths;
		this.add_space();
		this.msg+=g_specificCountry.deaths;
		this.end_line();
	}
	add_todayDeaths(){
		this.msg+=this.categories.todayDeaths;
		this.add_space();
		this.msg+=g_specificCountry.todayDeaths;
		this.end_line();
	}
	add_recovered(){
		this.msg+=this.categories.recovered;
		this.add_space();
		this.msg+=g_specificCountry.recovered;
		this.end_line();
	}
	add_active(){
		this.msg+=this.categories.active;
		this.add_space();
		this.msg+=g_specificCountry.active;
		this.end_line();
	}
	add_critical(){
		this.msg+=this.categories.critical;
		this.add_space();
		this.msg+=g_specificCountry.critical;
		this.end_line();
	}
	add_casesPerOneMillion(){
		this.msg+=this.categories.casesPerOneMillion;
		this.add_space();
		this.msg+=g_specificCountry.casesPerOneMillion;
		this.end_line();
	}
	add_deathsPerOneMillion(){
		this.msg+=this.categories.deathsPerOneMillion;
		this.add_space();
		this.msg+=g_specificCountry.deathsPerOneMillion;
		this.end_line();
	}
	eastereggs(message){
		for (let i=0;i<this.koreanames.length;i++){
			if (message == this.koreanames[i]){return "dprk";}
		}
			return false;
	}
	
	create_message(message){
		if(this.eastereggs(message)=="dprk"){
			this.msg+="korea easteregg";
		}else{
			this.msg+=message;
			//this.add_space();
			//this.insert_flag_emoji();
			this.end_line();
			this.add_cases();
			this.add_todayCases();
			this.add_deaths();
			this.add_todayDeaths();
			this.add_recovered();
			this.add_active();
			this.add_critical();
			this.add_casesPerOneMillion();
			this.add_deathsPerOneMillion();
		}
	}
};


	
bot.on("message", function(user, userID, channelID, message, event) {
	if (message.charAt(0) == "$"){
			message=message.substring(1);
			corona_stats(message);
			let output = new message_editing;
			setTimeout(() => { output.create_message(message);
			if (output.msg=="korea easteregg"){bot.sendMessage({to: channelID,message: "Asking the Dear Leader..."});
							   bot.uploadFile( {to: channelID,file: "./dprk.png"});
			}else{
			bot.sendMessage({to: channelID,message: output.msg});}
			 }, 500);
	}
});
