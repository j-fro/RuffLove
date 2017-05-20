export class Pet {
    constructor(
        public petfinderID: string,
        public name = '',
        public age = '',
        public size = '',
        public description = '',
        public sex = '',
        public imageUrls = new Array<string>()
    ) { }
}