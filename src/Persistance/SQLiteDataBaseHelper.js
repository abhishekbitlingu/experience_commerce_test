export default class SQLiteDataBaseHelper {
    static VISITOR_TABLE_NAME = "visitor_table";
    static NEWS_TABLE_NAME = "latest_news";
    static instance = SQLiteDataBaseHelper.instance || new SQLiteDataBaseHelper()
    SQLite;
    constructor() {
        // create Tables if they dont exist.
        this.SQLite = require('react-native-sqlite-storage');
        console.log("constructor called")
        this.createVisitorTable();
        // this.createNewsTable();
    }

    createVisitorTable() {
        if (this.SQLite) {
            this.SQLite.openDatabase({ name: 'app.db', location: 'Library' }, (db) => {
                db.transaction((tx) => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + SQLiteDataBaseHelper.VISITOR_TABLE_NAME + 
                    ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
                        'name VARCHAR(255) NOT NULL,' + 
                        'email VARCHAR(255) NOT NULL,' +
                        'type VARCHAR(255) NOT NULL,' +
                        'person_name VARCHAR(255) NOT NULL,' +
                        'date VARCHAR(255) NOT NULL,' +
                        'entry_time VARCHAR(255) NOT NULL,' +
                        'exit_time VARCHAR(255) NOT NULL' +
                        ')', [], (tx, results) => {
                            console.log('Visitor Table created successfully')
                    })
                })
            });
        } else {
            console.log("this.SQLite obj was null " + this.SQLite)
        }

    }

    createNewsTable() {
        if (this.SQLite) {
            this.SQLite.openDatabase({ name: 'app.db', location: 'Library' }, (db) => {
                db.transaction((tx) => {
                    // tx.executeSql('CREATE TABLE IF NOT EXISTS ' + SQLiteDataBaseHelper.MEETINGS_TABLE_NAME + ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, conf_Id INTEGER, description VARCHAR(255) NOT NULL, duration VARCHAR(255) NOT NULL ,start_datetime DATETIME NOT NULL, end_datetime DATETIME NOT NULL, FOREIGN KEY (conf_Id) REFERENCES ' + SQLiteDataBaseHelper.CONF_TABLE_NAME + '(id))', [], (tx, results) => {
                    //     console.log("Table createMeetingTable successfully created")
                    // })
                })
            });
        } else {
            console.log("this.SQLite obj was null " + this.SQLite)
        }
    }

    insertVisitorRecord(data) {
        console.log('insertVisitorRecord called');
        return new Promise((resolve, reject) => {
            console.log('inside Promise');
            if (this.SQLite) {
                console.log('inside if');
                this.SQLite.openDatabase({ name: 'app.db', location: 'Library' }, (db) => {
                    console.log('db opened');
                    db.transaction((tx) => {
                        console.log('Executing query');
                        tx.executeSql('INSERT INTO ' + SQLiteDataBaseHelper.VISITOR_TABLE_NAME + ' (name, email, type, person_name, date, entry_time, exit_time) VALUES (\'' + 
                        data.name + '\', \'' +
                        data.email + '\', \'' +
                        data.type + '\', \'' +
                        data.personToVisit + '\', \'' +
                        data.dateOfEntry + '\', \'' +
                        data.timeOfEntry + '\', \'' +
                        data.timeOfExit + '\')'
                        , [], (tx, results) => {
                            console.log('Executed successfully');
                            console.log(results)
                            resolve(true)
                            console.log("Inserted data successfully data is ", data)
                        }, (error) => {
                            reject(new Error(error.message))
                            console.log("IError occured ", error)
                        })
                    })
                });
            } else {
                reject(new Error("SQLite obj was undefined"));
                console.log("this.SQLite obj was null " + this.SQLite)
            }
        })
    }

    getVisitorRecords(date) {
        return new Promise((resolve, reject) => {
            if (this.SQLite) {
                this.SQLite.openDatabase({ name: 'app.db', location: 'Library' }, (db) => {
                    db.transaction((tx) => {
                        let query = (date) ? 'SELECT * FROM ' + SQLiteDataBaseHelper.VISITOR_TABLE_NAME + ' WHERE date=' + date : 'SELECT * FROM ' + SQLiteDataBaseHelper.VISITOR_TABLE_NAME 
                        tx.executeSql(query,[] , (tx, results) => {
                            console.log('getVisitorRecords response success for date = ' + date)
                            let vistors = []
                            if (results && results.rows && results.rows.length > 0) {
                                console.log('getVisitorRecords response success with data = ', results.rows)
                                for (let i = 0; i < results.rows.length; i++) {
                                    let item = results.rows.item(i);
                                    vistors.push(item)
                                }
                                resolve(vistors)
                            } else {
                                resolve([])
                            }
                        })
                    })
                });
            } else {
                reject(new Error("SQLite obj was undefined"));
                console.log("this.SQLite obj was null " + this.SQLite)
            }
        })
    }
}