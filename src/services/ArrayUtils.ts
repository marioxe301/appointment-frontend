export const range = (start: number, end: number ): Array<number> =>{
    let array = [];
    for(let i = start; i < end; i++){
        array.push(i);
    }
    return array;
}