
import { SpecialEffects } from '../special-effects';

const UrlSSEffects = Object.keys(SpecialEffects);
const DoEffects = Object.values(SpecialEffects);

const doEffectWords = [];

const allVariables = {};

export function createVariables(players = ['I (player 1)', 'player 2', 'player 3', 'player 4'], specialCards) {
    console.log(players, specialCards);
    DoEffects.forEach((effect, indexEffect) => {
        const curEffectWords = effect.split('_').map((word) => word);

        const Variables = {
            Players: players,
            WhoCanVote: players,
            Callback: [],
            mainObject: null,
            from: null, 
            to: null,
            conditionIf: [],
            conditionWhile: [],
            take: null,
            get: null,
            or: [],
            open: false,
            doingObject: null,
            all: false, 
            with: [],
            same: null,
            any: null,
            my: null,
            has: [],
            for: null,
            multiply: 1,
            due: null,
            allGame: null,
            anotherPlayer: null,
            voteAgainst: null,
        }
        
        curEffectWords.forEach((word, index) => {
            if (word === 'Choose') {Variables.Callback.push(Choose), Variables.doingObject = curEffectWords[index + 1]}; 
            if (word === 'Mix') Variables.Callback.push(Mix);
            if (word == 'Move') Variables.Callback.push(Move);
            if (word === 'Change') Variables.Callback.push(Change);
            if (word === 'Apply') Variables.Callback.push(ApplyVouteMyself);
            if (word === 'ChooseType') {Variables.Callback.push(ChooseType); Variables.mainObject = curEffectWords[index + 1]};
            if (word === 'AnotherPlayer') {Variables.anotherPlayer = word};
            if (word === 'Dont') {
                Variables.Callback.push(DontVote); 
                if (curEffectWords[index + 2] === 'Against') {
                    Variables.voteAgainst = curEffectWords[index + 3];
                }
                Variables.doingObject = curEffectWords[index - 1]}
            if (word === 'All') {Variables.all = true}; 
            if (word === 'Take') {Variables.Callback.push(Take); Variables.take = curEffectWords[index + 1]}
            if (word === 'FirstOpen') Variables.Callback.push(FirstOpen);
            if (word === 'From') Variables.from = curEffectWords[index + 1];
            if (word === 'To') Variables.to = curEffectWords[index + 1];
            if (word === 'If') Variables.conditionIf.push(curEffectWords[index + 1], curEffectWords[index + 2]);
            if (word === 'While') Variables.conditionWhile.push(curEffectWords[index + 1], curEffectWords[index + 2]);
            if (word === 'Open') {Variables.open = true; Variables.doingObject = curEffectWords[index + 1]};
            if (word === 'Get') Variables.get = curEffectWords[index + 1];
            if (word === 'Any') Variables.any = curEffectWords[index + 1];
            if (word === 'With') Variables.with.push(curEffectWords[index + 1]);
            if (word === 'Or') {Variables.with = [curEffectWords[index + 2]]; Variables.or.push(curEffectWords[index - 1], curEffectWords[index + 1])};
            if (word === 'My') Variables.my = curEffectWords[index + 1];
            if (word === 'Has') Variables.has = Number(typeof curEffectWords[index + 1]) !== 0 ? [curEffectWords[index + 1], curEffectWords[index + 2]] : [Variables.has.push(curEffectWords[index + 1])];
            if (word === 'For') Variables.for = curEffectWords[index + 1];
            if (word === 'Delete') {Variables.Callback.push(Delete); Variables.doingObject = curEffectWords[index + 1]};
            if ((word === 'Next') || (word === 'Prev'))Variables.conditionIf.push(word);
            if (word === 'Age') Variables.conditionIf.push(curEffectWords[index - 1], word);
            if (word === 'AgainstVoteMultiply') {Variables.Callback.push(AgainstVoteMultiply); Variables.multiply = curEffectWords[index + 1]};
            if (word === 'NoTalk') Variables.Callback.push(NoTalk);
            if (word === 'ChangeVote') Variables.Callback.push(ChangeVote);
            if (word === 'DontVoteSame') Variables.Callback.push(DontVoteSame);
            if (word === 'MustChoose') Variables.Callback.push(MustChoose);
            if (word === 'AllGame') Variables.allGame = word;
            Variables.Callback[0] ? Variables.Callback[0]('fff') : '';
        })

        // console.log(Variables, curEffectWords);

        doEffectWords.push(curEffectWords);
        console.log(doEffectWords[indexEffect].indexOf("Player"));

        allVariables[UrlSSEffects[indexEffect]] = Variables;
    })

    console.log(allVariables);
    return allVariables;
}

// Когда нажата конпка кнопка Применить специальную карту
export function onClickEffect(effect, showEffect) {
    const curEffect = effect;
    const {WhoCanVote, Callback, mainObject, from, to, conditionIf, conditionWhile, take, get, or, open, doingObject, all, with: withW, same, any, my, has, for: forW, multiply, allGame, anotherPlayer} = curEffect;

    if (open) {
        Callback.push(isOpen);
    }

    if (all) {
        Callback.push(All);
    }

    if (showEffect.for) {
        Callback.push(For);
    }
    
    const effects = Callback.reduce(function (result, func) {
        return {
          ...result,
          [func.name]: func(doingObject, curEffect),
        }
    }, {})

    showEffect(effects);

    console.log(effects, 'EFECTS');

}

function AnotherPlayer(players) {return players.slice(1, players.length)}

function DontVote(doingObject, curEffect) {
    return (
        'DontVote',
        doingObject,
        (curEffect.voteAgainst ? curEffect.voteAgainst : ''),
        (curEffect.allGame ? 'AllGame' : 'Round')
    );
}

function Choose(curObject, curEffect) {
    // Функция позволяющая выбирать из els
    let returnWord = ''; 
    switch(curObject) {
        case 'AnotherPlayer':
            returnWord = 'Players';
            break;
        case 'Player':
            returnWord = 'Players';
            break;
        case 'BunkerCard':
            returnWord ='Bunker';powershell 
            break;
        case 'BaggageCard':
            returnWord = 'Baggage';
            break;
        case 'BiologyCard':
            returnWord = 'Biology';
            break;
        case 'HealthCard':
            returnWord = 'Health';powershell 
            break;
        case 'Type':
            returnWord = 'Type';
            break;
        case 'ProffesionCard':
            returnWord = 'Profession';
            break;
        case 'FactCard':
            returnWord = 'Facts';
            break;
        case 'HobbyCard':
            returnWord = 'Hobby';
            break;
        case 'I':
            if (curEffect.anotherPlayer) {
                returnWord = 'Players';
                break;
            }
            returnWord = 'I';
            break;
        default:
            if (curEffect?.any === 'BunkerCard') {
                returnWord = 'Bunker';
                break;
            }
            if (curEffect?.take === 'BaggageCard') {
                returnWord = 'Baggage';
                break;
            }
            if (curEffect?.from === 'AnotherPlayer') {
                returnWord = 'Players';
                break;
            }
    }

    return returnWord;
}

function Mix(curObject, curEffect) {
    // Функция перемешиванияя els
    return curObject;

}

function For(curObject, curEffect) {
    return curEffect.for;
}

function All(curObject, curEffect) {
    return curEffect.all;
}

function isOpen(curObject, curEffect) {
    return true;
}

function Move(curObject, curEffect, from = null, to = null) {
    // Функция которая позволяет переместить карту от from к to
    return [curEffect.from, curEffect.to];
}

function Change(curObject, curEffect) {
    return [curEffect.from, curEffect.to];
}

function Delete(curObject, curEffect) {
    // Функция которая удаляет навсегда карту
    return curObject;
}

function ApplyVouteMyself(curObject, curEffect) {
    // Функция которая позволяет голосовать только за себя
    return true;
}

function Take(curObject, curEffect, place = false) {
    // Функция которая позволяет взять карту из place
    return curEffect.take;
}

function FirstOpen(curObject, curEffect, card = false) {
    // Функция которая позволяет определить кто открыл 1 карту card
    return curObject;
}

function AgainstVoteMultiply(curObject, curEffect, num = false) {
    // Функция которая позволяет увеличить в num раз кол-во голосов за него
    return curEffect.multiply;
}

function NoTalk(curObject, curEffect) {
    // Функция которая не позволяет игрокам говорить
    return true;
}

function DontVoteSame(curObject, curEffect) {
    // Функция которая не позволяет игрокам голосовать за тех игроков за которых они проголосовали
    return true;
}

function ChangeVote(curObject, curEffect) {
    // Функция которая заставляет игроков голосовать заново
    return true;
}

function MustChoose(curObject, curEffect, category) {
    // Функция которая заставляет игроков открывать карты только из category
    return true;
}

function ChooseType(curObject, curEffect, type) {
    // Функция которая позволяет игроку выбрать тип карт для открывания
    return true;
}
