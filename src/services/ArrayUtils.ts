export const range = (start: number, end: number ): Array<number> =>{
    const array = [];
    for(let i = start; i < end; i++){
        array.push(i);
    }
    return array;
}