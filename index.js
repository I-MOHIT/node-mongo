const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err,client) => {

    assert.equal(err,null);

    console.log("Connected correctly to the server");

    const db = client.db(dbname);
    
    dboper.insertDocument(db,{"name":"Donut","description":"Yummy"},"dishes",(result) => {
        console.log('Insert Document:\n',result.ops);

        dboper.findDocuments(db,"dishes",(docs) => {
            console.log('Found Documents:\n',docs);

            dboper.updateDocument(db,{"name":"Donut"},{"description":"Updated Yummy"},"dishes",(result) => {
                console.log("Updated Document:\n",result.result);

                dboper.findDocuments(db,"dishes",(docs) => {
                    console.log('Found Documents:\n',docs);

                    db.dropCollection("dishes",(result) => {
                        console.log('Dropped Collection:\n',result);
                    });
                });
            });
        });
    });
     

    /*
    const collection = db.collection('dishes');

    collection.insertOne({"name":"Pasta","description":"Tasty"}, (err,result) => {
        assert.equal(err,null);

        console.log('After insert:\n');
        console.log(result.ops);

        collection.find({}).toArray((err,docs) => {
            assert.equal(err,null);

            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes', (err,result) => {
                assert.equal(err,null);

                client.close();
            });
        });
    });*/
});