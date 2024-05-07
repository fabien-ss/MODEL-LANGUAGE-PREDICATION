import { isCode } from "./PattersonSardinass";

import * as fs from "fs";

function randomWord(min: number, max: number): string {
    if (min > max) {
        throw new Error("Min must not be greater than Max");
    }
    let randomLength = Math.floor( Math.random() * max + min);
    let i = 0
    let word = ""
    while(i < randomLength) {
        word += Math.floor(Math.random() * 2)
        i ++;
    }
    return word;
}

function randomLanguage(min: number, max: number): string {
    if (min > max) {
        throw new Error("Min must not be greater than Max");
    }
    let randomLength = Math.floor(Math.random() * max + min);
    let language: string[] = [];
    let i = 0
    while ( i < randomLength){
        language.push(randomWord(1, 7))
        i ++;
    }
    let strLanguage = language.toString()
    if(isCode(language)) strLanguage = "1;" + strLanguage;
    else strLanguage = "0;" + strLanguage
    return strLanguage;
}

function generateMultipleLanguage(size: number, filePath: string): void{
    let i = 0
    let corpus = ""
    while (i < size){
        corpus += randomLanguage(1, 10) + "\n"
        i ++;
    }
    fs.writeFileSync(filePath, corpus)
}

generateMultipleLanguage(20000, "./languages.csv")