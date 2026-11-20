import axios from 'axios';

export const scoreTYPE = {
    LIVE: 'live',
    UPCOMING: 'upcoming',
    COMPLETED: 'completed',
}


async function getScore(type: string) {

    try {

        console.log(type)
        const date: number = new Date().getTime();
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://crictimes.org/data/v1/scores.json?q=' + date,
        };
        const response: any = await axios.request(config);

        const liveScore = response.data[type];
        let scoreText = ""
        console.log(liveScore)
        liveScore.forEach((element: any, idx: number) => {

            if (idx === 0) {

                if (element.status === "COMPLETED" && liveScore.length > 1) {
                    scoreText += `*${liveScore[1].series}*\n${liveScore[1].spec} \n${liveScore[1].t_one} ${liveScore[1].t_one_s} vs ${liveScore[1].t_two} ${liveScore[1].t_two_s}\n${liveScore[1].m_status}\n${liveScore[1].dt}\nStatus: ${liveScore[1].status}\n\n`;
                }
                scoreText += `*${element.series}*\n${element.spec} \n${element.t_one} ${element.t_one_s} vs ${element.t_two} ${element.t_two_s}\n${element.m_status}\n${element.dt}\nStatus: ${element.status}`;


            }
        });
        console.log(scoreText)

        return scoreText;

    } catch (error) {
        console.log("SCORE ERROR", error.message);
    }
}
export default getScore;