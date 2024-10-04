const baggageImages = Object.keys(import.meta.glob('../../../public/assets/images/Багаж/*.{jpg,jpeg,png,gif}'));
const biologyImages = Object.keys(import.meta.glob('../../../public/assets/images/Биология/*.{jpg,jpeg,png,gif}'));
const bunkerImages = Object.keys(import.meta.glob('../../../public/assets/images/Бункер/*.{jpg,jpeg,png,gif}'));
const healthImages = Object.keys(import.meta.glob('../../../public/assets/images/Здоровье/*.{jpg,jpeg,png,gif}'));
const catastrofaImages = Object.keys(import.meta.glob('../../../public/assets/images/Катастрофа/*.{jpg,jpeg,png,gif}'));
const specialImages = Object.keys(import.meta.glob('../../../public/assets/images/Особые условия/*.{jpg,jpeg,png,gif}'));
const professionImages = Object.keys(import.meta.glob('../../../public/assets/images/Профессия/*.{jpg,jpeg,png,gif}'));
const dangerImages = Object.keys(import.meta.glob('../../../public/assets/images/Угроза/*.{jpg,jpeg,png,gif}'));
const factsImages = Object.keys(import.meta.glob('../../../public/assets/images/Факты/*.{jpg,jpeg,png,gif}'));
const hobbyImages = Object.keys(import.meta.glob('../../../public/assets/images/Хобби/*.{jpg,jpeg,png,gif}'));

export const photoCategoryCards = {
    Profession: professionImages,
    Biology: biologyImages,
    Health: healthImages,
    Hobby: hobbyImages,
    Baggage: baggageImages,
    Facts: factsImages,
    Special: specialImages,
    Catastrofa: catastrofaImages,
    Danger: dangerImages,
    Bunker: bunkerImages,   
}