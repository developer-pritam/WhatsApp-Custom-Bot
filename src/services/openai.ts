import fs from 'fs';
import axios from 'axios';
if (fs.existsSync('config.env')) {
  require('dotenv').config({ path: './config.env' });
} else {
  require('dotenv');
}


const randomizationKey = (Math.random() * 10000000).toFixed(0);

const AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
console.log(AZURE_OPENAI_KEY);

async function generateRandomFact() {


  // random no between 0 and 100
  const randomNo = Math.floor(Math.random() * 100);

  try {
    const response = await axios({
      method: 'post',
      url: 'https://openai-pingolearn-prod-global-01.openai.azure.com/openai/deployments/pritam-test/completions?api-version=2022-12-01',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.AZURE_OPENAI_KEY || 'YOUR_AZURE_OPENAI_KEY'
      },
      data: {
        "prompt": `Generate just one ${randomNo > 50 ? "random" : "romantic"} hard/uncommon english word used in conversation with meaning. Use the key passed in prompt to randomize the response (Key = ${randomizationKey}).\n\nWord: *Fool’s Gold*\nMeaning: Iron Pyrites, a worthless rock that resembles real gold\n\nWord: `,
        "max_tokens": 200,
        "temperature": 0.9,
        "frequency_penalty": 0,
        "presence_penalty": 0.5,
        "top_p": 0.78,
        "stop": "\n\n"
      }
    });
    console.log("RANDOM FACT");
    console.log(response.data.choices[0].text);
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.log(error);
  }

  // const axios = require('axios');

  // const config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: 'https://icanhazdadjoke.com/',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  // };
  // try {
  //   const res = await axios.request(config)
  //   console.log(res.data.joke);
  //   return res.data.joke;

  // } catch (error) {
  //   console.log("ERROR", error.message);
  //   // On error return a joke from the list
  //   const jokes = [
  //     "I'm reading a book about anti-gravity. It's impossible to put down.",
  //     "Did you hear about the guy whose whole left side was cut off? He's all right now.",
  //     "I used to work in a shoe recycling shop. It was sole destroying.",
  //     "Why do seagulls fly over the sea? Because if they flew over the bay, they'd be bagels.",
  //     "Dad, did you get a haircut? No I got them all cut.",
  //     "Why do crabs never give to charity? Because they're shellfish.",
  //     "What do you call a fake noodle? An impasta.",
  //     "How does a penguin build it's house? Igloos it together.",
  //     "Dad, can you put my shoes on? No, I don't think they'll fit me.",
  //     "What do you call a belt made out of watches? A waist of time.",
  //     "Why don't skeletons ever go trick or treating? Because they have no body to go with."
  //   ]
  //   return jokes[Math.floor(Math.random() * jokes.length)];
  // }
}


export { generateRandomFact };