// to connect to mongodb server
//mongosh -u root -p --authenticationDatabase admin

//to show databases
//show dbs

//to use a database
//use database_name

/*
Collections in mongoDB is Tables in MySQL 
Document in mongoDB is a row of a table in MySQL */



/*1  DATABASES

Show all databases
show dbs

Create or switch to a database
use myDatabase


Note: A database is created only when you insert data.

Delete a database
db.dropDatabase()


*/

/*2 COLLECTIONS
Collections are groups of documents.

Create a collection
db.createCollection("users")

Show collections
show collections

Delete collection
db.users.drop()

*/ 

/*3 INSERT DOCUMENTS
MongoDB documents are JSON-like objects.

Insert one
db.users.insertOne({
  name: "Alice",
  age: 22,
  city: "Paris"
})

Insert many
db.users.insertMany([
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 }
]

*/

/*4 MongoDB Data Types


| Type         | Example              |
| ------------ | -------------------- |
| **String**   | `"Hello"`            |
| **Number**   | `42`                 |
| **Boolean**  | `true`               |
| **Array**    | `[1, 2, 3]`          |
| **Object**   | `{x: 1, y: 2}`       |
| **ObjectId** | `ObjectId("645...")` |
| **Date**     | `new Date()`         |
| **Null**     | `null`               |

*/

/* 5 Find Documents

 Find all
db.users.find()

Find with condition
db.users.find({ age: 25 })

Find one
db.users.findOne({ name: "Alice" })

Project specific fields
db.users.find({}, { name: 1, age: 1, _id: 0 }) //1 means include , 0 means exclude so it will print the collection without id

 */

/* 6 Sorting and Limiting
Sort ascending
db.users.find().sort({ age: 1 })

Sort descending
db.users.find().sort({ age: -1 })

Limit results
db.users.find().limit(3)

Skip
db.users.find().skip(5)

Pagination example
db.users.find().skip(10).limit(10)

*/


/*7 Update Documents
Update one
db.users.updateOne(
  { name: "Alice" },
  { $set: { age: 23 } }
)

Update many
db.users.updateMany(
  { isActive: true },
  { $set: { city: "New York" } } //$set is used to add or modify fields
)

Replace entire document
db.users.replaceOne(
  { name: "Bob" },
  { name: "Bob", age: 31, country: "USA" }
)
  you must write all the fields
*/

/* 8 Delete Documents
Delete one
db.users.deleteOne({ name: "Charlie" })

Delete many
db.users.deleteMany({ isActive: false })

Delete all
db.users.deleteMany({})
 */

/*9 Comparison Operators
| Operator | Meaning                 |
| -------- | ----------------------- |
| `$eq`    | equal                   |
| `$ne`    | not equal               |
| `$gt`    | greater than            |
| `$lt`    | less than               |
| `$gte`   | greater or equal        |
| `$lte`   | less or equal           |
| `$in`    | matches values in array |
| `$nin`   | not in array            |

 */

/* 10 Logical Operators
| Operator | Meaning            |
| -------- | ------------------ |
| `$and`   | both conditions    |
| `$or`    | either condition   |
| `$not`   | negation           |
| `$nor`   | none of conditions |

ex: db.users.find({
  $and: [
    { age: { $gt: 20 } },
    { isActive: true }
  ]
})

*/
/*11 Counting Document
 db.users.countDocuments()
db.users.countDocuments({ isActive: true })

 */

/* 11 Indexes
Indexes in MongoDB are special data structures that make queries faster.
They work like the index of a book:
Instead of reading every page to find a word (slow)
You check the index, jump directly to the right page (fast)
Without an index → MongoDB must scan every document (called COLLSCAN).
With an index → MongoDB can jump directly to matching documents (called IXSCAN).

Indexes SPEED UP:
find() queries
sorting
filtering
uniqueness validation

Types of indexes
1-single field index :
    db.users.createIndex({ name: 1 }) 

2-Compound Index (Multiple Fields)
    db.users.createIndex({ name: 1, age: -1 })
          This speeds up:
              find({ name: "Alice" })
              find({ name: "Alice", age: 20 })
              sort({ name: 1, age: -1 })
              ⚠️ But NOT:
              find({ age: 20 })
              👉 This is because MongoDB requires the leftmost field to be used.
3-Unique index
  Ensures no duplicate values.
    db.users.createIndex({ email: 1 }, { unique: true })
      If you try to insert a duplicate → ERROR.

4- Text Index:
        Searching for words inside paragraphs
        Searching multiple terms
        Searching phrases
        Searching partial matches
        Ranking search results by relevance
        Text indexes are MongoDB’s built-in “search engine.”

    db.machines.createIndex({ name: "text" })
    then we search like this :
        ➤ Search multiple terms:
          db.machines.find({
            $text: { $search: "laser cutting" }
          })

        ➤ Exact phrase search:
        db.machines.find({
          $text: { $search: "\"cutting machine\"" }
        })

        ➤ Excluding a word:
        db.machines.find({
          $text: { $search: "laser -welding" }
        })


There are many other types of indexes you can search for it

View all indexes
db.users.getIndexes()

Delete an index
db.users.dropIndex("name_1")

Delete all indexes
db.users.dropIndexes()

⭐ How Indexes Are Used (Query Planner)

Use explain() to see if MongoDB used an index:

db.users.find({ age: 25 }).explain("executionStats")

*/