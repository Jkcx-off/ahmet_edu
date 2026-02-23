import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const subject = 'English'
    console.log(`Seeding questions for ${subject}...`)

    await prisma.question.deleteMany({
        where: { subject }
    })
    console.log(`Cleared existing ${subject} questions.`)

    type QDef = {
        text: string
        options: string[]
        correctOption: number
        classLevel: number
        difficulty: number
    }

    const questions: QDef[] = [
        // === GRADE 6 === (Basic grammar, Present Simple, Past Simple, Vocabulary)
        { text: 'Choose the correct form: My brother always ... milk in the morning.', options: ['drink', 'drinks', 'drinking', 'drank'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What is the past tense of "go"?', options: ['goed', 'goes', 'went', 'gone'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Look! The dog ... in the garden.', options: ['is running', 'run', 'runs', 'ran'], correctOption: 0, classLevel: 6, difficulty: 2 },
        { text: '... you like playing football?', options: ['Are', 'Is', 'Does', 'Do'], correctOption: 3, classLevel: 6, difficulty: 1 },
        { text: 'Which word is a fruit?', options: ['Carrot', 'Potato', 'Apple', 'Onion'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'I didn\'t ... a book yesterday.', options: ['read', 'reads', 'readed', 'reading'], correctOption: 0, classLevel: 6, difficulty: 2 },
        { text: 'They ... to school by bus every day.', options: ['go', 'goes', 'are going', 'went'], correctOption: 0, classLevel: 6, difficulty: 1 },
        { text: 'We ... a great time at the park last Sunday.', options: ['have', 'had', 'has', 'having'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'What is the opposite of "tall"?', options: ['Big', 'Long', 'Short', 'Small'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'She ... like apples; she prefers bananas.', options: ['don\'t', 'doesn\'t', 'isn\'t', 'aren\'t'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'How ... apples are there in the basket?', options: ['much', 'many', 'some', 'any'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'Which is correct? "I have ... umbrella."', options: ['a', 'an', 'the', 'some'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: '... is your name? - My name is John.', options: ['Who', 'Where', 'What', 'When'], correctOption: 2, classLevel: 6, difficulty: 1 },
        { text: 'Yesterday, I ... a new friend.', options: ['meet', 'meeting', 'met', 'meets'], correctOption: 2, classLevel: 6, difficulty: 2 },
        { text: 'What time ... you usually wake up?', options: ['do', 'does', 'are', 'is'], correctOption: 0, classLevel: 6, difficulty: 1 },
        { text: 'My father is a doctor. ... works in a hospital.', options: ['She', 'He', 'It', 'They'], correctOption: 1, classLevel: 6, difficulty: 1 },
        { text: 'There is ... milk in the fridge.', options: ['many', 'a', 'an', 'some'], correctOption: 3, classLevel: 6, difficulty: 2 },
        { text: 'Please, give me ... pen on the table.', options: ['a', 'an', 'the', 'some'], correctOption: 2, classLevel: 6, difficulty: 2 },
        { text: 'Can you ... English?', options: ['speak', 'speaks', 'spoke', 'speaking'], correctOption: 0, classLevel: 6, difficulty: 1 },
        { text: 'I am ... my homework right now.', options: ['do', 'doing', 'does', 'did'], correctOption: 1, classLevel: 6, difficulty: 1 },

        // === GRADE 7 === (Present/Past Continuous, Future Simple, Comparatives, Modals)
        { text: 'What were you doing at 8 PM yesterday? - I ... TV.', options: ['watch', 'watched', 'am watching', 'was watching'], correctOption: 3, classLevel: 7, difficulty: 2 },
        { text: 'She ... visit her grandmother next week.', options: ['is going', 'will', 'going to', 'wills'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'A cheetah is ... than a lion.', options: ['fast', 'faster', 'the fastest', 'more fast'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'This is the ... book I have ever read.', options: ['interesting', 'more interesting', 'most interesting', 'interestinger'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'You ... wear a uniform at school. It\'s the rule.', options: ['can', 'might', 'must', 'would'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'Look at those dark clouds! It ... rain.', options: ['is going to', 'will', 'shall', 'are going to'], correctOption: 0, classLevel: 7, difficulty: 3 },
        { text: 'I ... to London three times in my life.', options: ['was', 'went', 'have been', 'have gone'], correctOption: 2, classLevel: 7, difficulty: 3 },
        { text: 'My sister is ... than me.', options: ['older', 'more old', 'old', 'the oldest'], correctOption: 0, classLevel: 7, difficulty: 1 },
        { text: '... you ever eaten sushi?', options: ['Did', 'Have', 'Has', 'Are'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'He ... play the piano very well when he was five.', options: ['can', 'could', 'must', 'should'], correctOption: 1, classLevel: 7, difficulty: 2 },
        { text: 'While I ... to school, I saw an accident.', options: ['was walking', 'walked', 'am walking', 'walk'], correctOption: 0, classLevel: 7, difficulty: 2 },
        { text: 'I think people ... live on Mars in 2050.', options: ['are living', 'going to live', 'will live', 'lives'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'We ... swim in the lake; it is too cold.', options: ['mustn\'t', 'don\'t have to', 'shouldn\'t', 'mightn\'t'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'What is the past participle of "write"?', options: ['wrote', 'writted', 'written', 'writing'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'It\'s raining outside. You ... take an umbrella.', options: ['can', 'should', 'would', 'may'], correctOption: 1, classLevel: 7, difficulty: 1 },
        { text: 'Have you finished your homework ...?', options: ['already', 'just', 'yet', 'never'], correctOption: 2, classLevel: 7, difficulty: 2 },
        { text: 'I have ... seen that movie. Let\'s watch something else.', options: ['yet', 'any', 'ever', 'already'], correctOption: 3, classLevel: 7, difficulty: 2 },
        { text: 'Russia is the ... country in the world.', options: ['large', 'larger', 'largest', 'most large'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'If you are tired, you ... go to bed early.', options: ['would', 'have', 'should', 'might'], correctOption: 2, classLevel: 7, difficulty: 1 },
        { text: 'What ... you going to do this weekend?', options: ['do', 'are', 'is', 'will'], correctOption: 1, classLevel: 7, difficulty: 1 },

        // === GRADE 8 === (Present Perfect, Conditionals 0/1, Passive Voice intro, Gerunds)
        { text: 'If it rains tomorrow, we ... at home.', options: ['stay', 'will stay', 'are staying', 'stayed'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'Water boils if you ... it to 100 degrees Celsius.', options: ['heat', 'will heat', 'heated', 'heats'], correctOption: 0, classLevel: 8, difficulty: 2 },
        { text: 'The letter ... delivered yesterday.', options: ['is', 'was', 'has been', 'were'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'English ... spoken in many countries around the world.', options: ['is', 'was', 'has', 'are'], correctOption: 0, classLevel: 8, difficulty: 1 },
        { text: 'I enjoy ... to music in my free time.', options: ['to listen', 'listen', 'listening', 'listened'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'She promised ... me with my project.', options: ['helping', 'to help', 'help', 'helped'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'How long ... you lived in this city?', options: ['do', 'did', 'have', 'are'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'I have known him ... 2015.', options: ['for', 'since', 'from', 'in'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'They have been playing tennis ... two hours.', options: ['since', 'for', 'during', 'in'], correctOption: 1, classLevel: 8, difficulty: 2 },
        { text: 'If I ... time, I will help you.', options: ['have', 'will have', 'had', 'am having'], correctOption: 0, classLevel: 8, difficulty: 2 },
        { text: 'My bike ... stolen last night.', options: ['has been', 'were', 'was', 'is'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'I don\'t mind ... the windows.', options: ['wash', 'washing', 'to wash', 'washed'], correctOption: 1, classLevel: 8, difficulty: 3 },
        { text: 'He is very good at ... pictures.', options: ['to draw', 'draw', 'drawing', 'drawn'], correctOption: 2, classLevel: 8, difficulty: 2 },
        { text: 'The Eiffel Tower ... built in 1889.', options: ['is', 'has been', 'was', 'were'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'You won\'t pass the exam unless you ... harder.', options: ['will study', 'don\'t study', 'study', 'studied'], correctOption: 2, classLevel: 8, difficulty: 3 },
        { text: 'I\'d like ... a cup of tea, please.', options: ['have', 'having', 'to have', 'had'], correctOption: 2, classLevel: 8, difficulty: 1 },
        { text: 'We ... each other since we were kids.', options: ['know', 'knew', 'were knowing', 'have known'], correctOption: 3, classLevel: 8, difficulty: 3 },
        { text: 'This book ... written by J.K. Rowling.', options: ['is', 'was', 'were', 'has'], correctOption: 1, classLevel: 8, difficulty: 1 },
        { text: 'If you freeze water, it ... to ice.', options: ['turns', 'will turn', 'turned', 'would turn'], correctOption: 0, classLevel: 8, difficulty: 2 },
        { text: 'My parents want me ... a doctor.', options: ['be', 'being', 'to be', 'am'], correctOption: 2, classLevel: 8, difficulty: 2 },

        // === GRADE 9 === (Second/Third Conditional, Relative Clauses, Reported Speech)
        { text: 'If I ... a million dollars, I would travel the world.', options: ['have', 'had', 'will have', 'would have'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'If she ... harder, she would have passed the exam.', options: ['studied', 'had studied', 'would study', 'studies'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: 'He told me that he ... tired.', options: ['is', 'was', 'will be', 'has been'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'The boy ... won the race is my cousin.', options: ['which', 'who', 'whose', 'where'], correctOption: 1, classLevel: 9, difficulty: 1 },
        { text: 'This is the house ... I was born.', options: ['which', 'that', 'where', 'when'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'I would buy a big house if I ... rich.', options: ['am', 'be', 'were', 'will be'], correctOption: 2, classLevel: 9, difficulty: 3 },
        { text: 'She said she ... call me back later.', options: ['will', 'would', 'can', 'may'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: '"I like pizza", he said. -> He said that he ... pizza.', options: ['likes', 'liked', 'has liked', 'had liked'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'The book ... I am reading is very interesting.', options: ['who', 'where', 'when', 'which'], correctOption: 3, classLevel: 9, difficulty: 1 },
        { text: 'If we had left earlier, we ... missed the train.', options: ['won\'t have', 'wouldn\'t have', 'hadn\'t', 'wouldn\'t'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: 'She asked me where I ... going.', options: ['am', 'was', 'were', 'have been'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'The man ... car was stolen went to the police.', options: ['who', 'whom', 'whose', 'which'], correctOption: 2, classLevel: 9, difficulty: 3 },
        { text: 'If you hadn\'t helped me, I ... failed.', options: ['would', 'will have', 'would have', 'had'], correctOption: 2, classLevel: 9, difficulty: 3 },
        { text: 'I wish I ... how to play the guitar.', options: ['know', 'knew', 'have known', 'will know'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'He wanted to know what time the English lesson ...', options: ['starts', 'started', 'is starting', 'has started'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: 'A mechanic is a person ... repairs cars.', options: ['whose', 'which', 'who', 'whom'], correctOption: 2, classLevel: 9, difficulty: 1 },
        { text: 'I would ask for help if I ... need it.', options: ['do', 'did', 'was', 'were'], correctOption: 1, classLevel: 9, difficulty: 3 },
        { text: '"I am working", she told me. -> She told me she ... working.', options: ['is', 'was', 'had been', 'has been'], correctOption: 1, classLevel: 9, difficulty: 2 },
        { text: 'The summer ... I turned sixteen was incredibly hot.', options: ['where', 'which', 'when', 'who'], correctOption: 2, classLevel: 9, difficulty: 2 },
        { text: 'If I were you, I ... apologize to her.', options: ['will', 'would', 'should', 'can'], correctOption: 1, classLevel: 9, difficulty: 2 },

        // === GRADE 10 === (Present/Past Perfect Continuous, Advanced Passive, Modals of Deduction)
        { text: 'I ... for you for three hours! Where were you?', options: ['was waiting', 'have been waiting', 'had waited', 'am waiting'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'By the time she arrived, the film ... already started.', options: ['has', 'was', 'had', 'is'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'The streets are wet. It ... have rained during the night.', options: ['must', 'can\'t', 'should', 'would'], correctOption: 0, classLevel: 10, difficulty: 3 },
        { text: 'He ... be at home. His car is not outside.', options: ['must', 'might', 'can\'t', 'should'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'The new hospital ... built by next year.', options: ['will be', 'is being', 'has been', 'will have been'], correctOption: 3, classLevel: 10, difficulty: 3 },
        { text: 'He was out of breath because he ... running.', options: ['has been', 'had been', 'was', 'have been'], correctOption: 1, classLevel: 10, difficulty: 3 },
        { text: 'It\'s believed that the painting ... stolen by professionals.', options: ['was', 'is', 'has', 'had'], correctOption: 0, classLevel: 10, difficulty: 2 },
        { text: 'You ... have seen him yesterday. He is in Paris!', options: ['mustn\'t', 'shouldn\'t', 'can\'t', 'mightn\'t'], correctOption: 2, classLevel: 10, difficulty: 3 },
        { text: 'The house ... decorated at the moment.', options: ['is', 'is being', 'has been', 'was'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'I\'ll have my car ... tomorrow.', options: ['repairs', 'repairing', 'repaired', 'to repair'], correctOption: 2, classLevel: 10, difficulty: 3 },
        { text: 'She ... working here since 2010.', options: ['is', 'was', 'has been', 'had been'], correctOption: 2, classLevel: 10, difficulty: 1 },
        { text: 'They ... have left early to avoid traffic, but I am not sure.', options: ['must', 'can', 'might', 'will'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'A new shopping mall is going ... built near the station.', options: ['to be', 'being', 'be', 'been'], correctOption: 0, classLevel: 10, difficulty: 2 },
        { text: 'When I got to the station, the train ... already left.', options: ['has', 'had', 'was', 'have'], correctOption: 1, classLevel: 10, difficulty: 1 },
        { text: 'He got his hair ... yesterday.', options: ['cut', 'cutting', 'to cut', 'cuts'], correctOption: 0, classLevel: 10, difficulty: 3 },
        { text: 'By 2030, scientists ... have found a cure for this disease.', options: ['will', 'would', 'are', 'shall'], correctOption: 0, classLevel: 10, difficulty: 2 },
        { text: 'I\'m really tired. I ... studying all night.', options: ['was', 'have been', 'am', 'had been'], correctOption: 1, classLevel: 10, difficulty: 2 },
        { text: 'The keys are missing. Someone ... have taken them.', options: ['should', 'ought', 'must', 'can\'t'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'This problem needs ... solved immediately.', options: ['be', 'being', 'to be', 'been'], correctOption: 2, classLevel: 10, difficulty: 2 },
        { text: 'They had been ... for hours before they found the trail.', options: ['walked', 'walk', 'walking', 'have walked'], correctOption: 2, classLevel: 10, difficulty: 2 },

        // === GRADE 11 === (Mixed Conditionals, Wishes/Regrets, Inversions, Advanced Tenses)
        { text: 'If I ... Japanese, I would have understood what they were saying.', options: ['speak', 'spoke', 'had spoken', 'speaking'], correctOption: 1, classLevel: 11, difficulty: 3 }, // Mixed conditional
        { text: 'Rarely ... such a beautiful sunset.', options: ['I have seen', 'have I seen', 'saw I', 'I saw'], correctOption: 1, classLevel: 11, difficulty: 3 }, // Inversion
        { text: 'I wish I ... to his advice yesterday.', options: ['listen', 'listened', 'had listened', 'would listen'], correctOption: 2, classLevel: 11, difficulty: 2 },
        { text: 'If only it ... raining, we could go for a walk now.', options: ['stops', 'stopped', 'had stopped', 'would stop'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'Hardly ... started eating when the phone rang.', options: ['we had', 'had we', 'did we', 'we did'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: '... being tired, she finished the report.', options: ['Although', 'Despite', 'However', 'In spite'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'I would rather you ... not smoke in here.', options: ['do', 'did', 'have', 'are'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'It\'s high time we ... leaving.', options: ['are', 'were', 'be', 'will be'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: 'Had I known you were coming, I ... a cake.', options: ['would bake', 'would have baked', 'will bake', 'baked'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'Not only ... the guitar, but she also sings.', options: ['does she play', 'she plays', 'plays she', 'she does play'], correctOption: 0, classLevel: 11, difficulty: 3 },
        { text: '... arriving at the station, she called a taxi.', options: ['On', 'In', 'At', 'By'], correctOption: 0, classLevel: 11, difficulty: 3 },
        { text: 'If you ... the map, we wouldn\'t be lost now.', options: ['didn\'t forget', 'haven\'t forgotten', 'hadn\'t forgotten', 'wouldn\'t forget'], correctOption: 2, classLevel: 11, difficulty: 3 },
        { text: 'She is used to ... up early.', options: ['wake', 'waking', 'woke', 'woken'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'He stopped ... smoking last year for health reasons.', options: ['to smoke', 'smoking', 'smoke', 'smoked'], correctOption: 1, classLevel: 11, difficulty: 2 },
        { text: 'I didn\'t recognize her at first, for she ... her hair red.', options: ['dyed', 'dyeing', 'had dyed', 'has dyed'], correctOption: 2, classLevel: 11, difficulty: 2 },
        { text: 'Under no circumstances ... leave the building.', options: ['you should', 'should you', 'you must', 'mustn\'t you'], correctOption: 1, classLevel: 11, difficulty: 3 },
        { text: '... he worked hard, he failed the exam.', options: ['Despite', 'In spite of', 'Although', 'However'], correctOption: 2, classLevel: 11, difficulty: 1 },
        { text: 'We had the mechanic ... the engine.', options: ['checking', 'checked', 'to check', 'check'], correctOption: 3, classLevel: 11, difficulty: 3 }, // Causative active
        { text: 'You had better ... an umbrella; it looks like rain.', options: ['take', 'taking', 'to take', 'took'], correctOption: 0, classLevel: 11, difficulty: 2 },
        { text: 'No sooner ... the door than he realized he forgot his keys.', options: ['he closed', 'did he close', 'had he closed', 'he had closed'], correctOption: 2, classLevel: 11, difficulty: 3 },

        // === GRADE 12 === (Advanced Vocabulary, Idioms, Phrasal Verbs, Nuance)
        { text: 'He decided to ... the job offer because the salary was too low.', options: ['turn down', 'take up', 'put off', 'look into'], correctOption: 0, classLevel: 12, difficulty: 2 },
        { text: 'The teacher demanded that the student ... the classroom immediately.', options: ['leaves', 'left', 'leave', 'leaving'], correctOption: 2, classLevel: 12, difficulty: 3 }, // Subjunctive
        { text: 'Despite his wealth, he is known for being extremely ... with his money.', options: ['generous', 'frugal', 'extravagant', 'reckless'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'She passed the difficult exam with flying ...', options: ['flags', 'feathers', 'colors', 'kites'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'I\'ll have to ... the meeting until next week.', options: ['call off', 'put off', 'bring up', 'turn out'], correctOption: 1, classLevel: 12, difficulty: 2 },
        { text: 'It is essential that everyone ... aware of the safety procedures.', options: ['is', 'be', 'are', 'were'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'The scandal ... the politician\'s reputation irreparably.', options: ['bolstered', 'tarnished', 'alleviated', 'vindicated'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'She has a ... memory and never forgets a face.', options: ['photographic', 'vague', 'selective', 'poor'], correctOption: 0, classLevel: 12, difficulty: 1 },
        { text: 'Please ... from smoking in this area.', options: ['prevent', 'refrain', 'avoid', 'decline'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'The committee ... of five members.', options: ['consists', 'comprises', 'includes', 'contains'], correctOption: 0, classLevel: 12, difficulty: 2 },
        { text: 'You should take what he says with a grain of ...', options: ['sugar', 'pepper', 'sand', 'salt'], correctOption: 3, classLevel: 12, difficulty: 2 },
        { text: 'If you want to succeed, you have to think outside the ...', options: ['square', 'box', 'circle', 'line'], correctOption: 1, classLevel: 12, difficulty: 1 },
        { text: 'We need to iron ... a few problems before we launch the product.', options: ['in', 'out', 'up', 'down'], correctOption: 1, classLevel: 12, difficulty: 3 },
        { text: 'The company went bankrupt because of ... debts.', options: ['insurmountable', 'negligible', 'trivial', 'minor'], correctOption: 0, classLevel: 12, difficulty: 3 },
        { text: 'It goes without ... that you will be paid for the extra hours.', options: ['saying', 'speaking', 'telling', 'talking'], correctOption: 0, classLevel: 12, difficulty: 2 },
        { text: 'He is on the ... of making a major scientific discovery.', options: ['verge', 'edge', 'border', 'limit'], correctOption: 0, classLevel: 12, difficulty: 3 },
        { text: 'Her performance was absolutely ...; the audience was mesmerized.', options: ['mediocre', 'appalling', 'breathtaking', 'mundane'], correctOption: 2, classLevel: 12, difficulty: 2 },
        { text: 'I was taken ... by the sudden change in his behavior.', options: ['aback', 'apart', 'away', 'along'], correctOption: 0, classLevel: 12, difficulty: 3 },
        { text: 'They managed to pull ... the deal at the last minute.', options: ['in', 'down', 'out', 'off'], correctOption: 3, classLevel: 12, difficulty: 3 },
        { text: 'By the time you finish this test, you ... a great job.', options: ['will do', 'will be doing', 'will have done', 'have done'], correctOption: 2, classLevel: 12, difficulty: 2 }
    ]

    for (const q of questions) {
        await prisma.question.create({
            data: {
                subject: subject,
                text: q.text,
                type: 'MCQ',
                options: JSON.stringify(q.options),
                correctOption: q.correctOption,
                classLevel: q.classLevel,
                difficulty: q.difficulty,
            },
        })
    }

    console.log(`\nSuccessfully inserted ${questions.length} questions for ${subject}.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
