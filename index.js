console.log(`
Welcome to JS TODO-APP
*********
Select an action:
1) Add a new task
2) List all tasks
3) List completed tasks
4) Mark the task as done
5) Delete a task
6) Sort tasks by the due date
7) Sort tasks by priority
8) Clear all tasks
*********`);
const array = [];
function Task(description, date, priority) {
    this.description = description;
    this.due_date = date;
    this.priority_level = priority;
    this.status = 'incomplete';
}
Task.prototype.description = '';
Task.prototype.due_date = '';
Task.prototype.priority_level = '';
Task.prototype.status = '';
// console.log(Task.prototype);
const readline = require("readline");
const rd = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function query(question) {
    rd.question(question, (answer) => {
        if (answer == 1) {
            rd.question("plz enter description of the task? ", description => {
                rd.question("plz enter due date in this format 'yyy-mm-dd' ex: '2022-02-24' ? ", due_date => {
                    rd.question("plz enter priority level (enter a number) ? ", priority_level => {
                        array.push(new Task(description, due_date, priority_level))
                        query(question);
                    });
                });
            });

        } else if (answer == 2) {
            if (array.length == 0) console.log('there is no tasks');
            else {
                console.log('List all tasks..');
                array.forEach(arr => {
                    console.log(`
         description: ${arr.description}
         due_date: ${arr.due_date}
         priority_level:  ${arr.priority_level} 
         status:  ${arr.status} `);
                });
            }
            query(question);
        } else if (answer == 3) {
            let res = array.filter(arr => arr.status == 'completed');
            if (res.length == 0) console.log('all task are incomplete');
            else {
                console.log('List completed tasks');
                console.log(res);
            }
            query(question);
        } else if (answer == 4) {
            let result = array.filter(arr => arr.status == 'incomplete');
            result.forEach(arr => {
                console.log(` 
                description: ${arr.description} 
                status:   ${arr.status} `);
            });
            rd.question("plz choose from the tasks above to be completed! (enter task desc.)", answer => {
                let res = array.filter(arr => arr.description == answer)
                res.map(arr => arr.status = 'completed');
                console.log(res);
                query(question);
            });
        } else if (answer == 5) {
            array.forEach(arr => {
                console.log(`
         description: ${arr.description}
         due_date: ${arr.due_date}
         priority_level:  ${arr.priority_level} 
         status:  ${arr.status} `);
            });
            rd.question("plz choose from the tasks above to delete! (enter task desc.)", answer => {
                const index = array.map(object => object.description).indexOf(answer);
                array.splice(index, 1);
                query(question);
            });

        } else if (answer == 6) {
            console.log('Sort tasks by the due date...');
            function compare(a, b) {
                return new Date(a.due_date) - new Date(b.due_date);
            }
            console.log(array.sort(compare));


            query(question);
        } else if (answer == 7) {
            console.log('Sort tasks by priority...');
            function compare(a, b) {
                if (a.priority_level > b.priority_level) return 1;
                if (a.priority_level < b.priority_level) return -1;
                return 0;
            }
            console.log(array.sort(compare));
            query(question);
        } else if (answer == 8) {
            console.log('Clear all tasks...');
            array.splice(0);
            query(question);
        } else {
            process.exit(1)
        }
    })
}
query("What is your choice? ")