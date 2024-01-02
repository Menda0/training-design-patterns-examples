import inquirer from "inquirer";

class Person {
    constructor(public name: string, public age: number, public nif: string) {}
}

interface PersonObserver {
    newPersonAdded(person: Person): void;
}

class PersonAgeObserver implements PersonObserver{
    newPersonAdded(person: Person){
        console.log("New person was added")
    }
}

interface Iterator<T> {
    next(): T;
    hasNext(): boolean;
}

interface IsIterable<T> {
    getIterator(): Iterator<T>
}

class PersonCollection implements IsIterable<Person>{
    private persons: Map<string, Person> = new Map<string, Person>();
    private observers: PersonObserver[] = [];

    addObserver(observer: PersonObserver): void {
        this.observers.push(observer);
    }

    addPerson(person: Person): void {
        this.persons.set(person.nif, person);
        this.notifyObservers(person);
    }

    getPerson(nif: string){
        this.persons.get(nif)
    }

    private notifyObservers(person: Person): void {
        this.observers.forEach(observer => observer.newPersonAdded(person));
    }

    getIterator(): Iterator<Person> {
        throw new Error("Method not implemented.");
    }
}

class CommandLineInterface {

    constructor(private personCollection: PersonCollection){}

    async createPerson(){

        const answers = await inquirer.prompt([
            {
                type: "text",
                name: "name",
                message: "Person name?"
            },
            {
                type: "number",
                name: "age",
                message: "Person age?"
            },
            {
                type: "number",
                name: "nif",
                message: "Person Nif"
            }
        ])

        const {name, age, nif} = answers

        const person = new Person(name, age, nif)
        this.personCollection.addPerson(person)
    }

    async main(){
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Add Person','Get Person', 'List All People', 'Exit'],
            }
        ]);
    
        switch (answers.action) {
            case 'Add Person':

                await this.createPerson()
                await this.main()
                break;
            case 'Get Person':

                await this.main()
                break;
            case 'List All People':

                await this.main()
                break;
            case 'Exit':
                return;
        }
    }
}

const ageObserver = new PersonAgeObserver()
const personCollection = new PersonCollection()
personCollection.addObserver(ageObserver)

const cli = new CommandLineInterface(personCollection)
cli.main()