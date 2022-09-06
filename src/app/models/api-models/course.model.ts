export class Course {
    public id: string;
    public name: string;
    public description: string;
    public isPartFunded: boolean;

    constructor(id: string, name: string, description: string, isPartFunded: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isPartFunded = isPartFunded;
    }
}
