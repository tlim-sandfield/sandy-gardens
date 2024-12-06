export default class UniqueNumberList extends Array<number> {
    private currentResourceID: number;

    constructor(currentResourceID: number) {
        super();
        this.currentResourceID = currentResourceID;
    }
    
    add(number: number): void {
        if (
            !this.includes(number) &&
            number !== this.currentResourceID
        ) {
            this.push(number);
        }
    }

    remove(number: number): void {
        const index = this.indexOf(number);
        if (index !== -1) {
            this.splice(index, 1);
        }
    }

    getNumbers(): number[] {
        return [...this];
    }
}
