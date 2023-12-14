import inquirer from 'inquirer';

type RequirementDescription = {
    code: string
    description: string
}

class RequirementsDocument {
    author?: string
    name?: string
    project?: string
    requirements?: RequirementDescription[]

    print(){
        console.log(`Document:${this.name}`)
        console.log(`Name:${this.name}`)
        console.log(`Project:${this.name}`)
        console.log("Requirements:")
        console.table(this.requirements)
    }
}

/** Exercise **/
/** Use a creational pattern to create an instance of RequirementsDocument **/
/** Example: Factory, Builder or Singleton **/
class CommandLineInterface {

    private async addAuthor(){
        const authorInquirer = await inquirer.prompt([
            {
                type: "text",
                name: "author",
                message: "Document Author?"
            }
        ])

        // TODO: Use a creational pattern in other to create a RequirementDocument
        // with this author
        console.log("My document author is:", authorInquirer.author)
    }

    async main(){
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Add Author','Add Name', 'Add Project', 'Add Requirements', 'Create', 'Exit'],
            }
        ]);
    
        switch (answers.action) {
            case 'Add Author':
                await this.addAuthor()
                await this.main()
                break;
            case 'Add Name':
                // Add a name to the document
                this.main()
                break;
            case 'Add Project':
                // Add a project name
                this.main()
                break;
            case 'Add Requirements':
                // Add requirement
                this.main()
                break;
            case 'Create':
                // Create new RequirementsDocument Object
                // Execute requirementsDocument.print() to get the final output
                return;
                break;
            case 'Exit':
                return;
        }
    }
}

const cli = new CommandLineInterface()
cli.main()