import { wkData } from './wk_kanji_level.js';
import { PdfReader } from "pdfreader";
//test
const pdfFilePath = "./pdf/test1.pdf";

const uniqueKanjiInText = [];
const kanjiPerLevel = Array(60).fill(0);

function isKanji(character){
    return character.match(/[\u4e00-\u9faf]/)
}

function getKanjiLevel(kanji) {
    let kanjiObject = wkData.find(o => o.kanji === kanji);
    console.log(kanjiObject);
    return kanjiObject.level;
}

function kanjiFirstAppearance(kanji){
    return !uniqueKanjiInText.includes(kanji);
}   


new PdfReader().parseFileItems(pdfFilePath, (err, item) => {
    if (err) console.error("error:", err);
    else if (!item){
        console.warn("end of file");
        console.log(kanjiPerLevel);
        console.log(uniqueKanjiInText);
    }
    else if (item.text){
        let charsToTest = item.text.split("");
        for (const element of charsToTest){
            if(isKanji(element)) {
                if(kanjiFirstAppearance(element)){
                    uniqueKanjiInText.push(element)
                    kanjiPerLevel[getKanjiLevel(element)-1]++;
                }  
            }
        };
    } 
  });