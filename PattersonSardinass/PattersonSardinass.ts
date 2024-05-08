function getResidus(code1: string, code2: string) {
    if (code1 === code2) return "e";
    for (let i = 0; i < code2.length; i++) {
        if (code1[i] != code2[i]) return "vide";
    }
    return code1.substring(code2.length, code1.length);
}

function languageDivisor(l1: string[], l2: string[]) {
    let retour: string[] = [];
    l2.map((valuel2) => {
        l1.map((valuel1) => {
                const residus = getResidus(valuel1, valuel2);
                if (residus !== "vide") retour.push(residus)
            }
        )
    }
    )/*
    for (let j = 0; j < l2.length; j++) {
        for (let i = 0; i < l1.length; i++) {
            let residus = getResidus(l1[i], l2[j]);
            if (residus !== "vide") retour.push(residus)
        }
    }*/
    return retour;
}



function isAlreadyInArray(a: string[][], b: string[], index: number) {
    for (let i = index; i < a.length; i++) if (compare(a[i], b)) return true
    return false;
}

function compare(a: string[], b: string[]) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
    return true;
}

function deleteSelfDivisor(code: string[]) {
    let retour: string[] = [];
    for (let i = 0; i < code.length; i++) if (code[i] !== "e") retour.push(code[i])
    return retour;
}

function checkLanguagesCodeLength(code: string[]) {
    if (code[0] == undefined) return false;
    let j = code[0].length;
    for (let i = 1; i < code.length; i++) if (code[i].length !== j) return false
    return true;
}

// combinaison à 2
function multipleArrayVersion(code: string[]): string[][] {
    let motTester = code;
    let finalCombination: string[][] = []
    for (let i = 0; i < code.length; i++) finalCombination.push([code[i]])
    for (let i = 0; i < motTester.length; i++) {
        for (let j = 0; j < code.length; j++) {
            let cuple: string[] = []
            if (motTester[i] !== code[j] && !isAlreadyInArray(finalCombination, [motTester[i], code[j]].sort(), 0)) cuple.push(motTester[i], code[j])
            cuple.sort()
            if (cuple.length > 0) finalCombination.push(cuple)
        }
    }
    return finalCombination
}

function substractArray(divident: string[], divisor: string[]): string[] {
    let newArr: string[] = []
    divident.map((value) => {
        if (!divisor.includes(value)) newArr.push(value)
    }
    )
    return newArr;
}

export function isCode(code: string[]) {
    if (code.length === 1 || checkLanguagesCodeLength(code)) return true
    let residus: string[][] = [];
    residus.push(code);
    residus.push(deleteSelfDivisor(languageDivisor(residus[0], residus[0])))
    let i = 2;
    let continu: boolean = true;
    while (continu) {
        let left = languageDivisor(residus[i - 1], residus[0])
        let right = languageDivisor(residus[0], residus[i - 1])
        let union = left.concat(right);
        if (union.includes("e")) return false
        // if(isAlreadyInArray(residus, union, 2)) return true;
        const residusWithoutFirstTwo = residus.slice(2);
        const isInArray = residusWithoutFirstTwo.some(subArray =>
            union.every(element => subArray.includes(element)));
        if (isInArray) return true;
        residus.push(union)
        //console.log(i)
        i++;
    }
}

export function howToCode(code: string[]): { isCode: boolean, combination: any, temp: any } {
    let divisors: string[][] = multipleArrayVersion(code)
    let temp: string[] = []
    for (let i = 0; i < divisors.length; i++) {
        let value = divisors[i]
        temp = substractArray(code, value)
        if (isCode(temp)) return { isCode: true, combination: value.toString(), temp: temp }
        temp = []
    }
    return { isCode: false, combination: 'Not a valid code', temp: temp }
}

let a = ["0", "01", "101", "110", "11"]
let ad = ["1001", "101", "1100"]
let b = ["0000000", "0111000", "111011", "01010001", "010100", "0101010", "1000011", "010001", "1000100", "00010", "011", "010001"]
let c = ["101", "10", "111"]
let d = ["01", "101", "1111", "11011"]
let e = ["01", "101", "110"]

let code = isCode("1000100,00000,101000,10,01100".split(","))
console.log("code? ", code)
/*
if(!code){
    console.log("how ", howToCode(b))
}else{
    console.log("it's already a code")
}*/